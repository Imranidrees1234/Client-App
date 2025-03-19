// import Navbar from "./Navbar";
import CLient from "./Client";
import ClientLocation from "./ClientLocation";
import ImageRequest from "./ImageRequest";
import VideoRequest from "./VideoRequest";
import Login from "./Login";
import Signup from "./Signup";
import { Routes, Route } from "react-router-dom";

const Home = () => {
    return (
        <Routes>
        {/* <Route path="/Navbar" element={<Navbar/>}/> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/client" element={<CLient />} />
        <Route path="/clientlocation" element={<ClientLocation />} />
        <Route path="/imagerequest" element={<ImageRequest />} />
        <Route path="/videorequest" element={<VideoRequest />} />
      </Routes>
    );
};

export default Home;
