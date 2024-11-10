'use client';

import { Exercise } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Markdown } from '@/components/custom/markdown';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

interface ExercisePageProps {
  exercise: Exercise & { isCompleted: boolean };
}

export function ExercisePage({ exercise }: ExercisePageProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/exercises/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exerciseId: exercise.id,
          answer,
          evaluationCriteria: exercise.evaluationCriteria,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate exercise');
      }

      const data = await response.json();
      setFeedback(data.feedback);

      if (data.passed) {
        toast.success('Exercise completed successfully!');
      }
    } catch (error) {
      toast.error('Failed to evaluate exercise. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            <Markdown>{exercise.description}</Markdown>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Card */}
      <Card>
        <CardHeader>
          <CardTitle>Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            <Markdown>{exercise.challenge}</Markdown>
          </div>
        </CardContent>
      </Card>

      {/* Explanation Card */}
      <Card>
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            <Markdown>{exercise.explanation}</Markdown>
          </div>
        </CardContent>
      </Card>

      {/* Completion Criteria Card */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            <Markdown>{exercise.evaluationCriteria}</Markdown>
          </div>
        </CardContent>
      </Card>

      {/* References Card */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            <Markdown>{exercise.references}</Markdown>
          </div>
        </CardContent>
      </Card>

      {/* Submission Card - Only show if not completed */}
      {!exercise.isCompleted ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!feedback && (
                <>
                  <Textarea
                    placeholder="Paste your solution here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !answer.trim()}
                    className="w-full"
                  >
                    {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
                  </Button>
                </>
              )}
              {feedback && (
                <>
                  <div className="mt-4 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Feedback:</h4>
                    <div className="text-primary prose prose-sm max-w-none">
                      <Markdown>{feedback}</Markdown>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="w-full"
                    >
                      Return to Previous Page
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Exercise Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-950">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <h4 className="font-medium">Successfully Completed!</h4>
                </div>
                {exercise.feedback && (
                  <div className="mt-4 text-primary prose prose-sm max-w-none">
                    <Markdown>{exercise.feedback}</Markdown>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full"
              >
                Return to Previous Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
