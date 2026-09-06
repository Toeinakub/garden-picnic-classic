import React, { useState, useRef, lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { PicnicBasket } from './components/PicnicBasket'
import { FruitShelf } from './components/FruitShelf'
import { DropEffect, ActiveDrop } from './components/DropEffect'
import { BasketDrawer } from './components/BasketDrawer'
import { CheckoutModal } from './components/CheckoutModal'
import { FRUIT_CATALOG, FruitItem } from './data/fruits'
import { soundManager } from './utils/audio'
import { ShoppingBag, Leaf, ArrowRight } from 'lucide-react'

const PicnicBasket3D = lazy(() => import('./components/three/PicnicBasket3D'))

export interface BasketItem {
  fruit: FruitItem
  quantity: number
}

export function App() {
  const [viewMode, setViewMode] = useState<'classic' | '3d'>('classic')
  const [basketItems, setBasketItems] = useState<BasketItem[]>([])
  const [monogramText, setMonogramText] = useState('')
  const [activeDrops, setActiveDrops] = useState<ActiveDrop[]>([])
  const [isBouncing, setIsBouncing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const basketTargetRef = useRef<HTMLDivElement>(null)

  // Mapping for quick quantity lookup
  const basketQuantities: Record<string, number> = {}
  basketItems.forEach(i => {
    basketQuantities[i.fruit.id] = i.quantity
  })

  const totalCount = basketItems.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = basketItems.reduce((sum, i) => sum + i.fruit.price * i.quantity, 0)

  // Handle adding fruit with drop animation
  const handleAddToCart = (fruit: FruitItem, startPos: { x: number; y: number }) => {
    let targetX = window.innerWidth / 2
    let targetY = 220

    if (basketTargetRef.current) {
      const rect = basketTargetRef.current.getBoundingClientRect()
      targetX = rect.left + rect.width / 2
      targetY = rect.top + rect.height * 0.58
    }

    const newDrop: ActiveDrop = {
      id: `${fruit.id}-${Date.now()}-${Math.random()}`,
      fruit,
      startX: startPos.x,
      startY: startPos.y,
      targetX,
      targetY
    }

    if (viewMode === 'classic') setActiveDrops(prev => [...prev, newDrop])

    // Immediately update basket state
    setBasketItems(prev => {
      const existing = prev.find(item => item.fruit.id === fruit.id)
      if (existing) {
        return prev.map(item =>
          item.fruit.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { fruit, quantity: 1 }]
    })
  }

  // Trigger bounce and remove drop from active list
  const handleDropComplete = (dropId: string) => {
    setActiveDrops(prev => prev.filter(d => d.id !== dropId))
    setIsBouncing(true)
    setTimeout(() => {
      setIsBouncing(false)
    }, 450)
  }

  const handleUpdateQuantity = (fruitId: string, delta: number) => {
    setBasketItems(prev => {
      return prev
        .map(item => {
          if (item.fruit.id === fruitId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as BasketItem[]
    })
  }

  const handleRemoveItem = (fruitId: string) => {
    setBasketItems(prev => prev.filter(item => item.fruit.id !== fruitId))
  }

  const handleReset = () => {
    setBasketItems([])
    setMonogramText('')
  }

  return (
    <div className="app-container">
      <main className="mobile-screen">
        {/* Subtle Ambient Fairy Lights */}
        <div className="fairy-lights" />

        {/* Top Header */}
        <Header
          isMuted={isMuted}
          onToggleMute={() => {
            const muted = soundManager.toggleMute()
            setIsMuted(muted)
          }}
          onReset={handleReset}
        />

        {/* Event Banner */}
        <section className="event-banner">
          <div className="event-tagline"><span /> THE CMA SOUVENIR EXPERIENCE <span /></div>
          <div className="event-date">GARDEN PICNIC NIGHT · 24 SEPTEMBER 2026</div>
          <h2 className="event-headline">A little garden.<br /><em>To take home.</em></h2>
          <p className="event-subtext">
            เก็บความสุขจากค่ำคืนนี้ กลับบ้านไปกับคุณ<br />เลือกผลไม้ที่ชอบ จัดตะกร้าในแบบของคุณ
          </p>
        </section>

        <div className="view-mode-tabs" role="tablist" aria-label="เลือกเวอร์ชันตะกร้า">
          {(['classic', '3d'] as const).map(mode => (
            <button key={mode} id={`tab-${mode}`} role="tab" aria-selected={viewMode===mode}
              aria-controls="picnic-view" tabIndex={viewMode===mode ? 0 : -1}
              onClick={()=>{setViewMode(mode);setActiveDrops([])}}
              onKeyDown={e=>{
                if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
                  e.preventDefault()
                  const next=e.key==='Home'?'classic':e.key==='End'?'3d':viewMode==='classic'?'3d':'classic'
                  setViewMode(next);setActiveDrops([])
                  document.getElementById(`tab-${next}`)?.focus()
                }
              }}>
              {mode==='classic' ? 'Classic · เวอร์ชันเดิม' : '3D · หมุนชมตะกร้า'}
            </button>
          ))}
        </div>
        <div className="experience-layout" id="picnic-view" role="tabpanel" aria-labelledby={`tab-${viewMode}`}>
        {/* Picnic Basket Stage */}
        {viewMode === 'classic' ? <PicnicBasket
          items={basketItems}
          isBouncing={isBouncing}
          basketTargetRef={basketTargetRef}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        /> : <Suspense fallback={<section className="basket-stage-wrapper"><div className="three-loading" role="status">กำลังเปิดสวนสามมิติ…</div></section>}>
          <PicnicBasket3D items={basketItems} basketTargetRef={basketTargetRef}
            onOpenDrawer={()=>setIsDrawerOpen(true)} onSwitchClassic={()=>setViewMode('classic')} />
        </Suspense>}

        {/* Fruits Shelf */}
        <FruitShelf
          fruits={FRUIT_CATALOG}
          basketQuantities={basketQuantities}
          onAddToCart={handleAddToCart}
        />

        </div>
        <footer className="experience-footer"><Leaf size={14} /><span>Thoughtfully picked. Beautifully packed.</span><span className="footer-note">ด้วยความใส่ใจ จาก วตท.</span></footer>

        {/* Parabolic Dropping Animation Overlay */}
        <DropEffect
          drops={activeDrops}
          onDropComplete={handleDropComplete}
        />

        {/* Bottom Floating Bar */}
        {totalCount > 0 && (
          <aside className="floating-bottom-bar">
            <div className="floating-cart-info">
              <span className="cart-item-count">ตะกร้าของคุณ · {totalCount} รายการ</span>
              <span className="cart-total-qty">฿{totalPrice.toLocaleString()}</span>
            </div>

            <button
              className="view-basket-btn"
              onClick={() => {
                soundManager.playWoodClick()
                setIsDrawerOpen(true)
              }}
            >
              <ShoppingBag size={17} />
              <span>ดูตะกร้าและชำระเงิน</span><ArrowRight size={16} />
            </button>
          </aside>
        )}

        {/* Basket Drawer (Review & Personalization) */}
        <BasketDrawer
          isOpen={isDrawerOpen}
          items={basketItems}
          monogramText={monogramText}
          onUpdateMonogram={setMonogramText}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsDrawerOpen(false)}
          onProceedToCheckout={() => {
            setIsDrawerOpen(false)
            setIsCheckoutOpen(true)
          }}
        />

        {/* Checkout Modal with PromptPay QR & VIP Ticket */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          items={basketItems}
          monogramText={monogramText}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccessReset={handleReset}
        />
      </main>
    </div>
  )
}
export default App
