import { Calendar, Clock, Plus, User } from "lucide-react";
import AppointmentCard from "../components/AppointmentCard";

interface Appointment {
  id: string;
  name: string;
  email: string;
  specialty: string;
  date: string;
}

interface DashboardProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onNewAppointment: () => void;
}

function Dashboard({ appointments, onEdit, onDelete, onNewAppointment }: DashboardProps) {
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date());
  const pastAppointments = appointments.filter(apt => new Date(apt.date) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Minhas Consultas</h1>
          <p className="text-gray-600">Gerencie seus agendamentos médicos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Consultas</p>
                <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Próximas</p>
                <p className="text-3xl font-bold text-green-600">{upcomingAppointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Realizadas</p>
                <p className="text-3xl font-bold text-gray-500">{pastAppointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* New Appointment Button */}
        <div className="text-center mb-8">
          <button
            onClick={onNewAppointment}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Consulta
          </button>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Nenhuma consulta agendada</h3>
            <p className="text-gray-500 mb-6">Comece agendando sua primeira consulta médica</p>
            <button
              onClick={onNewAppointment}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agendar Primeira Consulta
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {upcomingAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-500" />
                  Próximas Consultas
                </h2>
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onEdit={onEdit}
                      onDelete={() => onDelete(appointment.id)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-gray-500" />
                  Consultas Realizadas
                </h2>
                <div className="space-y-4 opacity-75">
                  {pastAppointments.map(appointment => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onEdit={onEdit}
                      onDelete={() => onDelete(appointment.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;