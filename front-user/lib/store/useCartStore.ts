import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/types/api'

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

interface CartState {
  items: CartItem[]
  totalAmount: number
  itemCount: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalAmount: 0,
      itemCount: 0,
      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.productId === product.id)

        let newItems: CartItem[]
        if (existingItem) {
          newItems = items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          newItems = [
            ...items,
            {
              productId: product.id,
              product,
              quantity,
              price: product.price,
            },
          ]
        }

        const totalAmount = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
        set({ items: newItems, totalAmount, itemCount })
      },
      removeItem: (productId: string) => {
        const newItems = get().items.filter((item) => item.productId !== productId)
        const totalAmount = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
        set({ items: newItems, totalAmount, itemCount })
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        const totalAmount = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
        set({ items: newItems, totalAmount, itemCount })
      },
      clearCart: () => {
        set({ items: [], totalAmount: 0, itemCount: 0 })
      },
      calculateTotal: () => {
        const items = get().items
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        set({ totalAmount, itemCount })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

