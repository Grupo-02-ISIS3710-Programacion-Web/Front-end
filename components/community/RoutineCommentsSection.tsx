"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getUserById } from "@/lib/api";
import { Comment } from "@/types/Comment";
import { MockUser } from "@/types/user";
import { Bold, Image as ImageIcon, Italic, Link2, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import CommentCard from "@/components/community/CommentCard";

type RoutineCommentsSectionProps = Readonly<{
  routineId: string;
  initialComments: Array<Comment & { user?: MockUser }>;
  currentUserId?: string;
}>;

export default function RoutineCommentsSection({
  routineId,
  initialComments,
  currentUserId = "u1"
}: RoutineCommentsSectionProps) {
  const t = useTranslations("RoutineDetail");
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(initialComments);
  const [justPostedId, setJustPostedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const applyInlineFormat = (wrapper: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = newComment.slice(start, end);
    const replacement = `${wrapper}${selected}${wrapper}`;
    const updated = `${newComment.slice(0, start)}${replacement}${newComment.slice(end)}`;

    setNewComment(updated);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursorStart = start + wrapper.length;
      const cursorEnd = cursorStart + selected.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return;
    }

    const createdComment: Comment & { user?: MockUser } = {
      id: `${routineId}-local-${Date.now()}`,
      userId: currentUserId,
      comment: newComment.trim(),
      like: [],
      user: getUserById(currentUserId)
    };

    setLocalComments((prev) => [createdComment, ...prev]);
    setJustPostedId(createdComment.id);
    setNewComment("");
  };

  return (
    <Card className="border-[#f2a4b0] bg-[#fcfdff]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#202635]">{t("commentsTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-[#dfe4ec] bg-white">
          <p className="px-4 pt-4 text-lg font-semibold text-[#242938]">{t("thoughtsTitle")}</p>
          <Textarea
            ref={textareaRef}
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            rows={4}
            placeholder={t("commentPlaceholder")}
            className="mt-3 rounded-none border-0 border-t border-[#eef1f6] bg-white px-4 py-4 text-base shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between rounded-b-xl border-t border-[#e6eaf1] bg-[#eef2f7] px-4 py-3">
            <div className="flex items-center gap-3 text-[#5f677c]">
              <button
                className="rounded-md p-1.5 hover:bg-white"
                aria-label={t("bold")}
                onClick={() => applyInlineFormat("**")}
                type="button"
              >
                <Bold size={16} />
              </button>
              <button
                className="rounded-md p-1.5 hover:bg-white"
                aria-label={t("italic")}
                onClick={() => applyInlineFormat("*")}
                type="button"
              >
                <Italic size={16} />
              </button>
              <button className="rounded-md p-1.5 hover:bg-white" aria-label={t("insertLink")} type="button">
                <Link2 size={16} />
              </button>
              <button className="rounded-md p-1.5 hover:bg-white" aria-label={t("insertImage")} type="button">
                <ImageIcon size={16} />
              </button>
            </div>
            <Button onClick={handleAddComment} className="h-9 rounded-xl bg-[#d85068] px-5 text-sm font-semibold text-white hover:bg-[#c5455c]">
              <MessageSquare size={16} />
              {t("postComment")}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          {localComments.length === 0 && (
            <p className="rounded-xl border border-dashed border-[#d9deea] p-4 text-sm text-[#667089]">
              {t("noComments")}
            </p>
          )}

          {localComments.map((comment, index) => {
            const postedAgo = comment.id === justPostedId ? t("justNow") : t("hoursAgo", { count: (index + 1) * 2 });
            const isExpert = comment.userId === "u2";

            return (
              <div key={comment.id}>
                <CommentCard comment={comment} postedAgo={postedAgo} isExpert={isExpert} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
