"use client"
import { useState } from "react";
import { ChatBubble } from "@/components/chat-bubble";
import { ChatWidget } from "@/components/chat-widget";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  return (
    <AuthProvider>
      <main className="min-h-screen bg-background-dark">
        <ChatWidget isOpen={isOpen} onClose={toggleChat}/>
        <ChatBubble isOpen={isOpen} onClick={toggleChat} unreadCount={unreadCount} />
      </main>
    </AuthProvider>
  )
}
