import React, { useState, useEffect } from 'react';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filterRole, setFilterRole] = useState<string>('');
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchData('http://localhost:5000/employees', setEmployees);
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
    let url = 'http://localhost:5000/employees';
    if (filterRole) {
      url += `?role=${encodeURIComponent(filterRole)}`;
    }
    fetchData(url, setEmployees);
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé:', error);
    }
  };

  const handleUpdate = (employee: Employee) => {
    setEditEmployee(employee);
  };

  const handleSaveUpdate = async () => {
    if (editEmployee) {
      try {
        const response = await fetch(`http://localhost:5000/employees/${editEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editEmployee),
        });
        const updatedEmployee = await response.json();
        setEmployees((prevEmployees) => prevEmployees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
        setEditEmployee(null);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'employé:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des Comptes Employés</h1>
      <div className="mb-4 flex">
        <label className="block text-sm font-medium">Rôle</label>
        <select
          name="role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Choisir un rôle</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button onClick={handleFilter} className="ml-2 px-4 py-2 text-white bg-blue-500 rounded">Filtrer</button>
      </div>
      <ul className="mt-4">
        {employees.map((employee) => (
          <li key={employee.id} className="mb-2 p-4 border rounded">
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p>Email: {employee.email}</p>
            <p>Rôle: {employee.role}</p>
            <button onClick={() => handleDeleteEmployee(employee.id)} className="mr-2 px-4 py-2 text-white bg-red-500 rounded">Supprimer</button>
            <button onClick={() => handleUpdate(employee)} className="mr-2 px-4 py-2 text-white bg-yellow-500 rounded">Modifier</button>
          </li>
        ))}
      </ul>

      {editEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier l'Employé</h2>
            <div>
              <label>Nom</label>
              <input
                type="text"
                value={editEmployee.name}
                onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={editEmployee.email}
                onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>Rôle</label>
              <select
                value={editEmployee.role}
                onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                value={editEmployee.password}
                onChange={(e) => setEditEmployee({ ...editEmployee, password: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button onClick={handleSaveUpdate} className="mt-2 px-4 py-2 text-white bg-blue-500 rounded">Sauvegarder</button>
            <button onClick={() => setEditEmployee(null)} className="mt-2 px-4 py-2 text-white bg-gray-500 rounded">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
