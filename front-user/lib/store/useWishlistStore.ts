import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/types/api'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        const items = get().items
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (productId: string) => {
        const newItems = get().items.filter((item) => item.id !== productId)
        set({ items: newItems })
      },
      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId)
      },
      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)




