import React from "react"; // ✅ Add this line
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <h1>CLient App</h1>
    <Navbar/>
    <Home/>
    </>
  );
};

export default App;
