"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tool?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-4 px-4 py-6",
        isUser ? "bg-background" : "bg-muted/30",
      )}
    >
      <div className="flex w-full max-w-3xl mx-auto gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isUser
              ? "bg-primary/10 text-primary"
              : "bg-primary text-primary-foreground",
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {isUser ? "你" : "专利智能助手"}
            </span>
            {message.tool && (
              <span className="text-xs text-muted-foreground">
                · {message.tool}
              </span>
            )}
          </div>
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
