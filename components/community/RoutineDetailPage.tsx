"use client";

import { Link } from "@/i18n/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoutineCommentsSection from "@/components/community/RoutineCommentsSection";
import { getProductById, getUserById, getUsers } from "@/lib/api";
import { getRoutineById } from "@/lib/routine";
import { ArrowDown, ArrowLeft, ArrowUp, CalendarDays, MessageSquare, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type RoutineDetailPageProps = Readonly<{
  routineId: string;
  backPath?: string;
}>;

export default function RoutineDetailPage({ routineId, backPath = "/comunidad" }: RoutineDetailPageProps) {
  const t = useTranslations("RoutineDetail");
  const tSkin = useTranslations("SkinTypes");
  const locale = useLocale();

  const routine = getRoutineById(routineId);
  const users = getUsers();
  const user = routine ? getUserById(routine.userId) : undefined;
  const [routineUpvotes, setRoutineUpvotes] = useState<string[]>(routine?.upvotes ?? []);
  const [routineDownvotes, setRoutineDownvotes] = useState<string[]>(routine?.downvotes ?? []);
  const currentUserId = "u1";

  const comments = useMemo(() => {
    if (!routine?.comments) {
      return [];
    }

    return routine.comments.map((comment) => ({
      ...comment,
      user: users.find((candidate) => candidate.id === comment.userId)
    }));
  }, [routine?.comments, users]);

  const publishedAtLabel = useMemo(() => {
    if (!routine?.publishedAt) {
      return "-";
    }
    return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(routine.publishedAt));
  }, [locale, routine?.publishedAt]);

  const hasUpvotedRoutine = routineUpvotes.includes(currentUserId);
  const hasDownvotedRoutine = routineDownvotes.includes(currentUserId);

  const handleRoutineVote = (vote: "up" | "down") => {
    if (vote === "up") {
      setRoutineUpvotes((prev) =>
        prev.includes(currentUserId)
          ? prev.filter((id) => id !== currentUserId)
          : [...prev, currentUserId]
      );
      setRoutineDownvotes((prev) =>
        prev.includes(currentUserId) ? prev.filter((id) => id !== currentUserId) : prev
      );
      return;
    }

    setRoutineDownvotes((prev) =>
      prev.includes(currentUserId)
        ? prev.filter((id) => id !== currentUserId)
        : [...prev, currentUserId]
    );
    setRoutineUpvotes((prev) =>
      prev.includes(currentUserId) ? prev.filter((id) => id !== currentUserId) : prev
    );
  };

  if (!routine) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e6e9ef] bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-[#222739]">{t("notFoundTitle")}</h1>
          <p className="mt-2 text-[#646e84]">{t("notFoundDescription")}</p>
          <Link href={backPath} className="mt-4 inline-flex items-center gap-2 text-[#d44f67] hover:underline">
            <ArrowLeft size={16} />
            {t("backToDiscussions")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={backPath} className="hover:text-secondary">
                {t("community")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-secondary" />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/routine/detail/${routine.id}`} className="hover:text-secondary">
                {routine.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start">
          <Card className="border-[#e8ebf1] lg:sticky lg:top-6">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link href={backPath} className="inline-flex items-center gap-2 text-sm font-semibold text-[#56607a] hover:text-[#d44f67]">
                  <ArrowLeft size={16} />
                  {t("backToDiscussions")}
                </Link>
                <span className="rounded-full bg-[#f8d1d7] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7d2d45]">
                  {tSkin(routine.skinType)}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-[#222739]">{routine.name}</h1>
                <p className="text-[#5f6880]">{routine.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-[#eceff4] pt-4">
                <img src={user?.avatarUrl} alt={user?.name ?? t("authorFallback")} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-[#242939]">{user?.name ?? t("userFallback")}</p>
                  <p className="text-xs text-[#7a8297]">{t("routineCreator")}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eff2f7] px-3 py-1 text-xs font-semibold text-[#4f576e]">
                  <MessageSquare size={14} />
                  {comments.length}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eff2f7] px-3 py-1 text-xs font-semibold text-[#4f576e]">
                  <CalendarDays size={14} />
                  {publishedAtLabel}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#eff2f7] px-3 py-1 text-xs font-semibold text-[#4f576e]">
                  {routine.type.toLowerCase() === "am" ? <Sun size={14} /> : <Moon size={14} />}
                  {t("routineType", { type: routine.type.toUpperCase() })}
                </span>
              </div>

              <div className="flex items-center gap-3 border-t border-[#eceff4] pt-4 text-sm font-semibold text-[#4f576e]">
                <button
                  type="button"
                  onClick={() => handleRoutineVote("up")}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 transition ${hasUpvotedRoutine
                    ? "border-[#d44f67] bg-[#fdecef] text-[#d44f67]"
                    : "border-[#dfe4ec] hover:border-[#d44f67] hover:text-[#d44f67]"
                    }`}
                  aria-label={t("upvote")}
                >
                  <ArrowUp size={14} />
                  {routineUpvotes.length}
                </button>
                <button
                  type="button"
                  onClick={() => handleRoutineVote("down")}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 transition ${hasDownvotedRoutine
                    ? "border-[#d44f67] bg-[#fdecef] text-[#d44f67]"
                    : "border-[#dfe4ec] hover:border-[#d44f67] hover:text-[#d44f67]"
                    }`}
                  aria-label={t("downvote")}
                >
                  <ArrowDown size={14} />
                  {routineDownvotes.length}
                </button>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <Card className="border-[#e8ebf1]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#202635]">{t("stepsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routine.steps
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => {
                    const product = getProductById(step.productId);
                    const productImage = product?.image_url?.[0];

                    return (
                      <article key={step.id} className="rounded-xl border border-[#ebeff5] bg-[#fafbfe] p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product?.name ?? t("unknownProduct")}
                              className="h-48 w-full rounded-lg object-cover md:h-32 md:w-32 md:min-w-32"
                            />
                          ) : (
                            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-[#edf1f7] text-sm font-medium text-[#69728a] md:h-32 md:w-32 md:min-w-32">
                              {t("noImage")}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold text-[#212636]">
                              {t("stepTitle", { number: index + 1, name: step.name })}
                            </h3>
                            <p className="mt-1 text-base font-semibold text-[#3a4258]">{product?.brand ?? t("unknownBrand")}</p>
                            <p className="mt-1 text-sm font-medium text-[#414b63]">{product?.name ?? t("unknownProduct")}</p>
                            <p className="mt-2 text-sm text-[#687189]">{step.notes}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </CardContent>
            </Card>

            <RoutineCommentsSection routineId={routine.id} initialComments={comments} />
          </div>
        </div>
      </div>
    </main>
  );
}
