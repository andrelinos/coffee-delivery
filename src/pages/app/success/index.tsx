import {
  PiCurrencyDollar,
  PiMapPinFill,
  PiPrinter,
  PiTimerFill,
} from 'react-icons/pi'

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
import { useOrdersStore } from '@/stores/order-store-finish'

export function Success() {
  const { order, getTotal } = useOrdersStore()

  const paymentMethod = {
    card: 'Cartão',
    pix: 'PIX',
    cash: 'Dinheiro',
  }

  function printTable() {
    window.print()
  }

  const clientAddress = order
    ? `${order.client.street}, ${order.client.number}, ${order.client.neighborhood}, ${order.client.city}-${order.client.state}, ${order.client.cep}`
    : null

  return (
    <div className="flex items-center flex-col w-full min-h-screen">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex-flex-col gap-2">
          <h2 className="font-bold text-3xl font-baloo text-brand-yellow-500">
            Uhu! Pedido confirmado
          </h2>
          <p className="text-muted-foreground mt-2">
            Olá, <strong>{order.client.client}</strong>, agora é só aguardar que
            logo o seu café chegará até você
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex relative flex-col gap-8 sm:rounded-tr-[36px] rounded-lg p-6 sm:rounded-bl-[36px] bg-muted">
            <div className="flex w-full gap-4">
              <span className="w-10 flex justify-center items-center h-10 bg-brand-purple-500 rounded-full p-2 print:bg-muted">
                <PiMapPinFill
                  size={22}
                  strokeWidth={0.5}
                  className="text-white print:text-brand-purple-500"
                />
              </span>
              <div className="flex flex-col">
                <p>Endereço de entrega</p>
                <strong>{clientAddress || ''}</strong>
                <strong>{}</strong>
              </div>
            </div>
            <div className="flex w-full gap-4">
              <span className="w-10 flex justify-center items-center h-10 bg-brand-yellow-500 rounded-full p-2 print:bg-muted">
                <PiTimerFill
                  size={22}
                  strokeWidth={0.5}
                  className="text-white print:text-brand-yellow-500"
                />
              </span>
              <div className="flex flex-col">
                <p>Previsão de entrega</p>
                <strong>20 min - 35 min</strong>
              </div>
            </div>

            <div className="flex w-full gap-4">
              <span className="w-10 flex justify-center items-center h-10 bg-brand-yellow-600 rounded-full p-2 print:bg-muted">
                <PiCurrencyDollar
                  size={22}
                  strokeWidth={0.5}
                  className="text-white print:text-brand-yellow-600"
                />
              </span>
              <div className="flex flex-col">
                <p>Pagamento na entrega</p>
                <strong>{paymentMethod[order.client.paymentMethod]}</strong>
              </div>
            </div>
          </div>
          <div className="flex justify-center print:hidden">
            <img src="/public/assets/delivery.svg" alt="" />
          </div>
        </div>
      </div>
      <div id="table" className="flex w-full mt-10 flex-col">
        <div className="flex items-baseline gap-4">
          <h2 className="font-bold text-3xl font-baloo text-muted-foreground">
            Detalhes do seu pedido
          </h2>
          <Button
            variant="outline"
            className="p-0 print:hidden px-4 flex gap-2 font-normal text-xs text-brand-purple-500 hover:text-brand-purple-500 border-brand-purple-500 hover:bg-brand-purple-500/10 hover:bg-purple-200"
            onClick={printTable}
          >
            <PiPrinter size={22} />
            <span>IMPRIMIR</span>
          </Button>
        </div>
        <Table>
          <TableCaption>
            A Coffee Delivery agradece a sua compra. 💜
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="w-[100px] text-right">Quantidade</TableHead>
              <TableHead className="w-[100px]">Preço</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium font-baloo">
                  {product.title}
                </TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="font-baloo">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="text-right font-baloo">
                  {(product.price * (product?.quantity ?? 0)).toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    },
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                Total do pedido
              </TableCell>
              <TableCell className="text-right font-bold text-lg font-baloo">
                <span className="font-light text-xs mr-2">
                  {order.products.length} x
                </span>
                {getTotal().toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
