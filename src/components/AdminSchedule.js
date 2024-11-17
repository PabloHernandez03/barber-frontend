import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function AdminSchedule() {
  const [day, setDay] = useState("Lunes"); // Día seleccionado por defecto
  const [excludedSlots, setExcludedSlots] = useState([]); // Horarios excluidos

  // Genera los horarios disponibles con intervalos de 30 minutos
  const generateTimeSlots = (start, end) => {
    const slots = [];
    let current = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);

    while (current <= endDate) {
      slots.push(current.toTimeString().slice(0, 5)); // Formato HH:MM
      current = new Date(current.getTime() + 30 * 60 * 1000); // Agrega 30 minutos
    }
    return slots;
  };

  const handleAddExclusion = async () => {
    try {
      const data = {
        day,
        excludedSlots,
      };
      await addDoc(collection(db, "excludedDaysAndSlots"), data);
      alert("Días/horarios excluidos añadidos con éxito");
      setExcludedSlots([]); // Limpia la selección después de guardar
    } catch (error) {
      console.error("Error al guardar los horarios excluidos:", error);
    }
  };

  const availableSlots = generateTimeSlots("11:00", "20:00");

  return (
    <div className="container mt-4">
      <h2>Configurar Días y Horarios Excluidos</h2>

      <div className="mb-3">
        <label htmlFor="day" className="form-label">Día:</label>
        <select
          id="day"
          className="form-select"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
      </div>

      <div className="mb-3">
        <h3>Excluye horarios</h3>
        {availableSlots.map((slot) => (
          <div key={slot} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value={slot}
              onChange={(e) => {
                if (e.target.checked) {
                  setExcludedSlots([...excludedSlots, e.target.value]);
                } else {
                  setExcludedSlots(excludedSlots.filter((s) => s !== e.target.value));
                }
              }}
            />
            <label className="form-check-label">{slot}</label>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleAddExclusion}>
        Guardar Exclusiones
      </button>
    </div>
  );
}

export default AdminSchedule;
