import { auth } from '@/app/(auth)/auth';
import { saveLesson } from '@/db/queries';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const lessonData = await request.json();
    await saveLesson({
      ...lessonData,
      userId: session.user.id,
    });

    return new Response('Lesson saved successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to save lesson:', error);
    return new Response('Failed to save lesson', { status: 500 });
  }
}
