import React from "react";
import ScrollToTop from "../components/ScrollToTop";

const Schedule = () => {
  const scheduleData = [
    { day: "Lunes", hours: "10:00 AM - 7:30 PM" },
    { day: "Martes", hours: "10:00 AM - 7:30 PM" },
    { day: "Miércoles", hours: "10:00 AM - 7:30 PM" },
    { day: "Jueves", hours: "10:00 AM - 7:30 PM" },
    { day: "Viernes", hours: "10:00 AM - 7:30 PM" },
    { day: "Sábado", hours: "10:00 AM - 7:30 PM" },
    { day: "Domingo", hours: "11:00 AM - 3:30 PM" },
  ];

  return (
    <div className="container-fluid bg-dark py-1">
        <ScrollToTop />
        <div className="container my-3">
            <h1 className="mb-4 text-warning text-center">Horario de Atención</h1>
            <div className="row">
                {scheduleData.map((item, index) => (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                    <div className="card bg-dark text-light shadow h-100">
                      <div className="card-body text-center">
                          <h5 className="card-title text-warning">{item.day}</h5>
                          <p className="card-text">{item.hours}</p>
                      </div>
                    </div>
                </div>
                ))}
            </div>
          </div>
    </div>
  );
};

export default Schedule;
