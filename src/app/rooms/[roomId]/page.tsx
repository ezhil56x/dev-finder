import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

import { TagsList } from "@/components/tags";
import DevFinderVideo from "./video-player";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const { roomId } = props.params;
  const room = await getRoom(roomId);

  const session = getServerSession(authConfig);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 h-[700px] flex flex-col justify-center align-center text-center">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          <p className="text-base text-gray-600">{room?.description}</p>
          <TagsList tags={splitTags(room.tags!)} />
          {room?.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={20} />
              Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
