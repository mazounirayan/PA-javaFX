// src/services/authService.ts

export const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`http://localhost:5000/employees?email=${email}&password=${password}`);
      const data = await response.json();
  
      if (data.length > 0) {
        return data[0]; // Renvoie les détails de l'utilisateur
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error('An error occurred while trying to authenticate');
    }
  };
  