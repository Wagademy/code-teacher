import { notFound } from 'next/navigation';
import { getShowcaseById, getUserById } from '@/db/queries';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function ShowcasePage({
  params,
}: {
  params: { id: string };
}) {
  const showcase = await getShowcaseById({ id: params.id });

  const showcaseUser = (await getUserById({ id: showcase.userId }))[0];

  if (!showcase) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{showcase.title}</CardTitle>
              <CardDescription>
                Created by {showcaseUser?.email} on{' '}
                {showcase.createdAt.toLocaleDateString()}{' '}
                {showcase.createdAt.toLocaleTimeString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Solution</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{showcase.solution}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
            <p className="text-muted-foreground">{showcase.feedback}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
