// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const clientSocket = io("http://localhost:5005/client"); // Connect to client namespace

// const ImageRequest = () => {
//     const [message, setMessage] = useState("No response yet.");

//     useEffect(() => {
//         clientSocket.emit("registerClient", "client-456"); // Register client on mount

//         clientSocket.on("requestStatus", (data) => {
//             console.log("📩 Received response from Admin:", data);

//             // Update UI with admin response
//             setMessage(data.message);
//         });

//         return () => {
//             clientSocket.off("requestStatus"); // Cleanup listener on unmount
//         };
//     }, []);

//     const sendRequest = () => {
//         clientSocket.emit("sendRequest", { 
//             type: "image_request", 
//             adminId: "admin-123", 
//             clientId: "client-456" 
//         });
//         setMessage("📩 Request sent... Waiting for admin response.");
//     };

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h2>Request Image Access</h2>
//             <button onClick={sendRequest}>Request Images</button>
//             <p style={{ fontSize: "18px", fontWeight: "bold", color: "blue" }}>{message}</p> 
//         </div>
//     );
// };

// export default ImageRequest;












import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://admin-backend-production-4ca3.up.railway.app/client"); // Connect to client namespace

const ImageRequest = () => {
    const [message, setMessage] = useState("No response yet.");
    const [imageURL, setImageURL] = useState(null);
    const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage

    useEffect(() => {
        socket.emit("registerClient", "client-456"); // Register client on mount

        socket.on("requestStatus", (data) => {
            console.log("📩 Received response from Admin:", data);
            setMessage(data.message);
        });

        socket.on("receiveImage", (url) => {
            setImageURL(url);
        });

        return () => {
            socket.off("requestStatus");
            socket.off("receiveImage");
        };
    }, []);

    const sendRequest = () => {
        if (userEmail) {
            socket.emit("sendRequest", { 
                type: "image_request", 
                adminId: "admin-123", 
                clientId: "client-456",
                clientSocketId: socket.id, 
                clientEmail: userEmail 
            });
            setMessage("📩 Request sent... Waiting for admin response.");
        } else {
            console.error("User email not found!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Request Image Access</h2>
            <p>Logged in as: {userEmail}</p>
            <button onClick={sendRequest}>Request Images</button>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "blue" }}>{message}</p> 
            {imageURL && <img src={imageURL} alt="Authorized Content" width="300px" />}
        </div>
    );
};

export default ImageRequest;

