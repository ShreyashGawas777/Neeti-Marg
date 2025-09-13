
import { CaseFile, CaseStatus, ChatMessage } from '../types';

// TODO: Replace this with actual API calls to the FastAPI backend.

const MOCK_CASES: CaseFile[] = [
  { id: '1', caseId: '101/2024', victimAge: 15, status: CaseStatus.UNDER_INVESTIGATION, lastUpdated: '2024-07-20' },
  { id: '2', caseId: '102/2024', victimAge: 17, status: CaseStatus.OPEN, lastUpdated: '2024-07-22' },
  { id: '3', caseId: '095/2024', victimAge: 14, status: CaseStatus.PENDING_TRIAL, lastUpdated: '2024-06-15' },
  { id: '4', caseId: '081/2024', victimAge: 16, status: CaseStatus.CLOSED, lastUpdated: '2024-05-10' },
];

// Simulates fetching cases from the backend
export const fetchCases = (): Promise<CaseFile[]> => {
  console.log("API: Fetching cases...");
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_CASES);
    }, 500);
  });
};

// Simulates calling the LLM to generate a case diary
export const generateCaseDiary = (caseId: string, date: string, keyFacts: string): Promise<string> => {
  console.log("API: Generating case diary with data:", { caseId, date, keyFacts });
  // TODO: Implement API call to FastAPI backend's /generate-diary endpoint.
  // The backend will use a template and call the local LLM.
  
  return new Promise(resolve => {
    setTimeout(() => {
      const generatedText = `
CASE DIARY ENTRY
----------------
Case No.: ${caseId}
Date: ${date}

Investigation proceeding on ${date}:
Based on the information provided, the following actions were taken:
${keyFacts.split('\n').map(fact => `- ${fact.trim().replace(/^-/, '').trim()}`).join('\n')}

Further steps will involve analyzing the collected evidence and continuing with witness interviews. The investigation is ongoing.
      `.trim();
      resolve(generatedText);
    }, 1500);
  });
};

// Simulates getting a response from the legal guidance chatbot
export const getChatbotResponse = (query: string): Promise<ChatMessage> => {
  console.log("API: Getting chatbot response for query:", query);
  // TODO: Implement API call to FastAPI backend's /chat endpoint.
  // The backend will perform RAG with the local LLM.

  return new Promise(resolve => {
    setTimeout(() => {
        const response: ChatMessage = {
            id: Date.now(),
            sender: 'bot',
            text: `This is a mock response regarding "${query}". For POCSO cases involving a minor, it is crucial to record the victim's statement under Section 164 CrPC before a magistrate without delay.`,
            source: "POCSO Act, Section 24"
        };
      resolve(response);
    }, 1000);
  });
};
