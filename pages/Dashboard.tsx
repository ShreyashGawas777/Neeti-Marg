
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { ChecklistIcon } from '../components/icons/ChecklistIcon';
import { DiaryIcon } from '../components/icons/DiaryIcon';
import { ChatIcon } from '../components/icons/ChatIcon';
import { CasesIcon } from '../components/icons/CasesIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';

const Dashboard: React.FC = () => {
  const features = [
    {
      to: '/new-case',
      icon: <ChecklistIcon className="w-8 h-8" />,
      title: 'New Case Checklist',
      description: 'Start a new case with a step-by-step compliance guide.',
    },
    {
      to: '/diary-generator',
      icon: <DiaryIcon className="w-8 h-8" />,
      title: 'Case Diary Generator',
      description: 'Automatically generate case diaries from key facts.',
    },
    {
      to: '/legal-guidance',
      icon: <ChatIcon className="w-8 h-8" />,
      title: 'Legal Guidance',
      description: 'Ask legal questions to an offline AI assistant.',
    },
    {
      to: '/saved-cases',
      icon: <CasesIcon className="w-8 h-8" />,
      title: 'Saved Cases',
      description: 'View, manage, and search all your saved case files.',
    },
    {
      to: '/settings',
      icon: <SettingsIcon className="w-8 h-8" />,
      title: 'Settings',
      description: 'Configure application settings like theme and language.',
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text-light-primary dark:text-dark-primary sm:text-5xl">Welcome, Investigating Officer</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-secondary dark:text-dark-secondary">
          Your digital assistant for efficient and compliant case management.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <DashboardCard
            key={feature.to}
            to={feature.to}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
