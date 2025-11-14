const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[95vw]">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Preview Estensione Chrome
          </h1>
          <p className="text-sm text-muted-foreground">
            Barre header rimosse - Layout pulito senza "🎬 Sezione Clip" e "💬 Log Entrata/Uscita"
          </p>
        </div>
        
        <div className="rounded-xl border border-border bg-card/30 p-3 shadow-2xl backdrop-blur">
          <iframe 
            src="/popup.html" 
            className="w-full h-[80vh] rounded-lg border border-border/50 bg-background"
            title="Chrome Extension Preview"
            style={{ minHeight: '600px' }}
          />
        </div>

        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 font-bold text-sm">✨ Modifiche Applicate</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Rimosse le barre header "🎬 Sezione Clip" e "💬 Log Entrata/Uscita"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Aumentato padding delle sezioni per maggiore respiro visivo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Layout più pulito e minimalista mantenendo tutte le funzionalità</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
