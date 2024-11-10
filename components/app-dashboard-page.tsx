import { PlayCircle, RotateCw, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BlockPageProps = {
  chatsCount: number;
  messagesCount: number;
  topUsersByMessageCount: { email: string; messageCount: number }[];
  userEmail: string;
  exercisesCount: number;
  projectsCount: number;
};

export function BlockPage({
  chatsCount,
  messagesCount,
  topUsersByMessageCount,
  userEmail,
  exercisesCount,
  projectsCount,
}: BlockPageProps) {
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
            <CardTitle className="text-lg">TotalExercises</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{exercisesCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projects Showcased</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{projectsCount}</p>
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
