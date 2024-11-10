import { Layout } from '@/components/app-dashboard-layout';
import { BlockPage } from '@/components/app-dashboard-page';
import { auth } from './(auth)/auth';
import { getMessagesCountByUserId, getChatsByUserId } from '@/db/queries';
import { differenceInDays } from 'date-fns';

export default async function DashboardPage() {
  const session = await auth();

  let chatsCount = 0;
  let messagesCount = 0;

  if (session?.user?.id) {
    const chats = await getChatsByUserId({
      id: session.user.id,
    });
    chatsCount = chats.length;
    messagesCount = await getMessagesCountByUserId({
      userId: session.user.id,
    });
  }

  return (
    <Layout user={session?.user} currentPath="/">
      <BlockPage chatsCount={chatsCount} messagesCount={messagesCount} />
    </Layout>
  );
}
