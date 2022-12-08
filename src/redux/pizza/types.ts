export type Pizza = {
  id: string
  name: string
  ingredients: string
  description: {
    calories: number
    proteins: number
    fats: number
    carbs: number
  }
  price: number
  prices: {
    small?: number
    medium?: number
    large?: number
  }
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export type PizzaSliceState = {
  item?: Pizza
  activeType: number
  activeSize: number
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
