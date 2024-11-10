'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Exercise, Lesson } from '@/db/schema';
import { ExercisesList } from '@/components/custom/exercises-list';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BlockPageProps {
  lesson: Lesson;
  exercises: Exercise[];
}

export function BlockPage({ lesson, exercises }: BlockPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const router = useRouter();

  // Calculate progress metrics
  const totalExercises = exercises.length;
  const completedExercises = exercises.filter((ex) => ex.isCompleted).length;
  const overallProgress =
    totalExercises > 0
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;

  const handleGenerateExercises = async () => {
    try {
      setIsGenerating(true);
      setPreview(null);
      const response = await fetch('/api/exercises/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          title: lesson.title,
          objective: lesson.objective,
          skills: lesson.skills,
          topics: lesson.topics,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate exercises');
      }

      const data = await response.json();
      setPreview(data);
    } catch (error) {
      toast.error('Failed to generate exercises. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/exercises/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          exercises: preview.exercises,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save exercises');
      }

      toast.success('Exercises created successfully!');
      router.refresh();
    } catch (error) {
      toast.error('Failed to save exercises. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="w-full" />
            <p className="mt-2 text-center">{overallProgress}% Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Exercises: {completedExercises} / {totalExercises}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skills Trained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {lesson.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            {exercises.length > 0 ? (
              <ExercisesList exercises={exercises} />
            ) : (
              <div className="text-center py-8">
                {!preview ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">
                      No exercises yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Generate a list of exercises based on the lesson
                      objectives
                    </p>
                    <Button
                      onClick={handleGenerateExercises}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Exercises'}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {preview.exercises.map((exercise: any, index: number) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 text-left"
                        >
                          <h4 className="font-medium">{exercise.challenge}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exercise.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleGenerateExercises}
                        disabled={isGenerating}
                        variant="outline"
                      >
                        {isGenerating ? 'Generating...' : 'Regenerate'}
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        disabled={isGenerating}
                        className="flex-1"
                      >
                        {isGenerating
                          ? 'Saving...'
                          : 'Confirm and Save Exercises'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
