import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-tutor-page";
import { auth } from "../(auth)/auth";
export default async function TutorPage() {
  const session = await auth();
  return (
    <Layout user={session?.user} currentPath="/tutor">
      <BlockPage />
    </Layout>
  );
} 