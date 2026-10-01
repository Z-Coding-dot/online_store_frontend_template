import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { add, remove, update } from '@/redux/store'
import type { Product } from '@/types'
import { calculateSubtotal } from '@/utils/format'

export function useCart() {
  const dispatch = useAppDispatch()
  const lines = useAppSelector((state) => state.cart.lines)
  return { lines, count: lines.reduce((count, line) => count + line.quantity, 0), subtotal: calculateSubtotal(lines), add: (product: Product) => dispatch(add({ product })), update: (id: string, quantity: number) => dispatch(update({ id, quantity })), remove: (id: string) => dispatch(remove(id)) }
}
