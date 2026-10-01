export type Locale = 'en' | 'fa-AF' | 'ps'

export interface ProductVariant {
  id: string
  label: string
  value: string
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  categoryLabel: string
  brand: string
  price: number
  compareAt?: number
  rating: number
  reviewCount: number
  stock: number
  description: string
  image: string
  hoverImage: string
  colors?: ProductVariant[]
  sizes?: ProductVariant[]
  featured?: boolean
  newArrival?: boolean
}

export interface CartLine {
  product: Product
  quantity: number
  variantId?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  count: number
}
