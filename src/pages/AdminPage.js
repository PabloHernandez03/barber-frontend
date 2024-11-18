import React, { useState } from "react";
import AppointmentList from "../components/AppointmentList";
import GuessNumberGame from "../components/GuessNumberGame";

function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const correctPassword = "Humberto";

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      setError(true);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="card p-4 shadow-sm bg-dark text-white">
          <h3 className="text-center mb-4 text-warning">Acceso de Administrador</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Ingresa la contraseña"
              />
            </div>
            {error && <p className="text-danger">Contraseña incorrecta</p>}
            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppointmentList />
      <GuessNumberGame />
    </div>
  );
}

export default AdminPage;
