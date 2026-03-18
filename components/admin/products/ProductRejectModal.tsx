"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

import type { ProposedProduct } from "@/types/product";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductRejectModalProps {
  product: ProposedProduct | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (product: ProposedProduct, reason: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductRejectModal({
  product,
  open,
  onClose,
  onConfirm,
}: ProductRejectModalProps) {
  const t = useTranslations("admin");
  const [reason, setReason] = useState("");
  const [error, setError]   = useState(false);

  function handleConfirm() {
    if (!product) return;
    if (reason.trim().length < 10) {
      setError(true);
      return;
    }
    onConfirm(product, reason.trim());
    handleClose();
  }

  function handleClose() {
    setReason("");
    setError(false);
    onClose();
  }

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <X className="h-4 w-4 text-destructive" aria-hidden="true" />
            </div>
            <DialogTitle>{t("rejectModal.title")}</DialogTitle>
          </div>
          <DialogDescription>
            {t("rejectModal.description", { name: product.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="reject-reason" className="text-sm font-medium">
            {t("rejectModal.reasonLabel")}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Textarea
            id="reject-reason"
            placeholder={t("rejectModal.reasonPlaceholder")}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError(false);
            }}
            rows={4}
            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {error && (
            <p className="text-xs text-destructive">
              {t("rejectModal.reasonError")}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {t("rejectModal.reasonHint")}
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            {t("actions.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={reason.trim().length === 0}
          >
            {t("actions.confirmReject")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
