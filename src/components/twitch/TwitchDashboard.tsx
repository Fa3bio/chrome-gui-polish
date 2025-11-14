import { useState } from "react";
import { AuthView } from "./AuthView";
import { StreamerHeader } from "./StreamerHeader";
import { ClipsSection } from "./ClipsSection";
import { ChatLogSection } from "./ChatLogSection";
import { BanModal } from "./BanModal";

// Mock data types - in produzione questi dati verrebbero da popup.js
interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  views: number;
  createdAt: string;
  creator: string;
}

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

export const TwitchDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // In produzione: false
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ userId: "", username: "" });

  // Mock data - in produzione questi dati verrebbero gestiti da popup.js
  const [streamerData] = useState({
    icon: "icon.png",
    name: "Esempio Streamer",
    title: "Streaming di esempio - Dashboard Twitch",
    viewers: "1.2K"
  });

  const [clips] = useState<Clip[]>([
    {
      id: "1",
      title: "Momento Epico #1",
      thumbnail: "https://via.placeholder.com/320x180/9147ff/ffffff?text=Clip+1",
      url: "#",
      views: 1523,
      createdAt: "2h fa",
      creator: "Viewer123"
    },
    {
      id: "2",
      title: "Best Play Ever",
      thumbnail: "https://via.placeholder.com/320x180/9147ff/ffffff?text=Clip+2",
      url: "#",
      views: 892,
      createdAt: "5h fa",
      creator: "FanGamer"
    }
  ]);

  const [logEntries] = useState<LogEntry[]>([
    { id: "header", type: "header", text: "Log Chat - Live Session" },
    { id: "sep1", type: "separator", text: "─── Inizio Sessione ───" },
    { 
      id: "1", 
      type: "join", 
      username: "User123", 
      userId: "12345",
      timestamp: "14:32:15"
    },
    { 
      id: "2", 
      type: "join", 
      username: "BadWord456", 
      userId: "67890",
      timestamp: "14:33:20",
      flagged: true,
      warning: "NOME"
    },
    { 
      id: "3", 
      type: "leave", 
      username: "User123", 
      userId: "12345",
      timestamp: "14:45:10"
    }
  ]);

  const handleLogin = () => {
    // In produzione: chrome.runtime.sendMessage({ action: 'login' })
    console.log("Login richiesto");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // In produzione: chrome.runtime.sendMessage({ action: 'logout' })
    if (confirm("Logout?")) {
      console.log("Logout richiesto");
      setIsAuthenticated(false);
    }
  };

  const handleDeleteClip = (clipId: string) => {
    // In produzione: chiamata API per eliminare la clip
    console.log("Delete clip:", clipId);
  };

  const handleBanUser = (userId: string, username: string) => {
    setSelectedUser({ userId, username });
    setBanModalOpen(true);
  };

  const handleConfirmBan = (duration: number, reason: string) => {
    // In produzione: chrome.runtime.sendMessage({ action: 'ban', userId, duration, reason })
    console.log("Ban user:", selectedUser.userId, "Duration:", duration, "Reason:", reason);
    setBanModalOpen(false);
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-full min-h-[550px] overflow-hidden">
      <StreamerHeader
        streamerIcon={streamerData.icon}
        streamerName={streamerData.name}
        streamTitle={streamerData.title}
        viewers={streamerData.viewers}
        onLogout={handleLogout}
      />

      <main className="flex flex-grow overflow-hidden">
        <ClipsSection
          clips={clips}
          loading={false}
          error={null}
          onDeleteClip={handleDeleteClip}
        />

        <ChatLogSection
          entries={logEntries}
          onBanUser={handleBanUser}
        />
      </main>

      <BanModal
        open={banModalOpen}
        username={selectedUser.username}
        onClose={() => setBanModalOpen(false)}
        onConfirm={handleConfirmBan}
      />
    </div>
  );
};
