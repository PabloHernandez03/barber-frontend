import React from "react";
import HeadlinePage from "../components/HeadlinePage";
import Barbers from "../components/Barbers";
import Services from "../components/Services";
import Schedule from "../components/Schedule";
import Location from "../components/Location";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";

function UserPage() {
  return (
    <div>
      <section id="home">
        <HeadlinePage />
      </section>
      <section id="barberos">
        <Barbers />
      </section>
      <section id="servicios">
        <Services />
      </section>
      <section id="horario">
        <Schedule />
      </section>
      <section id="ubicacion">
        <Location />
      </section>
      <section id="agenda">
        <Contact />
      </section>
      <AboutUs />
    </div>
  );
}

export default UserPage;
