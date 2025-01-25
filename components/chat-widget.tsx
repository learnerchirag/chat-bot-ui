"use client"

import { Header } from "./header"
import { Message } from "./message"
import { InputBar } from "./input-bar"
import { LoginForm } from "./login-form"
import type { User } from "../types/chat"
import { useAuth } from "@/contexts/AuthContext"
import { useConversation } from "@/hooks/useConversation"
import { cn } from "@/lib/utils"

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

const botUser: User = {
  id: "bot",
  name: "Ava",
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20at%201.30.46%E2%80%AFPM-EEU6RMnxVCjEWvW1XqEWctveQWZY7V.png",
  initials: "AV",
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const { user, isLoading: authLoading } = useAuth()
  const {
    messages,
    inputValue,
    isLoading: conversationLoading,
    error,
    updateMessage,
    handleInputChange,
    handleSend,
  } = useConversation()

  const isLoading = authLoading || conversationLoading

  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 flex flex-col h-[600px] w-[400px] bg-background rounded-3xl shadow-lg",
        "transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <Header user={botUser} onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : !user ? (
          <LoginForm />
        ) : (
          messages.map((message, index) => (
            <Message
              key={index}
              message={{
                id: index.toString(),
                content: message.content,
                type: message.role === "user" ? "user" : "bot",
                timestamp: new Date(),
              }}
              user={botUser}
              onDelete={() => {}}
              onEdit={(id, content) => updateMessage(id, content)}
            />
          ))
        )}
      </div>
      {user && (
        <InputBar
          value={inputValue}
          onChange={handleInputChange}
          onSend={handleSend}
          onSettingsClick={() => console.log("Settings clicked")}
        />
      )}
    </div>
  )
}

