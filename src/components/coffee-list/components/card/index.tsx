import { useState } from 'react'
import { PiMinus, PiPlus, PiShoppingCartFill } from 'react-icons/pi'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'

import { ProductProps } from '../..'

type CoffeeProps = {
  data: ProductProps
}

export function CoffeeListCard({ data }: CoffeeProps) {
  const { addToCart, updateQuantity } = useCartStore()

  const [quantity, setQuantity] = useState<number>(1)

  const [isItemAdded, setIsItemAdded] = useState(false)

  function incrementQuantity() {
    setQuantity((state) => state + 1)
    setIsItemAdded(false)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
    setIsItemAdded(false)
  }

  function handleAddItem() {
    addToCart({ ...data, quantity })
    updateQuantity(data.id, quantity)
    setIsItemAdded(true)
    setQuantity(1)
  }

  return (
    <div className="flex relative pt-24 flex-col items-center min-w-64 lg:max-w-64 h-80 rounded-tr-[36px] rounded-lg p-6 rounded-bl-[36px] bg-muted">
      <span className="w-32 absolute -top-4 h-32">
        <img src={data.image} alt={data.title} />
      </span>
      <div className="flex gap-2 justify-center">
        {data.tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="font-bold uppercase mt-4 text-brand-yellow-600 text-[0.625rem] flex py-1 px-2 justify-center items-center rounded-full bg-brand-yellow-200"
            >
              {tag}
            </span>
          )
        })}
      </div>

      <h2 className="font-bold text-xl py-4">{data.title}</h2>
      <p className="text-muted-foreground text-sm">
        O tradicional café feito com água quente e grãos moídos
      </p>

      <div className="flex absolute bottom-0 right-0 left-0 px-6 pb-5 gap-2 justify-between items-center pt-6 w-full">
        <div className="flex items-end gap-1 text-zinc-700">
          <span className="font-normal pb-1 tracking-tight">R$</span>
          <span className="font-extrabold text-3xl font-baloo tracking-tight">
            {data.price
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              .replace('R$', '')
              .trim()}
          </span>
        </div>
        <div className="flex gap-4 lg:gap-1 justify-between">
          <div className="flex w-[72px] justify-between px-2 h-10 items-center text-brand-purple-500 bg-zinc-200 rounded-sm">
            <Button
              variant="ghost"
              className="min-w-4 h-4 p-0 m-0 rounded-full"
              disabled={quantity < 2}
              onClick={decrementQuantity}
            >
              <PiMinus size={14} />
            </Button>
            <span className="w-6 text-center p-0 appearance-none bg-transparent text-brand-gray-800">
              {quantity}
            </span>
            <Button
              variant="ghost"
              className="min-w-4 h-4 p-0 m-0 rounded-full"
              onClick={incrementQuantity}
            >
              <PiPlus size={14} />
            </Button>
          </div>
          <Button
            variant="ghost"
            className="min-w-10 p-0 size-10 rounded-sm opacity-85 flex justify-center items-center relative bg-brand-purple-500 hover:bg-brand-purple-500 hover:opacity-100"
            disabled={isItemAdded}
            onClick={handleAddItem}
          >
            <PiShoppingCartFill
              strokeWidth={0.5}
              size={22}
              className="text-white"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
