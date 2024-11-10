import { auth } from '@/app/(auth)/auth';
import { deleteShowcaseById, getShowcaseById } from '@/db/queries';

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response('Showcase ID is required', { status: 400 });
    }

    const showcase = await getShowcaseById({ id });

    if (!showcase) {
      return new Response('Showcase not found', { status: 404 });
    }

    if (showcase.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteShowcaseById({ id });

    return new Response('Showcase deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to delete showcase:', error);
    return new Response('Failed to delete showcase', { status: 500 });
  }
}
