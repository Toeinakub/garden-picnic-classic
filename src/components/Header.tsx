import React from 'react'
import { Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { soundManager } from '../utils/audio'

interface HeaderProps {
  isMuted: boolean
  onToggleMute: () => void
  onReset: () => void
}

export const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute, onReset }) => {
  return (
    <header className="header-bar">
      <div className="cma-brand">
        <div className="brand-title-group">
          <h1>Garden Picnic Night</h1>
        </div>
      </div>
      <div className="header-actions">
        <span className="header-edition">กินอร่อย คุยเพลิน เจอกันในสวน</span>
        <button
          className="icon-btn"
          onClick={() => {
            soundManager.playWoodClick()
            onToggleMute()
          }}
          title={isMuted ? 'เปิดเสียงสัมผัส' : 'ปิดเสียง'}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <button
          className="icon-btn"
          onClick={() => {
            soundManager.playWoodClick()
            onReset()
          }}
          title="จัดตะกร้าใหม่"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </header>
  )
}
