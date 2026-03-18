"use client";

import { getUsers } from "@/lib/api";
import { getRoutines } from "@/lib/routine";
import { ArrowDown, ArrowUp, Eye, MessageSquare, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SkinType } from "@/types/product";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRoutineVotesMap } from "@/lib/hooks/use-routine-votes";
import { useLocaleDateFormatter } from "@/lib/hooks/use-locale-date-formatter";

type MobileTab = "newest" | "mostCommented" | "mostVoted";

const mobileTabs: MobileTab[] = ["newest", "mostCommented", "mostVoted"];
const skinTypeFilters = Object.values(SkinType);
const toTopicTag = (label: string) => `#${label.replace(/[^a-zA-Z0-9]+/g, "")}`;
const toCompactViews = (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value));

const VoteButton = ({ icon: Icon, count, isActive, onClick, label }: any) => (
  <button onClick={onClick} className={`inline-flex items-center gap-1 transition ${isActive ? "text-destructive" : "hover:text-destructive"}`} aria-label={label}>
    {Icon} {count}
  </button>
);

const PostCard = ({ post, onVote, t, tRoutine, size = "lg" }: any) => {
  const imgClass = size === "lg" ? "h-12 w-12" : "h-11 w-11";
  const titleClass = size === "lg" ? "text-2xl" : "text-xl";
  const contentClass = size === "lg" ? "pt-3" : "pt-2";

  return (
    <Link href={`/routine/detail/${post.id}`} className="block">
      <Card className="transition hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className={contentClass}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img src={post.avatarUrl} alt={post.userName} className={`${imgClass} rounded-full object-cover shrink-0`} />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {post.userName} <span className="font-normal text-muted-foreground">• {post.publishedAt}</span>
                </p>
                <div className="mt-1 inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">
                  {post.tag}
                </div>
              </div>
            </div>
          </div>
          <h3 className={`${titleClass} font-bold leading-tight`}>{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 flex-wrap border-t pt-3 text-sm text-muted-foreground">
            <VoteButton
              icon={<ArrowUp size={16} />}
              count={post.upvotes}
              isActive={post.hasUpvoted}
              onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); onVote(post.id, "up"); }}
              label={tRoutine("upvote")}
            />
            <VoteButton
              icon={<ArrowDown size={16} />}
              count={post.downvotes}
              isActive={post.hasDownvoted}
              onClick={(e: any) => { e.preventDefault(); e.stopPropagation(); onVote(post.id, "down"); }}
              label={tRoutine("downvote")}
            />
            <span className="inline-flex items-center gap-1"><MessageSquare size={16} /> {t("commentsCount", { count: post.comments })}</span>
            <span className="inline-flex items-center gap-1"><Eye size={16} /> {t("viewsCount", { count: toCompactViews(post.views) })}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const FilterButtons = ({ active, onChange, counts, t, tSkin }: any) => (
  <>
    <Button variant={active === "all" ? "default" : "outline"} onClick={() => onChange("all")} className="w-full justify-start">
      {t("allSkinTypes")}
    </Button>
    {skinTypeFilters.map((skin: SkinType) => (
      <Button key={skin} variant={active === skin ? "default" : "outline"} onClick={() => onChange(skin)} className="w-full justify-between">
        <span>{tSkin(skin)}</span>
        <span className="text-xs opacity-75">({counts[skin] ?? 0})</span>
      </Button>
    ))}
  </>
);

