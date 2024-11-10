import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-tutor-page";
import { getChatsByUserId } from "@/db/queries";

import { auth } from "../(auth)/auth";

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