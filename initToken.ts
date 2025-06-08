import { getDB } from "./src/db/sqlite";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

async function initToken() {
  const rl = readline.createInterface({ input, output });

  const access_token = await rl.question("Enter initial access token: ");
  const refresh_token = await rl.question("Enter refresh token: ");

  await rl.close();

  const db = await getDB();
  await db.run(
    `
    INSERT OR REPLACE INTO twitch_token (id, access_token, refresh_token, expires_at)
    VALUES (1, ?, ?, 0)
  `,
    access_token,
    refresh_token
  );

  console.log("✅ Token initialized in SQLite.");
}

initToken();
