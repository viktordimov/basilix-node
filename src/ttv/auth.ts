import axios from "axios";
import { getDB } from "../db/sqlite";
import { loadBotConfig } from "../config/loadConfig";

interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

async function getStoredToken(): Promise<TokenData> {
  const db = await getDB();
  const row = await db.get<TokenData>(
    "SELECT access_token, refresh_token, expires_at FROM twitch_token WHERE id = 1"
  );
  return row!;
}

async function updateStoredToken(token: TokenData) {
  const db = await getDB();
  await db.run(
    `UPDATE twitch_token SET access_token = ?, refresh_token = ?, expires_at = ? WHERE id = 1`,
    token.access_token,
    token.refresh_token,
    token.expires_at
  );
}

async function validateToken(accessToken: string): Promise<boolean> {
  try {
    const res = await axios.get("https://id.twitch.tv/oauth2/validate", {
      headers: { Authorization: `OAuth ${accessToken}` },
    });
    return res.status === 200 && res.data.expires_in > 300;
  } catch {
    return false;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<TokenData> {
  const config = await loadBotConfig();
  const res = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: config.TTV_BOT_CLIENT_ID,
      client_secret: config.TTV_BOT_CLIENT_SECRET,
    },
  });

  const now = Math.floor(Date.now() / 1000);
  return {
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token,
    expires_at: now + res.data.expires_in,
  };
}

export async function getValidAccessToken(): Promise<string> {
  const token = await getStoredToken();
  const now = Math.floor(Date.now() / 1000);

  if (token.access_token && token.expires_at > now + 300) {
    const valid = await validateToken(token.access_token);
    if (valid) return token.access_token;
  }

  console.log("🔄 Refreshing Twitch token...");
  const newToken = await refreshAccessToken(token.refresh_token);
  await updateStoredToken(newToken);
  return newToken.access_token;
}
