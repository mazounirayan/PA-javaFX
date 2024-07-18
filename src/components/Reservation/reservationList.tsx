import React, { useState } from 'react';
import ReservationForm from './reservation';
import { Reservation } from './reservation';


const ReservationManager: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const saveReservation = (reservation: Reservation) => {
    if (reservation.id) {
      setReservations(prevReservations =>
        prevReservations.map(r => (r.id === reservation.id ? reservation : r))
      );
    } else {
      setReservations(prevReservations => [
        ...prevReservations,
        { ...reservation, id: Date.now() }
      ]);
    }
    setEditingReservation(null);
  };

  return (
    <div>
      <h1>Gérer les Réservations</h1>
      <button onClick={() => setEditingReservation({} as Reservation)}>Ajouter une Réservation</button>
      {editingReservation && (
        <ReservationForm
          reservation={editingReservation}
          onSave={saveReservation}
        />
      )}
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {reservation.email} - {reservation.slot}
            <button onClick={() => setEditingReservation(reservation)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationManager;
