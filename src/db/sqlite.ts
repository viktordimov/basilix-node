import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function getDB() {
  const db = await open({
    filename: path.resolve(__dirname, "bot.db"),
    driver: sqlite3.Database,
  });

  // twitch_token table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS twitch_token (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      access_token TEXT NOT NULL,
      refresh_token TEXT NOT NULL,
      expires_at INTEGER NOT NULL
    );
  `);
  // Ensure single row exists for twitch_token
  await db.run(`
    INSERT OR IGNORE INTO twitch_token (id, access_token, refresh_token, expires_at)
    VALUES (1, '', '', 0);
  `);

  // bot_config table
  await db.exec(`
  CREATE TABLE IF NOT EXISTS bot_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

  return db;
}
