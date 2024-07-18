import React, { useState } from 'react';

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin'); // Par défaut, admin
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmployee = {
      name: name,
      email: email,
      role: role,
      password: password
    };

    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });

      if (response.ok && password.length >= 8) {
        alert('Employé créé avec succès !');
        setName('');
        setEmail('');
        setPassword('');
        setError(null);
      }
      if (password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.');
      }
      else {
        throw new Error('Erreur lors de la création de l\'employé.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la communication avec le serveur.');
    }
  };

  return (
    <div>
      <h2>Formulaire de création d'employé</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label><br />
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label htmlFor="email">Email :</label><br />
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

        <label htmlFor="role">Rôle :</label><br />
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select><br /><br />

        <label htmlFor="password">Mot de passe :</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
