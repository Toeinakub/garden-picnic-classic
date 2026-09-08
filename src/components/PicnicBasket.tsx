import React from 'react'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { getBasketLayout } from '../utils/basketLayout'
import { StringLights } from './StringLights'
import { GardenFoliage } from './GardenFoliage'

interface BasketItem {
  fruit: FruitItem
  quantity: number
}

interface PicnicBasketProps {
  items: BasketItem[]
  totalPrice: number
  isBouncing: boolean
  basketTargetRef: React.RefObject<HTMLDivElement>
  onOpenDrawer: () => void
}

export const PicnicBasket: React.FC<PicnicBasketProps> = ({
  items,
  totalPrice,
  isBouncing,
  basketTargetRef,
  onOpenDrawer
}) => {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const visualFruits = getBasketLayout(items)

  return (
    <section className="basket-stage-wrapper">
      <GardenFoliage />
      <StringLights />
      <div className="compact-invitation"><h2>หยิบความอร่อยกลับบ้าน</h2><span>24 ก.ย. 2569 · ตะกร้าพร้อมป้ายชื่อฟรี</span></div>
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

        <div className="basket-visual-space">
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

        </div>

        {totalCount > visualFruits.length && (
          <p className="basket-preview-note">ภาพจัดวางตัวอย่าง · แตะเพื่อดูรายการทั้งหมด</p>
        )}

        {/* Single summary row: count, total and the way into the basket */}
        <div className="basket-status-ribbon">
          <div className="floating-cart-info">
            <span className="cart-item-count">
              {totalCount > 0 ? `${totalCount} รายการในตะกร้า` : 'เลือกผลไม้ใส่ตะกร้าได้เลย'}
            </span>
            <span className="cart-total-qty">฿{totalPrice.toLocaleString()}</span>
          </div>

          <button
            className="view-basket-btn"
            disabled={totalCount === 0}
            onClick={e => {
              e.stopPropagation()
              onOpenDrawer()
            }}
          >
            <ShoppingBag size={17} />
            <span>ดูตะกร้า</span><ArrowRight size={16} />
          </button>
        </div>
      </div>

    </section>
  )
}
