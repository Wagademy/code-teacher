import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-progress-page";
import { auth } from "../(auth)/auth";
import { getLessonsByUserId } from "@/db/queries";

export default async function ProgressPage() {
  const session = await auth();
  
  const lessons = session?.user?.id 
    ? await getLessonsByUserId({ userId: session.user.id })
    : [];

  return (
    <Layout user={session?.user} currentPath="/progress">
      <BlockPage lessons={lessons} />
    </Layout>
  );
} 