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
      <div className="shelf-header">
        <div className="shelf-title-group">
          <span className="section-eyebrow">สด ๆ จากสวน</span>
          <h2>วันนี้มีอะไรให้หยิบบ้าง</h2>
          <p>ผลไม้ {fruits.length} อย่าง · เลือกของอร่อยกลับบ้าน</p>
        </div>
        <div className="shelf-hint">
          <button className="icon-btn" aria-label="ผลไม้ก่อนหน้า" onClick={() => shelfRef.current?.scrollBy({ left: -205, behavior: 'smooth' })}><ArrowLeft size={16} /></button>
          <button className="icon-btn" aria-label="ผลไม้ถัดไป" onClick={() => shelfRef.current?.scrollBy({ left: 205, behavior: 'smooth' })}><ArrowRight size={16} /></button>
        </div>
      </div>

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
