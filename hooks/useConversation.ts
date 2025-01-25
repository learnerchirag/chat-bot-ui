import { useState, useEffect, useCallback } from "react"
import { type ConversationMessage, type Conversation, MessageRole } from "@/types/api"
import { useAuth } from "@/contexts/AuthContext"
import apiClient from "@/lib/api-client"
interface ExtendedConversationMessage extends ConversationMessage {
  id: string
}

export function useConversation() {
  const [messages, setMessages] = useState<ExtendedConversationMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { session } = useAuth()

  const fetchConversation = useCallback(async () => {
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.getConversation(session.session_id)
      if (data) {
        setMessages(data.messages.map((msg, index) => ({ ...msg, id: `msg-${index}` })))
      }
    } catch (err) {
      setError("Failed to fetch conversation")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    fetchConversation()
  }, [fetchConversation])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!session) return

      const userMessage: ExtendedConversationMessage = {
        id: `msg-${Date.now()}`,
        role: MessageRole.USER,
        content,
      }
      setMessages((prevMessages) => [...prevMessages, userMessage])

      try {
        const response = await apiClient.sendMessage(session.session_id, userMessage)

        const botMessage: ExtendedConversationMessage = {
          id: `msg-${Date.now() + 1}`,
          role: MessageRole.BOT,
          content: response.bot_response.content,
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      } catch (err) {
        setError("Failed to send message")
        console.error(err)
      }
    },
    [session],
  )

  const updateMessage = useCallback(
    async (messageId: string, content: string) => {
      if (!session) return

      try {
        await apiClient.updateMessage(session.session_id, messageId, { content })
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, content } : msg)))
      } catch (err) {
        setError("Failed to update message")
        console.error(err)
      }
    },
    [session],
  )

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return

    sendMessage(inputValue)
    setInputValue("")
  }, [inputValue, sendMessage])

  return {
    messages,
    inputValue,
    isLoading,
    error,
    sendMessage,
    updateMessage,
    handleInputChange,
    handleSend,
    fetchConversation,
  }
}

