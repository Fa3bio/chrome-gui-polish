import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface ChatLogSectionProps {
  entries: LogEntry[];
  onBanUser: (userId: string, username: string) => void;
}

export const ChatLogSection = ({ entries, onBanUser }: ChatLogSectionProps) => {
  return (
    <aside className="flex-shrink-0 w-[350px] bg-card-secondary flex flex-col overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        <ul className="list-none p-0 m-0 text-sm text-muted-foreground space-y-0">
          {entries.map((entry) => {
            if (entry.type === 'header') {
              return (
                <li key={entry.id} className="font-bold text-foreground pb-3 text-base">
                  {entry.text}
                </li>
              );
            }

            if (entry.type === 'separator') {
              return (
                <li key={entry.id} className="py-3 border-t-2 border-primary text-center text-primary font-bold text-sm">
                  {entry.text}
                </li>
              );
            }

            const isJoin = entry.type === 'join';
            const colorClass = isJoin ? 'text-twitch-enter' : 'text-twitch-exit';
            const arrow = isJoin ? '→' : '←';

            return (
              <li
                key={entry.id}
                className={`py-2.5 border-b border-border flex justify-between items-center gap-2 ${
                  entry.flagged ? 'bg-destructive/10' : ''
                }`}
              >
                <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className={`font-bold text-base ${colorClass}`}>{arrow}</span>{' '}
                  {entry.warning && (
                    <span className="text-destructive font-bold mr-1 text-sm">[{entry.warning}]</span>
                  )}
                  <a
                    href={`https://www.twitch.tv/popout/moderator/${entry.username}/viewercard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {entry.username}
                  </a>
                  {entry.timestamp && (
                    <span className="text-xs text-muted-foreground ml-1.5">
                      {entry.timestamp}
                    </span>
                  )}
                </span>
                {entry.userId && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onBanUser(entry.userId!, entry.username!)}
                    className="flex-shrink-0 text-xs px-2 py-1 h-auto"
                  >
                    Ban
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </aside>
  );
};
