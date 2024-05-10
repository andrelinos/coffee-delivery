import {
  PiCoffeeFill,
  PiPackageFill,
  PiShoppingCartFill,
  PiTimerFill,
} from 'react-icons/pi'

export function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
      <div className="order-2 lg:order-1">
        <h2 className="text-3xl lg:text-5xl mt-6 font-baloo font-bold tracking-tight text-brand-gray-800 dark:text-brand-gray-100">
          Encontre o café perfeito para qualquer hora do dia
        </h2>
        <p className="py-4 text-muted-foreground">
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </p>

        <div className="grid mt-6 grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <span className="min-w-8 size-8 flex justify-center items-center bg-brand-yellow-600 text-white rounded-full">
                <PiShoppingCartFill />
              </span>
              <span className="text-muted-foreground text-xs">
                Compra simples
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="min-w-8 size-8 flex justify-center items-center bg-brand-yellow-500 text-white rounded-full">
                <PiTimerFill />
              </span>
              <span className="text-muted-foreground text-xs">
                Entrega rápida e rastreada
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <span className="min-w-8 size-8 flex justify-center items-center bg-brand-gray-600 text-white rounded-full">
                <PiPackageFill />
              </span>
              <span className="text-muted-foreground text-xs">
                Embalagem mantém o café intacto
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="min-w-8 size-8 flex justify-center items-center bg-brand-purple-500 text-white rounded-full">
                <PiCoffeeFill />
              </span>
              <span className="text-muted-foreground text-xs">
                O café chega fresquinho até você
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:pl-6 mx-auto order-1 lg:order-2">
        <img src="/assets/hero.svg" alt="" />
      </div>
    </div>
  )
}
