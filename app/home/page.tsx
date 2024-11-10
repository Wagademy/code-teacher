import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MortarBoardIcon, MessageCircleIcon, BarChartIcon, LayoutIcon } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MortarBoardIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Wagademy Code Teacher</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your AI-powered coding tutor providing interactive lessons, real-time feedback, 
            and personalized guidance for learning how to code.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">Sign In</Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard 
            icon={MessageCircleIcon}
            title="Smart Onboarding"
            description="Natural language chat to determine your coding knowledge and goals"
          />
          <FeatureCard 
            icon={BarChartIcon}
            title="Personalized Learning"
            description="AI-driven algorithm recommends a customized learning path based on your goals"
          />
          <FeatureCard 
            icon={MessageCircleIcon}
            title="AI Tutor Support"
            description="Context-aware guidance, explanations, and encouragement from your AI tutor"
          />
          <FeatureCard 
            icon={LayoutIcon}
            title="Project Showcase"
            description="Share your coding projects and receive AI-generated feedback"
          />
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Chat with AI"
              description="Tell our AI tutor about your coding experience and what you want to learn"
            />
            <StepCard 
              number="2"
              title="Get Your Path"
              description="Receive a personalized curriculum with exercises matched to your level"
            />
            <StepCard 
              number="3"
              title="Learn & Build"
              description="Complete exercises, build projects, and showcase your progress"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Wagademy Code Teacher today and begin your coding journey
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-12">Start Learning Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { 
  icon: any; 
  title: string; 
  description: string 
}) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-8 w-8 text-primary mb-4" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string 
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
