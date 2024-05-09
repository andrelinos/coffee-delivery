import {
  PiFacebookLogo,
  PiTiktokLogo,
  PiWhatsappLogo,
  PiXLogo,
} from 'react-icons/pi'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <div className="flex relative w-full items-center flex-col pb-24">
      <div className="flex justify-between max-w-6xl w-full px-6">
        <Link to="/">
          <img src="/assets/logo.svg" alt="Logo Coffee Delivery" />
        </Link>
        <div className="flex gap-2 text-brand-purple-500">
          <Link to="https://x.com" target="_blank">
            <PiXLogo
              size={32}
              strokeWidth={0.5}
              className="hover:animate-bounce"
            />
          </Link>
          <Link to="https://tiktok.com" target="_blank">
            <PiTiktokLogo
              size={32}
              strokeWidth={0.5}
              className="hover:animate-bounce"
            />
          </Link>
          <Link to="https://facebook.com" target="_blank">
            <PiFacebookLogo
              size={32}
              strokeWidth={0.5}
              className="hover:animate-bounce"
            />
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-muted-foreground mt-8">
          © {new Date().getFullYear()} | Todos os direitos reservados.
        </span>
      </div>

      <Link
        to="https://whatsapp.com"
        target="_blank"
        className="fixed group bottom-20 p-0 flex gap-2 items-center right-6 bg-green-500 rounded-full w-12 justify-center h-12 transition-all duration-300 ease-in-out hover:w-52"
      >
        <PiWhatsappLogo
          size={32}
          strokeWidth={0.5}
          className="text-white group-hover:animate-bounce"
        />
        <span className="text-lg font-baloo transition-all dura font-bold text-white hidden whitespace-nowrap group-hover:inline-block opacity-0 group-hover:opacity-100">
          Fale conosco
        </span>
      </Link>
    </div>
  )
}
