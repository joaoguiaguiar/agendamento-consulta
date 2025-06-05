import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { FormPage } from "./pages/FormPage";

type Appointment = {
  id: string;
  name: string;
  email: string;
  specialty: string;
  date: string;
};

export default function ModernAppointmentSystem() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'form'>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      specialty: 'Cardiologia',
      date: '2025-06-10'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      specialty: 'Dermatologia',
      date: '2025-06-15'
    }
  ]);

  const handleSubmit = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    setCurrentView('dashboard');
  };

  const handleEdit = (updatedAppointment: Appointment) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === updatedAppointment.id ? updatedAppointment : apt)
    );
  };

  const handleDelete = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  if (currentView === 'form') {
    return (
      <FormPage
        onSubmit={handleSubmit}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <Dashboard
      appointments={appointments}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onNewAppointment={() => setCurrentView('form')}
    />
  );
}
