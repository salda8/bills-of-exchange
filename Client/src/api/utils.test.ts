import { filterBOEsBy, makeBOEsResponse } from './utils'
import boesMock from '../data/boes.mock.json'

describe('filterBOEsBy - filter BOEs by drawee or payee', () => {
  it('should return empty array when no BOEs are provided', () => {
    expect(filterBOEsBy([], 'drawee', 111)).toStrictEqual([])
  })

  it('should return empty array when no BOE match filter', () => {
    expect(filterBOEsBy(boesMock, 'drawee', 111)).toStrictEqual([])
  })

  it('should filter BOEs for valid drawee and payee', () => {
    expect(filterBOEsBy(boesMock, 'drawee', 18814)).toHaveLength(3)
    expect(filterBOEsBy(boesMock, 'payee', 733931)).toHaveLength(2)
  })
})

describe('makeBOEsResponse - make BOEs response based on given data and page', () => {
  it('should return empty array when no BOEs are provided', () => {
    expect(makeBOEsResponse([], 1, 10)).toStrictEqual({
      total: 0,
      data: [],
      page: 1,
    })
  })

  it('should return right data for given page and limit', () => {
    let limit = 5
    let page = 1
    expect(makeBOEsResponse(boesMock, page, limit)).toStrictEqual({
      total: 3,
      data: boesMock.slice(0, limit),
      page,
    })

    page = 2
    expect(makeBOEsResponse(boesMock, page, limit)).toStrictEqual({
      total: 3,
      data: boesMock.slice(limit, limit * 2),
      page,
    })
  })
})
