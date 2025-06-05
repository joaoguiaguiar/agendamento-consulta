// components/AppointmentCard.tsx
import { Calendar, Edit3, Mail, Trash2, X, Save } from "lucide-react";
import { useState } from "react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  specialty: string;
  date: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: () => void;
}

function AppointmentCard({ appointment, onEdit, onDelete }: AppointmentCardProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Appointment>(appointment);

  const specialties = [
    { value: 'Clínico Geral', label: 'Clínico Geral', icon: '🩺' },
    { value: 'Cardiologia', label: 'Cardiologia', icon: '❤️' },
    { value: 'Dermatologia', label: 'Dermatologia', icon: '🧴' },
    { value: 'Pediatria', label: 'Pediatria', icon: '👶' },
    { value: 'Ortopedia', label: 'Ortopedia', icon: '🦴' }
  ];

  const getSpecialtyIcon = (specialty: string) => {
    const spec = specialties.find(s => s.value === specialty);
    return spec ? spec.icon : '🩺';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(appointment);
    setEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
      {editing ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition-all"
              placeholder="Nome"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition-all"
              placeholder="Email"
            />
            <select
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition-all"
            >
              {specialties.map(spec => (
                <option key={spec.value} value={spec.value}>
                  {spec.icon} {spec.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-all duration-200"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {appointment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {appointment.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {appointment.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                <span className="text-lg">{getSpecialtyIcon(appointment.specialty)}</span>
                {appointment.specialty}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                <Calendar className="w-4 h-4" />
                {formatDate(appointment.date)}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setEditing(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Editar consulta"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Excluir consulta"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
