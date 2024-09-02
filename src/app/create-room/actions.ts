"use server";

import { db } from "@/db/schema";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from 'next/cache';

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.insert(room).values({ ...roomData, userId: session.user.id });

  revalidatePath("/");
}
