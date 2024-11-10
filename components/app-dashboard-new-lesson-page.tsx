'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { GenerationProgress } from '@/components/custom/generation-progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { generateUUID } from '@/lib/utils';

export function BlockPage() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson');
      }

      const data = await response.json();
      setPreview(data);
    } catch (error) {
      toast.error('Failed to generate lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const lessonId = generateUUID();
      const response = await fetch('/api/lessons/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...preview, id: lessonId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save lesson');
      }

      toast.success('Lesson created successfully!');
      router.push('/progress');
    } catch (error) {
      toast.error('Failed to save lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create New Lesson</h1>
        <Link
          href="/progress"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Cancel
        </Link>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!preview && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    What would you like to learn?
                  </label>
                  <Textarea
                    placeholder="Describe what you want to learn. For example: I want to learn how to build a REST API with Node.js and Express"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!description || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Generating...' : 'Generate Lesson Plan'}
                </Button>
              </>
            )}

            {isLoading && !preview && (
              <div className="mt-4">
                <GenerationProgress text="Generating your personalized lesson plan..." />
              </div>
            )}

            {preview && (
              <div className="space-y-4 border rounded-lg p-4 mt-4">
                <h3 className="font-medium">Preview</h3>
                <div>
                  <p className="text-sm font-medium">Title</p>
                  <p className="text-sm text-muted-foreground">
                    {preview.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Objective</p>
                  <p className="text-sm text-muted-foreground">
                    {preview.objective}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {preview.skills.map((skill: string, index: number) => (
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
                  <p className="text-sm font-medium">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {preview.topics.map((topic: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Saving...' : 'Confirm and Create Lesson'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
