import { customModel } from '@/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/models';
import { auth } from '@/app/(auth)/auth';
import { saveExercise } from '@/db/queries';
import { Exercise } from '@/db/schema';
import { generateUUID } from '@/lib/utils';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

async function retryGenerateText(params: any, maxRetries = 3, delay = 5000): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
      return await generateText(params);
    } catch (error: any) {
      console.log('Error generating text:', error);
      if (error.statusCode === 429 && attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
        continue;
      }
      throw error;
    }
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { lessonId, exercise } = await request.json();

    const title = exercise.explanation.split('\n')[0];
    const challengeText = await retryGenerateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert curriculum designer. Generate a structured lesson plan based on the user's learning goals.`,
      prompt: `Compose an exercise for this challenge: ${exercise.challenge}`,
    });
    const challenge = challengeText.text;
    const explanationText = await retryGenerateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert curriculum designer. Generate a structured lesson plan based on the user's learning goals.`,
      prompt: `Expand the explanation for this exercise: ${challenge}. Make a detailed and comprehensive explanation, teaching the step by step for the user to code the solution: ${exercise.explanation}`,
    });
    const explanation = explanationText.text;
    const descriptionText = await retryGenerateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert curriculum designer. Generate a structured lesson plan based on the user's learning goals.`,
      prompt: `Compose a description of the outline of this exercise and the skills trained: ${explanation}`,
    });
    const description = descriptionText.text;
    const evaluationCriteriaText = await retryGenerateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert coding instructor, with vast knowledge of the subjects you are teaching.`,
      prompt: `Compose a detailed evaluation criteria for this exercise, so that you can evaluate if the student completed it correctly later on: ${challenge}`,
    });
    const evaluationCriteria = evaluationCriteriaText.text;
    const referencesText = await retryGenerateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `You are an expert coding instructor, with vast knowledge of references for coding exercises.`,
      prompt: `Compose a list of references for the student to look up to complete this exercise: ${challenge} mention the most important topics and concepts that the student should focus on for this description: ${description}`,
    });
    const references = referencesText.text;
    const exerciseWithId: Exercise = {
      ...exercise,
      title,
      id: generateUUID(),
      lessonId,
      createdAt: new Date(),
      isCompleted: false,
      challenge,
      explanation,
      evaluationCriteria,
      references,
      description,
    };
    await saveExercise({ exercises: [exerciseWithId] });

    return new Response('Exercises saved successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to save exercises:', error);
    return new Response('Failed to save exercises', { status: 500 });
  }
}
