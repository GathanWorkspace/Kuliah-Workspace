export interface Task {
  id: string;
  title: string;
  courseOrOrg: string;
  type: 'academic' | 'campus_org';
  deadline: string; // ISO date string or human-readable (parsed into date)
  estimatedHours: number;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface GoalBreakdown {
  id: string;
  goalTitle: string;
  targetDate: string;
  milestones: {
    day: number;
    title: string;
    description: string;
    subtasks: string[];
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

export interface SyllabusTemplate {
  title: string;
  content: string;
}
