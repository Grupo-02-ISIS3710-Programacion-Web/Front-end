"use client";

import { getUsers } from "@/lib/api";
import { getRoutines } from "@/lib/routine";
import { Flame, Eye, MessageSquare, ThumbsUp, Search, Filter, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";

type MobileTab = "Newest" | "Hot Topics" | "Solved" | "Most Liked";

const sidebarItems = [
  "All Posts",
  "Routine Help",
  "Product Recs",
  "Skincare Tips",
  "Trending"
];

const mobileTabs: MobileTab[] = ["Newest", "Hot Topics", "Solved", "Most Liked"];

function toTopicTag(label: string): string {
  return `#${label.replace(/[^a-zA-Z0-9]+/g, "")}`;
}

function formatSkinTypeTag(value: string): string {
  return value
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function toCompactViews(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return String(value);
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<MobileTab>("Newest");

  const routines = getRoutines();
  const users = getUsers();

  const posts = useMemo(() => {
    return routines.map((routine, index) => {
      const user = users.find((candidate) => candidate.id === routine.userId) ?? users[0];
      const likes = 72 + index * 41 + routine.steps.length * 9;
      const comments = 12 + index * 7;
      const views = 520 + index * 290;
      const solved = index % 3 === 2;
      const freshness = ["2 hours ago", "5 hours ago", "Yesterday", "2 days ago"][index % 4];

      return {
        id: routine.id,
        title: routine.name,
        excerpt: routine.description,
        userName: user?.name ?? "Skin4All User",
        avatarUrl: user?.avatarUrl,
        tag: formatSkinTypeTag(routine.skinType),
        likes,
        comments,
        views,
        solved,
        freshness
      };
    });
  }, [routines, users]);

  const visiblePosts = useMemo(() => {
    if (activeTab === "Solved") {
      return posts.filter((post) => post.solved);
    }
    if (activeTab === "Hot Topics") {
      return [...posts].sort((a, b) => b.comments - a.comments);
    }
    if (activeTab === "Most Liked") {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  }, [activeTab, posts]);

  const trendingTopics = useMemo(() => {
    return posts.slice(0, 5).map((post) => ({
      tag: toTopicTag(post.title),
      posts: `${Math.max(900, post.comments * 45)} posts this week`
    }));
  }, [posts]);

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="hidden gap-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)_280px]">
          <aside className="h-fit rounded-2xl border border-[#ebecef] bg-white p-5">
            <div className="mb-5 border-b border-[#ececf0] pb-4">
              <h2 className="text-lg font-bold text-[#232636]">Community Forum</h2>
              <p className="text-sm text-[#7c8095]">Skincare and Health</p>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item, idx) => (
                <button
                  key={item}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                    idx === 0
                      ? "bg-[#f3a2ae] text-[#29253a]"
                      : "text-[#596075] hover:bg-[#f7f7fb]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
            <button className="mt-5 w-full rounded-xl bg-[#e97f8e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#dd6d7e]">
              + Create Post
            </button>
          </aside>

          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-[#232636]">Discussions</h1>
                <p className="text-sm text-[#6f7489]">Get expert advice from the community.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#ececf3] bg-white px-4 py-2 text-sm font-semibold text-[#2d3042]">
                <Filter size={14} />
                Filter
              </button>
            </div>

            <div className="flex gap-2">
              {mobileTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-[#232636] text-white"
                      : "bg-white text-[#4f566c] hover:bg-[#eceef4]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {visiblePosts.map((post) => (
                <Link key={post.id} href={`/routine/detail/${post.id}`} className="block rounded-2xl transition hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(35,38,54,0.08)]">
                  <article className="rounded-2xl border border-[#ebedf2] bg-white p-5 shadow-[0_6px_16px_rgba(35,38,54,0.04)]">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={post.avatarUrl} alt={post.userName} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-[#202432]">
                          {post.userName} <span className="font-normal text-[#8890a3]">• {post.freshness}</span>
                        </p>
                        <div className="mt-1 inline-flex items-center rounded-md bg-[#f8d0d6] px-2 py-0.5 text-xs font-semibold text-[#7d2d45]">
                          {post.tag}
                        </div>
                      </div>
                    </div>
                    {post.solved && (
                      <span className="rounded-md bg-[#f7a5ae] px-2 py-1 text-xs font-bold text-[#4a1f2b]">Solved</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-[#1f2231]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[#667086]">{post.excerpt}</p>

                  <div className="mt-4 flex items-center gap-5 border-t border-[#edf0f4] pt-3 text-sm text-[#636d84]">
                    <span className="inline-flex items-center gap-1.5"><ThumbsUp size={16} /> {post.likes}</span>
                    <span className="inline-flex items-center gap-1.5"><MessageSquare size={16} /> {post.comments} comments</span>
                    <span className="inline-flex items-center gap-1.5"><Eye size={16} /> {toCompactViews(post.views)} views</span>
                  </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#ebedf2] bg-white">
              <div className="flex items-center gap-2 border-b border-[#eceff4] px-4 py-3 text-sm font-bold text-[#212636]">
                <Flame size={14} className="text-[#e45c6d]" />
                Trending Topics
              </div>
              <div className="space-y-3 p-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag}>
                    <p className="font-bold text-[#232636]">{topic.tag}</p>
                    <p className="text-xs text-[#7a8298]">{topic.posts}</p>
                  </div>
                ))}
              </div>
              <button className="w-full border-t border-[#eceff4] px-4 py-3 text-sm font-semibold text-[#d85068] hover:bg-[#fbf3f5]">
                View all trending
              </button>
            </div>

            <div className="rounded-2xl bg-[#f0a8b2] p-5 text-[#222638]">
              <h3 className="mb-3 text-xl font-bold">Community Hub</h3>
              <div className="flex items-end gap-8">
                <div>
                  <p className="text-4xl font-extrabold">45k</p>
                  <p className="text-sm">Members</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold">128</p>
                  <p className="text-sm">Online</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mx-auto max-w-md space-y-4 rounded-3xl border border-[#2d2b37] bg-[#f7f7fa] p-4 lg:hidden">
          <div className="rounded-2xl border border-[#e7e8ee] bg-white p-3">
            <div className="flex items-center gap-3 rounded-xl bg-[#f1f3f8] px-3 py-2 text-[#6f7890]">
              <Search size={18} />
              <span>Search discussions, routines, tips...</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[#f0d5db] bg-white px-3 py-2">
              <p className="text-xs font-semibold text-[#6f7488]">MEMBERS</p>
              <p className="text-3xl font-extrabold text-[#242839]">12.4k</p>
            </div>
            <div className="rounded-2xl border border-[#f0d5db] bg-white px-3 py-2">
              <p className="text-xs font-semibold text-[#6f7488]">ONLINE NOW</p>
              <p className="text-3xl font-extrabold text-[#242839]">842</p>
            </div>
            <div className="rounded-2xl border border-[#f0d5db] bg-white px-3 py-2">
              <p className="text-xs font-semibold text-[#6f7488]">DAILY POSTS</p>
              <p className="text-3xl font-extrabold text-[#242839]">156</p>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-[#212636]">Trending Topics</h2>
              <Link href="#" className="text-lg font-semibold text-[#d85068]">View all</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.slice(0, 4).map((topic, index) => (
                <span
                  key={topic.tag}
                  className={`rounded-full px-4 py-1.5 text-lg font-medium ${
                    index === 0 ? "border border-[#f09da9] bg-[#ffe7eb] text-[#c84862]" : "bg-[#eceff3] text-[#32384a]"
                  }`}
                >
                  {topic.tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <div className="mb-4 flex border-b border-[#eceff3]">
              {mobileTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 pb-2 text-lg font-semibold ${
                    activeTab === tab
                      ? "border-b-2 border-[#df5e73] text-[#df5e73]"
                      : "text-[#656d83]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {visiblePosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/routine/detail/${post.id}`} className="block rounded-2xl transition hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(35,38,54,0.08)]">
                  <article className="rounded-2xl border border-[#e8ebf1] bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.avatarUrl} alt={post.userName} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="text-2xl font-bold text-[#252a39]">{post.userName}</p>
                        <p className="text-lg text-[#6a7287]">{post.freshness}</p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-[#f6b5bd] px-3 py-1 text-sm font-bold text-[#592534]">{post.tag}</span>
                  </div>
                  <h3 className="text-4xl font-black leading-tight text-[#1f2432]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-2xl text-[#657086]">{post.excerpt}</p>
                  <div className="mt-3 flex items-center gap-5 border-t border-[#edf0f5] pt-2 text-xl text-[#5e667f]">
                    <span className="inline-flex items-center gap-1"><ThumbsUp size={18} /> {post.likes}</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare size={18} /> {post.comments}</span>
                    <span className="inline-flex items-center gap-1"><Eye size={18} /> {toCompactViews(post.views)}</span>
                  </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <button className="fixed right-6 bottom-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e14f6b] text-white shadow-lg">
            <Plus size={30} />
          </button>
        </div>
      </div>
    </main>
  );
}
