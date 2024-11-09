import { User } from "./types";

export async function getCurrentUser(): Promise<User> {
  // This is a mock implementation. Replace with your actual authentication logic
  return {
    id: "1",
    name: "John Doe",
  };
} 