"use server";

import { createRoom } from '@/data-access/rooms';
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from 'next/cache';

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const room = await createRoom(roomData, session.user.id);

  revalidatePath("/");

  return room;
}
