export interface prodInter {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  ratingValue: boolean
  counts: number
  rating: {
    rate: number
    count: number
  }
}

export type myProdInter = [prodInter]
