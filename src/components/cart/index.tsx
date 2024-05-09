import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { FaPix } from 'react-icons/fa6'
import {
  PiCreditCard,
  PiCurrencyDollar,
  PiMapPinFill,
  PiMinus,
  PiMoney,
  PiPlus,
  PiTrash,
} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import colors from 'tailwindcss/colors'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/stores/cart-store'
import { useOrdersStore } from '@/stores/order-store-finish'

import { ProductProps } from '../coffee-list'
import { RadioButton } from './components/button-payment'

type FormInputsProps = {
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

const orderSchema = z.object({
  client: z.string().min(1, 'Informe seu nome'),
  cep: z.coerce.number({ invalid_type_error: 'Informe o CEP' }).min(1),
  street: z.string().min(1, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().min(1, 'Informe a UF'),
  paymentMethod: z.enum(['card', 'pix', 'cash'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

export type OrderInfo = z.infer<typeof orderSchema>

const delivery = 5

export const CartComponent = () => {
  const { cart, getTotal, removeFromCart, updateQuantity, clearCart } =
    useCartStore()
  const { addToOrder } = useOrdersStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputsProps>({
    resolver: zodResolver(orderSchema),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  const onSubmit = handleSubmit(async (values) => {
    if (cart.length === 0) {
      return toast.error(
        'Você não pode finalizar a compra com o carrinho vazio',
        {
          action: {
            label: 'Ir às compras',
            onClick: () => navigate('/'),
          },
          actionButtonStyle: {
            background: colors.purple[600],
            color: '#fff',
          },
        },
      )
    }

    const ordersStored = localStorage.getItem('@CoffeeDelivery-orders') ?? ''

    try {
      const ordersOld = ordersStored?.length > 0 ? JSON.parse(ordersStored) : []

      const dataToSend = [
        ...ordersOld,
        {
          id: uuid(),
          ...values,
          order: cart,
          delivery,
          createdAt: new Date(),
          total: getTotal() + delivery,
        },
      ]

      const client = {
        ...values,
        delivery,
      }

      addToOrder(client, cart)

      localStorage.setItem('@CoffeeDelivery-orders', JSON.stringify(dataToSend))

      clearCart()

      navigate('/success')
    } catch (error) {
      return toast.error(`Ups, ocorreu um erro! ${error}`, {
        action: {
          label: 'Ir às compras',
          onClick: () => navigate('/'),
        },
        actionButtonStyle: {
          background: colors.purple[600],
          color: '#fff',
        },
      })
    }
  })

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  console.log(errors)

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-4 w-full flex-wrap max-w-6xl mx-auto"
    >
      <div className="flex flex-col gap-4 sm:w-[600px] flex-1">
        <h2 className="font-bold text-lg font-baloo">Complete seu pedido</h2>
        <div className="flex relative flex-col rounded-lg p-6 bg-muted">
          <div className="flex gap-2">
            <span className="flex h-full items-start">
              <PiMapPinFill
                size={22}
                strokeWidth={0.5}
                className="text-brand-purple-500"
              />
            </span>
            <div>
              <span>Endereço de Entrega</span>
              <p className="text-muted-foreground">
                Informe o endereço onde deseja receber seu pedido
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-6 w-full gap-3">
            <Input
              className="col-span-6"
              type="text"
              placeholder="Seu nome"
              onError={errors.client}
              {...register('client')}
            />
            <Input
              className="col-span-2 appearance-none"
              placeholder="CEP"
              type="text"
              onError={errors.cep}
              {...register('cep')}
            />
            <Input
              className="col-span-6"
              type="text"
              placeholder="Rua"
              onError={errors.street}
              {...register('street')}
            />

            <Input
              className="col-span-2"
              type="text"
              placeholder="Número"
              onError={errors.number}
              {...register('number')}
            />
            <Input
              className="col-span-4"
              type="text"
              placeholder="Complemento"
              onError={errors.complement}
              {...register('complement')}
            />

            <Input
              className="col-span-2"
              type="text"
              placeholder="Bairro"
              onError={errors.neighborhood}
              {...register('neighborhood')}
            />
            <Input
              className="col-span-3"
              type="text"
              placeholder="Cidade"
              onError={errors.city}
              {...register('city')}
            />
            <Input
              className="col-span-1"
              type="text"
              placeholder="UF"
              maxLength={2}
              onError={errors.state}
              {...register('state')}
            />
          </div>
        </div>
        <div className="flex relative flex-col rounded-lg p-6 bg-muted">
          <div className="flex gap-2">
            <span className="flex h-full items-start">
              <PiCurrencyDollar
                size={22}
                strokeWidth={0.5}
                className="text-brand-purple-500"
              />
            </span>
            <div>
              <span>Formas de pagamento</span>
              <p className="text-muted-foreground">
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>
          <div
            className={clsx(
              'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 border  rounded-md p-2',
              {
                'border-red-400 dark:border-red-400 ': errors.paymentMethod,
                'border-transparent ': !errors.paymentMethod,
              },
            )}
          >
            <RadioButton
              isSelected={selectedPaymentMethod === 'card'}
              {...register('paymentMethod')}
              value="card"
            >
              <PiCreditCard
                size={22}
                strokeWidth={0.5}
                className="text-brand-purple-500"
              />{' '}
              CARTÃO
            </RadioButton>
            <RadioButton
              isSelected={selectedPaymentMethod === 'pix'}
              {...register('paymentMethod')}
              value="pix"
            >
              <FaPix
                size={20}
                strokeWidth={0.5}
                className="text-brand-purple-500"
              />{' '}
              PIX
            </RadioButton>
            <RadioButton
              isSelected={selectedPaymentMethod === 'cash'}
              {...register('paymentMethod')}
              value="cash"
            >
              <PiMoney
                size={22}
                strokeWidth={0.5}
                className="text-brand-purple-500"
              />{' '}
              DINHEIRO
            </RadioButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full lg:w-[400px]">
        <h2 className="font-bold text-lg font-baloo"> Cafés selecionados</h2>
        <div className="flex gap-6 flex-col relative items-center sm:rounded-tr-[36px] rounded-lg p-6 sm:rounded-bl-[36px] bg-muted">
          {cart.map((item) => (
            <div key={item.id} className="flex h-20 w-full gap-2 items-center">
              <span className="w-16 h-16 rounded-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover"
                />
              </span>
              <div className="flex-1 flex flex-col gap-1">
                <p>{item.title}</p>

                <div className="flex gap-4 lg:gap-1 justify-between">
                  <div className="flex gap-2">
                    <div className="flex justify-between px-2 h-8 items-center text-brand-purple-500 bg-zinc-200 rounded-sm">
                      <Button
                        type="button"
                        variant="ghost"
                        className="min-w-4 h-4 p-0 m-0 rounded-full"
                        disabled={!!(item.quantity && item.quantity < 2)}
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            Number(item.quantity) - 1,
                          )
                        }
                      >
                        <PiMinus size={14} />
                      </Button>
                      <span className="w-6 text-center select-none p-0 appearance-none bg-transparent text-brand-gray-800">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        className="min-w-4 h-4 p-0 m-0 rounded-full"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            Number(item.quantity) + 1,
                          )
                        }
                      >
                        <PiPlus size={14} />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-xs font-light h-8 group"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <PiTrash
                        strokeWidth={0.5}
                        size={16}
                        className="text-red-400 mr-1 opacity-75 group-hover:opacity-100"
                      />{' '}
                      REMOVER
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 font-light">
                    <span className="text-xs">{item.quantity} x</span>
                    <span className="text-2xl font-semibold text-muted-foreground font-baloo tracking-tight">
                      {(item.price * (item.quantity || 0))
                        .toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                        .replace('R$', '')
                        .trim()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between w-full py-2 border-y dark:border-zinc-600 items-center mt-8">
            <span className="w-full flex justify-between font-normal ">
              Total de itens
            </span>
            <div className="flex items-end gap-1 text-zinc-700 dark:text-zinc-200">
              <span className="font-normal text-sm pb-1 tracking-tight">
                R$
              </span>
              <span className="text-xl font-baloo tracking-tight">
                {getTotal()
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .replace('R$', '')
                  .trim()}
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full py-2 border-b dark:border-zinc-600 items-center ">
            <span className="w-full flex justify-between font-normal ">
              Frete
            </span>
            <div className="flex items-end gap-1 text-zinc-700 dark:text-zinc-200">
              <span className="font-normal text-sm pb-1 tracking-tight">
                R$
              </span>
              <span className="text-xl font-baloo tracking-tight">
                {getTotal() !== 0
                  ? delivery
                      .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                      .replace('R$', '')
                      .trim()
                  : '0,00'}
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full mt-6">
            <span className="w-full flex justify-between text-xl font-normal ">
              Total
            </span>
            <div className="flex items-end gap-1 text-zinc-700 dark:text-zinc-200">
              <span className="font-normal pb-1 tracking-tight">R$</span>
              <span className="font-extrabold text-3xl font-baloo tracking-tight">
                {getTotal() !== 0
                  ? (delivery + getTotal())
                      .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                      .replace('R$', '')
                      .trim()
                  : '0,00'}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="uppercase text-sm font-bold bg-brand-yellow-500 w-full"
          >
            Confirmar pedido
          </Button>
        </div>
      </div>
    </form>
  )
}
