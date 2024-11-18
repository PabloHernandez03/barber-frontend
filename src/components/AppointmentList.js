import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  // Función para convertir la hora a formato de 24 horas (en minutos)
  const convertTo24Hour = (time) => {
    let [hours, minutes] = time.split(':');
    minutes = minutes.replace(' a.m.', '').replace(' p.m.', '');
    let period = time.includes('a.m.') ? 'AM' : 'PM';

    if (period === 'PM' && hours !== '12') {
      hours = (parseInt(hours) + 12).toString();
    } else if (period === 'AM' && hours === '12') {
      hours = '00';
    }

    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const generateTimeSlots = () => {
    const slots = [];
    slots.push(`11:00 a.m.`);
    slots.push(`11:30 a.m.`);
    slots.push(`12:30 p.m.`);
    slots.push(`12:30 p.m.`);
    for (let h = 1; h <= 7; h++) {
      slots.push(`0${h}:00 p.m.`);
      slots.push(`0${h}:30 p.m.`);
    }
    return slots;
  };

  const fullSchedule = generateTimeSlots();

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      setAppointments(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      if (!selectedBarber || !selectedDay) return;

      // Formateamos la fecha seleccionada al formato yyyy-MM-dd
      const formattedSelectedDay = formatDate(selectedDay);

      const filteredAppointments = appointments.filter(
        (appointment) =>
          appointment.barber === selectedBarber &&
          appointment.day === formattedSelectedDay
      );

      const takenSlots = filteredAppointments.map((appointment) => appointment.time);
      const available = fullSchedule.filter((slot) => !takenSlots.includes(slot));
      setAvailableSlots(available);
    };

    handleFilter();
  }, [selectedBarber, selectedDay, appointments]);

  return (
    <div className="container-fluid bg-dark text-white py-3">
      <div className="container mt-3">
        <h2 className="text-warning">Citas y Horarios</h2>

        {/* Selección de barbero */}
        <div className="mb-2">
          <label htmlFor="barberSelect" className="form-label">Barbero:</label>
          <select
            id="barberSelect"
            className="form-select"
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
          >
            <option value="">Selecciona un barbero</option>
            <option value="Humberto">Humberto</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Selección de día */}
        <div className="mb-3">
          <label htmlFor="dayPicker" className="form-label py-1 d-block">Día:</label>
          <DatePicker
            selected={selectedDay}
            onChange={(date) => setSelectedDay(date)}
            dateFormat="dd/MM/yyyy"  // Muestra la fecha en formato dd/MM/yyyy
            className="form-control"
            placeholderText="Selecciona un día"
            minDate={new Date()}
          />
        </div>

        {/* Botón para aplicar filtro */}
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowAvailableSlots(!showAvailableSlots)}
          disabled={!selectedBarber || !selectedDay}
        >
          {showAvailableSlots ? "Ocultar Horarios Disponibles" : "Mostrar Horarios Disponibles"}
        </button>

        {/* Mostrar citas agendadas */}
        {selectedBarber && selectedDay && (
          <>
            <h3 className="text-warning">Citas Agendadas</h3>
            {appointments.filter(
              (appointment) =>
                appointment.barber === selectedBarber &&
                appointment.day === formatDate(selectedDay)
            ).length === 0 ? (
              <p>No hay citas agendadas para este día y barbero.</p>
            ) : (
              <div className="row">
                {appointments
                  .filter(
                    (appointment) =>
                      appointment.barber === selectedBarber &&
                      appointment.day === formatDate(selectedDay)
                  )
                  .sort((a, b) => {
                    const timeA = convertTo24Hour(a.time);
                    const timeB = convertTo24Hour(b.time);
                    return timeA - timeB;
                  })
                  .map((appointment, index) => (
                    <div key={index} className="col-md-4 col-6 mb-3">
                      <div className="bg-light text-dark p-3 rounded">
                        <p><strong>Día:</strong> {appointment.time}</p>
                        <p><strong>Hora:</strong> {appointment.time}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* Mostrar horarios disponibles */}
        {showAvailableSlots && (
          <div className="mt-4">
            <h3 className="text-warning">Horarios Disponibles</h3>
            {availableSlots.length === 0 ? (
              <p>No hay horarios disponibles.</p>
            ) : (
              <div className="row">
                {availableSlots.map((slot, index) => (
                  <div key={index} className="col-6 mb-2">
                    <div className="bg-light text-dark p-2 rounded text-center">
                      {slot}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentList;
