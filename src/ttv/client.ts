import tmi from "tmi.js";
import { loadBotConfig } from "../config/loadConfig";
import { getValidAccessToken } from "./auth";

export async function startTwitchBot() {
  const config = await loadBotConfig();
  const accessToken = await getValidAccessToken();

  const twitchClient = new tmi.Client({
    identity: {
      username: config.TTV_BOT_CLIENT_ID,
      password: `oauth:${accessToken}`,
    },
    channels: [config.TTV_CHANNEL],
  });

  twitchClient.on("connected", () => {
    console.log(`Logged on Twitch as ${config.BOT_NAME}`);
  });

  twitchClient.on("message", (channel, tags, message, self) => {
    if (self) return;
    if (message.trim() === "!ping") {
      twitchClient.say(channel, `Pong! from Twitch, @${tags.username}`);
    }
  });

  await twitchClient.connect();
}
