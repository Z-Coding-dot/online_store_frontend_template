import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggle } from '@/redux/store'
export function useWishlist() { const dispatch = useAppDispatch(); const ids = useAppSelector((state) => state.wishlist.ids); return { ids, has: (id: string) => ids.includes(id), toggle: (id: string) => dispatch(toggle(id)) } }
