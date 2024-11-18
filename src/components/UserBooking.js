import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserBooking() {
  const [excludedData, setExcludedData] = useState([]); // Datos de días y horarios excluidos
  const [allSlots, setAllSlots] = useState([]); // Todos los horarios posibles
  const [selectedDay, setSelectedDay] = useState(null); // Día seleccionado
  const [filteredSlots, setFilteredSlots] = useState([]); // Horarios disponibles
  const [selectedSlot, setSelectedSlot] = useState(null); // Horario elegido
  const [selectedBarber, setSelectedBarber] = useState(""); // Barbero seleccionado
  const [nombre, setNombre] = useState(""); // Nombre del usuario
  const [telefono, setTelefono] = useState(""); // Teléfono del usuario

  // Función para formatear la fecha como dd/MM/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDay(formattedDate);
  };

  useEffect(() => {
    const generateAllSlots = () => {
      const hours = [];
      hours.push(`11:00 a.m.`);
      hours.push(`11:30 a.m.`);
      hours.push(`12:30 p.m.`);
      hours.push(`12:30 p.m.`);
      for (let h = 1; h <= 7; h++) {
        hours.push(`0${h}:00 p.m.`);
        hours.push(`0${h}:30 p.m.`);
      }
      setAllSlots(hours);
    };
    generateAllSlots();
  }, []);

  // Obtener horarios excluidos de Firebase
  useEffect(() => {
    const fetchExcludedData = async () => {
      const excludedSnapshot = await getDocs(collection(db, "excludedDaysAndSlots"));
      const exclusions = excludedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExcludedData(exclusions);
    };
    fetchExcludedData();
  }, []);

  // Filtrar horarios disponibles según el día seleccionado
  useEffect(() => {
    if (selectedDay) {
      const exclusionsForDay = excludedData.find((data) => data.day === selectedDay);
      const excludedSlots = exclusionsForDay ? exclusionsForDay.excludedSlots : [];
      const availableSlots = allSlots.filter((time) => !excludedSlots.includes(time));
      setFilteredSlots(availableSlots);
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDay, excludedData, allSlots]);

  // Manejar la reserva
  const handleBooking = async () => {
    try {
      if (selectedSlot && selectedBarber && nombre && telefono) {
        const appointment = {
          day: selectedDay, // La fecha se guarda en el formato dd/MM/yyyy
          time: selectedSlot,
          barber: selectedBarber,
          name: nombre,
          phone: telefono,
        };
        await addDoc(collection(db, "appointments"), appointment);
        alert("Cita agendada con éxito");
        setSelectedSlot(null);
        setSelectedBarber("");
      } else {
        alert("Por favor, llena el formulario.");
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  return (
    <div className="container-flui bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center text-warning">Agenda una cita</h2>

        {/* Selección de día */}
        <div className="mb-3">
          <label htmlFor="day" className="py-1 d-block form-date">Día:</label>
          <DatePicker
            selected={selectedDay ? new Date(selectedDay.split('/').reverse().join('/')) : null} // Convertir el formato dd/MM/yyyy a Date
            onChange={handleDateChange}
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
            <option value="Humberto">Humberto</option>
            <option value="Barbero 2">Barbero 2</option>
          </select>
        </div>

        {/* Selección de horario */}
        {(selectedDay && selectedBarber) && (
          <div>
            <div className="mb-3">
              <label htmlFor="slot" className="form-label">Horario:</label>
              <select
                id="slot"
                className="form-select"
                onChange={(e) => setSelectedSlot(e.target.value)}
                value={selectedSlot || ""}
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
                required
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
                required
              />
            </div>
          </div>
        )}

        {/* Botón para agendar la cita */}
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
