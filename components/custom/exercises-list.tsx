import { Exercise } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCw, Check } from 'lucide-react';
import Link from 'next/link';
import { Markdown } from '@/components/custom/markdown';

interface ExercisesListProps {
  exercises: Exercise[];
}

export function ExercisesList({ exercises }: ExercisesListProps) {
  const completedExercises = exercises.filter(
    (exercise) => exercise.isCompleted
  );
  const nextExercises = exercises.filter((exercise) => !exercise.isCompleted);

  return (
    <div className="space-y-8">
      {/* Next Exercises Section */}
      {nextExercises.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Next Exercises</h2>
          <div className="space-y-4">
            {nextExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{exercise.title}</h3>
                  <div className="text-sm text-muted-foreground prose prose-sm max-w-none">
                    <Markdown>{exercise.description}</Markdown>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/progress/exercise/${exercise.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-green-600 hover:text-green-700"
                    >
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Exercises Section */}
      {completedExercises.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Completed Exercises</h2>
          <div className="space-y-4">
            {completedExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{exercise.title}</h3>
                  <div className="text-sm text-muted-foreground prose prose-sm max-w-none">
                    <Markdown>{exercise.description}</Markdown>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
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
        </div>
      )}
    </div>
  );
}