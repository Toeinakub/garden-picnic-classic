import React, { useEffect, useRef, useState } from 'react'
import { FruitItem } from '../data/fruits'
import { soundManager } from '../utils/audio'

export interface ActiveDrop {
  id: string
  fruit: FruitItem
  startX: number
  startY: number
  targetX: number
  targetY: number
}

interface DropEffectProps {
  drops: ActiveDrop[]
  onDropComplete: (id: string) => void
}

export const DropEffect: React.FC<DropEffectProps> = ({ drops, onDropComplete }) => {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {drops.map(drop => (
        <FallingItem
          key={drop.id}
          drop={drop}
          onFinish={() => {
            soundManager.playDropSound()
            onDropComplete(drop.id)
          }}
        />
      ))}
    </div>
  )
}

const FallingItem: React.FC<{ drop: ActiveDrop; onFinish: () => void }> = ({ drop, onFinish }) => {
  const [phase, setPhase] = useState<'start' | 'flying' | 'landed'>('start')

  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  useEffect(() => {
    // Phase 1: start at click position
    const timer1 = requestAnimationFrame(() => {
      setPhase('flying')
    })

    // Phase 2: arrive at basket (650ms transition)
    const timer2 = setTimeout(() => {
      setPhase('landed')
      onFinishRef.current()
    }, 600)

    return () => {
      cancelAnimationFrame(timer1)
      clearTimeout(timer2)
    }
  }, [drop])

  const { startX, startY, targetX, targetY } = drop

  // Start position
  const isFlying = phase === 'flying'

  // Calculate style
  const currentX = isFlying ? targetX : startX
  const currentY = isFlying ? targetY : startY
  const currentScale = isFlying ? 0.65 : 1.1
  const currentOpacity = isFlying ? 0.95 : 1

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate3d(${currentX - 32}px, ${currentY - 32}px, 0) scale(${currentScale})`,
        transition: 'transform 0.6s cubic-bezier(0.35, 0.05, 0.25, 1.25), opacity 0.6s ease',
        opacity: currentOpacity,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      <img
        src={drop.fruit.image}
        alt={drop.fruit.name}
        style={{
          width: '64px',
          height: '64px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.65))',
          animation: isFlying ? 'spinDrop 0.6s ease-out' : 'none'
        }}
      />
      <style>{`
        @keyframes spinDrop {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(15deg) scale(1.15); }
          100% { transform: rotate(-5deg) scale(1); }
        }
      `}</style>
    </div>
  )
}
