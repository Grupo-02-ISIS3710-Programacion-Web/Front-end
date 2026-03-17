import { Badge } from "@/components/ui/badge";
import { ApprovalStatus, Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toLabel } from "@/lib/string-utils";

export function CategoryBadge({ category }: { category: Category }) {
    return (
        <Badge variant="secondary" className="text-[10px] font-medium text-primary-foreground capitalize whitespace-nowrap">
        {toLabel(category)}
        </Badge>
    );
}

export function ProductTypeBadge({ value }: { value: string }) {
    return (
        <Badge variant="outline" className="text-[10px] font-medium capitalize whitespace-nowrap">
        {toLabel(value)}
        </Badge>
    );
}

const STATUS_MAP: Record<
    ApprovalStatus,
    { labelKey: string; className: string; dot: string }
> = {
    [ApprovalStatus.PENDING]: {
        labelKey: "products.status.pending",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
    },
    [ApprovalStatus.APPROVED]: {
        labelKey: "products.status.approved",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
    },
    [ApprovalStatus.PUBLISHED]: {
        labelKey: "products.status.published",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
    },
    [ApprovalStatus.REJECTED]: {
        labelKey: "products.status.rejected",
        className: "bg-red-50 text-red-600 border-red-200",
        dot: "bg-red-500",
    },
};

export function ApprovalStatusBadge({
    status,
    label,
}: {
    status: ApprovalStatus;
    label: string;
}) {
    const { className, dot } = STATUS_MAP[status];
    return (
        <Badge
        variant="outline"
        className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 gap-1.5 ${className}`}
        >
        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dot}`} aria-hidden="true" />
        {label}
        </Badge>
    );
}

export function PaginationRow({
    page,
    totalPages,
    onPrev,
    onNext,
    labelShowing,
    labelPrev,
    labelNext,
}: {
    page: number;
    totalPages: number;
    from: number;
    to: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    labelShowing: string;
    labelPrev: string;
    labelNext: string;
}) {
    return (
        <div className="flex items-center justify-between px-5 py-3 border-t text-xs text-muted-foreground">
        <span>{labelShowing}</span>
        <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page === 0} onClick={onPrev}>
            <ChevronLeft className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
            {labelPrev}
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled={page >= totalPages - 1} onClick={onNext}>
            {labelNext}
            <ChevronRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
            </Button>
        </div>
        </div>
    );
}