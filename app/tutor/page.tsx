import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-tutor-page";
import { auth } from "../(auth)/auth";
import { getChatsByUserId } from "@/db/queries";

export default async function TutorPage() {
  const session = await auth();
  const chats = session?.user?.id 
    ? await getChatsByUserId({ id: session.user.id }) 
    : [];
    
  return (
    <Layout user={session?.user} currentPath="/tutor">
      <BlockPage chats={chats} />
    </Layout>
  );
} 