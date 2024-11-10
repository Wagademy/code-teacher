import { customModel } from '@/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/models';
import { auth } from '@/app/(auth)/auth';
import { updateExercise } from '@/db/queries';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { exerciseId, answer, evaluationCriteria } = await request.json();

    const { object: evaluation } = await generateObject({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert coding instructor evaluating student submissions. Evaluate the solution based on the provided criteria and provide constructive feedback.`,
      prompt: `
        Evaluation Criteria:
        ${evaluationCriteria}

        Student's Solution:
        ${answer}

        Please evaluate the solution and provide feedback.
      `,
      schema: z.object({
        passed: z.boolean(),
        feedback: z.string(),
      }),
    });

    // Save the solution and feedback
    await updateExercise({
      id: exerciseId,
      solution: answer,
      feedback: evaluation.feedback,
      isCompleted: evaluation.passed,
    });

    return new Response(JSON.stringify(evaluation), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to evaluate exercise:', error);
    return new Response('Failed to evaluate exercise', { status: 500 });
  }
}
