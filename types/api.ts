export enum MessageRole {
 USER = "user",
 BOT = "assistant",
}

export interface UserCreate {
 email: string
 name: string
}

export interface UserResponse {
 id: string
 email: string
 name: string
}

export interface SessionCreate {
 user_id: string
 ip_address: string
}

export interface SessionResponse {
 session_id: string
 user_id: string
 ip_address: string
 created_at: string
 expires_at: string
}

export interface ConversationMessage {
 id: string
 session_id: string
 role: MessageRole
 content: string,
 timestamp: string
}

export interface ConversationMessageSend {
 content: string
 role: MessageRole
}

export interface ConversationCreate {
 session_id: string
 messages: ConversationMessage[]
}

export interface MessageUpdateRequest {
 content: string
}

export interface Conversation {
 id: string
 session_id: string
 messages: ConversationMessage[]
}

export interface StatusResponse {
 status: string
 message: string
}

