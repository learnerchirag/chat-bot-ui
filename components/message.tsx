import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Pencil, Trash2, Check, X} from "lucide-react";
import {Avatar} from "./avatar";
import type {Message as MessageObjType, User} from "../types/chat";
import ReactMarkdown from "react-markdown";
import {Textarea} from "./ui/textarea";
import { MessageRole } from "@/types/api";

interface MessageProps {
  message: MessageObjType;
  user: User;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export function Message({message, user, onDelete, onEdit}: MessageProps) {
  const [editContent, setEditContent] = useState(message.content);
  const [isEditing, toggleEditing] = useState(false);
  const isBot = message.role === MessageRole.BOT;

  useEffect(() => {
    toggleEditing(false)
    setEditContent(message.content)
  }, [message])

  const handleSaveEdit = () => {
    onEdit(message.id, editContent);
  };

  return (
    <div className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      {isBot && (
        <Avatar
          src={user.avatar}
          initials={user.initials}
          className="h-8 w-8"
        />
      )}
      <div
        className={`flex flex-col gap-1 max-w-[80%] ${
          isEditing ? "flex-grow" : ""
        }`}
      >
        <div
          className={`px-4 py-2 ${
            isBot
              ? "bg-muted text-foreground rounded-tr-xl rounded-br-xl rounded-bl-xl"
              : isEditing
              ? "bg-white text-black rounded-tr-xl rounded-br-xl rounded-bl-xl px-0 py-0"
              : "bg-[#8B5CF6] text-white ml-auto rounded-tr-xl rounded-bl-xl rounded-tl-xl"
          }`}
        >
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-auto overflow-hidden resize-none"
            />
          ) : (
            <ReactMarkdown>{message.content.replace(/\n/g, "  \n")}</ReactMarkdown>
          )}
        </div>
        {/* {message.actions && (
          <div className="flex gap-2">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-[#8B5CF6] border-[#8B5CF6]"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )} */}
        {!isBot && (
          <div className="flex gap-2 justify-end">
            {isEditing ? (
              <>
                <Button
                  className="rounded-full w-8 h-8"
                  size="icon"
                  variant="ghost"
                  onClick={handleSaveEdit}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  className="rounded-full w-8 h-8"
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleEditing(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="rounded-full w-8 h-8"
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  className="rounded-full w-8 h-8"
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
