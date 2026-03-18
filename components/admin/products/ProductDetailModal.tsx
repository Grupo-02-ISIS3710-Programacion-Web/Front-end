"use client";

import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ImageOff, X } from "lucide-react";

import { ApprovalStatus, type ProposedProduct } from "@/types/product";
import {
  formatDate,
  toLabel,
} from "@/lib/string-utils";
import { ApprovalStatusBadge, CategoryBadge, ProductTypeBadge } from "./product-components-utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductDetailModalProps {
  product: ProposedProduct | null;
  open: boolean;
  onClose: () => void;
  onApprove: (product: ProposedProduct) => void;
  onReject: (product: ProposedProduct) => void;
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
      {children}
    </p>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductDetailModal({
  product,
  open,
  onClose,
  onApprove,
  onReject,
}: ProductDetailModalProps) {
  const t = useTranslations("admin");

  if (!product) return null;

  const canApprove = product.status === ApprovalStatus.PENDING;
  const canReject  =
    product.status === ApprovalStatus.PENDING ||
    product.status === ApprovalStatus.APPROVED;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 gap-0">

        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-lg font-semibold leading-tight">
                {product.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">{product.brand}</p>
            </div>
            <ApprovalStatusBadge
              status={product.status}
              label={t(`products.status.${product.status}`)}
            />
          </div>
        </DialogHeader>

        <Separator />

        {/* Body */}
        <ScrollArea className="max-h-[60vh]">
          <div className="px-6 py-5 space-y-5">

            {/* Images */}
            <div>
              <SectionLabel>{t("productDetail.images")}</SectionLabel>
              {product.image_url.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {product.image_url.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`${product.name} ${i + 1}`}
                      className="h-20 w-20 rounded-md object-cover border"
                    />
                  ))}
                </div>
              ) : (
                <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                  <ImageOff className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Basic info grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SectionLabel>{t("products.colType")}</SectionLabel>
                <ProductTypeBadge value={product.product_type} />
              </div>
              <div>
                <SectionLabel>{t("products.colCategory")}</SectionLabel>
                <div className="flex flex-wrap gap-1">
                  <CategoryBadge category={product.primary_category} />
                  {product.additional_categories?.map((cat) => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                </div>
              </div>
              <div>
                <SectionLabel>{t("productDetail.skinType")}</SectionLabel>
                <div className="flex flex-wrap gap-1">
                  {product.skin_type.map((st) => (
                    <Badge key={st} variant="outline" className="text-[10px] capitalize">
                      {toLabel(st)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <SectionLabel>{t("productsPage.table.submittedBy")}</SectionLabel>
                <p className="text-sm">
                  {product.submitted_by ?? "—"}
                  <span className="text-muted-foreground ml-2 text-xs">
                    {formatDate(product.submitted_at)}
                  </span>
                </p>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <SectionLabel>{t("productDetail.description")}</SectionLabel>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Ingredients */}
            <div>
              <SectionLabel>
                {t("productDetail.ingredients")} ({product.ingredients.length})
              </SectionLabel>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.ingredients.join(", ")}
              </p>
            </div>

            {/* Rejection reason (if applicable) */}
            {product.status === ApprovalStatus.REJECTED && product.audit?.reason && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <SectionLabel>{t("productDetail.rejectionReason")}</SectionLabel>
                <p className="text-sm text-red-700">{product.audit.reason}</p>
                {product.audit.action_by && (
                  <p className="text-xs text-red-500 mt-1">
                    {product.audit.action_by} · {formatDate(product.audit.action_at)}
                  </p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer actions */}
        <DialogFooter className="px-6 py-4 flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {t("actions.close")}
          </Button>

          {(canApprove || canReject) && (
            <div className="flex gap-2 w-full sm:w-auto">
              {canReject && (
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => onReject(product)}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("actions.reject")}
                </Button>
              )}
              {canApprove && (
                <Button
                  className="flex-1 sm:flex-none gap-1.5"
                  onClick={() => onApprove(product)}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("actions.approve")}
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
