import tmi from "tmi.js";
import { config } from "../config/env";
import { getValidAccessToken } from "./auth";
import { get } from "http";

export async function startTwitchBot() {
  const accessToken = await getValidAccessToken();

  const twitchClient = new tmi.Client({
    identity: {
      username: config.ttv_client_id,
      password: `oauth:${accessToken}`,
    },
    channels: [config.ttv_channel],
  });

  twitchClient.on("connected", () => {
    console.log(`Logged on Twitch as ${config.bot_name}`);
  });

  twitchClient.on("message", (channel, tags, message, self) => {
    if (self) return;
    if (message.trim() === "!ping") {
      twitchClient.say(channel, `Pong! from Twitch, @${tags.username}`);
    }
  });

  await twitchClient.connect();
}
