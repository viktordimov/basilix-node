import dotenv from "dotenv";
dotenv.config();

export const config = {
  ttv_client_id: process.env.TTV_BOT_CLIENT_ID!,
  ttv_client_secret: process.env.TTV_BOT_CLIENT_SECRET!,
  ttv_channel: process.env.TTV_CHANNEL!,
  ttv_owner_id: process.env.TTV_OWNER_ID!,
  ttv_access_token: process.env.TTV_ACCESS_TOKEN!,
  dc_bot_token: process.env.DC_BOT_TOKEN!,
  dc_bot_client_id: Number(process.env.DC_BOT_CLIENT_ID!),
  dc_bot_secret: process.env.DC_BOT_SECRET!,
  dc_admin_channel_id: Number(process.env.DC_ADMIN_CHANNEL_ID!),
  dc_chatlog_channel_id: Number(process.env.DC_CHATLOG_CHANNEL_ID!),
  dc_owner_id: Number(process.env.DC_OWNER_ID!),
  bot_name: process.env.BOT_NAME!,
  ttv_emoji_id: process.env.TTV_EMOJI_ID!,
};
