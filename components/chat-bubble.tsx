import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  isOpen: boolean
  onClick: () => void
  unreadCount?: number
}

export function ChatBubble({ isOpen, onClick, unreadCount }: ChatBubbleProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "h-14 w-14 rounded-full fixed bottom-4 right-4 shadow-lg",
        "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white",
        "transition-transform hover:scale-105",
        isOpen && "rotate-90",
      )}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          {(!!unreadCount) && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      )}
    </Button>
  )
}