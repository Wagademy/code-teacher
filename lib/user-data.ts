import { Project, TutorMessage, UserProgress } from "./types";

export async function getUserProgress(userId: string): Promise<UserProgress> {
  // Mock implementation
  return {
    overallProgress: 65,
    completedExercises: 24,
    totalExercises: 30,
    completedProjects: 3,
    totalProjects: 5,
    skills: [
      { name: "JavaScript", progress: 75 },
      { name: "React", progress: 60 },
      { name: "TypeScript", progress: 45 },
    ],
  };
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  // Mock implementation
  return [
    {
      id: "1",
      title: "Todo App",
      description: "A simple todo application built with React",
      codeQuality: 85,
      innovation: 70,
      feedback: "Great use of React hooks and clean code structure.",
    },
    // Add more mock projects as needed
  ];
}

export async function getTutorMessages(userId: string): Promise<TutorMessage[]> {
  // Mock implementation
  return [
    { role: "assistant", content: "Hello! How can I help you with coding today?" },
    { role: "user", content: "Can you explain React hooks?" },
    { role: "assistant", content: "React hooks are functions that allow you to use state and other React features in functional components..." },
  ];
} 