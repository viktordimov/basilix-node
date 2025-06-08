export interface BotConfig {
  // Twitch Bot Configuration
  TTV_BOT_CLIENT_ID: string;
  TTV_BOT_CLIENT_SECRET: string;
  TTV_ACCESS_TOKEN: string;
  TTV_REFRESH_TOKEN: string;
  TTV_BOT_USERNAME: string;
  TTV_CHANNEL: string;
  TTV_OWNER_ID: string;

  DC_BOT_TOKEN: string;
  DC_BOT_CLIENT_ID: number;
  DC_BOT_SECRET: string;
  DC_ADMIN_CHANNEL_ID: number;
  DC_CHATLOG_CHANNEL_ID: number;
  DC_OWNER_ID: number;

  BOT_NAME: string;

  TTV_EMOJI: string;
}
