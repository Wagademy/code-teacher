import { Layout } from "@/components/app-dashboard-layout";

import { auth } from './(auth)/auth';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <Layout user={session?.user} currentPath="/">
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </Layout>
  );
}
