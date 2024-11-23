import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar axios para realizar las peticiones HTTP
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserBooking() {
  const [appointments, setAppointments] = useState([]);
  const [excludedData, setExcludedData] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [barbers, setBarbers] = useState([]); // Estado para almacenar los barberos

  // Formatear fecha a DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generar horarios disponibles
  useEffect(() => {
    const generateAllSlots = () => {
      const hours = [];
      hours.push("11:00 a.m.", "11:30 a.m.", "12:00 p.m.", "12:30 p.m.");
      for (let h = 1; h <= 7; h++) {
        hours.push(`0${h}:00 p.m.`, `0${h}:30 p.m.`);
      }
      setAllSlots(hours);
    };
    generateAllSlots();
  }, []);

  // Obtener barberos desde la API
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/barberos");
        console.log(response.data);
        setBarbers(response.data); // Asumimos que la respuesta contiene una lista de barberos
      } catch (error) {
        console.error("Error al obtener los barberos:", error);
      }
    };
    fetchBarbers();
  }, []);

  // Obtener citas y horarios excluidos desde la API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/citas");
        setAppointments(response.data); // Asumimos que la respuesta contiene las citas
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    const fetchExcludedData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/excludedDaysAndSlots");
        setExcludedData(response.data); // Asumimos que la respuesta contiene los días y horarios excluidos
      } catch (error) {
        console.error("Error al obtener los días y horarios excluidos:", error);
      }
    };

    fetchAppointments();
    fetchExcludedData();
  }, []);

  // Filtrar horarios disponibles
  useEffect(() => {
    if (!selectedBarber || !selectedDay) {
      setFilteredSlots([]);
      return;
    }
    const formattedDay = formatDate(selectedDay); // Formatear fecha a DD/MM/YYYY
    // Filtrar citas y horarios excluidos del barbero
    const takenSlots = appointments
      .filter((appointment) => appointment.barber === selectedBarber && appointment.day === formattedDay)
      .map((appointment) => appointment.time);
    const excludedSlots = excludedData
      .filter((excluded) => excluded.barber === selectedBarber && excluded.day === formattedDay)
      .flatMap((excluded) => excluded.slots);
    // Filtrar horarios disponibles
    const availableSlots = allSlots.filter(
      (slot) => !takenSlots.includes(slot) && !excludedSlots.includes(slot)
    );
    setFilteredSlots(availableSlots);
  }, [selectedDay, selectedBarber, appointments, excludedData, allSlots]);

  // Manejar reserva de cita
  const handleBooking = async () => {
    try {
      if (selectedSlot && selectedBarber && nombre && telefono) {
        const formattedDay = formatDate(selectedDay); // Formatear fecha a DD/MM/YYYY
        const appointment = {
          day: formattedDay,
          time: selectedSlot,
          barber: selectedBarber,
          name: nombre,
          phone: telefono,
        };
        // Enviar la cita a la API
        await axios.post("http://localhost:5000/api/citas", appointment);
        alert("Cita agendada con éxito");
        setSelectedSlot(null);
        setSelectedBarber("");
        setNombre("");
        setTelefono("");
      } else {
        alert("Por favor, llena el formulario.");
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center text-warning">Agenda una cita</h2>
        {/* Selección de día */}
        <div className="mb-3">
          <label htmlFor="day" className="py-1 d-block form-label">
            Día:
          </label>
          <DatePicker
            selected={selectedDay}
            onChange={(date) => setSelectedDay(date)} // Almacenar fecha como Date
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Selecciona un día"
            minDate={new Date()}
          />
        </div>
        {/* Selección de barbero */}
        <div className="mb-3">
          <label htmlFor="barber" className="form-label">Selecciona un Barbero:</label>
          <select
            id="barber"
            className="form-select"
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
          >
            <option value="">Selecciona un barbero</option>
            {barbers.map((barber) => (
              <option key={barber._id} value={barber._id}>
                {barber.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Selección de horario */}
        {selectedDay && selectedBarber && (
          <div>
            <div className="mb-3">
              <label htmlFor="slot" className="form-label">Horario:</label>
              <select
                id="slot"
                className="form-select"
                value={selectedSlot || ""}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Selecciona un horario</option>
                {filteredSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre o Apodo:</label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Introduce tu nombre o apodo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                className="form-control"
                placeholder="Introduce tu teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
        )}
        {/* Botón para agendar */}
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary w-25"
            onClick={handleBooking}
            disabled={!selectedSlot || !selectedBarber || !nombre || !telefono}
          >
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserBooking;
