"use client";

import { Comment } from "@/types/Comment";
import { MockUser } from "@/types/user";
import { ArrowDown, ArrowUp, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type CommentCardProps = Readonly<{
  comment: Comment & { user?: MockUser };
  postedAgo: string;
  isExpert?: boolean;
  currentUserId?: string;
  onVote?: (commentId: string, vote: "up" | "down") => void;
}>;

export default function CommentCard({
  comment,
  postedAgo,
  isExpert = false,
  currentUserId = "u1",
  onVote
}: CommentCardProps) {
  const t = useTranslations("RoutineDetail");
  const hasUpvoted = comment.upvotes.includes(currentUserId);
  const hasDownvoted = comment.downvotes.includes(currentUserId);

  return (
    <article className="rounded-xl bg-transparent p-3">
      <div className="mb-2 flex items-center gap-3">
        <img
          src={comment.user?.avatarUrl ?? "https://i.pravatar.cc/80?img=29"}
          alt={comment.user?.name ?? t("userFallback")}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-base font-semibold text-[#232839]">{comment.user?.name ?? t("userFallback")}</p>
          {isExpert && (
            <span className="inline-flex items-center gap-1 rounded-md bg-[#efb0b7] px-2 py-0.5 text-xs font-semibold text-[#47232d]">
              {t("expert")}
              <BadgeCheck size={12} />
            </span>
          )}
          <p className="text-sm text-[#6f778c]">{postedAgo}</p>
        </div>
      </div>
      <div className="pl-12 text-base leading-relaxed text-[#2f3443]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-[#1f2434]">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>
          }}
        >
          {comment.comment}
        </ReactMarkdown>
      </div>
      <div className="mt-3 flex items-center gap-4 pl-12 text-[#5d667d]">
        <button
          className={`inline-flex items-center gap-1 text-sm font-semibold transition ${hasUpvoted ? "text-[#d44f67]" : "hover:text-[#d44f67]"
            }`}
          aria-label={t("upvote")}
          type="button"
          onClick={() => onVote?.(comment.id, "up")}
        >
          <ArrowUp size={16} />
          {comment.upvotes.length}
        </button>
        <button
          className={`inline-flex items-center gap-1 text-sm transition ${hasDownvoted ? "text-[#d44f67]" : "hover:text-[#d44f67]"
            }`}
          aria-label={t("downvote")}
          type="button"
          onClick={() => onVote?.(comment.id, "down")}
        >
          <ArrowDown size={16} />
          {comment.downvotes.length}
        </button>
        <button className="text-sm font-semibold hover:text-[#d44f67]">{t("reply")}</button>
      </div>
    </article>
  );
}
