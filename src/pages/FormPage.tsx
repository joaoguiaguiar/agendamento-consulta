import { useState, type ChangeEvent } from 'react';
import { Calendar, User, Mail, Stethoscope, Plus, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  specialty: string;
  date: string;
}

interface FormPageProps {
  onSubmit: (appointment: Appointment) => void;
  onBack: () => void;
}

interface FormState {
  name: string;
  email: string;
  specialty: string;
  date: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  specialty?: string;
  date?: string;
}

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const FormPage = ({ onSubmit, onBack }: FormPageProps) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    specialty: '',
    date: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const specialties = [
    { value: 'Clínico Geral', label: 'Clínico Geral', icon: '🩺' },
    { value: 'Cardiologia', label: 'Cardiologia', icon: '❤️' },
    { value: 'Dermatologia', label: 'Dermatologia', icon: '🧴' },
    { value: 'Pediatria', label: 'Pediatria', icon: '👶' },
    { value: 'Ortopedia', label: 'Ortopedia', icon: '🦴' }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!form.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!form.specialty) newErrors.specialty = 'Especialidade é obrigatória';
    if (!form.date) newErrors.date = 'Data é obrigatória';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ ...form, id: generateId() });
      setForm({ name: '', email: '', specialty: '', date: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Agende sua Consulta</h1>
          <p className="text-gray-600">Preencha os dados abaixo para agendar sua consulta médica</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/50">
          <div className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-400'
                }`}
                placeholder="Digite seu nome completo"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-400'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Especialidade */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Stethoscope className="w-4 h-4 mr-2 text-indigo-500" />
                Especialidade
              </label>
              <select
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  errors.specialty ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-400'
                }`}
              >
                <option value="">Selecione uma especialidade</option>
                {specialties.map(spec => (
                  <option key={spec.value} value={spec.value}>
                    {spec.icon} {spec.label}
                  </option>
                ))}
              </select>
              {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
            </div>

            {/* Data */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                Data da Consulta
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-400'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;