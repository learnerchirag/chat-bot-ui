export type MessageType = "user" | "assistant"

export interface Message {
  id: string
  content: string
  role: MessageType
  timestamp?: string
  session_id?: string
}

export interface Conversation {
  id: string
  created_at: string
  session_id: string
  messages: Message[]
}

export interface Action {
  label: string
  onClick: () => void
}

export interface User {
  id: string
  name: string
  avatar?: string
  initials: string
}