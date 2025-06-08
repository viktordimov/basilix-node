import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { loadBotConfig } from "../config/loadConfig";

export async function startDiscordBot() {
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
    client.user?.setActivity(config.BOT_NAME, {
      type: ActivityType.Streaming,
      url: `https://www.twitch.tv/${config.TTV_CHANNEL}`,
    });
  });

  // Ping test
  client.on("messageCreate", (message) => {
    if (message.content === "!ping") {
      message.channel.send("Pong! from Discord");
    }
  });

  const config = await loadBotConfig();
  client.login(config.DC_BOT_TOKEN);
}
