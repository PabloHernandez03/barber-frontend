import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      setAppointments(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Citas Agendadas</h2>
      {appointments.length === 0 ? (
        <p>No hay citas agendadas.</p>
      ) : (
        <div>
          {appointments.map((appointment, index) => (
            <div key={index} className="mb-3">
              <p><strong>Día:</strong> {appointment.day}</p>
              <p><strong>Hora:</strong> {appointment.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
