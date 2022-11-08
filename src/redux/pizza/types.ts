export type Pizza = {
  id: string
  name: string
  price: number
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
// !need to fix these types
export type PizzaSliceState = {
  id: string
  name: string
  price: number
  prices: {
    small?: number
    medium?: number
    large?: number
  }
  imageUrl: string
  sizes: number[]
  types: number[]
  category: number
  rating: number
}

export type SearchPizzaParams = {
  sortBy: string
  category: string
  orderBy: string
  searchBy: string
  currentPage: string
}

export enum PizzaSizes {
  'SMALL' = 26,
  'MEDIUM' = 30,
  'LARGE' = 40,
}
