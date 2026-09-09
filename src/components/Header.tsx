import React from 'react'
import { Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { soundManager } from '../utils/audio'

interface HeaderProps {
  isMuted: boolean
  onToggleMute: () => void
  onReset: () => void
}

export const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute, onReset }) => (
  <>
    <div className="basket-brand-row">
      <img
        className="garden-logo"
        src={`${import.meta.env.BASE_URL}assets/branding/garden-picnic-night-logo-v3.png`}
        alt="G4 Garden Picnic Night — Back to Basic"
        width={1672}
        height={941}
      />
    </div>
    <div className="basket-utility-actions">
      <button
        className="icon-btn"
        onClick={e => {
          e.stopPropagation()
          soundManager.playWoodClick()
          onToggleMute()
        }}
        title={isMuted ? 'เปิดเสียงสัมผัส' : 'ปิดเสียง'}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
      <button
        className="icon-btn"
        onClick={e => {
          e.stopPropagation()
          soundManager.playWoodClick()
          onReset()
        }}
        title="จัดตะกร้าใหม่"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  </>
)
