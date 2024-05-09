import { useEffect, useState } from 'react'
import { PiTrash } from 'react-icons/pi'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getLocalDate } from '@/utils/getDateFormated'

import { OrderDetails } from './components/order-details'

interface CartItemProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  quantity: number
  tags: string[]
}

export interface OrderProps {
  order: CartItemProps[]
  cep: string
  city: string
  client: string
  complement: string
  createdAt: string
  delivery: number
  id: string
  neighborhood: string
  number: string
  paymentMethod: 'card' | 'pix' | 'cash'
  state: string
  street: string
  total: number
}

const paymentMethod = {
  card: 'Cartão',
  pix: 'PIX',
  cash: 'Dinheiro',
}

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>(() => [])
  const [orderSelected, setOrderSelected] = useState<OrderProps>()

  function handleViewOrder(order: OrderProps) {
    setOrderSelected(order)
  }

  useEffect(() => {
    const ordersStored = localStorage.getItem('@CoffeeDelivery-orders') ?? ''
    if (ordersStored) {
      try {
        const ordersData = JSON.parse(ordersStored)
        setOrders(ordersData)
      } catch (error) {}
    }
  }, [])

  return (
    <div className="flex items-center flex-col w-full">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex items-baseline gap-4">
          <h2 className="font-bold text-3xl font-baloo text-muted-foreground">
            Detalhes do seu pedido
          </h2>
        </div>
        <Table>
          <TableCaption>
            A Coffee Delivery agradece suas compras. 💜
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Data da compra</TableHead>
              <TableHead className="w-[120px]">Valor</TableHead>
              <TableHead className="w-[200px]">Método de pagamento</TableHead>
              <TableHead className="text-right">Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium font-baloo">
                  {getLocalDate(order.createdAt)}
                </TableCell>
                <TableCell className="">
                  {order.total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="font-baloo">
                  {paymentMethod[order.paymentMethod]}
                </TableCell>
                <TableCell className="text-right font-baloo">
                  <div className="flex items-center gap-1 justify-end">
                    <OrderDetails
                      selectOrder={() => handleViewOrder(order)}
                      orderSelected={orderSelected}
                    />
                    <Button variant="ghost">
                      <PiTrash size={22} className="text-red-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-xs font-light">
                Pedidos realizados: 10
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}