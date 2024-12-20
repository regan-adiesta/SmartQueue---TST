import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Header } from "./components/header";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
// import { Features } from "./components/features";
// import { About } from "./components/about";
import { Services } from "./components/services";
// import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
// import { Team } from "./components/Team";
import Queue from "./components/queue";
import Profile from "./components/profile";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";
import "./App.css";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Contact data={landingPageData.Contact} />
          </div>
        }
      />
      {/* Route for Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/queue" element={<Queue />}/>
    </Routes>
  );
};

export default App;
