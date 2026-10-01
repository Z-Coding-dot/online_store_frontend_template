import { products } from '@/data/products'
import type { Product } from '@/types'
export interface ProductService { list: () => Promise<Product[]>; getBySlug: (slug: string) => Promise<Product | undefined> }
export const productService: ProductService = { list: async () => products, getBySlug: async (slug) => products.find((product) => product.slug === slug) }
