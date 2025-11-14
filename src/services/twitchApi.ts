/// <reference path="../types/chrome.d.ts" />
const CLIENT_ID = "4o4ptfoymh5w6y0tk8hobwbdz3wmq9";

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  title: string;
  viewer_count: number;
  started_at: string;
}

export interface TwitchClip {
  id: string;
  title: string;
  thumbnail_url: string;
  url: string;
  view_count: number;
  created_at: string;
  creator_name: string;
  creator_id: string;
}

export interface Chatter {
  user_login: string;
  user_id: string;
}

class TwitchApiService {
  private token: string | null = null;
  private modId: string | null = null;

  async initialize() {
    const data = await new Promise<{ twitch_token?: string; mod_id?: string }>((resolve) => {
      chrome.storage.local.get(['twitch_token', 'mod_id'], resolve);
    });
    this.token = data.twitch_token || null;
    this.modId = data.mod_id || null;
  }

  private getHeaders() {
    if (!this.token) throw new Error("Token mancante");
    return {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${this.token}`
    };
  }

  async getUser(login: string): Promise<TwitchUser | null> {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
      headers: this.getHeaders()
    });
    const data = await response.json();
    return data.data?.[0] || null;
  }

  async getStream(userLogin: string): Promise<TwitchStream | null> {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${userLogin}`, {
      headers: this.getHeaders()
    });
    const data = await response.json();
    return data.data?.[0] || null;
  }

  async getClips(broadcasterId: string, startedAt: string): Promise<TwitchClip[]> {
    const response = await fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&started_at=${startedAt}&first=50`,
      { headers: this.getHeaders() }
    );
    const data = await response.json();
    return data.data || [];
  }

  async getChatters(broadcasterId: string): Promise<Chatter[]> {
    if (!this.modId) throw new Error("Mod ID mancante");
    
    let allChatters: Chatter[] = [];
    let cursor: string | null = null;

    do {
      const url = `https://api.twitch.tv/helix/chat/chatters?broadcaster_id=${broadcasterId}&moderator_id=${this.modId}&first=1000${cursor ? `&after=${cursor}` : ''}`;
      const response = await fetch(url, { headers: this.getHeaders() });
      const data = await response.json();

      if (!data.data) throw new Error(`Errore API Chatters (${response.status})`);

      allChatters = allChatters.concat(data.data);
      cursor = data.pagination?.cursor || null;
    } while (cursor);

    return allChatters;
  }

  async deleteClip(clipId: string): Promise<void> {
    const query = {
      operationName: "DeleteClipMutation",
      query: `mutation { deleteClip(input: {id: "${clipId}"}) { clip { id } } }`
    };

    const response = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0].message);
  }

  async banUser(broadcasterId: string, userId: string, duration: number, reason: string): Promise<void> {
    if (!this.modId) throw new Error("Mod ID mancante");

    const response = await fetch(
      `https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${broadcasterId}&moderator_id=${this.modId}`,
      {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: { user_id: userId, duration, reason }
        })
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }

  async getUserIdByName(username: string): Promise<string | null> {
    const user = await this.getUser(username);
    return user?.id || null;
  }
}

export const twitchApi = new TwitchApiService();
