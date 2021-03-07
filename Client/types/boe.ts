import { User } from './user'

export interface BOE {
  id: number
  drawee: User
  payee: User
  amount: number
  endorsement: User[]
}
