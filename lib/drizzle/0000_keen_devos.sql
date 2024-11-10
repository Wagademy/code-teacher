CREATE TABLE IF NOT EXISTS "Chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"messages" json NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"objective" text NOT NULL,
	"skills" json NOT NULL,
	"topics" json NOT NULL,
	"description" text NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"lessonId" uuid NOT NULL,
	"isCompleted" boolean NOT NULL DEFAULT false,
	"explanation" text NOT NULL,
	"references" text NOT NULL,
	"challenge" text NOT NULL,
	"evaluationCriteria" text NOT NULL,
	"solution" text,
	"feedback" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Showcase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp NOT NULL,
	"title" text NOT NULL,
	"challenge" text NOT NULL,
	"solution" text NOT NULL,
	"feedback" text NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_lessonId_Lesson_id_fk" FOREIGN KEY ("lessonId") REFERENCES "public"."Lesson"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Showcase" ADD CONSTRAINT "Lesson_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;