"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Category,
  ProductType,
  SkinType,
  type ProposedProduct,
} from "@/types/product";
import { toLabel } from "@/lib/string-utils";
import { Plus, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductEditDrawerProps {
  product: ProposedProduct | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: ProposedProduct) => void;
}

// ─── Form state type ──────────────────────────────────────────────────────────

interface FormState {
  name: string;
  brand: string;
  description: string;
  product_type: string;
  primary_category: Category | "";
  additional_categories: Category[];
  skin_type: SkinType[];
  ingredients: string[];
  image_url: string[];
}

function toFormState(p: ProposedProduct): FormState {
  return {
    name:                  p.name,
    brand:                 p.brand,
    description:           p.description ?? "",
    product_type:          p.product_type,
    primary_category:      p.primary_category,
    additional_categories: p.additional_categories ?? [],
    skin_type:             p.skin_type,
    ingredients:           p.ingredients,
    image_url:             p.image_url,
  };
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── Multi-select toggle group ────────────────────────────────────────────────

function ToggleGroup<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: T[];
  selected: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize transition-colors ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {toLabel(opt)}
          </button>
        );
      })}
    </div>
  );
}

// ─── Ingredient list editor ───────────────────────────────────────────────────

function IngredientEditor({
  ingredients,
  onChange,
  placeholder,
  addLabel,
}: {
  ingredients: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  const [input, setInput] = useState("");

  function add() {
    const trimmed = input.trim();
    if (!trimmed || ingredients.includes(trimmed)) return;
    onChange([...ingredients, trimmed]);
    setInput("");
  }

  function remove(i: number) {
    onChange(ingredients.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="h-8 text-sm"
        />
        <Button type="button" variant="outline" size="sm" className="h-8 shrink-0" onClick={add}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          {addLabel}
        </Button>
      </div>
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ingredients.map((ing, i) => (
            <Badge key={i} variant="secondary" className="text-xs gap-1 pr-1">
              {ing}
              <button
                type="button"
                onClick={() => remove(i)}
                className="hover:text-destructive transition-colors"
                aria-label={`Remove ${ing}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ProductEditDrawer ────────────────────────────────────────────────────────

export function ProductEditDrawer({
  product,
  open,
  onClose,
  onSave,
}: ProductEditDrawerProps) {
  const t = useTranslations("admin");

  const [form, setForm]     = useState<FormState | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [dirty, setDirty]   = useState(false);

  // Sync form state when product changes
  useEffect(() => {
    if (product) {
      setForm(toFormState(product));
      setErrors({});
      setDirty(false);
    }
  }, [product]);

  if (!product || !form) return null;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setDirty(true);
  }

  function toggleSkinType(st: SkinType) {
    const next = form!.skin_type.includes(st)
      ? form!.skin_type.filter((s) => s !== st)
      : [...form!.skin_type, st];
    update("skin_type", next);
  }

  function toggleAdditionalCategory(cat: Category) {
    const next = form!.additional_categories.includes(cat)
      ? form!.additional_categories.filter((c) => c !== cat)
      : [...form!.additional_categories, cat];
    update("additional_categories", next);
  }

  function validate(): boolean {
    if (!form) return false;

    const next: typeof errors = {};
    const currentForm = form;

  if (!currentForm.name.trim())             next.name = t("editDrawer.errors.required");
  if (!currentForm.brand.trim())            next.brand = t("editDrawer.errors.required");
  if (!currentForm.product_type)            next.product_type = t("editDrawer.errors.required");
  if (!currentForm.primary_category)        next.primary_category = t("editDrawer.errors.required");
  if (currentForm.skin_type.length === 0)   next.skin_type = t("editDrawer.errors.selectOne");
  if (currentForm.ingredients.length === 0) next.ingredients = t("editDrawer.errors.selectOne");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!product || !form) return;
    if (!validate()) return;

    const updated: ProposedProduct = {
      ...product,
      ...form,
      product_type: form.product_type as ProductType,
      primary_category: form.primary_category as Category,
      additional_categories: form.additional_categories,
      audit: {
        action_by: "current_admin", // TODO: reemplazar con sesión real
        action_at: new Date().toISOString(),
      },
    };

    onSave(updated);
    onClose();
  }

  // Additional categories = all categories except primary
  const availableAdditional = Object.values(Category).filter(
    (c) => c !== form.primary_category,
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">

        <SheetHeader className="px-6 pt-6 pb-4 shrink-0">
          <SheetTitle>{t("editDrawer.title")}</SheetTitle>
          <SheetDescription>
            {t("editDrawer.description", { name: product.name })}
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-5">

            {/* Name */}
            <Field label={t("editDrawer.fields.name")} required error={errors.name}>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
            </Field>

            {/* Brand */}
            <Field label={t("editDrawer.fields.brand")} required error={errors.brand}>
              <Input
                value={form.brand}
                onChange={(e) => update("brand", e.target.value)}
                className={errors.brand ? "border-destructive" : ""}
              />
            </Field>

            {/* Description */}
            <Field label={t("editDrawer.fields.description")}>
              <Textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                placeholder={t("editDrawer.fields.descriptionPlaceholder")}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              {/* Product type */}
              <Field label={t("products.colType")} required error={errors.product_type}>
                <Select
                  value={form.product_type}
                  onValueChange={(v) => update("product_type", v)}
                >
                  <SelectTrigger className={`h-9 ${errors.product_type ? "border-destructive" : ""}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProductType).map((pt) => (
                      <SelectItem key={pt} value={pt}>
                        {toLabel(pt.replace(/_/g, " "))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* Primary category */}
              <Field label={t("editDrawer.fields.primaryCategory")} required error={errors.primary_category}>
                <Select
                  value={form.primary_category}
                  onValueChange={(v) => {
                    update("primary_category", v as Category);
                    // Remove from additional if it was there
                    update(
                      "additional_categories",
                      form.additional_categories.filter((c) => c !== v),
                    );
                  }}
                >
                  <SelectTrigger className={`h-9 ${errors.primary_category ? "border-destructive" : ""}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Category).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {toLabel(cat)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Additional categories */}
            {form.primary_category && (
              <Field label={t("editDrawer.fields.additionalCategories")}>
                <ToggleGroup
                  options={availableAdditional}
                  selected={form.additional_categories}
                  onToggle={toggleAdditionalCategory}
                />
              </Field>
            )}

            {/* Skin type */}
            <Field label={t("editDrawer.fields.skinType")} required error={errors.skin_type}>
              <ToggleGroup
                options={Object.values(SkinType)}
                selected={form.skin_type}
                onToggle={toggleSkinType}
              />
            </Field>

            {/* Ingredients */}
            <Field label={t("editDrawer.fields.ingredients")} required error={errors.ingredients}>
              <IngredientEditor
                ingredients={form.ingredients}
                onChange={(next) => update("ingredients", next)}
                placeholder={t("editDrawer.fields.ingredientPlaceholder")}
                addLabel={t("editDrawer.fields.ingredientAdd")}
              />
            </Field>

            {/* Images (URL list — placeholder for real upload) */}
            <Field label={t("editDrawer.fields.images")}>
              <IngredientEditor
                ingredients={form.image_url}
                onChange={(next) => update("image_url", next)}
                placeholder={t("editDrawer.fields.imagePlaceholder")}
                addLabel={t("editDrawer.fields.imageAdd")}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("editDrawer.fields.imageHint")}
              </p>
            </Field>

          </div>
        </ScrollArea>

        <Separator />

        <SheetFooter className="px-6 py-4 flex-row gap-2 shrink-0">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            onClick={handleSave}
            disabled={!dirty}
          >
            {t("editDrawer.save")}
          </Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}
