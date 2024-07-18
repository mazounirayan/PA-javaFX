import React, { useState } from 'react';

interface Reservation {
  id?: number;
  email: string;
  sessionId: number;
  slot: string;
  participants: number;
  status: string;
}

interface ReservationFormProps {
  reservation?: Reservation;
  onSave: (reservation: Reservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ reservation, onSave }) => {
  const [formData, setFormData] = useState<Reservation>({
    email: reservation?.email || '',
    sessionId: reservation?.sessionId || 0,
    slot: reservation?.slot || '',
    participants: reservation?.participants || 0,
    status: reservation?.status || 'confirmed'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">ID de la Session</label>
        <input
          type="number"
          name="sessionId"
          value={formData.sessionId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Créneau</label>
        <input
          type="text"
          name="slot"
          value={formData.slot}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nombre de participants</label>
        <input
          type="number"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Statut</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded">
        Sauvegarder
      </button>
    </form>
  );
};

export default ReservationForm;
export type { Reservation };
