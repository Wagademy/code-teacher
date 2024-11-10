import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-new-lesson-page";
import { auth } from "../../(auth)/auth";

export default async function NewLessonPage() {
  const session = await auth();
  
  return (
    <Layout user={session?.user} currentPath="/progress">
      <BlockPage />
    </Layout>
  );
}
