import { getDB } from "../db/sqlite";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const FIELDS: [string, string][] = [
  // Twitch
  ["TTV_BOT_CLIENT_ID", "Twitch Client ID"],
  ["TTV_BOT_CLIENT_SECRET", "Twitch Client Secret"],
  ["TTV_ACCESS_TOKEN", "Twitch Access Token"],
  ["TTV_REFRESH_TOKEN", "Twitch Refresh Token"],
  ["TTV_BOT_USERNAME", "Twitch Bot Username"],
  ["TTV_CHANNEL", "Twitch Channel to Join"],
  ["TTV_OWNER_ID", "Twitch Channel Owner ID"],

  // Discord
  ["DC_BOT_TOKEN", "Discord Bot Token"],
  ["DC_BOT_CLIENT_ID", "Discord Client ID"],
  ["DC_BOT_SECRET", "Discord Client Secret"],
  ["DC_ADMIN_CHANNEL_ID", "Discord Admin Channel ID"],
  ["DC_CHATLOG_CHANNEL_ID", "Discord Chat Log Channel ID"],
  ["DC_OWNER_ID", "Discord Owner ID"],

  // Other
  ["BOT_NAME", "Bot Name"],
];

async function initBotConfig() {
  const rl = readline.createInterface({ input, output });
  const db = await getDB();

  const config: Record<string, string> = {};
  for (const [key, label] of FIELDS) {
    config[key] = await rl.question(`${label}: `);
  }
  await rl.close();

  // create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS twitch_token (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      access_token TEXT NOT NULL,
      refresh_token TEXT NOT NULL,
      expires_at INTEGER NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS bot_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // TTV token
  await db.run(
    `INSERT OR REPLACE INTO twitch_token (id, access_token, refresh_token, expires_at)
     VALUES (1, ?, ?, 0)`,
    config["TTV_ACCESS_TOKEN"],
    config["TTV_REFRESH_TOKEN"]
  );

  // all other config
  for (const [key] of FIELDS) {
    if (key !== "TTV_ACCESS_TOKEN" && key !== "TTV_REFRESH_TOKEN") {
      await db.run(
        `INSERT OR REPLACE INTO bot_config (key, value) VALUES (?, ?)`,
        key,
        config[key]
      );
    }
  }

  console.log("✅ Bot configuration and Twitch token initialised in database.");
}

initBotConfig();
