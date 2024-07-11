import React, { useState, useEffect } from 'react';

const CreateTheme: React.FC = () => {
  const [themeForm, setThemeForm] = useState({
    name: '',
    salle: '',
    histoire: '',
    photo: ''
  });

  const [themes, setThemes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/themes')
      .then(response => response.json())
      .then(data => setThemes(data))
      .catch(error => console.error('Erreur lors du chargement des thèmes:', error));
  }, []);

  const handleThemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(themeForm)
    })
      .then(response => response.json())
      .then(newTheme => {
        console.log('Thème créé:', newTheme);
     
      })
      .catch(error => console.error('Erreur lors de la création du thème:', error));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setThemeForm(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle session</h1>

      <form onSubmit={handleThemeSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium">Nom du thème</label>
          <input
            type="text"
            name="name"
            value={themeForm.name}
            onChange={handleThemeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Salle</label>
          <input
            type="text"
            name="salle"
            value={themeForm.salle}
            onChange={handleThemeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Histoire</label>
          <textarea
            name="histoire"
            value={themeForm.histoire}
            onChange={handleThemeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Photo</label>
          <input
            type="text"
            name="photo"
            value={themeForm.photo}
            onChange={handleThemeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded">
          Créer Thème
        </button>
      </form>
    </div>
  );
};

export default CreateTheme;
