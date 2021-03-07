import { BOE } from '../../types/boe'

export const makeBOEsResponse = (boes: BOE[], page: number, limit: number) => {
  const offset = (page - 1) * limit
  return {
    total: Math.ceil(boes.length / limit),
    data: boes.slice(offset, offset + limit),
    page,
  }
}

export const filterBOEsBy = (
  boes: BOE[] = [],
  key: keyof Pick<BOE, 'drawee' | 'payee'>,
  value: number
) => boes.filter((boe) => boe[key].id === value)
