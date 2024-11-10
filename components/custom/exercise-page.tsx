import { Exercise } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <p className="text-muted-foreground">{exercise.description}</p>
        </CardContent>
      </Card>

      {/* Challenge Card */}
      <Card>
        <CardHeader>
          <CardTitle>Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{exercise.challenge}</p>
        </CardContent>
      </Card>

      {/* Explanation Card */}
      <Card>
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{exercise.explanation}</p>
        </CardContent>
      </Card>

      {/* Completion Criteria Card */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{exercise.evaluationCriteria}</p>
        </CardContent>
      </Card>

      {/* References Card */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{exercise.references}</p>
        </CardContent>
      </Card>
    </div>
  );
}
