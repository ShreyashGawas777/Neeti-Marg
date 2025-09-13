
import React, { useState, useEffect, useMemo } from 'react';
import { CaseFile } from '../types';
import { fetchCases } from '../services/api';
import { SearchIcon } from '../components/icons/SearchIcon';

const SavedCases: React.FC = () => {
  const [cases, setCases] = useState<CaseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const loadCases = async () => {
      setLoading(true);
      const data = await fetchCases();
      setCases(data);
      setLoading(false);
    };
    loadCases();
  }, []);

  const filteredCases = useMemo(() => {
    return cases
      .filter(c => filterStatus === 'All' || c.status === filterStatus)
      .filter(c => c.caseId.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [cases, searchTerm, filterStatus]);

  if (loading) {
    return <div className="text-center">Loading cases...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Saved Cases</h1>
        <p className="text-text-light-secondary dark:text-dark-secondary mt-2">
          Search, filter, and manage all your saved cases.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input 
            type="text"
            placeholder="Search by Case ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="status-filter" className="mr-2 text-sm font-medium">Status:</label>
          <select 
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>All</option>
            <option>Open</option>
            <option>Under Investigation</option>
            <option>Pending Trial</option>
            <option>Closed</option>
          </select>
        </div>
      </div>
      
      <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-slate-800 text-xs uppercase text-text-light-secondary dark:text-dark-secondary">
              <tr>
                <th scope="col" className="px-6 py-3">Case ID</th>
                <th scope="col" className="px-6 py-3">Victim Age</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Last Updated</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseFile) => (
                <tr key={caseFile.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{caseFile.caseId}</td>
                  <td className="px-6 py-4">{caseFile.victimAge}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      caseFile.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      caseFile.status === 'Closed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {caseFile.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{caseFile.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCases.length === 0 && (
            <p className="text-center py-8 text-text-light-secondary dark:text-dark-secondary">No cases found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCases;
