import React from 'react'
import { X, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { soundManager } from '../utils/audio'

interface BasketItem {
  fruit: FruitItem
  quantity: number
}

interface BasketDrawerProps {
  isOpen: boolean
  items: BasketItem[]
  monogramText: string
  onUpdateMonogram: (text: string) => void
  onUpdateQuantity: (fruitId: string, delta: number) => void
  onRemoveItem: (fruitId: string) => void
  onClose: () => void
  onProceedToCheckout: () => void
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({
  isOpen,
  items,
  monogramText,
  onUpdateMonogram,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  onProceedToCheckout
}) => {
  if (!isOpen) return null

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.fruit.price * i.quantity, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()}>
        <div className="drawer-handle" />

        <div className="drawer-header">
          <div>
            <h3>รายการในตะกร้าปิกนิก</h3>
            <p style={{ fontSize: 'max(11.5px, var(--sheet-text-min, 0px))', color: 'var(--garden-accent)' }}>
              {totalCount} รายการที่เลือกไว้
            </p>
          </div>
          <button className="close-sheet-btn" onClick={onClose} aria-label="ปิด">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--garden-muted)' }}>
            <p style={{ fontSize: 'max(14px, var(--sheet-text-min, 0px))', marginBottom: '8px' }}>ยังไม่มีผลไม้ในตะกร้า</p>
            <p style={{ fontSize: 'max(12px, var(--sheet-text-min, 0px))', color: 'var(--garden-accent)' }}>
              แตะปุ่ม "หยิบใส่ตะกร้า" จากรายการด้านล่างเพื่อเริ่มจัดตะกร้า
            </p>
          </div>
        ) : (
          <>
            <div className="drawer-items-list">
              {items.map(item => (
                <div key={item.fruit.id} className="drawer-item-row">
                  <div className="item-thumb-name">
                    <img
                      src={item.fruit.image}
                      alt={item.fruit.name}
                      className="item-thumb-img"
                    />
                    <div>
                      <h4 style={{ fontSize: 'max(13.5px, var(--sheet-text-min, 0px))', color: 'var(--garden-ink)', fontWeight: 600 }}>
                        {item.fruit.thaiName}
                      </h4>
                      <p style={{ fontSize: 'max(11px, var(--sheet-text-min, 0px))', color: 'var(--garden-accent)' }}>
                        ฿{item.fruit.price.toLocaleString()} /{item.fruit.unit}
                      </p>
                    </div>
                  </div>

                  <div className="qty-control-group">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        soundManager.playWoodClick()
                        onUpdateQuantity(item.fruit.id, -1)
                      }}
                      aria-label="ลดจำนวน"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => {
                        soundManager.playWoodClick()
                        onUpdateQuantity(item.fruit.id, 1)
                      }}
                      aria-label="เพิ่มจำนวน"
                    >
                      <Plus size={13} />
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playWoodClick()
                        onRemoveItem(item.fruit.id)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#b06161',
                        cursor: 'pointer',
                        padding: '4px',
                        marginLeft: '4px'
                      }}
                      aria-label="ลบรายการ"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Personalized Monogram Tag */}
            <div className="monogram-section">
              <div className="monogram-label">
                <Tag size={13} />
                <span>เขียนชื่อติดตะกร้า</span>
              </div>
              <input
                type="text"
                placeholder="ระบุชื่อย่อ หรือรุ่น เช่น วตท.33 / K.Somchai"
                value={monogramText}
                onChange={e => onUpdateMonogram(e.target.value)}
                className="monogram-input"
                maxLength={24}
              />
              {monogramText.trim() && (
                <div style={{
                  marginTop: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#e9d5b6',
                  border: '1px solid var(--garden-accent)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: 'max(11px, var(--sheet-text-min, 0px))',
                  color: 'var(--garden-accent)',
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '1px'
                }}>
                  🏷️ ชื่อบนป้าย: {monogramText.toUpperCase()}
                </div>
              )}
            </div>

            {/* Price Summary & Checkout Action */}
            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: 'max(12.5px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)' }}>
                <span>ตะกร้าสานและป้ายชื่อ</span>
                <span style={{ color: 'var(--garden-accent)' }}>เราเตรียมให้ฟรี</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span style={{ fontSize: 'max(15px, var(--sheet-text-min, 0px))', fontWeight: 600 }}>ยอดรวมสุทธิ</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--garden-accent)' }}>
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => {
                  soundManager.playWoodClick()
                  onProceedToCheckout()
                }}
              >
                <span>ดำเนินการชำระเงิน</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
