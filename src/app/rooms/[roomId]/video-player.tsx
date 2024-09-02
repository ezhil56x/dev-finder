"use client";
import { Room } from "@/db/schema";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession();
  const router = useRouter();

  const [serverOnline, setServerOnline] = React.useState(true);

  useEffect(() => {
    if (!session.data) {
      return;
    }
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_JITSI_SERVER_URL!,
          { mode: "no-cors" }
        );
        if (response.status === 200) {
          setServerOnline(true);
        }
      } catch (e) {
        setServerOnline(false);
      }
    }
    fetchData();
  }, [room]);

  return (
    <div>
      {serverOnline && (
        <JitsiMeeting
          roomName={room.name!}
          domain={process.env.NEXT_PUBLIC_JITSI_SERVER_URL!}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: session.data?.user?.name || "User",
            email: session.data?.user?.email || "",
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "700px";
          }}
        />
      )}
      {!serverOnline && (
        <div>
          <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Jitsi server is down
          </h2>
          <p className="leading-7 mt-1">Please try again later</p>
        </div>
      )}
    </div>
  );
}
