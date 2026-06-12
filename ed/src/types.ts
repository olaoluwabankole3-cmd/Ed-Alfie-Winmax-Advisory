export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  badge: string;
  avatar: string;
  bio: string;
  pubQuote: string;
}

export interface CanvasSection {
  id: string;
  title: string;
  icon: string;
  placeholder: string;
  value: string;
}

export interface DiagnosticQuestion {
  id: string;
  category: "operations" | "marketing" | "finances" | "strategy";
  question: string;
  options: { label: string; score: number }[];
  selectedScore?: number;
}

export interface VaultFile {
  id: string;
  name: string;
  size: string;
  timeAgo: string;
  status: "Verified" | "Pending Review" | "Under Review";
  category: string;
}

export interface MeetingSlot {
  id: string;
  dateTime: string;
  advisorName: string;
  status: "available" | "booked";
}

export interface TrackerDetails {
  token: string;
  percent: number;
  phaseTitle: string;
  deadline: string;
  phase1: string;
  phase2: string;
  phase3: string;
  ipAddress: string;
  nodeLocation: string;
  engagementTimeline: string;
}

