import {
  ApiError,
  BOEListResponse,
  BOEResponse,
  UserResponse,
  UserListResponse,
} from '../../types/api'
import usersData from '../data/users.json'
import boesData from '../data/boes.json'
import { UserBoeType } from '../../types/user'
import { makeBOEsResponse, filterBOEsBy } from './utils'
import random from 'lodash/random'

const PAGE_LIMIT = 10

export function fetchBOEs(page: number = 1) {
  return new Promise<BOEListResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve(makeBOEsResponse(boesData, page, PAGE_LIMIT))
    }, random(100, 500))
  })
}

export function fetchBOE(id: number) {
  return new Promise<BOEResponse>((resolve, reject) => {
    setTimeout(() => {
      const boe = boesData.find((boe) => boe.id === id)
      if (boe) {
        return resolve(boe)
      }
      reject({
        code: 'not_found',
      } as ApiError)
    }, random(100, 500))
  })
}

export function fetchUsers(page: number = 1) {
  return new Promise<UserListResponse>((resolve) => {
    const offset = (page - 1) * PAGE_LIMIT
    setTimeout(() => {
      resolve({
        total: Math.ceil(usersData.length / PAGE_LIMIT),
        data: usersData.slice(offset, offset + PAGE_LIMIT),
        page,
      })
    }, random(100, 500))
  })
}

export function fetchUser(id: number) {
  return new Promise<UserResponse>((resolve, reject) => {
    setTimeout(() => {
      const user = usersData.find((u) => u.id === id)
      if (user) {
        return resolve(user)
      }
      reject({ code: 'not_found' } as ApiError)
    }, random(100, 500))
  })
}

export function fetchUserBOEs(id: number, type: UserBoeType, page: number) {
  return new Promise<BOEListResponse>((resolve, reject) => {
    setTimeout(() => {
      const user = usersData.find((u) => u.id === id)
      if (user) {
        return resolve(
          makeBOEsResponse(filterBOEsBy(boesData, type, id), page, PAGE_LIMIT)
        )
      }
      reject({ code: 'not_found' } as ApiError)
    }, random(100, 500))
  })
}
