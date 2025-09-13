
import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="group block p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 ease-in-out border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-300 mb-4 transition-colors duration-300 group-hover:bg-primary-500 dark:group-hover:bg-primary-500 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-light-primary dark:text-dark-primary mb-2">{title}</h3>
      <p className="text-text-light-secondary dark:text-dark-secondary">{description}</p>
    </Link>
  );
};

export default DashboardCard;
