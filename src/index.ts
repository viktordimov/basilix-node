import { getDB } from "./db/sqlite";
import { loadBotConfig } from "./config/loadConfig";
import { startDiscordBot } from "./dc/client";
import { startTwitchBot } from "./ttv/client";
import { spawn } from "child_process";
import path from "path";

async function isConfigReady(): Promise<boolean> {
  const db = await getDB();

  const twitchToken = await db.get(
    `SELECT access_token FROM twitch_token WHERE id = 1`
  );
  const configCount = await db.get(`SELECT COUNT(*) as count FROM bot_config`);

  return twitchToken?.access_token && configCount?.count > 0;
}

async function runInitScript() {
  return new Promise<void>((resolve, reject) => {
    const initPath = path.resolve(__dirname, "./config/initConfig.ts");
    const proc = spawn("npx", ["ts-node", initPath], {
      stdio: "inherit",
      shell: true,
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`initToken.ts exited with code ${code}`));
    });
  });
}

async function bootstrap() {
  const ready = await isConfigReady();
  if (!ready) {
    console.log("⚠️  Bot config not found. Running init-config...");
    await runInitScript();
  }

  const config = await loadBotConfig();
  console.log(`✅ Loaded config for bot: ${config.BOT_NAME}`);

  await startDiscordBot();
  await startTwitchBot();
}

bootstrap().catch((err) => {
  console.error("❌ Startup failed:", err);
});
