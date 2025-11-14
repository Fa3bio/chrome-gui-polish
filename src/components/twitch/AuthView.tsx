import { Button } from "@/components/ui/button";

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView = ({ onLogin }: AuthViewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      <p className="text-foreground text-lg font-medium">Per favore, accedi a Twitch per continuare.</p>
      <Button 
        onClick={onLogin}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all"
      >
        Accedi con Twitch
      </Button>
    </div>
  );
};
