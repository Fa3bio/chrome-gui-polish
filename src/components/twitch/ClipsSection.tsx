import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  views: number;
  createdAt: string;
  creator: string;
}

interface ClipsSectionProps {
  clips: Clip[];
  loading: boolean;
  error: string | null;
  onDeleteClip: (clipId: string) => void;
}

export const ClipsSection = ({ clips, loading, error, onDeleteClip }: ClipsSectionProps) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-5 text-center min-h-[300px]">
          <div className="animate-pulse">
            <AlertCircle className="w-16 h-16 mb-4 stroke-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground m-0 tracking-tight">Caricamento...</h3>
          <p className="text-sm mt-2 font-medium">Caricamento dati API...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-5 text-center min-h-[300px]">
          <AlertCircle className="w-16 h-16 mb-4 stroke-destructive" />
          <h3 className="text-xl font-bold text-foreground m-0 tracking-tight">Errore</h3>
          <p className="text-sm mt-2 font-medium">{error}</p>
        </div>
      );
    }

    if (clips.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-5 text-center min-h-[300px]">
          <AlertCircle className="w-16 h-16 mb-4 stroke-muted-foreground/50" />
          <h3 className="text-xl font-bold text-foreground m-0 tracking-tight">Nessuna Clip</h3>
          <p className="text-sm mt-2 font-medium">Non ci sono clip recenti da mostrare</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 flex flex-col group"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-card-secondary overflow-hidden">
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3 py-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-xs font-semibold text-white backdrop-blur-xs">
                <span className="flex items-center gap-1">
                  <span className="opacity-90">Views:</span>
                  {clip.views}
                </span>
                <span className="opacity-90">{clip.createdAt}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex justify-between items-start gap-2">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold m-0 whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
                  {clip.title}
                </p>
                <span className="text-xs text-muted-foreground/70 font-medium">{clip.creator}</span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDeleteClip(clip.id)}
                className="flex-shrink-0 text-xs px-3 py-1.5 h-auto rounded-lg hover:scale-105 transition-transform"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="flex-grow bg-background overflow-auto flex flex-col p-5">
      <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 shadow-sm p-5 h-full overflow-auto">
        {renderContent()}
      </div>
    </section>
  );
};
