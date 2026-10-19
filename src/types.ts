export type ProjectState = 'active' | 'building' | 'planned' | 'paused';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullOverview?: string;
  keyFeatures?: string[];
  techStack: string[];
  image: string;
  screenshots?: string[];
  link?: string;
  repo?: string;
  state: ProjectState;
  selectedWork?: boolean;
  category?: string;
  publishedDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  projectId?: string;
  read: boolean;
  type: 'project' | 'announcement' | 'system';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export type PageView = 'home' | 'about' | 'projects' | 'experience' | 'gallery' | 'contact' | 'login' | 'admin';

export type Language = 'en' | 'bn';