const SidebarSection = ({ title, subtitle, children }: any) => (
  <Card>
    <CardHeader className="pb-4">
      <div>{subtitle ? <><CardTitle>{title}</CardTitle><CardDescription>{subtitle}</CardDescription></> : <CardTitle className="text-base">{title}</CardTitle>}</div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function CommunityPage() {
  const t = useTranslations("CommunityPage");
  const tSkin = useTranslations("SkinTypes");
  const tRoutine = useTranslations("RoutineDetail");
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<MobileTab>("newest");
  const [activeSkinFilter, setActiveSkinFilter] = useState<"all" | SkinType>("all");
  const currentUserId = "u1";

  const routines = getRoutines();
  const users = getUsers();
  const { routineVotes, voteRoutine } = useRoutineVotesMap(routines, currentUserId);

  const publishedDateFormatter = useLocaleDateFormatter(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const posts = useMemo(() =>
    routines.map((routine) => {
      const user = users.find(u => u.id === routine.userId) ?? users[0];
      const votes = routineVotes[routine.id] ?? { upvotes: routine.upvotes ?? [], downvotes: routine.downvotes ?? [] };
      const publishedAtDate = routine.publishedAt ? new Date(routine.publishedAt) : null;
      const publishedAtTs = publishedAtDate ? publishedAtDate.getTime() : 0;
      return { id: routine.id, title: routine.name, excerpt: routine.description, userName: user?.name ?? "", avatarUrl: user?.avatarUrl ?? "", skinType: routine.skinType, tag: tSkin(routine.skinType), upvotes: votes.upvotes.length, downvotes: votes.downvotes.length, hasUpvoted: votes.upvotes.includes(currentUserId), hasDownvoted: votes.downvotes.includes(currentUserId), comments: routine.comments?.length ?? 0, views: routine.views ?? 0, publishedAt: publishedAtDate ? publishedDateFormatter.format(publishedAtDate) : "-", publishedAtTs };
    }),
    [routineVotes, routines, tSkin, users, currentUserId, publishedDateFormatter]
  );

  const postsBySkin = useMemo(() => activeSkinFilter === "all" ? posts : posts.filter(p => p.skinType === activeSkinFilter), [activeSkinFilter, posts]);

  const visiblePosts = useMemo(() => {
    if (activeTab === "newest") return [...postsBySkin].sort((a, b) => b.publishedAtTs - a.publishedAtTs);
    if (activeTab === "mostCommented") return [...postsBySkin].sort((a, b) => b.comments - a.comments);
    if (activeTab === "mostVoted") return [...postsBySkin].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    return postsBySkin;
  }, [activeTab, postsBySkin]);

  const skinTypeCounts = useMemo(() => routines.reduce((acc, r) => ({ ...acc, [r.skinType]: (acc[r.skinType] ?? 0) + 1 }), {} as Record<SkinType, number>), [routines]);

  const mostDiscussed = useMemo(() =>
    [...postsBySkin].sort((a, b) => b.comments - a.comments).slice(0, 5).map(p => ({ id: p.id, title: p.title, comments: p.comments, skinTypeTag: toTopicTag(p.tag) })),
    [postsBySkin]
  );

  const TabButtons = () => mobileTabs.map(tab => <Button key={tab} variant={activeTab === tab ? "default" : "outline"} onClick={() => setActiveTab(tab)} size="sm">{t(`tabs.${tab}`)}</Button>);

  const PostsList = ({ size = "lg" }: any) => visiblePosts.map(post => <PostCard key={post.id} post={post} onVote={voteRoutine} t={t} tRoutine={tRoutine} size={size} />);

  const MostDiscussedList = () => mostDiscussed.map(topic => <Link key={topic.id} href={`/routine/detail/${topic.id}`} className="block rounded-lg px-2 py-1.5 transition hover:bg-muted"><p className="font-bold line-clamp-1">{topic.title}</p><p className="text-xs text-muted-foreground">{t("commentsCount", { count: topic.comments })} • {topic.skinTypeTag}</p></Link>);

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        {/* Desktop */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)_280px]">
          <aside>
            <SidebarSection title={t("forumTitle")} subtitle={t("forumSubtitle")}>
              <nav className="space-y-2"><FilterButtons active={activeSkinFilter} onChange={setActiveSkinFilter} counts={skinTypeCounts} t={t} tSkin={tSkin} /></nav>
              <Button asChild className="mt-5 w-full"><Link href="/routine/crear"><Plus size={16} /> {t("createPost")}</Link></Button>
            </SidebarSection>
          </aside>

          <section className="space-y-4">
            <div className="flex items-end justify-between"><div><h1 className="text-4xl font-extrabold">{t("discussionsTitle")}</h1><p className="text-sm text-muted-foreground">{t("discussionsSubtitle")}</p></div></div>
            <div className="flex gap-2"><TabButtons /></div>
            <div className="space-y-4"><PostsList size="lg" /></div>
          </section>

          <aside>
            <SidebarSection title={<div className="flex items-center gap-2"><MessageSquare size={14} /><span>{t("mostDiscussed")}</span></div>}>
              <div className="space-y-3"><MostDiscussedList /></div>
            </SidebarSection>
          </aside>
        </div>

        {/* Mobile */}
        <div className="space-y-4 lg:hidden">
          <SidebarSection title={t("forumTitle")} subtitle={t("forumSubtitle")}>
            <nav className="space-y-2"><FilterButtons active={activeSkinFilter} onChange={setActiveSkinFilter} counts={skinTypeCounts} t={t} tSkin={tSkin} /></nav>
            <Button asChild className="mt-5 w-full"><Link href="/routine/crear"><Plus size={16} /> {t("createPost")}</Link></Button>
          </SidebarSection>

          <Card>
            <CardHeader className="pb-4"><CardTitle className="text-2xl">{t("discussionsTitle")}</CardTitle><CardDescription>{t("discussionsSubtitle")}</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2"><TabButtons /></div>
              <div className="space-y-4"><PostsList size="sm" /></div>
            </CardContent>
          </Card>

          <SidebarSection title={<div className="flex items-center gap-2"><MessageSquare size={14} /><span>{t("mostDiscussed")}</span></div>}>
            <div className="space-y-3"><MostDiscussedList /></div>
          </SidebarSection>

          <Button asChild size="icon" className="fixed right-6 bottom-6 z-50 h-16 w-16 rounded-full shadow-lg"><Link href="/routine/crear" aria-label={t("createPost")}><Plus size={30} /></Link></Button>
        </div>
      </div>
    </main>
  );
}
