import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function Page() {
  const user = { id: '1' };
  const progress = {
    lessonName: 'Introduction to JavaScript',
    overallProgress: 50,
    completedExercises: 10,
    totalExercises: 20,
    completedProjects: 5,
    totalProjects: 10,
    skills: [
      { name: 'JavaScript', progress: 75 },
      { name: 'Python', progress: 60 },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{progress.lessonName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress.overallProgress} className="w-full" />
            <p className="mt-2 text-center">
              {progress.overallProgress}% Complete
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Exercises: {progress.completedExercises} /{' '}
              {progress.totalExercises}
            </p>
            <p>
              Projects: {progress.completedProjects} / {progress.totalProjects}
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {progress.skills.map((skill: any, index: any) => (
              <div key={index} className="mb-4">
                <p className="mb-2">{skill.name}</p>
                <Progress value={skill.progress} className="w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
