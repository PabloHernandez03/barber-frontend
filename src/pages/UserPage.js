import React from "react";
// import UserBooking from "../components/UserBooking.js";
import ServicesPage from "../components/ServicesPage.js";
import HeadlinePage from "../components/HeadlinePage.js";
import AboutUs from "../components/AboutUs.js";

function UserPage() {
  return (
    <div>
      <HeadlinePage />
      <ServicesPage />
      {/* <UserBooking /> */}
      <AboutUs />
    </div>
  );
}

export default UserPage;
