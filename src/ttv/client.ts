import tmi from "tmi.js";
import { config } from "../config/env";

const twitchClient = new tmi.Client({
  identity: {
    username: config.ttv_client_id,
    password: `oauth:${config.ttv_access_token}`,
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

export function startTwitchBot() {
  twitchClient.connect().catch(console.error);
}
