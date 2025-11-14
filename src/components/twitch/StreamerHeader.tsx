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
    <header className="flex items-center justify-between gap-3 border-b border-border bg-card-secondary p-3 flex-shrink-0">
      {/* A: Profilo Streamer */}
      <div className="flex items-center gap-3 order-1">
        <img 
          src={streamerIcon} 
          alt="Icona Streamer" 
          className="h-12 w-12 rounded-full border-2 border-primary object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-foreground leading-tight">
            {streamerName}
          </h2>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            {streamTitle}
          </p>
        </div>
      </div>

      {/* B: Status Live */}
      <div className="flex items-center gap-2 bg-twitch-live text-white px-2 py-1 rounded text-xs font-bold order-2 flex-shrink-0">
        <span className="text-xs">{viewers}</span>
        <span className="text-[10px]">●</span>
        <span>LIVE</span>
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
        className="order-4 ml-2 h-10 w-10 border border-border hover:border-twitch-exit hover:text-twitch-exit"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </header>
  );
};
