import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "./homepage.css";

function Home() {
  useEffect(() => {
    // Check if the refresh flag is set
    if (localStorage.getItem("refreshPage") === "true") {
      // Refresh the page
      localStorage.removeItem("refreshPage"); // Clear the flag
      window.location.reload();
    }
  }, []);

  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className="homepage-container"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/466506979/photo/indian-passenger-train.jpg?s=612x612&w=0&k=20&c=AKcMyvqsam93AnADQaK4hzAMI9bdWOVd8tKoF5Sf10M=')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <header className="homepage-header">
        <h1>Welcome, {loggedInUser}</h1>
        {/* <button onClick={handleLogout} className="logout-button">
          Logout
        </button> */}
      </header>

      {/* Grid of Indian Railways services */}
      <div className="services-grid">
        <ul className="impLinks">
          <li>
            <a
              href="https://www.irctc.co.in/nget/"
              title="Ticket Booking"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-1.png"
                  width="61"
                  height="61"
                  alt="Ticket Booking"
                />
              </span>
              <span className="titleText ticketBooking">
                <br></br>
                Ticket Booking
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://enquiry.indianrail.gov.in/"
              title="Train Enquiry"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png"
                  width="61"
                  height="61"
                  alt="Train Enquiry"
                />
              </span>
              <span className="titleText trainEnquiry">
                <br></br>
                Train Enquiry
              </span>
            </a>
          </li>
          <li>
            <a
              href="http://www.indianrail.gov.in/"
              title="Reservation Enquiry"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-3.png"
                  width="61"
                  height="61"
                  alt="Reservation Enquiry"
                />
              </span>
              <span className="titleText reservationEnquiry">
              <br></br>
                Reservation Enquiry
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://rr.irctc.co.in/#/home"
              title="Retiring Room Booking"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-4.png"
                  width="61"
                  height="61"
                  alt="Retiring Room Booking"
                />
              </span>
              <span className="titleText retiringRoomBooking">
              <br></br>
                Retiring Room Booking
              </span>
            </a>
          </li>
          <li>
            <a
              href="http://www.indianrailways.gov.in/"
              title="Indian Railways"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-5.png"
                  width="61"
                  height="61"
                  alt="Indian Railways"
                />
              </span>
              <span className="titleText indianRailways">
              <br></br>
                Indian Railways
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=com.cris.utsmobile&hl=en_IN"
              title="UTS Ticketing"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
                  width="61"
                  height="61"
                  alt="UTS Ticketing"
                />
              </span>
              <span className="titleText utsTicketing">
              <br></br>
                UTS Ticketing
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp"
              title="Freight Business"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
                  width="61"
                  height="61"
                  alt="Freight Business"
                />
              </span>
              <span className="titleText freightBusiness">
              <br></br>
                Freight Business
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://parcel.indianrail.gov.in/"
              title="Railway Parcel Website"
              target="_blank"
            >
              <span className="icon">
                <img
                  src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png"
                  width="61"
                  height="61"
                  alt="Railway Parcel Website"
                />
              </span>
              <span className="titleText parcelWebsite">
              <br></br>
                Railway Parcel Website
              </span>
            </a>
          </li>
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;    