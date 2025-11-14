import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreamerHeaderProps {
  streamerIcon: string;
  streamerName: string;
  streamTitle: string;
  viewers: string;
  onLogout: () => void;
}

export const StreamerHeader = ({
  streamerIcon,
  streamerName,
  streamTitle,
  viewers,
  onLogout
}: StreamerHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border/50 bg-card-secondary/80 backdrop-blur-md p-4 flex-shrink-0 shadow-lg">
      {/* A: Profilo Streamer */}
      <div className="flex items-center gap-3 order-1 transition-all hover:scale-[1.02]">
        <img 
          src={streamerIcon} 
          alt="Icona Streamer" 
          className="h-14 w-14 rounded-full border-2 border-primary/60 object-cover shadow-lg shadow-primary/20 ring-2 ring-primary/10"
        />
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-foreground leading-tight tracking-tight">
            {streamerName}
          </h2>
          <p className="text-xs text-muted-foreground/80 truncate max-w-[200px] font-medium">
            {streamTitle}
          </p>
        </div>
      </div>

      {/* B: Status Live */}
      <div className="flex items-center gap-2 bg-twitch-live text-white px-3 py-1.5 rounded-lg text-xs font-bold order-2 flex-shrink-0 shadow-md shadow-twitch-live/30 animate-pulse">
        <span className="text-xs font-semibold">{viewers}</span>
        <span className="text-[10px] animate-pulse">●</span>
        <span className="tracking-wider">LIVE</span>
      </div>

      {/* C: Titolo App (Centro) */}
      <div className="flex-grow order-3 px-5">
        <h1 className="text-sm font-semibold text-center text-foreground"></h1>
      </div>

      {/* D: Logout Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
        title="Logout"
        className="order-4 ml-2 h-10 w-10 rounded-lg border border-border/50 hover:border-twitch-exit hover:text-twitch-exit hover:bg-twitch-exit/10 transition-all hover:scale-105"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </header>
  );
};
