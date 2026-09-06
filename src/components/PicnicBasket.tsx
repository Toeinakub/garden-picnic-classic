import React from 'react'
import { ShoppingBasket, ArrowUpRight, Leaf } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { getBasketLayout } from '../utils/basketLayout'

interface BasketItem {
  fruit: FruitItem
  quantity: number
}

interface PicnicBasketProps {
  items: BasketItem[]
  isBouncing: boolean
  basketTargetRef: React.RefObject<HTMLDivElement>
  onOpenDrawer: () => void
}

export const PicnicBasket: React.FC<PicnicBasketProps> = ({
  items,
  isBouncing,
  basketTargetRef,
  onOpenDrawer
}) => {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const visualFruits = getBasketLayout(items)

  return (
    <section className="basket-stage-wrapper">
      <div className="stage-eyebrow"><span>01 / YOUR PICNIC</span><Leaf size={15} /></div>
      <div
        className={`basket-card ${isBouncing ? 'bounce' : ''}`}
        onClick={onOpenDrawer}
        role="button"
        tabIndex={0}
        aria-label="ดูตะกร้าปิกนิกของคุณ"
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpenDrawer()
          }
        }}
      >
        <div className="basket-caption"><span>Made for your evening</span><span className="basket-edition">CMA<br />2026</span></div>
        <div className="basket-inner-visual" ref={basketTargetRef}>
          <img
            src={`${import.meta.env.BASE_URL}assets/basket-open-v2.png`}
            alt="ตะกร้าหวายทรงเปิด บุผ้าลินิน พร้อมป้ายหนัง"
            className="basket-bg-img"
          />

          <span className="basket-ground" aria-hidden="true" />
          {/* Stored Fruits Rendered Inside Basket */}
          <div className="basket-fruits-container">
            {visualFruits.map(({ fruit, key, x, y, size, rotation, layer }) => (
              <div
                key={key}
                className="basket-fruit-slot"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}%`,
                  height: `${size}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  zIndex: layer
                }}
              >
                <img src={fruit.image} alt={fruit.thaiName} className="basket-fruit-mini" />
              </div>
            ))}
          </div>
          <img src={`${import.meta.env.BASE_URL}assets/basket-open-v2.png`} alt="" aria-hidden="true" className="basket-front-img" />
        </div>

        {totalCount > visualFruits.length && (
          <p className="basket-preview-note">ภาพจัดวางตัวอย่าง · ดูครบ {totalCount} รายการในตะกร้า</p>
        )}

        {/* Status Ribbon */}
        <div className="basket-status-ribbon">
          <div className="basket-status-label">
            <ShoppingBasket size={16} color="#d4af37" />
            <span>ตะกร้าปิกนิกของคุณ</span>
            <span className="basket-count-badge">
              {totalCount > 0 ? `${totalCount} รายการ` : 'ยังไม่มีผลไม้'}
            </span>
          </div>

          <div className="basket-tap-hint">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
      <p className="basket-footnote">ตะกร้าสาน พร้อมป้ายชื่อเฉพาะคุณ <span>Complimentary</span></p>
    </section>
  )
}
