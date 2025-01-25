export type MessageType = "user" | "bot"

export interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
  actions?: Action[]
  isEditing?: boolean
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