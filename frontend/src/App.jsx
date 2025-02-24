import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Routes/signup";
import Page from "./Routes/page";
import Admin from "./Routes/admin";
import Home from "./Routes/home";
import Profiles from "./Routes/profiles";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/page" element={<Page />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profiles />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
