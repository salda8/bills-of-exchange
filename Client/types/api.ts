import { BOE } from './boe'
import { User } from './user'

interface PaginationResponse<T> {
  total: number
  page: number
  data: T[]
}

export type BOEListResponse = PaginationResponse<BOE>

export type BOEResponse = BOE

export type UserListResponse = PaginationResponse<User>

export type UserResponse = User

export type ApiError = {
  code: 'not_found' | 'api_error'
  message?: string
} | null

export type FetchState = 'done' | 'loading'
