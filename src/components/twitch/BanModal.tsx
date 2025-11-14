import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BanModalProps {
  open: boolean;
  username: string;
  onClose: () => void;
  onConfirm: (duration: number, reason: string) => void;
}

export const BanModal = ({ open, username, onClose, onConfirm }: BanModalProps) => {
  const [duration, setDuration] = useState(300);
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(duration, reason);
    setDuration(300);
    setReason("");
  };

  const handleClose = () => {
    onClose();
    setDuration(300);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Banna Utente</DialogTitle>
          <DialogDescription>
            Stai per bannare: <strong className="text-foreground">{username}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ban-duration">Durata (secondi):</Label>
            <Input
              id="ban-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ban-reason">Motivo (opzionale):</Label>
            <Input
              id="ban-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nessun motivo"
              className="bg-muted border-border"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Conferma Ban
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
