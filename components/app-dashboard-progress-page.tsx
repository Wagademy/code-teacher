import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lesson } from '@/db/schema';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DeleteLessonButton } from '@/components/custom/delete-lesson-button';

export function BlockPage({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Lessons Progress</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center mt-8">
          <h2 className="text-xl font-medium text-center mb-2">
            Master a new skill
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Pick a new topic to learn by chatting with your AI tutor
          </p>
          <Link
            href="/progress/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start a new lesson
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{lesson.title}</CardTitle>
                  <div className="flex gap-2">
                    <Link
                      href={`/progress/lesson/${lesson.id}`}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <DeleteLessonButton lessonId={lesson.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {lesson.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Objective</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.objective}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.topics.map((topic: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
