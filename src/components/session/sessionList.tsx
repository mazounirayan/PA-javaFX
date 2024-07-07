import React, { useState, useEffect } from 'react';
import SessionForm from './session';

export interface Session {
    id?: number;
    theme: string;
    duration: number;
    price: number;
    minParticipants: number;
    availableSlots: string[];
    createdBy: number;
  }
  
const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/sessions')
      .then(response => response.json())
      .then(data => setSessions(data));
  }, []);

  const handleSave = (session: Session) => {
    if (session.id) {
      // Update existing session
      fetch(`http://localhost:5000/sessions/${session.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
      }).then(() => {
        setSessions(sessions.map(s => (s.id === session.id ? session : s)));
        setSelectedSession(null);
      });
    } else {
      // Create new session
      fetch('http://localhost:5000/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
      })
        .then(response => response.json())
        .then(newSession => {
          setSessions([...sessions, newSession]);
          setSelectedSession(null);
        });
    }
  };

  const handleUpdate = (session: Session) => {
    if(session){
      fetch (`http://localhost:5000/sessions/${session.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
      }).then(() => {
        setSessions(sessions.map(s => (s.id === session.id ? session : s)));
        setSelectedSession(null);
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sessions d'Escape Game</h1>
      {selectedSession ? (
        <SessionForm session={selectedSession} onSave={handleSave} />
      ) : (
        <SessionForm onSave={handleSave} />
      )}
      <ul className="mt-4">
        {sessions.map(session => (
          <li key={session.id} className="mb-2 p-4 border rounded">
            <h2 className="text-xl font-semibold">{session.theme}</h2>
            <p>Durée: {session.duration} minutes</p>
            <p>Prix: {session.price} €</p>
            <p>Participants minimum: {session.minParticipants}</p>
            <p>Créneaux disponibles: {session.availableSlots.join(', ')}</p>
            <button
              onClick={() => setSelectedSession(session)}
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded"
            >
              Éditer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
