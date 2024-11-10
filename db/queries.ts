'server-only';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  user,
  chat,
  User,
  document,
  Suggestion,
  suggestion,
  Message,
  message,
  vote,
  lesson,
  exercise,
  Exercise,
  showcase,
  Showcase,
} from './schema';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    return await db.select().from(user).where(eq(user.id, id));
  } catch (error) {
    console.error('Failed to get user by id from database');
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  try {
    return await db.insert(user).values({ email, password: hash });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(vote).where(eq(vote.chatId, id));
    await db.delete(message).where(eq(message.chatId, id));

    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

export async function saveMessages({ messages }: { messages: Array<Message> }) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === 'up' ? true : false })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    } else {
      return await db.insert(vote).values({
        chatId,
        messageId,
        isUpvoted: type === 'up' ? true : false,
      });
    }
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  content,
  userId,
}: {
  id: string;
  title: string;
  content: string;
  userId: string;
}) {
  try {
    return await db.insert(document).values({
      id,
      title,
      content,
      userId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to save document in database');
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));

    return documents;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp)
        )
      );

    return await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)));
  } catch (error) {
    console.error(
      'Failed to delete documents by id after timestamp from database'
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (error) {
    console.error('Failed to save suggestions in database');
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(and(eq(suggestion.documentId, documentId)));
  } catch (error) {
    console.error(
      'Failed to get suggestions by document version from database'
    );
    throw error;
  }
}

export async function getMessagesCountByUserId({ userId }: { userId: string }) {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(eq(chat.userId, userId));

    return Number(result[0]?.count) || 0;
  } catch (error) {
    console.error('Failed to get messages count from database');
    throw error;
  }
}

export async function getTopUsersByMessageCount() {
  try {
    return await db
      .select({
        email: user.email,
        messageCount: sql<number>`count(${message.id})`.as('message_count'),
      })
      .from(user)
      .leftJoin(chat, eq(user.id, chat.userId))
      .leftJoin(message, eq(chat.id, message.chatId))
      .groupBy(user.email)
      .orderBy(desc(sql`message_count`))
      .limit(5);
  } catch (error) {
    console.error('Failed to get top users by message count from database');
    throw error;
  }
}

export async function saveLesson({
  id,
  userId,
  title,
  objective,
  skills,
  topics,
  description,
}: {
  id: string;
  userId: string;
  title: string;
  objective: string;
  skills: string[];
  topics: string[];
  description: string;
}) {
  try {
    return await db.insert(lesson).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      objective,
      skills,
      topics,
      description,
    });
  } catch (error) {
    console.error('Failed to save lesson in database');
    throw error;
  }
}

export async function deleteLessonById({ id }: { id: string }) {
  try {
    await db.delete(exercise).where(eq(exercise.lessonId, id));
    await db.delete(lesson).where(eq(lesson.id, id));
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getLessonsByUserId({ userId }: { userId: string }) {
  try {
    return await db
      .select()
      .from(lesson)
      .where(eq(lesson.userId, userId))
      .orderBy(desc(lesson.createdAt));
  } catch (error) {
    console.error('Failed to get lessons from database');
    throw error;
  }
}

export async function getLessonById({ id }: { id: string }) {
  try {
    const [selectedLesson] = await db
      .select()
      .from(lesson)
      .where(eq(lesson.id, id));
    return selectedLesson;
  } catch (error) {
    console.error('Failed to get lesson by id from database');
    throw error;
  }
}

export async function saveExercise({
  exercises,
}: {
  exercises: Array<Exercise>;
}) {
  try {
    return await db.insert(exercise).values(exercises);
  } catch (error) {
    console.error('Failed to save exercises in database', error);
    throw error;
  }
}

export async function getExercisesByLessonId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(exercise)
      .where(eq(exercise.lessonId, id))
      .orderBy(asc(exercise.createdAt));
  } catch (error) {
    console.error('Failed to get exercises by lesson id from database', error);
    throw error;
  }
}

export async function getExerciseById({ id }: { id: string }) {
  try {
    const [selectedExercise] = await db
      .select()
      .from(exercise)
      .where(eq(exercise.id, id));
    return selectedExercise;
  } catch (error) {
    console.error('Failed to get exercise by id from database');
    throw error;
  }
}

export async function updateExercise({
  id,
  solution,
  feedback,
  isCompleted,
}: {
  id: string;
  solution?: string;
  feedback?: string;
  isCompleted?: boolean;
}) {
  try {
    return await db
      .update(exercise)
      .set({
        solution,
        feedback,
        isCompleted,
      })
      .where(eq(exercise.id, id));
  } catch (error) {
    console.error('Failed to update exercise in database');
    throw error;
  }
}

export async function saveShowcase({
  showcases,
}: {
  showcases: Array<Showcase>;
}) {
  try {
    return await db.insert(showcase).values(showcases);
  } catch (error) {
    console.error('Failed to save showcases in database');
    throw error;
  }
}

export async function getShowcasesByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(showcase)
      .where(eq(showcase.userId, id))
      .orderBy(desc(showcase.createdAt));
  } catch (error) {
    console.error('Failed to get showcases by user id from database');
    throw error;
  }
}

export async function getShowcaseById({ id }: { id: string }) {
  try {
    const [result] = await db
      .select()
      .from(showcase)
      .where(eq(showcase.id, id));
    return result;
  } catch (error) {
    console.error('Failed to get showcase by id from database');
    throw error;
  }
}

export async function deleteShowcaseById({ id }: { id: string }) {
  try {
    return await db.delete(showcase).where(eq(showcase.id, id));
  } catch (error) {
    console.error('Failed to delete showcase by id from database');
    throw error;
  }
}
