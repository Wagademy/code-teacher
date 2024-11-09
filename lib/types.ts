export interface User {
  id: string;
  name: string;
}

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Skill {
  name: string;
  progress: number;
}

export interface UserProgress {
  overallProgress: number;
  completedExercises: number;
  totalExercises: number;
  completedProjects: number;
  totalProjects: number;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  codeQuality: number;
  innovation: number;
  feedback: string;
} 