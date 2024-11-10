import { generateObject } from 'ai';
import { z } from 'zod';

import { customModel } from '@/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/models';
import { auth } from '@/app/(auth)/auth';


export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const lessonData = await request.json();

    const { object: exercisesList } = await generateObject({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert curriculum designer. Generate a list of practical exercises based on the lesson details.`,
      prompt: JSON.stringify(lessonData),
      schema: z.object({
        exercises: z.array(z.object({
          explanation: z.string(),
          references: z.string(),
          challenge: z.string(),
          evaluationCriteria: z.string(),
        })),
      }),
    });

    return new Response(JSON.stringify(exercisesList), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to generate exercises:', error);
    return new Response('Failed to generate exercises', { status: 500 });
  }
}
