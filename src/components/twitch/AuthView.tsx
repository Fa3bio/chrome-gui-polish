import { Button } from "@/components/ui/button";

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView = ({ onLogin }: AuthViewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <p className="text-foreground">Per favore, accedi a Twitch per continuare.</p>
      <Button 
        onClick={onLogin}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Accedi con Twitch
      </Button>
    </div>
  );
};
