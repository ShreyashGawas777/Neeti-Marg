
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import NewCaseChecklist from './pages/NewCaseChecklist';
import CaseDiaryGenerator from './pages/CaseDiaryGenerator';
import LegalGuidance from './pages/LegalGuidance';
import SavedCases from './pages/SavedCases';
import Settings from './pages/Settings';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        navigate('/new-case');
      }
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        // TODO: Implement a global save function, possibly via context
        console.log("Ctrl+S pressed. Implement save logic.");
        alert("Save functionality not yet implemented globally.");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light-primary dark:text-dark-primary font-sans">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-case" element={<NewCaseChecklist />} />
          <Route path="/diary-generator" element={<CaseDiaryGenerator />} />
          <Route path="/legal-guidance" element={<LegalGuidance />} />
          <Route path="/saved-cases" element={<SavedCases />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
