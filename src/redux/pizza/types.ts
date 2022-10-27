export type Pizza = {
  id: string
  name: string
  prices: {
    small?: number
    medium?: number
    large?: number
  }
  imageUrl: string
  sizes: PizzaSizes
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum PizzaSizes {
  'SMALL' = 26,
  'MEDIUM' = 30,
  'LARGE' = 40,
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
