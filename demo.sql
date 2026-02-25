\pset pager off
\x on
\echo TRACKS:
SELECT *
FROM tracks
LIMIT 5;
\echo PLAYLISTS:
SELECT *
FROM playlists
LIMIT 5;
\echo PLAYLISTS_TRACKS:
SELECT *
FROM playlists_tracks
LIMIT 5;

-- SELECT
--   *,
--   (
--     SELECT json_agg(tracks)
--     FROM tracks
--     WHERE tracks.id = track_id
--   ) AS tracks
-- FROM playlists_tracks
-- WHERE playlist_id = '11';

SELECT tracks.*
FROM
  tracks
  JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
  JOIN playlists ON playlists.id = playlists_tracks.playlist_id
WHERE playlists.id = '11';
