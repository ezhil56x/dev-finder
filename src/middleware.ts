export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/your-rooms", "/create-room", "/room/[roomId]", "/browse", "/edit-room/[roomId]"],
};
