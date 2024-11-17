import React from "react";
import AdminSchedule from "../components/AdminSchedule";
import AppointmentList from "../components/AppointmentList";

function AdminPage() {
  return (
    <div>
      <AdminSchedule />
      <AppointmentList />
    </div>
  );
}

export default AdminPage;
