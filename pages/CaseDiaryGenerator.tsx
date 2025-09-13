
import React, { useState } from 'react';
import { generateCaseDiary } from '../services/api';

const CaseDiaryGenerator: React.FC = () => {
  const [caseId, setCaseId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [keyFacts, setKeyFacts] = useState('');
  const [generatedDiary, setGeneratedDiary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!caseId || !date || !keyFacts) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedDiary('');
    try {
      const diary = await generateCaseDiary(caseId, date, keyFacts);
      setGeneratedDiary(diary);
    } catch (err) {
      setError('Failed to generate diary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const labelClasses = "block text-sm font-medium text-text-light-secondary dark:text-dark-secondary";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Case Diary Generator</h1>
        <p className="text-text-light-secondary dark:text-dark-secondary mt-2">
          Enter key facts to generate a structured case diary entry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Input Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="caseId" className={labelClasses}>Case ID / FIR No.</label>
              <input id="caseId" type="text" value={caseId} onChange={(e) => setCaseId(e.target.value)} className={inputClasses} placeholder="e.g., 123/2024" />
            </div>
            <div>
              <label htmlFor="date" className={labelClasses}>Date</label>
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="keyFacts" className={labelClasses}>Key Facts / Investigation Updates</label>
              <textarea id="keyFacts" value={keyFacts} onChange={(e) => setKeyFacts(e.target.value)} rows={8} className={inputClasses} placeholder="- Visited crime scene at 10:00 AM.\n- Recorded witness statement from John Doe.\n- Seized mobile phone as evidence."></textarea>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Diary Entry'}
            </button>
          </div>
        </div>

        {/* Output/Preview */}
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Generated Diary (Preview)</h2>
          <div className="bg-background-light dark:bg-background-dark p-4 rounded-md min-h-[300px] border border-slate-200 dark:border-slate-700">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-light-secondary dark:text-dark-secondary">Generating, please wait...</p>
              </div>
            ) : (
              <textarea
                value={generatedDiary}
                onChange={(e) => setGeneratedDiary(e.target.value)}
                className="w-full h-full bg-transparent text-sm focus:outline-none resize-none"
                placeholder="Generated diary will appear here. You can edit it before saving."
              ></textarea>
            )}
          </div>
          <button
            onClick={() => { /* TODO: Implement save logic */ alert('Diary saved!'); }}
            disabled={!generatedDiary}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            Save Diary
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDiaryGenerator;
