import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylistIncludingTracks,
  getPlaylists,
} from "#db/queries/playlists";
import { getTracksByPlaylist } from "#db/queries/tracks";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body requires: name, description");

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.status(200).send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylist(req.playlist.id);
  res.send(tracks);
});

// router.post("/:id/tracks", async (req, res) => {});
