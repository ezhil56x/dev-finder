import { db } from "@/db";

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {rooms.map((room) => (
        <div key={room.id} className="p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{room.name}</h2>
          <p className="text-sm text-gray-500">{room.description}</p>
        </div>
      ))}
    </main>
  );
}
