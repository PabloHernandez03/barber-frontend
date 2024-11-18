import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function AdminSchedule() {
  const [day, setDay] = useState(null); // Día seleccionado por defecto
  const [excludedSlots, setExcludedSlots] = useState([]); // Horarios excluidos
  const [selectedBarber, setSelectedBarber] = useState("");
  const [allSlotsSelected, setAllSlotsSelected] = useState(false); // Nuevo estado

  // Genera los horarios disponibles con intervalos de 30 minutos
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

  const handleAddExclusion = async () => {
    try {
      const data = {
        day,
        excludedSlots,
      };
      await addDoc(collection(db, "excludedDaysAndSlots"), data);
      alert("Días/horarios excluidos añadidos con éxito");
      setExcludedSlots([]); // Limpia la selección después de guardar
      setAllSlotsSelected(false); // Reinicia la selección de "todos"
    } catch (error) {
      console.error("Error al guardar los horarios excluidos:", error);
    }
  };

  const handleSelectAll = (e) => {
    const slots = generateTimeSlots();
    if (e.target.checked) {
      setExcludedSlots(slots);
      setAllSlotsSelected(true);
    } else {
      setExcludedSlots([]);
      setAllSlotsSelected(false);
    }
  };

  const availableSlots = generateTimeSlots();

  return (
    <div className="container-fluid bg-dark text-white py-1">
      <div className="container mb-3">
        <h2 className="text-warning">Configurar Excepciones Días y Horarios</h2>

        {/* Selección de barbero */}
        <div className="mb-2">
          <label htmlFor="selectedBarber" className="form-label">Barbero:</label>
          <select
            id="selectedBarber"
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
        {selectedBarber && (
          <div>
            <label htmlFor="day" className="py-1 d-block form-date">Día:</label>
            <DatePicker
              selected={day}
              onChange={(date) => setDay(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Selecciona un día"
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      {/* Selección de Exclusiones */}
      {(day && selectedBarber) && (
        <div className="container mb-3">
          <h3 className="text-warning">Excluye horarios</h3>
          {/* Checkbox para seleccionar todos */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="selectAllSlots"
              checked={allSlotsSelected}
              onChange={handleSelectAll}
            />
            <label htmlFor="selectAllSlots" className="form-check-label">
              Seleccionar todos los horarios
            </label>
          </div>
          <div className="slots-grid">
            {availableSlots.map((slot) => (
              <div key={slot} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={slot}
                  checked={excludedSlots.includes(slot)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setExcludedSlots([...excludedSlots, e.target.value]);
                    } else {
                      setExcludedSlots(excludedSlots.filter((s) => s !== e.target.value));
                      setAllSlotsSelected(false); // Desmarca "Seleccionar todos" si se deselecciona uno
                    }
                  }}
                />
                <label className="form-check-label">{slot}</label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleAddExclusion}>
            Guardar Exclusiones
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminSchedule;
