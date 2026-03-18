"use client";

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
import { Trash2 } from "lucide-react";

import type { ProposedProduct } from "@/types/product";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductDeleteModalProps {
  product: ProposedProduct | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (product: ProposedProduct) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductDeleteModal({
  product,
  open,
  onClose,
  onConfirm,
}: ProductDeleteModalProps) {
  const t = useTranslations("admin");

  if (!product) return null;

  function handleConfirm() {
    if (!product) return;
    onConfirm(product);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
            </div>
            <DialogTitle>{t("deleteModal.title")}</DialogTitle>
          </div>
          <DialogDescription>
            {t("deleteModal.description", { name: product.name })}
          </DialogDescription>
        </DialogHeader>

        {/* Info about logical deletion */}
        <div className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">{t("deleteModal.logicalTitle")}</p>
          <p>{t("deleteModal.logicalDescription")}</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {t("deleteModal.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
