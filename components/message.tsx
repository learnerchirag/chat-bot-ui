import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Avatar } from "./avatar"
import type { Message as MessageType, User } from "../types/chat"

interface MessageProps {
  message: MessageType
  user: User
  onDelete: (id: string) => void
  onEdit: (id: string, content: string) => void
}

export function Message({ message, user, onDelete, onEdit }: MessageProps) {
  const [editContent, setEditContent] = useState(message.content)
  const isBot = message.type === "bot"

  const handleSaveEdit = () => {
    onEdit(message.id, editContent)
  }

  return (
    <div className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      {isBot && <Avatar src={user.avatar} initials={user.initials} className="h-8 w-8" />}
      <div className={`flex flex-col gap-2 max-w-[80%] ${message.isEditing ? "flex-grow" : ""}`}>
        {message.isEditing ? (
          <div className="flex gap-2">
            <Input value={editContent} onChange={(e) => setEditContent(e.target.value)} className="flex-grow" />
            <Button size="icon" variant="ghost" onClick={handleSaveEdit}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onEdit(message.id, message.content)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`rounded-lg px-4 py-2 ${isBot ? "bg-muted text-foreground" : "bg-[#8B5CF6] text-white ml-auto"}`}
          >
            {message.content}
          </div>
        )}
        {message.actions && (
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
        )}
        {!isBot && !message.isEditing && (
          <div className="flex gap-2 justify-end">
            <Button size="icon" variant="ghost" onClick={() => onEdit(message.id, message.content)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(message.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}