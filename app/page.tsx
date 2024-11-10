import { Layout } from '@/components/app-dashboard-layout';
import { BlockPage } from '@/components/app-dashboard-page';
import {
  getMessagesCountByUserId,
  getChatsByUserId,
  getTopUsersByMessageCount,
  getExercisesCountByUserId,
  getProjectsCountByUserId,
} from '@/db/queries';

import { auth } from './(auth)/auth';

export default async function DashboardPage() {
  const session = await auth();

  let chatsCount = 0;
  let messagesCount = 0;
  let topUsersByMessageCount: { email: string; messageCount: number }[] = [];
  let exercisesCount = 0;
  let projectsCount = 0;

  if (session?.user?.id) {
    const chats = await getChatsByUserId({
      id: session.user.id,
    });
    chatsCount = chats.length;
    messagesCount = await getMessagesCountByUserId({
      userId: session.user.id,
    });
    topUsersByMessageCount = await getTopUsersByMessageCount();
    exercisesCount = await getExercisesCountByUserId({
      id: session.user.id,
    });
    projectsCount = await getProjectsCountByUserId({
      id: session.user.id,
    });
  }

  return (
    <Layout user={session?.user} currentPath="/">
      <BlockPage
        chatsCount={chatsCount}
        messagesCount={messagesCount}
        topUsersByMessageCount={topUsersByMessageCount}
        exercisesCount={exercisesCount}
        projectsCount={projectsCount}
        userEmail={session?.user?.email || ''}
      />
    </Layout>
  );
}
