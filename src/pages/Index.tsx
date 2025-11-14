import { TwitchDashboard } from "@/components/twitch/TwitchDashboard";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[95vw]">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Dashboard Moderazione Twitch
          </h1>
          <p className="text-sm text-muted-foreground">
            Convertita in React - Modificabile con Visual Edit
          </p>
        </div>
        
        <div className="rounded-xl border border-border bg-card/30 p-3 shadow-2xl backdrop-blur">
          <div className="w-full h-[80vh] min-h-[600px] rounded-lg border border-border/50 bg-background overflow-hidden">
            <TwitchDashboard />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 font-bold text-sm">✨ Conversione React Completata</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Interfaccia convertita in componenti React modulari</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Design system Tailwind integrato con colori Twitch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Modificabile con Visual Edit - tutti gli elementi sono selezionabili</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Struttura pronta per integrazione con popup.js</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
