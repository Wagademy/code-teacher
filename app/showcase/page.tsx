import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-showcase-page";
import { auth } from "../(auth)/auth";

export default async function ShowcasePage() {
  const session = await auth();
  return (
    <Layout user={session?.user} currentPath="/showcase">
      <BlockPage />
    </Layout>
  );
} 