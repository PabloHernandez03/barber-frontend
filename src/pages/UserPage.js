import React from "react";
import UserBooking from "../components/UserBooking";
import HeadlinePage from "../components/HeadlinePage.js";
import AboutUs from "../components/AboutUs.js";

function UserPage() {
  return (
    <div>
      <HeadlinePage />
      <UserBooking />
      <AboutUs />
    </div>
  );
}

export default UserPage;
