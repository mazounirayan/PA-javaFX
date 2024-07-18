// src/components/ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-800 p-2 rounded">
      {theme === 'light' ? '🌙 Passer en mode sombre' : '☀️ Passer en mode clair'}
    </button>
  );
};

export default ThemeToggleButton;
