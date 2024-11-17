import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function UserBooking() {
  const [excludedData, setExcludedData] = useState([]); // Datos de días y horarios excluidos
  const [allSlots, setAllSlots] = useState([]); // Todos los horarios posibles
  const [selectedDay, setSelectedDay] = useState(""); // Día seleccionado
  const [filteredSlots, setFilteredSlots] = useState([]); // Horarios disponibles
  const [selectedSlot, setSelectedSlot] = useState(null); // Horario elegido

  // Generar horarios posibles (11:00 a 20:00 con intervalos de 30 minutos)
  useEffect(() => {
    const generateAllSlots = () => {
      const hours = [];
      for (let h = 11; h <= 20; h++) {
        hours.push(`${h}:00`);
        if (h !== 20) hours.push(`${h}:30`);
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
      if (selectedSlot) {
        const appointment = { day: selectedDay, time: selectedSlot };
        await addDoc(collection(db, "appointments"), appointment);
        alert("Cita agendada con éxito");
        setSelectedSlot(null);
      } else {
        alert("Por favor, selecciona un horario.");
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agendar una Cita</h2>

      <div className="mb-3">
        <label htmlFor="day" className="form-label">Día:</label>
        <select
          id="day"
          className="form-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Selecciona un día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
      </div>

      {selectedDay && (
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
      )}

      <button
        className="btn btn-primary"
        onClick={handleBooking}
        disabled={!selectedSlot}
      >
        Agendar
      </button>
    </div>
  );
}

export default UserBooking;
