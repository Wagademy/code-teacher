import { Chat } from '@/db/schema';
import Link from 'next/link';
import { DeleteChatButton } from '@/components/custom/delete-chat-button';

export function BlockPage({ chats }: { chats: Chat[] }) {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">AI Tutor Chat</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-primary"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-center mb-2">
            Welcome to AI Tutor
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Start a conversation with your AI tutor to begin learning
          </p>
          <Link
            href="/tutor/chat"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start new chat
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Recent Chats</h2>
        <div className="grid gap-4">
          {chats.length > 0 && (
            <div className="grid gap-4">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={`/tutor/chat/history/${chat.id}`}
                    className="p-4 rounded-lg border hover:bg-accent flex-1 flex items-center justify-between mr-2"
                  >
                    <div>
                      <h3 className="font-medium">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.createdAt.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                  <DeleteChatButton
                    chatId={chat.id}
                  />
                </div>
              ))}
            </div>
          )}
          <Link
            href="/tutor/chat"
            className="p-4 rounded-lg border hover:bg-accent flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">New Chat</h3>
              <p className="text-sm text-muted-foreground">
                Start a new conversation
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 stroke-current stroke-2"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
