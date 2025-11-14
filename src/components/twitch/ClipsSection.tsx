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
          <AlertCircle className="w-12 h-12 mb-4 stroke-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground m-0">Caricamento...</h3>
          <p className="text-sm mt-1">Caricamento dati API...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-5 text-center min-h-[300px]">
          <AlertCircle className="w-12 h-12 mb-4 stroke-destructive" />
          <h3 className="text-lg font-semibold text-foreground m-0">Errore</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      );
    }

    if (clips.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-5 text-center min-h-[300px]">
          <AlertCircle className="w-12 h-12 mb-4 stroke-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground m-0">Nessuna Clip</h3>
          <p className="text-sm mt-1">Non ci sono clip recenti da mostrare</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="bg-card rounded-lg border border-border overflow-hidden transition-all hover:border-primary hover:-translate-y-0.5 flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-card-secondary">
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover block"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent text-xs font-medium text-white">
                <span>{clip.views} views</span>
                <span>{clip.createdAt}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-2.5 flex justify-between items-start gap-2">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  {clip.title}
                </p>
                <span className="text-xs text-muted-foreground">{clip.creator}</span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDeleteClip(clip.id)}
                className="flex-shrink-0 text-xs px-2.5 py-1 h-auto"
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
    <section className="flex-grow bg-card overflow-auto flex flex-col">
      {renderContent()}
    </section>
  );
};
