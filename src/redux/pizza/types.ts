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
