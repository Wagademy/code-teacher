import { Exercise } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCw, Check } from 'lucide-react';

interface ExercisesListProps {
  exercises: Exercise[];
}

export function ExercisesList({ exercises }: ExercisesListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex-1">
            <h3 className="font-medium">{exercise.challenge}</h3>
            <p className="text-sm text-muted-foreground">
              {exercise.explanation}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="icon"
              className="text-green-600 hover:text-green-700"
            >
              {exercise.isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-blue-600 hover:text-blue-700"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
