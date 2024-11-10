import { Exercise } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Markdown } from '@/components/custom/markdown';

interface ExercisePageProps {
  exercise: Exercise;
}

export function ExercisePage({ exercise }: ExercisePageProps) {
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
    </div>
  );
}
