import { Layout } from "@/components/app-dashboard-layout";
import { BlockPage } from "@/components/app-dashboard-lesson-page";
import { auth } from "@/app/(auth)/auth";
import { getLessonById, getExercisesByLessonId } from '@/db/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  const id = await params.id;
  
  if (!session?.user) {
    return notFound();
  }

  const lesson = await getLessonById({ id });
  
  if (!lesson || lesson.userId !== session.user.id) {
    return notFound();
  }

  const exercises = await getExercisesByLessonId({ id });

  return (
    <Layout user={session?.user} currentPath="/progress">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <Link
            href="/progress"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Return to Lessons
          </Link>
        </div>
        <BlockPage lesson={lesson} exercises={exercises} />
      </div>
    </Layout>
  );
}
