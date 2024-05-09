import { PiMapPinFill, PiShoppingCartFill, PiUserList } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useCartStore } from '@/stores/cart-store'
import { ThemeToggle } from '@/theme/theme-toggle'

export function Header() {
  const { cart } = useCartStore()

  return (
    <div className="flex justify-between flex-col sm:flex-row w-full max-w-6xl px-6 mx-auto py-8">
      <Link to="/" className="w-full pb-6 flex justify-center sm:w-auto">
        <img
          src="/assets/logo.svg"
          alt="Logo Coffee Delivery"
          className="w-32 sm:w-auto"
        />
      </Link>
      <aside className="flex gap-3 justify-center">
        <div className="rounded-sm flex gap-2 h-10 px-4 justify-center items-center bg-brand-purple-200">
          <PiMapPinFill
            size={22}
            strokeWidth={0.5}
            className="text-brand-purple-500"
          />
          <span className="text-brand-purple-600">Carangola, MG</span>
        </div>
        <div className="print:hidden flex gap-3">
          <Link
            to="/orders"
            className="w-10 h-10 rounded-sm flex justify-center items-center relative bg-brand-purple-500"
          >
            <PiUserList strokeWidth={0.5} size={22} className="text-white" />
          </Link>
          {cart.length === 0 ? (
            <div className="w-10  h-10 rounded-sm flex justify-center items-center relative bg-brand-yellow-200">
              <PiShoppingCartFill
                strokeWidth={0.5}
                size={22}
                className="text-brand-yellow-600"
              />
              {cart.length > 0 ? (
                <span className="absolute -right-2 text-white -top-3 rounded-full text-xs bg-brand-yellow-600 w-6 h-6 flex justify-center items-center font-medium">
                  {cart.length}
                </span>
              ) : null}
            </div>
          ) : (
            <Link
              to="/cart"
              className="w-10 h-10 rounded-sm flex justify-center items-center relative bg-brand-yellow-200"
            >
              <PiShoppingCartFill
                strokeWidth={0.5}
                size={22}
                className="text-brand-yellow-600"
              />
              {cart.length > 0 ? (
                <span className="absolute -right-2 text-white -top-3 rounded-full text-xs bg-brand-yellow-600 w-6 h-6 flex justify-center items-center font-medium">
                  {cart.length}
                </span>
              ) : null}
            </Link>
          )}
          <ThemeToggle />
        </div>
      </aside>
    </div>
  )
}
