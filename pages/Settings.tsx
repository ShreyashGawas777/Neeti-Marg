
import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon } from '../components/icons/SunIcon';
import { MoonIcon } from '../components/icons/MoonIcon';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('English');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="max-w-2xl mx-auto bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
      
      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg">
          <div>
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
              Switch between light and dark themes.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300"
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg">
          <div>
            <h2 className="text-lg font-semibold">Language</h2>
            <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
              Choose your preferred language for the interface.
            </p>
          </div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>English</option>
            <option>हिन्दी (Hindi)</option>
            <option>कोंकणी (Konkani)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
