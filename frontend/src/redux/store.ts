import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartLine, Product } from '@/types'

const load = <T>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T } catch { return fallback }
}

interface CartState { lines: CartLine[] }
const cartSlice = createSlice({
  name: 'cart',
  initialState: { lines: load<CartLine[]>('arden-cart-v1', []) } as CartState,
  reducers: {
    add: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const existing = state.lines.find((line) => line.product.id === action.payload.product.id)
      if (existing) existing.quantity = Math.min(existing.quantity + (action.payload.quantity ?? 1), action.payload.product.stock)
      else state.lines.push({ product: action.payload.product, quantity: action.payload.quantity ?? 1 })
    },
    update: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const line = state.lines.find((item) => item.product.id === action.payload.id)
      if (line) line.quantity = Math.max(1, Math.min(action.payload.quantity, line.product.stock))
    },
    remove: (state, action: PayloadAction<string>) => { state.lines = state.lines.filter((line) => line.product.id !== action.payload) },
    clear: (state) => { state.lines = [] },
  },
})

interface WishlistState { ids: string[] }
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: load<string[]>('arden-wishlist-v1', []) } as WishlistState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => { state.ids = state.ids.includes(action.payload) ? state.ids.filter((id) => id !== action.payload) : [...state.ids, action.payload] },
  },
})

const uiSlice = createSlice({ name: 'ui', initialState: { mobileMenu: false, cartDrawer: false }, reducers: {
  setMobileMenu: (state, action: PayloadAction<boolean>) => { state.mobileMenu = action.payload },
  setCartDrawer: (state, action: PayloadAction<boolean>) => { state.cartDrawer = action.payload },
} })

export const { add, update, remove, clear } = cartSlice.actions
export const { toggle } = wishlistSlice.actions
export const { setMobileMenu, setCartDrawer } = uiSlice.actions

export const store = configureStore({ reducer: { cart: cartSlice.reducer, wishlist: wishlistSlice.reducer, ui: uiSlice.reducer } })
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('arden-cart-v1', JSON.stringify(state.cart.lines))
  localStorage.setItem('arden-wishlist-v1', JSON.stringify(state.wishlist.ids))
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
