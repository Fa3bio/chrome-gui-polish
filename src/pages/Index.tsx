const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Preview Estensione Chrome - Clip Manager
          </h1>
          <p className="text-muted-foreground">
            Design modernizzato con glassmorphism, animazioni fluide e palette colori sofisticata
          </p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
          <iframe 
            src="/popup.html" 
            className="w-full h-[700px] rounded-lg border border-border/50"
            title="Chrome Extension Preview"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold">Design Moderno</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Palette colori sofisticata con gradienti premium e effetti glassmorphism
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold">Animazioni Fluide</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Transizioni smooth con cubic-bezier, hover effects e micro-interazioni
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card/50 p-6 backdrop-blur">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold">Zero Modifiche</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Funzionalità intatta al 100%. Solo aspetto estetico migliorato
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h3 className="mb-3 font-bold">✨ Miglioramenti Principali</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Palette Colori:</strong> Viola premium (#7c5cff), gradienti sofisticati e colori semantici moderni</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Glassmorphism:</strong> Effetti vetro con backdrop-blur per cards, header e modal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Animazioni:</strong> Pulse sul badge LIVE, float per empty state, ripple sui button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Ombre Eleganti:</strong> Shadow system con glow effects per elementi interattivi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Tipografia:</strong> Font weights ottimizzati, letter-spacing e line-height migliorati</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong className="text-foreground">Scrollbar Custom:</strong> Barre di scorrimento personalizzate che si integrano col design</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
