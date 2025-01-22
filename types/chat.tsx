export type MessageType = "user" | "bot"

export interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
  actions?: Action[]
  isEditing?: boolean
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