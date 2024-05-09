import { coffees } from '../../../data.json'
import { CoffeeListCard } from './components/card'

export interface ProductProps {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
}

export function CoffeeList() {
  return (
    <div className="flex w-full h-auto gap-8 py-24 flex-wrap justify-center">
      {coffees.map((coffee: ProductProps, index) => (
        <CoffeeListCard key={index} data={coffee} />
      ))}
    </div>
  )
}
