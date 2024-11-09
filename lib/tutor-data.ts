export async function getTutorMessages(userId: string) {
  // In a real application, this would fetch the user's tutor messages from a database
  return [
    {
      role: "assistant",
      content:
        "Hello! I'm your AI tutor. What coding topic would you like help with today?",
    },
    {
      role: "user",
      content:
        "I'm having trouble understanding React hooks. Can you explain them?",
    },
    {
      role: "assistant",
      content:
        "React hooks are functions that allow you to use state and other React features in functional components. The most commonly used hooks are useState for managing state, and useEffect for handling side effects. Let's start with useState. Can you tell me what you already know about it?",
    },
  ];
}
