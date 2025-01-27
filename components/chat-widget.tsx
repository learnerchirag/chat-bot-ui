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
    "https://www.startupsuccessstories.in/wp-content/uploads/2019/07/HireXP-launches-Amara-an-embodied-conversational-Chatbot-in-India.png",
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
    messagesEndRef
  } = useConversation()

  const isLoading = authLoading || conversationLoading

  return (
    <div
      className={cn(
        "fixed bottom-20 md:right-4 flex flex-col bg-background rounded-3xl shadow-lg",
        "transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        "w-screen md:w-[400px]",
        "h-[calc(100vh-120px)]"
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
          <>
            {messages.map((message, index) => (
              <Message
                key={index}
                message={message}
                user={botUser}
                onDelete={() => {}}
                onEdit={(id, content) => updateMessage(id, content)}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
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

