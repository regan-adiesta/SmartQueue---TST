import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const Navigation = (props) => {
  const { userLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Smart Queue
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/profile" className="page-scroll">
                Profile
              </a>
            </li>
            {/* <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li> */}
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
              </li>
            <li>
              {userLoggedIn ? (
                <a onClick={handleLogout} className="page-scroll">
                  Logout
                </a>
              ) : (
                <a href="/login" className="page-scroll">
                  Login
                </a>
              )}
            </li>
            {/* <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};