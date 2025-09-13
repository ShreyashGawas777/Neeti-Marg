
export enum CaseStatus {
  OPEN = 'Open',
  UNDER_INVESTIGATION = 'Under Investigation',
  CLOSED = 'Closed',
  PENDING_TRIAL = 'Pending Trial',
}

export interface CaseFile {
  id: string;
  caseId: string;
  victimAge: number;
  status: CaseStatus;
  lastUpdated: string;
}

export interface ChatMessage {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    source?: string;
}
