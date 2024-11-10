import { auth } from '@/app/(auth)/auth';
import { updateExercise } from '@/db/queries';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { exerciseId } = await request.json();

    await updateExercise({
      id: exerciseId,
      solution: '',
      feedback: '',
      isCompleted: false,
    });

    return new Response('Exercise reset successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to reset exercise:', error);
    return new Response('Failed to reset exercise', { status: 500 });
  }
}
