import { cookies } from 'next/headers';

import { Layout } from '@/components/app-dashboard-layout';
import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { auth } from '../../(auth)/auth';

export const experimental_ppr = true;

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), await cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  return (
    <Layout user={session?.user} currentPath="/tutor">
      <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
    </Layout>
  );
}
