"use server";

import { getSession } from "@/lib/auth";
import { getRoom, deleteRoom } from "@/data-access/rooms";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    return [];
  }

  const room = await getRoom(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await deleteRoom(roomId);
  revalidatePath("/your-rooms");
}
