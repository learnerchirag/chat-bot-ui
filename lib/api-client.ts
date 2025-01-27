import axios, { type AxiosInstance } from "axios"
import type {
  UserCreate,
  UserResponse,
  SessionCreate,
  SessionResponse,
  ConversationMessage,
  Conversation,
  MessageUpdateRequest,
  StatusResponse,
  ConversationMessageSend,
} from "../types/api"

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async registerUser(userData: UserCreate): Promise<UserResponse> {
    const response = await this.client.post<UserResponse>("/users/register", userData)
    return response.data
  }

  async createSession(sessionData: SessionCreate): Promise<SessionResponse> {
    const response = await this.client.post<SessionResponse>("/sessions/create", sessionData)
    return response.data
  }

  async getConversation(sessionId: string): Promise<Conversation | null> {
    try {
      const response = await this.client.get<Conversation>(`/conversations/${sessionId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  async sendMessage(
    sessionId: string,
    message: ConversationMessageSend,
  ): Promise<{ user_message: ConversationMessage; bot_response: ConversationMessage }> {
    const response = await this.client.post<{ user_message: ConversationMessage; bot_response: ConversationMessage }>(
      `/conversations/${sessionId}/message`,
      message,
    )
    return response.data
  }

  async updateMessage(sessionId: string, messageId: string, updateData: MessageUpdateRequest): Promise<StatusResponse> {
    const response = await this.client.put<StatusResponse>(
      `/conversations/${sessionId}/message/${messageId}`,
      updateData,
    )
    return response.data
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"
const apiClient = new ApiClient(API_BASE_URL)

export default apiClient

