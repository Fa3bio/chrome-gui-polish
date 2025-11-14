/// <reference path="../types/chrome.d.ts" />
import { useState, useEffect, useCallback, useRef } from 'react';
import { twitchApi } from '@/services/twitchApi';
import { checkUsernameIsSuspicious } from '@/utils/badwords';
import type { TwitchClip } from '@/services/twitchApi';

interface LogEntry {
  id: string;
  type: 'join' | 'leave' | 'header' | 'separator';
  username?: string;
  userId?: string;
  timestamp?: string;
  flagged?: boolean;
  warning?: string;
  text?: string;
}

interface StreamerData {
  icon: string;
  name: string;
  title: string;
  viewers: string;
}

const MAX_LOG_ENTRIES = 50;

export const useTwitchDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streamerData, setStreamerData] = useState<StreamerData | null>(null);
  const [clips, setClips] = useState<TwitchClip[]>([]);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 'header', type: 'header', text: 'In attesa...' }
  ]);
  
  const previousUserListRef = useRef<Set<string>>(new Set());
  const isFirstChatLoadRef = useRef(true);
  const currentBroadcasterIdRef = useRef<string | null>(null);
  const liveStartedAtRef = useRef<string | null>(null);
  const liveSessionClipsRef = useRef<Map<string, TwitchClip>>(new Map());
  const modIdRef = useRef<string | null>(null);

  const checkLoginStatus = useCallback(async () => {
    const data = await new Promise<{ twitch_token?: string; mod_id?: string }>((resolve) => {
      chrome.storage.local.get(['twitch_token', 'mod_id'], resolve);
    });
    if (data.twitch_token && data.mod_id) {
      modIdRef.current = data.mod_id;
      await twitchApi.initialize();
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'login' }, (res) => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        alert(`Errore: ${res.message}`);
      }
    });
  }, []);

  const handleLogout = useCallback(() => {
    if (confirm("Logout?")) {
      chrome.runtime.sendMessage({ action: 'logout' }, () => {
        window.location.reload();
      });
    }
  }, []);

  const updateLogHeader = useCallback((totalOrText: number | string) => {
    setLogEntries(prev => {
      const newEntries = [...prev];
      const headerIndex = newEntries.findIndex(e => e.type === 'header');
      if (headerIndex !== -1) {
        newEntries[headerIndex] = {
          ...newEntries[headerIndex],
          text: typeof totalOrText === 'number' 
            ? `Utenti in chat (${totalOrText.toLocaleString('it-IT')})`
            : totalOrText
        };
      }
      return newEntries;
    });
  }, []);

  const addLogSeparator = useCallback(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setLogEntries(prev => {
      const filtered = prev.filter(e => e.type !== 'separator');
      const headerIndex = filtered.findIndex(e => e.type === 'header');
      
      const separator: LogEntry = {
        id: `sep-${Date.now()}`,
        type: 'separator',
        text: `--- Aggiornato alle ${timeString} ---`
      };
      
      if (headerIndex !== -1) {
        return [
          filtered[headerIndex],
          separator,
          ...filtered.slice(headerIndex + 1)
        ];
      }
      return [separator, ...filtered];
    });
  }, []);

  const diffAndLogUsers = useCallback((list: string[], total: number) => {
    const set = new Set(list.map(n => n.toLowerCase()));
    
    if (isFirstChatLoadRef.current) {
      updateLogHeader(total);
      addLogSeparator();
      previousUserListRef.current = set;
      isFirstChatLoadRef.current = false;
      return;
    }

    const entered = [...set].filter(u => !previousUserListRef.current.has(u));
    const exited = [...previousUserListRef.current].filter(u => !set.has(u));

    if (entered.length || exited.length) {
      addLogSeparator();
      
      setLogEntries(prev => {
        let newEntries = [...prev];
        const headerIndex = newEntries.findIndex(e => e.type === 'header');
        const insertIndex = headerIndex !== -1 ? headerIndex + 2 : 1;

        const newLogs: LogEntry[] = [];
        
        // Aggiungi usciti
        exited.slice(0, 10).forEach(username => {
          newLogs.push({
            id: `exit-${username}-${Date.now()}`,
            type: 'leave',
            username,
            timestamp: new Date().toLocaleTimeString('it-IT')
          });
        });

        // Aggiungi entrati
        entered.slice(0, 10).forEach(username => {
          const isSuspicious = checkUsernameIsSuspicious(username);
          newLogs.push({
            id: `join-${username}-${Date.now()}`,
            type: 'join',
            username,
            timestamp: new Date().toLocaleTimeString('it-IT'),
            flagged: isSuspicious,
            warning: isSuspicious ? 'WARN' : undefined
          });
        });

        newEntries.splice(insertIndex, 0, ...newLogs);

        // Limita il numero di log
        const regularLogs = newEntries.filter(e => e.type === 'join' || e.type === 'leave');
        if (regularLogs.length > MAX_LOG_ENTRIES) {
          const toRemove = regularLogs.slice(MAX_LOG_ENTRIES);
          newEntries = newEntries.filter(e => !toRemove.includes(e));
        }

        return newEntries;
      });
    }

    updateLogHeader(total);
    previousUserListRef.current = set;
  }, [updateLogHeader, addLogSeparator]);

  const loadChatters = useCallback(async () => {
    if (!currentBroadcasterIdRef.current || !modIdRef.current) return;

    try {
      const chatters = await twitchApi.getChatters(currentBroadcasterIdRef.current);
      const usernames = chatters.map(c => c.user_login.toLowerCase());
      diffAndLogUsers(usernames, chatters.length);
    } catch (err) {
      console.error("Errore caricamento chatters:", err);
      updateLogHeader("Errore API");
    }
  }, [diffAndLogUsers, updateLogHeader]);

  const loadData = useCallback(async (streamerName: string) => {
    try {
      const user = await twitchApi.getUser(streamerName);
      if (!user) throw new Error("Streamer non trovato");

      if (!currentBroadcasterIdRef.current) {
        currentBroadcasterIdRef.current = user.id;
        loadChatters();
      }

      setStreamerData({
        icon: user.profile_image_url,
        name: user.display_name,
        title: "Caricamento...",
        viewers: "..."
      });

      const stream = await twitchApi.getStream(streamerName);
      
      if (stream) {
        setStreamerData(prev => prev ? {
          ...prev,
          title: stream.title,
          viewers: stream.viewer_count.toLocaleString('it-IT')
        } : null);

        if (liveStartedAtRef.current !== stream.started_at) {
          liveStartedAtRef.current = stream.started_at;
          liveSessionClipsRef.current.clear();
          setClips([]);
        }

        const newClips = await twitchApi.getClips(user.id, stream.started_at);
        const filteredClips = newClips.filter(clip => !liveSessionClipsRef.current.has(clip.id));
        
        if (filteredClips.length > 0) {
          filteredClips.forEach(clip => liveSessionClipsRef.current.set(clip.id, clip));
          setClips(prev => [...filteredClips, ...prev].slice(0, 50));
        }
      } else {
        setStreamerData(prev => prev ? {
          ...prev,
          title: "Non in diretta",
          viewers: "Offline"
        } : null);
        setClips([]);
        updateLogHeader("Offline");
      }
    } catch (err) {
      console.error("Errore caricamento dati:", err);
    }
  }, [loadChatters, updateLogHeader]);

  const handleDeleteClip = useCallback(async (clipId: string) => {
    try {
      await twitchApi.deleteClip(clipId);
      setClips(prev => prev.filter(c => c.id !== clipId));
      liveSessionClipsRef.current.delete(clipId);
      alert("Clip eliminata!");
    } catch (err: any) {
      alert(`Errore: ${err.message}`);
    }
  }, []);

  const handleBanUser = useCallback(async (username: string, duration: number, reason: string) => {
    try {
      const userId = await twitchApi.getUserIdByName(username);
      if (!userId || !currentBroadcasterIdRef.current) {
        alert("Utente non trovato");
        return;
      }

      await twitchApi.banUser(currentBroadcasterIdRef.current, userId, duration, reason);
      alert("Ban eseguito!");
    } catch (err: any) {
      alert(`Errore: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const streamerName = window.location.hash.substring(1).toLowerCase();
    if (!streamerName || ['directory', 'inventory', 'settings'].includes(streamerName)) {
      return;
    }

    loadData(streamerName);

    const dataInterval = setInterval(() => loadData(streamerName), 10000);
    const chatInterval = setInterval(() => loadChatters(), 7000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(chatInterval);
    };
  }, [isAuthenticated, loadData, loadChatters]);

  return {
    isAuthenticated,
    loading,
    streamerData,
    clips,
    logEntries,
    handleLogin,
    handleLogout,
    handleDeleteClip,
    handleBanUser
  };
};
