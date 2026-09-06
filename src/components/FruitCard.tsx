import React, { useRef } from 'react'
import { Plus, MapPin } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { soundManager } from '../utils/audio'

interface FruitCardProps {
  fruit: FruitItem
  quantityInBasket: number
  onAddToCart: (fruit: FruitItem, startPos: { x: number; y: number }) => void
}

export const FruitCard: React.FC<FruitCardProps> = ({
  fruit,
  quantityInBasket,
  onAddToCart
}) => {
  const cardImgRef = useRef<HTMLImageElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleAdd = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    soundManager.playWoodClick()

    // Calculate start coordinate for drop animation from the fruit image or button
    let startX = window.innerWidth / 2
    let startY = window.innerHeight / 2

    if (cardImgRef.current) {
      const rect = cardImgRef.current.getBoundingClientRect()
      startX = rect.left + rect.width / 2
      startY = rect.top + rect.height / 2
    } else if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      startX = rect.left + rect.width / 2
      startY = rect.top + rect.height / 2
    }

    onAddToCart(fruit, { x: startX, y: startY })
  }

  return (
    <article
      className={`fruit-card ${quantityInBasket > 0 ? 'in-basket' : ''}`}
      onClick={handleAdd}
    >
      <div className="fruit-img-box">
        <img
          ref={cardImgRef}
          src={fruit.image}
          alt={fruit.thaiName}
          loading="lazy"
        />
        {quantityInBasket > 0 && (
          <span className="fruit-card-count-badge">
            x{quantityInBasket}
          </span>
        )}
      </div>

      <div className="fruit-info">
        {fruit.badge && (
          <span className="fruit-badge-tag">{fruit.badge}</span>
        )}
        <h3 className="fruit-name-thai">{fruit.thaiName}</h3>
        <p className="fruit-name-en">{fruit.name}</p>

        <div className="fruit-origin-row">
          <MapPin size={10} color="#d4af37" />
          <span>{fruit.origin}</span>
        </div>

        <div className="fruit-card-action">
          <span className="fruit-price">฿{fruit.price.toLocaleString()}<small> / {fruit.unit}</small></span>
          <button
            ref={buttonRef}
            className="add-basket-btn"
            onClick={handleAdd}
            aria-label={`หยิบ ${fruit.thaiName} ใส่ตะกร้า`}
          >
            <Plus size={14} />
            <span>{quantityInBasket > 0 ? 'เพิ่มอีก' : 'เลือก'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
