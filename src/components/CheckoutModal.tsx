import React, { useEffect, useRef, useState } from 'react'
import { X, CheckCircle2, ShieldCheck, QrCode, Download, Share2 } from 'lucide-react'
import QRCode from 'qrcode'
import confetti from 'canvas-confetti'
import { FruitItem } from '../data/fruits'
import { soundManager } from '../utils/audio'
import { savePicnicOrder } from '../lib/supabase'

interface BasketItem {
  fruit: FruitItem
  quantity: number
}

interface CheckoutModalProps {
  isOpen: boolean
  items: BasketItem[]
  monogramText: string
  onClose: () => void
  onSuccessReset: () => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  monogramText,
  onClose,
  onSuccessReset
}) => {
  const [step, setStep] = useState<'pay' | 'success'>('pay')
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const totalPrice = items.reduce((sum, i) => sum + i.fruit.price * i.quantity, 0)
  const [orderRef] = useState(() => 'CMA-' + Math.floor(100000 + Math.random() * 900000))

  // Generate QR Code on open
  useEffect(() => {
    if (!isOpen || step !== 'pay') return

    // PromptPay payload string
    const qrPayload = `00020101021229370016A000000677010111011300668123456785802TH5303764540${totalPrice}.006304`

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrPayload, {
        width: 190,
        margin: 1,
        color: {
          dark: '#0a1d13',
          light: '#ffffff'
        }
      })
    }
  }, [isOpen, step, totalPrice])

  if (!isOpen) return null

  const handleSimulatePayment = async () => {
    setIsProcessing(true)

    // Save order (Supabase / LocalStorage fallback)
    await savePicnicOrder({
      member_name: monogramText.trim() || 'CMA Executive Member',
      items: items.map(i => ({
        id: i.fruit.id,
        name: i.fruit.thaiName,
        quantity: i.quantity,
        price: i.fruit.price
      })),
      total_amount: totalPrice,
      engraving_text: monogramText.trim(),
      status: 'paid'
    })

    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
      soundManager.playSuccessChime()

      // Launch luxury gold & green confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#168582', '#e6ad52', '#5c7845', '#f7f4eb', '#ffffff']
      })
    }, 900)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh' }}>
        <div className="drawer-handle" />

        <div className="drawer-header">
          <div>
            <h3>{step === 'pay' ? 'ชำระเงินผ่าน Thai QR' : 'บัตรรับตะกร้าของคุณ'}</h3>
            <p style={{ fontSize: 'max(11.5px, var(--sheet-text-min, 0px))', color: 'var(--garden-accent)' }}>
              {step === 'pay' ? 'PromptPay Cashless Payment' : 'เก็บบัตรนี้ไว้รับของก่อนกลับ'}
            </p>
          </div>
          <button className="close-sheet-btn" onClick={onClose} aria-label="ปิด">
            <X size={18} />
          </button>
        </div>

        {step === 'pay' ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: 'max(13px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)' }}>
              สแกน QR Code ด้วยแอปพลิเคชันธนาคารเพื่อยืนยันรายการ
            </p>

            <div className="qr-container">
              <div className="qr-logo-thai">
                <QrCode size={16} />
                <span>THAI QR PAYMENT</span>
              </div>
              <canvas ref={canvasRef} className="qr-canvas" />
              <div style={{ fontSize: 'max(10.5px, var(--sheet-text-min, 0px))', color: '#666', marginTop: '6px' }}>
                ชื่อบัญชี: วตท. สถาบันวิทยาการตลาดทุน
              </div>
            </div>

            <div style={{ margin: '12px 0 18px' }}>
              <div style={{ fontSize: 'max(12px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)' }}>ยอดชำระสุทธิ</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, color: 'var(--garden-accent)' }}>
                ฿{totalPrice.toLocaleString()}
              </div>
              <div style={{ fontSize: 'max(11px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)', marginTop: '4px' }}>
                Ref: {orderRef}
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={handleSimulatePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>กำลังประมวลผล...</span>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>จำลองการชำระเงินสำเร็จ (ทดสอบ)</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div style={{ padding: '6px 0', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(212, 175, 55, 0.15)', borderRadius: '50%', marginBottom: '8px' }}>
              <ShieldCheck size={36} color="var(--garden-accent)" />
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--garden-ink)', marginBottom: '4px' }}>
              จัดตะกร้าผลไม้สำเร็จแล้ว
            </h4>
            <p style={{ fontSize: 'max(12px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)', marginBottom: '14px' }}>
              ข้อมูลบันทึกในระบบเรียบร้อย พร้อมจัดเตรียมสำหรับค่ำคืนปิกนิก
            </p>

            {/* VIP Ticket Card */}
            <div className="ticket-card">
              <div className="ticket-cma-header">GARDEN PICNIC NIGHT</div>
              <div style={{ fontSize: 'max(11px, var(--sheet-text-min, 0px))', color: 'var(--garden-muted)', letterSpacing: '1px' }}>
                GARDEN PICNIC NIGHT • 24 SEP 2026
              </div>

              <div className="ticket-code">{orderRef}</div>

              {monogramText.trim() && (
                <div style={{ fontSize: 'max(13px, var(--sheet-text-min, 0px))', color: 'var(--garden-accent)', fontWeight: 600, margin: '6px 0' }}>
                  🏷️ ชื่อบนป้าย: {monogramText.toUpperCase()}
                </div>
              )}

              <div style={{ fontSize: 'max(11.5px, var(--sheet-text-min, 0px))', color: 'var(--garden-ink)', margin: '8px 0', lineHeight: 1.5 }}>
                {items.map(i => `${i.fruit.thaiName} (x${i.quantity})`).join(', ')}
              </div>

              <div style={{
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                fontSize: 'max(11px, var(--sheet-text-min, 0px))',
                color: 'var(--garden-muted)'
              }}>
                📍 นำรหัสนี้มารับตะกร้า ณ จุด <strong>"The Garden Pantry"</strong> เวลา 22.00 น.
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                soundManager.playWoodClick()
                onSuccessReset()
                setStep('pay')
                onClose()
              }}
              style={{ marginTop: '10px' }}
            >
              <span>เสร็จสิ้น / จัดตะกร้าเพิ่ม</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
