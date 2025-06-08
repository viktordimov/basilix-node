import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { config } from "../config/env";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildExpressions,
  ],
});

client.once("ready", () => {
  console.log(`Logged on Discord as ${client.user?.tag}`);
  client.user?.setActivity(config.bot_name, {
    type: ActivityType.Streaming,
    url: `https://www.twitch.tv/${config.ttv_channel}`,
  });
});

// Ping test
client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.channel.send("Pong! from Discord");
  }
});

export function startDiscordBot() {
  client.login(config.dc_bot_token);
}
