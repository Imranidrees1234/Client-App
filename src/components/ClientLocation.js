// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const ClientLocation = () => {
//     const [driverLocation, setDriverLocation] = useState(null);
//     const [socket, setSocket] = useState(null);
//     const [message, setMessage] = useState("");
//     const mapRef = useRef(null);
//     const markerRef = useRef(null);
//     const ws = useRef(null);

//     const clientId = "client-456";  // Unique Client ID
//     const adminId = "admin-123";    // Admin ID

//     useEffect(() => {
//         // Initialize WebSocket connection for location updates
//         const socketInstance = io("https://livelocation-backend-production.up.railway.app/");
//         socketInstance.on("client-receive-location", (location) => {
//             console.log("Received Driver Location in Client App:", location);
//             if (location && typeof location.latitude === "number" && typeof location.longitude === "number") {
//                 setDriverLocation(location);
//             } else {
//                 console.warn("Invalid location received:", location);
//             }
//         });
//         setSocket(socketInstance);

//         return () => {
//             socketInstance.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         // WebSocket connection for requesting location access
//         const newSocket = io("https://admin-backend-production-4ca3.up.railway.app/client", {
//             reconnection: true,
//             reconnectionAttempts: 10,
//             reconnectionDelay: 3000
//         });

//         newSocket.on("connect", () => {
//             console.log("Connected to WebSocket Server");
//             newSocket.emit("registerClient", clientId);
//         });

//         newSocket.on("requestStatus", (data) => {
//             console.log("Request Status:", data.message);
//             setMessage(data.message);
//         });

//         newSocket.on("disconnect", () => {
//             console.log("Disconnected from WebSocket Server");
//         });

//         newSocket.on("connect_error", (error) => {
//             console.error("Connection Error:", error);
//             setMessage("Failed to connect to WebSocket. Retrying...");
//         });

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         if (!driverLocation || typeof driverLocation.latitude !== "number" || typeof driverLocation.longitude !== "number") {
//             console.warn("Skipping map update due to invalid location data.");
//             return;
//         }

//         const { latitude, longitude } = driverLocation;
//         console.log("Updated Latitude:", latitude, "Updated Longitude:", longitude);

//         if (!mapRef.current) {
//             mapRef.current = L.map("client-map").setView([latitude, longitude], 10);
//             L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                 attribution: "© OpenStreetMap contributors",
//             }).addTo(mapRef.current);
//         }

//         const customIcon = L.icon({
//             iconUrl: markerIcon,
//             shadowUrl: markerShadow,
//             iconSize: [25, 41],
//             iconAnchor: [12, 41],
//         });

//         if (!markerRef.current) {
//             markerRef.current = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapRef.current);
//         } else {
//             markerRef.current.setLatLng([latitude, longitude]);
//         }

//         mapRef.current.setView([latitude, longitude], 14);
//     }, [driverLocation]);

//     const requestLocation = () => {
//         if (!socket) {
//             console.error("WebSocket is not initialized. Try again.");
//             setMessage("WebSocket is not initialized. Please wait...");
//             return;
//         }

//         if (socket.connected) {
//             socket.emit("requestLocation", { adminId, clientId });
//         } else {
//             console.error("WebSocket is closed. Reconnecting...");
//             setMessage("WebSocket is not ready. Please refresh the page.");
//         }
//     };

//     return (
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h2>Client App</h2>
//             <button onClick={requestLocation} style={{ marginBottom: "10px" }}>Request Location</button>
//             {message && <p>{message}</p>}
//             <div id="client-map" style={{ height: "60vh", width: "100%" }} />
//         </div>
//     );
// };

// export default ClientLocation;





import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const ClientLocation = ({ userEmail }) => {
    const [driverLocation, setDriverLocation] = useState(null);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    
    const ws = useRef(null);
    const clientId = "client-456";
    const adminId = "admin-123";

    useEffect(() => {
        // WebSocket for receiving location updates
        const socketInstance = io("https://location-backend-production.up.railway.app/");
        socketInstance.on("client-receive-location", (location) => {
            console.log("Received Driver Location in Client App:", location);
            if (location && typeof location.latitude === "number" && typeof location.longitude === "number") {
                setDriverLocation(location);
            } else {
                console.warn("Invalid location received:", location);
            }
        });
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        const newSocket = io("https://admin-backend-production-4ca3.up.railway.app/client", {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 3000
        });
    
        newSocket.on("connect", () => {
            console.log("Connected to WebSocket Server");
            newSocket.emit("registerClient", userEmail); // Register using email
        });
    
        newSocket.on("requestStatus", (data) => {
            console.log("Request Status:", data.message);
            setMessage(data.message);
        });
    
        setSocket(newSocket);
    
        return () => {
            newSocket.disconnect();
        };
    }, []);
    
    const requestLocation = () => {
        if (!socket) {
            console.error("WebSocket is not initialized. Try again.");
            setMessage("WebSocket is not initialized. Please wait...");
            return;
        }
    
        if (socket.connected) {
            socket.emit("requestLocation", { 
                adminId, 
                clientEmail: userEmail  // Send email instead of clientId
            });
        } else {
            console.error("WebSocket is closed. Reconnecting...");
            setMessage("WebSocket is not ready. Please refresh the page.");
        }
    };
    

    useEffect(() => {
        if (!driverLocation || typeof driverLocation.latitude !== "number" || typeof driverLocation.longitude !== "number") {
            console.warn("Skipping map update due to invalid location data.");
            return;
        }

        const { latitude, longitude } = driverLocation;
        console.log("Updated Latitude:", latitude, "Updated Longitude:", longitude);

        if (!mapRef.current) {
            mapRef.current = L.map("client-map").setView([latitude, longitude], 10);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(mapRef.current);
        }

        const customIcon = L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
        });

        if (!markerRef.current) {
            markerRef.current = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapRef.current);
        } else {
            markerRef.current.setLatLng([latitude, longitude]);
        }

        mapRef.current.setView([latitude, longitude], 14);
    }, [driverLocation]);
    
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Client Location</h2>
            <p>Logged in as: {userEmail}</p>
            <button onClick={requestLocation} style={{ marginBottom: "10px" }}>Request Location</button>
            {message && <p>{message}</p>}
            <div id="client-map" style={{ height: "60vh", width: "100%" }} />
        </div>
    );
};

export default ClientLocation;
