export interface Ingredient {
    name?: string
    value?: number | null
  }

export interface NewIngredients {
  numberOfPeople: number
  ingredients: Ingredient[]
}