// import React from "react";
// import { Link, Routes, Route } from "react-router-dom";
// import "./Dashboard.css";
// import Signup from "./Signup";
// import VideoRequest from "./VideoRequest";
// import ClientLocation from "./ClientLocation";
// import ImageRequest from "./ImageRequest";

// const Dashboard = () => {
//     return (
//         <div className="dashboard-layout">
//             <div className="dashboard-container">
//                 <aside className="sidebar">
//                     <ul>
//                         <li><Link to="/dashboard/videorequest">Video Request</Link></li>
//                         <li><Link to="/dashboard/signup">Signup</Link></li>
//                         <li><Link to="/dashboard/clientlocation">Client Location</Link></li>
//                         <li><Link to="/dashboard/imagerequest">Image Request</Link></li>
//                     </ul>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="content">
//                     <Routes>
//                         <Route path="/" element={
//                             <>
//                                 <h1>Welcome to the Client Dashboard</h1>
//                                 <p>Select an option from the sidebar to manage users and content.</p>
//                             </>
//                         } />
//                         <Route path="videorequest" element={<VideoRequest />} />
//                         <Route path="signup" element={<Signup />} />
//                         <Route path="clientlocation" element={<ClientLocation />} />
//                         <Route path="imagerequest" element={<ImageRequest />} />
//                     </Routes>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./Dashboard.css";
import Signup from "./Signup";
import VideoRequest from "./VideoRequest";
import ClientLocation from "./ClientLocation";
import ImageRequest from "./ImageRequest";

const Dashboard = () => {
    const userEmail = localStorage.getItem("userEmail"); // Retrieve the email from localStorage

    return (
        <div className="dashboard-layout">
            <div className="dashboard-container">
                <aside className="sidebar">
                    <ul>
                        <li><Link to="/dashboard/videorequest">Video Request</Link></li>
                        <li><Link to="/dashboard/signup">Signup</Link></li>
                        <li><Link to="/dashboard/clientlocation">Client Location</Link></li>
                        <li><Link to="/dashboard/imagerequest">Image Request</Link></li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <h1>Welcome to the Client Dashboard</h1>
                                <p>Select an option from the sidebar to manage users and content.</p>
                                <p>Logged in as: <strong>{userEmail}</strong></p>
                            </>
                        } />
                        <Route path="videorequest" element={<VideoRequest userEmail={userEmail} />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="clientlocation" element={<ClientLocation userEmail={userEmail} />} />
                        <Route path="imagerequest" element={<ImageRequest userEmail={userEmail} />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
