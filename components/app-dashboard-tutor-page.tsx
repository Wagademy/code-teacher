import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BlockPage() {
  const user = { id: "1" };
  const initialMessages = [
    {
      id: "1",
      content: "Hello, how can I help you today?",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Tutor Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Chat with your AI Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
            {initialMessages.map((message: any, index: any) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[70%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form
            action="/api/tutor-message"
            method="POST"
            className="flex gap-2"
          >
            <Input
              name="message"
              placeholder="Ask your coding question..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
