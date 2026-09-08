import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { FruitCard } from './FruitCard'

interface FruitShelfProps {
  fruits: FruitItem[]
  basketQuantities: Record<string, number>
  onAddToCart: (fruit: FruitItem, startPos: { x: number; y: number }) => void
}

export const FruitShelf: React.FC<FruitShelfProps> = ({
  fruits,
  basketQuantities,
  onAddToCart
}) => {
  const shelfRef = useRef<HTMLDivElement>(null)
  return (
    <section className="fruits-section">
      <div className="shelf-header"><h2>เลือกผลไม้</h2><span>ปัดเลือก · แตะเพื่อเพิ่ม</span><div className="carousel-controls"><button aria-label="ผลไม้ก่อนหน้า" onClick={()=>shelfRef.current?.scrollBy({left:-240,behavior:'smooth'})}><ArrowLeft size={14}/></button><button aria-label="ผลไม้ถัดไป" onClick={()=>shelfRef.current?.scrollBy({left:240,behavior:'smooth'})}><ArrowRight size={14}/></button></div></div>
      <div className="fruits-grid" ref={shelfRef}>
        {fruits.map(fruit => (
          <FruitCard
            key={fruit.id}
            fruit={fruit}
            quantityInBasket={basketQuantities[fruit.id] || 0}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}
