import { customModel } from '@/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/models';
import { auth } from '@/app/(auth)/auth';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { description } = await request.json();

    const { object: lessonPlan } = await generateObject({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert curriculum designer. Generate a structured lesson plan based on the user's learning goals.`,
      prompt: description,
      schema: z.object({
        title: z.string(),
        objective: z.string(),
        skills: z.array(z.string()),
        topics: z.array(z.string()),
        description: z.string(),
      }),
    });

    return new Response(JSON.stringify(lessonPlan), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to generate lesson:', error);
    return new Response('Failed to generate lesson', { status: 500 });
  }
}
