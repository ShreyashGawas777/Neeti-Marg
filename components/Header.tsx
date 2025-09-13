
import React from 'react';
import { Link } from 'react-router-dom';
import { SettingsIcon } from './icons/SettingsIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-card-light dark:bg-card-dark shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              NeetiMarga
            </Link>
            <p className="ml-4 text-sm text-text-light-secondary dark:text-dark-secondary hidden sm:block">
              Goa Police Judicial Assistant
            </p>
          </div>
          <div className="flex items-center">
            <Link 
              to="/settings" 
              className="p-2 rounded-full text-text-light-secondary dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Settings"
            >
              <SettingsIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
