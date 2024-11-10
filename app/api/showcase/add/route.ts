import { getLessonById, saveShowcase } from '@/db/queries';
import { generateUUID } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const {
      challenge,
      title,
      description,
      solution,
      feedback,
      lessonId,
    }: {
      challenge: string;
      title: string;
      description: string;
      solution: string;
      feedback: string;
      lessonId: string;
    } = await request.json();

    const lesson = await getLessonById({ id: lessonId });

    // Create a new showcase entry
    const showcase = {
      id: generateUUID(),
      userId: lesson.userId,
      challenge,
      title,
      description,
      solution,
      feedback,
      createdAt: new Date(),
    };

    // Insert into database
    await saveShowcase({ showcases: [showcase] });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to add to showcase:', error);
    return new Response('Failed to add to showcase', { status: 500 });
  }
}
