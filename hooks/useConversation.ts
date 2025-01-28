import { useState, useEffect, useCallback, useRef } from "react"
import { type ConversationMessage, type Conversation, MessageRole, ConversationMessageSend } from "@/types/api"
import { useAuth } from "@/contexts/AuthContext"
import apiClient from "@/lib/api-client"
import { Message } from "@/types/chat"

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const { session } = useAuth()

  const fetchConversation = useCallback(async () => {
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await apiClient.getConversation(session.session_id)
      if (data) {
        setMessages(data.messages)
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
  }, [session])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!session) return

      const userMessage: Message = {
        id: "temp"+ Date.now(),
        role: MessageRole.USER,
        content,
      }
      setMessages((prevMessages) => [...prevMessages, userMessage])

      try {
        const messageReqObject: ConversationMessageSend = {
          role: MessageRole.USER,
          content: content
        } 
        const response = await apiClient.sendMessage(session.session_id, messageReqObject)

        const botMessage: Message = response.bot_response
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) => {
            if (msg.id === userMessage.id) {
              return { ...msg, id: response.user_message.id };
            }
            return msg;
          });
          return [...updatedMessages, botMessage]
        })
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

  const deleteMessage = useCallback(
    async (messageId: string) => {
      if (!session) return

      try {
        await apiClient.deleteMessage(session.session_id, messageId)
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId))
      } catch (err) {
        setError("Failed to delete message")
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return {
    messages,
    inputValue,
    isLoading,
    error,
    sendMessage,
    updateMessage,
    deleteMessage,
    handleInputChange,
    handleSend,
    fetchConversation,
    messagesEndRef
  }
}

