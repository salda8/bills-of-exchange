import { useState, useEffect, useCallback } from 'react'
import {
  BOEListResponse,
  UserResponse,
  UserListResponse,
  ApiError,
  FetchState,
  BOEResponse,
} from '../../types/api'
import { UserBoeType } from '../../types/user'
import {
  fetchBOE,
  fetchBOEs,
  fetchUser,
  fetchUserBOEs,
  fetchUsers,
} from './index'

type CacheState<T> = {
  [key: string]: T
}

type ApiHookType<T> = [state: FetchState, data: T | null, error: ApiError]

const useApi = <T>(
  promiseCreator: () => Promise<T>,
  cacheKey: string
): ApiHookType<T> => {
  const [cache, setCache] = useState<CacheState<T>>({})
  const [fetchState, setFetchState] = useState<FetchState>('loading')
  const [error, setError] = useState<ApiError>(null)

  useEffect(() => {
    if (cache[cacheKey]) {
      setFetchState('done')
      setError(null)
      return
    }
    setFetchState('loading')
    promiseCreator()
      .then((data) => {
        setCache((state) => ({ ...state, [cacheKey]: data }))
        setFetchState('done')
        setError(null)
      })
      .catch((error: ApiError) => {
        setError(error)
        setFetchState('done')
      })
  }, [cache, setCache, cacheKey, promiseCreator])

  return [fetchState, cache[cacheKey] || null, error]
}

export const useBOEs = (page: number) => {
  const cb = useCallback(() => fetchBOEs(page), [page])
  return useApi<BOEListResponse>(cb, page.toString())
}

export const useBOE = (id: number) => {
  const cb = useCallback(() => fetchBOE(id), [id])
  return useApi<BOEResponse>(cb, id.toString())
}

export const useUsers = (page: number) => {
  const cb = useCallback(() => fetchUsers(page), [page])
  return useApi<UserListResponse>(cb, page.toString())
}

export const useUser = (id: number) => {
  const cb = useCallback(() => fetchUser(id), [id])
  return useApi<UserResponse>(cb, id.toString())
}

export const useUserBOEs = (
  id: number,
  type: UserBoeType = 'drawee',
  page: number = 1
) =>
  useApi<BOEListResponse>(() => fetchUserBOEs(id, type, page), `${id}-${page}`)
