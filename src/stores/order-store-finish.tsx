import { create } from 'zustand'

type ProductProps = {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
  quantity?: number
}

type ClientProps = {
  client: string
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  cart: ProductProps[]
  paymentMethod: 'card' | 'pix' | 'cash'
}

type OrderProps = {
  client: ClientProps
  products: ProductProps[]
}

type OrdersStateProps = {
  order: OrderProps
  addToOrder: (client: ClientProps, products: ProductProps[]) => void
  getTotal: () => number
}

export const useOrdersStore = create<OrdersStateProps>((set) => ({
  order: { client: {} as ClientProps, products: [] as ProductProps[] },
  addToOrder: (client, products) =>
    set(() => ({
      order: {
        client,
        products,
      },
    })),
  getTotal: (): number =>
    useOrdersStore
      .getState()
      .order.products.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0,
      ),
}))
