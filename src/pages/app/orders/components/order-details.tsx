import { PiListMagnifyingGlass, PiPrinter } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
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
        <Button variant="ghost" className="p-0 gap-1 sm:px-4 sm:border">
          <PiListMagnifyingGlass size={22} className="text-brand-purple-500" />
          <span className="hidden sm:block text-xs font-normal">Detalhes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl print:top-0 print:translate-y-[2vh] bg-muted rounded-lg">
        <DialogHeader>
          <DialogTitle>
            <div className="w-full flex justify-between pr-6 print:pr-0 gap-4">
              <div className="space-y-1">
                <span> Olá, {orderSelected?.client},</span>
                <p className="text-sm font-normal text-muted-foreground">
                  Seu pedido está detalhado abaixo
                </p>
              </div>
              <Link
                to="/"
                className="w-full pb-6 flex justify-center sm:w-auto"
              >
                <img
                  src="/assets/logo.svg"
                  alt="Logo Coffee Delivery"
                  className="w-32 sm:w-auto"
                />
              </Link>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div id="table" className="flex w-full print:mt-0 flex-col">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-3xl font-baloo text-muted-foreground">
              Detalhes do seu pedido
            </h2>
            <div className="text-xs w-full flex sm:justify-between text-muted-foreground gap-1 pt-4 pb-2">
              <p>
                <strong>Data do pedido</strong>:{' '}
                {getLocalDate(orderSelected?.createdAt)}
              </p>
              <p className="text-right">
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
                <TableHead className="sm:w-20 text-right">Quant.</TableHead>

                <TableHead className="sm:w-20">Preço</TableHead>
                <TableHead className="sm:w-20 text-right">Total</TableHead>
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
        <DialogFooter className="flex gap-4 items-end print:hidden">
          <div className="flex gap-4 mt-auto">
            <DialogClose asChild>
              <Button variant="default" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              className="p-0 px-4 flex gap-2 font-normal text-xs text-brand-purple-500 hover:text-brand-purple-500 border-brand-purple-500 hover:bg-brand-purple-500/10 hover:bg-purple-200"
              onClick={printTable}
            >
              <PiPrinter size={22} />
              <span>IMPRIMIR</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
