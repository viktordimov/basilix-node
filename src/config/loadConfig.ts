import { getDB } from "../db/sqlite";
import { BotConfig } from "./botConfig";

export async function loadBotConfig(): Promise<BotConfig> {
  const db = await getDB();
  const rows = await db.all<{ key: string; value: string }[]>(
    `SELECT key, value FROM bot_config`
  );

  const configObject = Object.fromEntries(
    rows.map((row: { key: any; value: any }) => [row.key, row.value])
  );

  const parsed: BotConfig = {
    TTV_BOT_CLIENT_ID: configObject.TTV_BOT_CLIENT_ID,
    TTV_BOT_CLIENT_SECRET: configObject.TTV_BOT_CLIENT_SECRET,
    TTV_ACCESS_TOKEN: configObject.TTV_ACCESS_TOKEN,
    TTV_REFRESH_TOKEN: configObject.TTV_REFRESH_TOKEN,
    TTV_BOT_USERNAME: configObject.TTV_BOT_USERNAME,
    TTV_CHANNEL: configObject.TTV_CHANNEL,
    TTV_OWNER_ID: configObject.TTV_OWNER_ID,

    DC_BOT_TOKEN: configObject.DC_BOT_TOKEN,
    DC_BOT_CLIENT_ID: parseInt(configObject.DC_BOT_CLIENT_ID),
    DC_BOT_SECRET: configObject.DC_BOT_SECRET,
    DC_ADMIN_CHANNEL_ID: parseInt(configObject.DC_ADMIN_CHANNEL_ID),
    DC_CHATLOG_CHANNEL_ID: parseInt(configObject.DC_CHATLOG_CHANNEL_ID),
    DC_OWNER_ID: parseInt(configObject.DC_OWNER_ID),

    BOT_NAME: configObject.BOT_NAME,

    TTV_EMOJI: configObject.TTV_EMOJI_ID,
  };

  return parsed;
}
