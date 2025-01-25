export interface User {
 name: string
 email: string
}

export interface Conversation {
 id: string
 messages: string[]
}

export interface AuthContextType {
 user: User | null
 isLoading: boolean
 error: string | null
 login: (name: string, email: string) => Promise<void>
 logout: () => void
 conversations: Conversation[]
}