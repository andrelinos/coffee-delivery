import { create } from 'zustand'

type ProductProps = {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
  quantity: number
}

type CartStateProps = {
  cart: ProductProps[]
  addToCart: (product: ProductProps) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getTotal: () => number
  clearCart: () => void
}

export const useCartStore = create<CartStateProps>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id)

      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
        return { cart: updatedCart }
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] }
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    })),

  getTotal: (): number =>
    useCartStore
      .getState()
      .cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0),

  clearCart: () => set({ cart: [] }),
}))
