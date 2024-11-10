import { auth } from '@/app/(auth)/auth';
import { deleteLessonById } from '@/db/queries';

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response('Lesson ID is required', { status: 400 });
    }

    await deleteLessonById({ id });

    return new Response('Lesson deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to delete lesson:', error);
    return new Response('Failed to delete lesson', { status: 500 });
  }
}
