import db from "#db/client";
import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylist_tracks } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 30; i++) {
    const track = await createTrack(
      "Track " + i,
      Math.floor(Math.random() * 200 + 90),
    );
  }
  for (let i = 1; i <= 20; i++) {
    const playlist = await createPlaylist("Playlist " + i, "BLAH BLAH BLAH");
  }
  for (let i = 1; i <= 25; i++) {
    const playlist_track = await createPlaylist_tracks(
      Math.floor(Math.random() * 20 + 1),
      Math.floor(Math.random() * 30 + 1),
    );
  }
}
