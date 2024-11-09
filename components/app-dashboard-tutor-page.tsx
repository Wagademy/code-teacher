import Link from 'next/link';

export function BlockPage() {
  return (
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
          Start Chat
        </Link>
      </div>
    </div>
  );
}
