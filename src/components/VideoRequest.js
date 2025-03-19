// Client Code (VideoRequest.js)
import React, { useState, useRef, useEffect } from "react";
import socket from "./socket";

const VideoRequest = () => {
    const [message, setMessage] = useState("");
    const [videoApproved, setVideoApproved] = useState(false);
    const videoRef = useRef(null);
    const peerConnection = useRef(null);

    const sendRequest = () => {
        socket.emit("sendRequest", { type: "video_request", adminId: "admin123", clientId: "client-456" });
    };

    socket.on("requestStatus", (data) => {
        if (data.type === "video_request") {
            setMessage(data.message);
            if (data.approved) {
                setVideoApproved(true);
            }
        }
    });

    // useEffect(() => {
    //     if (videoApproved) {
    //         peerConnection.current = new RTCPeerConnection();

    //         peerConnection.current.ontrack = (event) => {
    //             videoRef.current.srcObject = event.streams[0];
    //         };

    //         peerConnection.current.onicecandidate = (event) => {
    //             if (event.candidate) {
    //                 socket.emit("send_ice_candidate_client", { candidate: event.candidate });
    //             }
    //         };

    //         socket.on("receive_offer_client", async ({ signal }) => {
    //             await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
    //             const answer = await peerConnection.current.createAnswer();
    //             await peerConnection.current.setLocalDescription(answer);
    //             socket.emit("send_answer_client", { signal: answer });
    //         });

    //         socket.on("receive_ice_candidate_client", ({ candidate }) => {
    //             peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    //         });
    //     }
    // }, [videoApproved]);

    useEffect(() => {
        if (videoApproved) {
            peerConnection.current = new RTCPeerConnection();
    
            peerConnection.current.ontrack = (event) => {
                console.log("🎥 Client received video stream...", event.streams[0]);
                if (videoRef.current) {
                  videoRef.current.srcObject = event.streams[0];
                }
              };
              
    
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("send_ice_candidate_client", { candidate: event.candidate });
                }
            };
    
            socket.on("receive_offer_client", async ({ signal }) => {
                console.log("📡 Received WebRTC offer from Admin");
    
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
    
                console.log("📡 Sending WebRTC answer to Admin...");
                socket.emit("send_answer_client", { signal: answer });
            });
    
            socket.on("receive_ice_candidate_client", ({ candidate }) => {
                console.log("📡 Received ICE candidate from Admin.");
                peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            });
        }
    }, [videoApproved]);

    
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Request Video Access</h2>
            <button onClick={sendRequest}>Request Video</button>
            {message && <p>{message}</p>}
            {videoApproved && <video ref={videoRef} autoPlay playsInline style={{ width: "100%", border: "1px solid black" }} />}
        </div>
    );
};

export default VideoRequest;
