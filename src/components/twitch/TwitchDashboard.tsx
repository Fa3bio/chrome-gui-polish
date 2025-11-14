import { useState } from "react";
import { AuthView } from "./AuthView";
import { StreamerHeader } from "./StreamerHeader";
import { ClipsSection } from "./ClipsSection";
import { ChatLogSection } from "./ChatLogSection";
import { BanModal } from "./BanModal";
import { useTwitchDashboard } from "@/hooks/useTwitchDashboard";

export const TwitchDashboard = () => {
  const {
    isAuthenticated,
    loading,
    streamerData,
    clips,
    logEntries,
    handleLogin,
    handleLogout,
    handleDeleteClip,
    handleBanUser: banUser
  } = useTwitchDashboard();

  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ username: "" });

  const handleBanUser = (userId: string, username: string) => {
    setSelectedUser({ username });
    setBanModalOpen(true);
  };

  const handleConfirmBan = (duration: number, reason: string) => {
    banUser(selectedUser.username, duration, reason);
    setBanModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-foreground">Caricamento...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-full min-h-[550px] overflow-hidden">
      {streamerData && (
        <StreamerHeader
          streamerIcon={streamerData.icon}
          streamerName={streamerData.name}
          streamTitle={streamerData.title}
          viewers={streamerData.viewers}
          onLogout={handleLogout}
        />
      )}

      <main className="flex flex-grow overflow-hidden">
        <ClipsSection
          clips={clips.map(clip => ({
            id: clip.id,
            title: clip.title,
            thumbnail: clip.thumbnail_url,
            url: clip.url,
            views: clip.view_count,
            createdAt: timeAgo(clip.created_at),
            creator: clip.creator_name
          }))}
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

function timeAgo(dateString: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " anni fa";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " mesi fa";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " giorni fa";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " ore fa";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minuti fa";
  return "pochi secondi fa";
}
