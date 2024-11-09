import { Layout } from '@/components/app-dashboard-layout';
import { BlockPage } from '@/components/app-dashboard-page';
import { auth } from './(auth)/auth';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <Layout user={session?.user} currentPath="/">
      <BlockPage />
    </Layout>
  );
}
