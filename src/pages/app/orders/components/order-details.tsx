import { PiPrinter } from 'react-icons/pi'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

import { OrderProps } from '..'

interface OrderDetailsProps {
  orderSelected?: OrderProps
  selectOrder: () => void
}

export function OrderDetails({
  orderSelected,
  selectOrder,
}: OrderDetailsProps) {
  function printTable() {
    window.print()
  }

  const paymentMethod = {
    card: 'Cartão',
    pix: 'PIX',
    cash: 'Dinheiro',
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={selectOrder}>
        <Button variant="outline">Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Olá, {orderSelected?.client},</DialogTitle>
          <DialogDescription>
            Seu pedido está detalhado abaixo
          </DialogDescription>
        </DialogHeader>
        <div id="table" className="flex w-full mt-10 flex-col">
          <div className="flex flex-col items-baseline gap-1">
            <h2 className="font-bold text-3xl font-baloo text-muted-foreground">
              Detalhes do seu pedido
            </h2>
            <div className="text-xs px-6 w-full flex justify-between text-muted-foreground gap-1 pt-4 pb-2">
              <p>
                <strong>Data do pedido</strong>:{' '}
                {getLocalDate(orderSelected?.createdAt)}
              </p>
              <p>
                <strong>Método de pagamento</strong>:{' '}
                {orderSelected && paymentMethod[orderSelected?.paymentMethod]}
              </p>
            </div>
          </div>
          <Table className="w-full">
            <TableCaption>
              A Coffee Delivery agradece a sua compra. 💜
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="w-20 text-right">Quantidade</TableHead>

                <TableHead className="w-20">Preço</TableHead>
                <TableHead className="w-20 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderSelected?.order?.map((product) => (
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
                <TableCell colSpan={2} className="font-bold">
                  Total do pedido
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="text-right font-bold text-lg font-baloo"
                >
                  <div className="flex items-center justify-end">
                    <span className="font-light  text-xs mr-2">
                      {orderSelected?.order?.length} x
                    </span>

                    {orderSelected?.total?.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cancelar</Button>
          </DialogClose>
          <Button
            variant="outline"
            className="p-0 print:hidden px-4 flex gap-2 font-normal text-xs text-brand-purple-500 hover:text-brand-purple-500 border-brand-purple-500 hover:bg-brand-purple-500/10 hover:bg-purple-200"
            onClick={printTable}
          >
            <PiPrinter size={22} />
            <span>IMPRIMIR</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}