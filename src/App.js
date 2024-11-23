import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import Humberto from "./pages/Humberto";
import Aaron from "./pages/Aaron";
import Erick from "./pages/Erick";
import Agenda from "./pages/Agenda";
import Barbers from "./components/Barbers";
// import Services from "./components/Services";
// import Products from "./components/Products";
import Schedule from "./components/Schedule";
import Location from "./components/Location";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<UserPage />}/>
          <Route path="/humberto" element={<Humberto />}/>
          <Route path="/aaron" element={<Aaron />}/>
          <Route path="/erick" element={<Erick />}/>
          <Route path="/barberos" element={<Barbers />} />
          {/* <Route path="/servicios" element={<Services />} /> */}
          {/* <Route path="/productos" element={<Products />} /> */}
          <Route path="/horario" element={<Schedule />} />
          <Route path="/ubicacion" element={<Location />} />
          <Route path="/agenda" element={<Agenda />} />
        </Routes>
    </Router>
  );
}

export default App;
