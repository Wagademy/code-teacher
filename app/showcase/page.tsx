import { Layout } from '@/components/app-dashboard-layout';
import { BlockPage } from '@/components/app-dashboard-showcase-page';
import { auth } from '../(auth)/auth';
import { getShowcasesByUserId } from '@/db/queries';
import { notFound } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return notFound();
  }

  const showcases = await getShowcasesByUserId({ id: session.user.id });
  return (
    <Layout user={session?.user} currentPath="/showcase">
      <BlockPage showcases={showcases} />
    </Layout>
  );
}
