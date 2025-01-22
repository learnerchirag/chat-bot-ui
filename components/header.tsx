import { X, Minimize2, Maximize2, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "./avatar"
import type { User } from "../types/chat"

interface HeaderProps {
  user: User
  onClose: () => void
}

export function Header({ user, onClose }: HeaderProps) {
  return (
    <div className="items-center justify-between p-4 border-b">
      <div className="flex gap-2 mb-4 justify-between">
        <Button variant="ghost" size="icon" onClick={() => console.log("resize")}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <Avatar src={user.avatar} initials={user.initials} />
        <div>
          <h2 className="text-sm font-semibold">Hey👋, I'm {user.name}</h2>
          <p className="text-sm text-muted-foreground">Ask me anything or pick a place to start</p>
        </div>
      </div>
    </div>
  )
}