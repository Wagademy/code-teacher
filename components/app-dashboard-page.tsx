import { PlayCircle, RotateCw, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BlockPageProps = {
  chatsCount: number;
  messagesCount: number;
  topUsersByMessageCount: { email: string; messageCount: number }[];
  userEmail: string;
};

export function BlockPage({
  chatsCount,
  messagesCount,
  topUsersByMessageCount,
  userEmail,
}: BlockPageProps) {
  const exercises = [
    {
      name: 'JavaScript Basics',
      progress: 75,
      lastAccessed: '2 days ago',
    },
    {
      name: 'React Components',
      progress: 25,
      lastAccessed: '5 days ago',
    },
    {
      name: 'API Integration',
      progress: 50,
      lastAccessed: '1 week ago',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chats with Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{chatsCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{messagesCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exercises Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">47</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projects Showcased</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">2</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Exercise Name</th>
                    <th className="text-left p-4 font-semibold">Progress</th>
                    <th className="text-left p-4 font-semibold">Last Interaction</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise) => (
                    <tr key={exercise.name} className="border-b">
                      <td className="p-4">{exercise.name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-48 h-2 bg-secondary rounded-full">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${exercise.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {exercise.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {exercise.lastAccessed}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-primary hover:text-primary/80">
                            <PlayCircle className="w-4 h-4" />
                          </button>
                          <button className="text-primary hover:text-primary/80">
                            <RotateCw className="w-4 h-4" />
                          </button>
                          <button className="text-destructive hover:text-destructive/80">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">User</th>
                    <th className="text-left p-4 font-semibold">Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsersByMessageCount.map((user, index) => (
                    <tr
                      key={user.email}
                      className={`border-b ${user.email === userEmail ? 'bg-primary/10' : ''}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {index === 0 && <span>🏆</span>}
                          {index === 1 && <span>🥈</span>}
                          {index === 2 && <span>🥉</span>}
                          {user.email}
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {user.messageCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
