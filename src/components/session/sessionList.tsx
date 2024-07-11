import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

export interface Session {
  id?: number;
  theme: string;
  duration: number;
  date: string;
  price: number;
  minParticipants: number;
  availableSlots: string[];
  createdBy: number;
}

interface Theme {
  id: number;
  name: string;
  salle: number;
  histoire: string;
  photo?: string;
}

const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filterTheme, setFilterTheme] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editSession, setEditSession] = useState<Session | null>(null);
  const [newSlot, setNewSlot] = useState<string>('');

  useEffect(() => {
    fetchData('http://localhost:5000/sessions', setSessions);
  }, []);

  useEffect(() => {
    fetchData('http://localhost:5000/themes', setThemes);
  }, []);

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleFilter = () => {
    let url = 'http://localhost:5000/sessions';
    const params = [];

    if (filterTheme) {
      params.push(`theme=${encodeURIComponent(filterTheme)}`);
    }
    if (filterDate) {
      params.push(`date=${format(filterDate, 'yyyy-MM-dd')}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    fetchData(url, setSessions);
  };

  const handleDeleteSession = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/sessions/${id}`, {
        method: 'DELETE',
      });
      setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la séance:', error);
    }
  };

  const handleDeleteSlot = async (sessionId: number, slotIndex: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      const updatedSlots = session.availableSlots.filter((_, index) => index !== slotIndex);
      const updatedSession = { ...session, availableSlots: updatedSlots };

      try {
        const response = await fetch(`http://localhost:5000/sessions/${sessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSession),
        });
        const data = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === data.id ? data : session)));
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau:', error);
      }
    }
  };

  const handleUpdate = (session: Session) => {
    setEditSession(session);
  };

  const handleSaveUpdate = async () => {
    if (editSession) {
      try {
        const response = await fetch(`http://localhost:5000/sessions/${editSession.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editSession),
        });
        const updatedSession = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === updatedSession.id ? updatedSession : session)));
        setEditSession(null);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la séance:', error);
      }
    }
  };

  const handleAddSlot = (id: number) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setEditSession(session);
    }
  };

  const handleSaveSlot = async () => {
    if (editSession) {
      const updatedSlots = [...editSession.availableSlots, newSlot];
      const updatedSession = { ...editSession, availableSlots: updatedSlots };

      try {
        const response = await fetch(`http://localhost:5000/sessions/${editSession.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSession),
        });
        const data = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === data.id ? data : session)));
        setEditSession(null);
        setNewSlot('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sessions d'Escape Game</h1>
      <div className="mb-4 flex">
        <label className="block text-sm font-medium">Thème</label>
        <select
          name="themeId"
          value={filterTheme}
          onChange={(e) => setFilterTheme(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Choisir un thème</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>{theme.name}</option>
          ))}
        </select>

        <DatePicker
          selected={filterDate}
          onChange={(date: Date | null) => setFilterDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Sélectionner une date"
          className="p-2 border border-gray-300 rounded"
          
        />
        <button onClick={handleFilter} className="ml-2 px-4 py-2 text-white bg-blue-500 rounded">Filtrer</button>
      </div>
      <ul className="mt-4">
        {sessions.map((session) => (
          <li key={session.id} className="mb-2 p-4 border rounded">
            <h2 className="text-xl font-semibold">{session.theme}</h2>
            <p>Date: {format(new Date(session.date), 'dd/MM/yyyy')}</p>
            <p>Durée: {session.duration} minutes</p>
            <p>Prix: {session.price} €</p>
            <p>Participants minimum: {session.minParticipants}</p>
            <p>Créneaux disponibles: 
              {session.availableSlots.map((slot, index) => (
                <span key={index} className="inline-flex items-center ml-2">
                  {slot}
                  <button onClick={() => handleDeleteSlot(session.id!, index)} className="ml-2 text-white bg-red-500 rounded px-2">x</button>
                </span>
              ))}
            </p>
            <button onClick={() => handleDeleteSession(session.id!)} className="mr-2 px-4 py-2 text-white bg-red-500 rounded">Supprimer</button>
            <button onClick={() => handleUpdate(session)} className="mr-2 px-4 py-2 text-white bg-yellow-500 rounded">Modifier</button>
            <button onClick={() => handleAddSlot(session.id!)} className="px-4 py-2 text-white bg-green-500 rounded">Ajouter Créneau</button>
          </li>
        ))}
      </ul>

      {editSession && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier la Séance</h2>
            <div>
              <label>Thème</label>
              <input
                type="text"
                value={editSession.theme}
                onChange={(e) => setEditSession({ ...editSession, theme: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>Durée (minutes)</label>
              <input
                type="number"
                value={editSession.duration}
                onChange={(e) => setEditSession({ ...editSession, duration: Number(e.target.value) })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>Date</label>
              <DatePicker
                selected={new Date(editSession.date)}
                onChange={(date: Date | null) => date && setEditSession({ ...editSession, date: date.toISOString() })}
                dateFormat="dd/MM/yyyy"
                className="p-2 border border-gray-300 rounded"
                
              />
            </div>
            <div>
              <label>Prix (€)</label>
              <input
                type="number"
                value={editSession.price}
                onChange={(e) => setEditSession({ ...editSession, price: Number(e.target.value) })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>Participants minimum</label>
              <input
                type="number"
                value={editSession.minParticipants}
                onChange={(e) => setEditSession({ ...editSession, minParticipants: Number(e.target.value) })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button onClick={handleSaveUpdate} className="mt-2 px-4 py-2 text-white bg-blue-500 rounded">Sauvegarder</button>
            <button onClick={() => setEditSession(null)} className="mt-2 px-4 py-2 text-white bg-gray-500 rounded">Annuler</button>
          </div>
        </div>
      )}

      {editSession && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un Créneau</h2>
            <input
              type="text"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button onClick={handleSaveSlot} className="mt-2 px-4 py-2 text-white bg-green-500 rounded">Ajouter</button>
            <button onClick={() => setEditSession(null)} className="mt-2 px-4 py-2 text-white bg-gray-500 rounded">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionList;
