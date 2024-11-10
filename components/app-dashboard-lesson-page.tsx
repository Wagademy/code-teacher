import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Exercise, Lesson } from '@/db/schema';
import { ExercisesList } from '@/components/custom/exercises-list';

interface BlockPageProps {
  lesson: Lesson;
  exercises: Exercise[];
}

export function BlockPage({ lesson, exercises }: BlockPageProps) {
  // Calculate progress metrics
  const totalExercises = exercises.length;
  const completedExercises = exercises.filter(ex => ex.isCompleted).length;
  const overallProgress = totalExercises > 0 
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="w-full" />
            <p className="mt-2 text-center">
              {overallProgress}% Complete
            </p>
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
            <ExercisesList exercises={exercises} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
