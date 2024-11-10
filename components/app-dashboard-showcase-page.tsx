import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Showcase } from '@/db/schema';
import { DeleteShowcaseButton } from '@/components/custom/delete-showcase-button';
import Link from 'next/link';

export function BlockPage({ showcases }: { showcases: Showcase[] }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Project Showcase</h1>
      </div>

      {showcases.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
            <CardDescription>
              Complete exercises to showcase your projects here
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((showcase) => (
            <Card key={showcase.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{showcase.title}</CardTitle>
                  <DeleteShowcaseButton showcaseId={showcase.id} />
                </div>
                <CardDescription>
                  {showcase.createdAt.toLocaleDateString()} {showcase.createdAt.toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Result</h4>
                  <p className="text-sm text-muted-foreground">
                    {showcase.feedback}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/showcase/${showcase.id}`}>
                  <Button variant="outline" className="w-full">
                    View Solution & Feedback
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
