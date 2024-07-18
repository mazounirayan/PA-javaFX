import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale de votre choix si nécessaire
import SessionForm from './session';

// Assurez-vous d'avoir vos types définis
interface Theme{
    id:number
    name: string
    salle: number
    histoire: string
    photo?: string
}
const CreateSession: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);

  const [sessionForm, setSessionForm] = useState({
    themeId: 0,
    date: new Date(),
    duration: 0,
    price: 0,
    minParticipants: 0,
    availableSlots: [moment().format('HH:mm')],
    createdBy: 0
  });

  useEffect(() => {
    // Récupération des thèmes depuis l'API simulée
    fetch('http://localhost:5000/themes')
      .then(response => response.json())
      .then(data => setThemes(data))
      .catch(error => console.error('Erreur lors de la récupération des thèmes:', error));
  }, []);



  const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSessionForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSlotChange = (index: number, value: string) => {
    const slots = [...sessionForm.availableSlots];
    slots[index] = value;
    setSessionForm(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleAddSlot = () => {
    setSessionForm(prevState => ({
      ...prevState,
      availableSlots: [...prevState.availableSlots, moment().format('HH:mm')]
    }));
  };

  const handleRemoveSlot = (index: number) => {
    const slots = sessionForm.availableSlots.filter((_, i) => i !== index);
    setSessionForm(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSessionForm(prevState => ({ ...prevState, date }));
    }
  };



  const handleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionForm)
    })
      .then(response => response.json())
      .then(newSession => {
        console.log('Session créée:', newSession);
        // Réinitialiser le formulaire de session après la création
        setSessionForm({
          themeId: 0,
          date: new Date(),
          duration: 0,
          price: 0,
          minParticipants: 0,
          availableSlots: [moment().format('HH:mm')],
          createdBy: 0
        });
      })
      .catch(error => console.error('Erreur lors de la création de la session:', error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle session</h1>

 

      {/* Formulaire de création ou d'ajout de session */}
      <form onSubmit={handleSessionSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Thème</label>
          <select
            name="theme"
            value={sessionForm.themeId}
            onChange={handleSessionChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Choisir un thème</option>
            {themes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <DatePicker
            selected={sessionForm.date}
            onChange={date => handleDateChange(date as Date)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Durée (minutes)</label>
          <input
            type="number"
            name="duration"
            value={sessionForm.duration}
            onChange={handleSessionChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Prix (€)</label>
          <input
            type="number"
            name="price"
            value={sessionForm.price}
            onChange={handleSessionChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Participants minimum</label>
          <input
            type="number"
            name="minParticipants"
            value={sessionForm.minParticipants}
            onChange={handleSessionChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Créneaux disponibles</label>
          {sessionForm.availableSlots.map((slot, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="text"
                value={slot}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveSlot(index)}
                className="ml-2 px-2 py-1 text-white bg-red-500 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSlot}
            className="mt-2 px-4 py-2 text-white bg-green-500 rounded"
          >
            Ajouter un créneau
          </button>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
