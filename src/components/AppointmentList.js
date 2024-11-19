import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [allSlotsSelected, setAllSlotsSelected] = useState(false);
  const [excludedSlots, setExcludedSlots] = useState([]);
  const [excludedDates, setExcludedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const handleDateChange = (date) => {
    setSelectedDay(date); // Guarda la fecha como instancia de Date.
  };

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
    slots.push(`12:00 p.m.`);
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
    const fetchExcludedDates = async() => {
      const querySnapshot = await getDocs(collection(db, "excludedDaysAndSlots"));
      setExcludedDates(querySnapshot.docs.map((doc) => doc.data()));
    }
    fetchAppointments();
    fetchExcludedDates();
    console.log(excludedDates)
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      if (!selectedBarber || !selectedDay) return;
  
      const formattedSelectedDay = formatDate(selectedDay);
  
      // Filtrar citas existentes
      const filteredAppointments = appointments.filter(
        (appointment) =>
          appointment.barber === selectedBarber &&
          appointment.day === formattedSelectedDay
      );
      const takenSlots = filteredAppointments.map((appointment) => appointment.time);
  
      // Filtrar horarios excluidos
      const filteredExclusions = excludedDates.filter(
        (exclusion) =>
          exclusion.barber === selectedBarber &&
          exclusion.day === formattedSelectedDay
      );
  
      const excludedSlots = filteredExclusions.flatMap((exclusion) => exclusion.slots);

      const unavailableSlots = new Set([...takenSlots, ...excludedSlots]);

      const available = fullSchedule.filter((slot) => !unavailableSlots.has(slot));
      const availableDate = fullSchedule.filter((slot) => !takenSlots.includes(slot));
      setAvailableSlots(available);
      setAvailableDates(availableDate);
    };
  
    handleFilter();
  }, [selectedBarber, selectedDay, appointments, excludedDates]);

  useEffect(() => {
    const fetchExcludedSlots = async () => {
      if (!selectedBarber || !selectedDay) return;

      const formattedDay = formatDate(selectedDay);

      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "excludedDaysAndSlots"),
            where("barber", "==", selectedBarber),
            where("day", "==", formattedDay)
          )
        );

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setExcludedSlots(docData.slots || []);
        } else {
          setExcludedSlots([]);
        }
      } catch (error) {
        console.error("Error al obtener los horarios excluidos:", error);
      }
    };

    fetchExcludedSlots();
  }, [selectedBarber, selectedDay]);
  

  const handleAddExclusion = async () => {
    try {
      const formattedDay = formatDate(selectedDay); // Formatea el día
      const data = {
        barber: selectedBarber,
        day: formattedDay,
        slots: excludedSlots,
      };
  
      // Consulta para verificar si ya existe un documento con el mismo barbero y día
      const querySnapshot = await getDocs(
        query(
          collection(db, "excludedDaysAndSlots"),
          where("barber", "==", selectedBarber),
          where("day", "==", formattedDay)
        )
      );
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();

        const updatedSlots = Array.from(new Set([...existingData.slots, ...excludedSlots]));
  
        await updateDoc(docRef, { slots: updatedSlots });
        alert("Días/horarios excluidos actualizados con éxito");
      } else {
        await addDoc(collection(db, "excludedDaysAndSlots"), data);
        alert("Días/horarios excluidos añadidos con éxito");
      }
    } catch (error) {
      console.error("Error al gestionar los horarios excluidos:", error);
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
            <option value="Aaron">Aaron</option>
            <option value="Erick">Erick</option>
          </select>
        </div>

        {/* Selección de día */}
        <div className="mb-3">
          <label htmlFor="dayPicker" className="form-label py-1 d-block">Día:</label>
            <DatePicker
              selected={selectedDay}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
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
                        <p><strong>Día:</strong> {appointment.day}</p>
                        <p><strong>Hora:</strong> {appointment.time}</p>
                        <p><strong>Cliente:</strong> {appointment.name}</p>
                        <p><strong>Teléfono:</strong> {appointment.phone}</p>
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

      {/* Selección de Exclusiones */}
      {(selectedDay && selectedBarber) && (
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
            {availableDates.map((slot) => (
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
                      setAllSlotsSelected(false);
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

export default AppointmentList;
