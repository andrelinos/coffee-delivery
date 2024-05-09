import { CoffeeList } from '@/components/coffee-list'
import { Hero } from '@/components/hero'

export function Home() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto h-screen w-full">
      <Hero />
      <CoffeeList />
    </div>
  )
}
