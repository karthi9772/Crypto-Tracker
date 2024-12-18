import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";

const App = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-cyan-500 to-blue-500 max-w-screen overflow-hidden">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin></Coin>} />
      </Routes>
    </div>
  );
};

export default App;
