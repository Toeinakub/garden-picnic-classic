import { useEffect, useRef, useState } from 'react'
import { Box, RotateCcw, Rotate3D, ArrowLeft, ArrowRight, ShoppingBasket } from 'lucide-react'
import type { BasketItem } from '../../App'
import { createPicnicScene } from './scene'
import './three.css'

interface Props {
  items: BasketItem[]
  basketTargetRef: React.RefObject<HTMLDivElement>
  onOpenDrawer: () => void
  onSwitchClassic: () => void
}
export default function PicnicBasket3D({items,basketTargetRef,onOpenDrawer,onSwitchClassic}:Props) {
  const host=useRef<HTMLDivElement>(null)
  const scene=useRef<ReturnType<typeof createPicnicScene>>()
  const [failed,setFailed]=useState(false)
  const [rotating,setRotating]=useState(false)
  const total=items.reduce((sum,item)=>sum+item.quantity,0)
  useEffect(()=>{
    if(!host.current)return
    let instance: ReturnType<typeof createPicnicScene> | undefined
    try {instance=createPicnicScene(host.current,()=>setFailed(true));scene.current=instance}
    catch {setFailed(true)}
    return ()=>{instance?.destroy();scene.current=undefined}
  },[])
  useEffect(()=>{if(failed){scene.current?.destroy();scene.current=undefined}},[failed])
  useEffect(()=>{scene.current?.setItems(items)},[items])
  useEffect(()=>{scene.current?.autoRotate(rotating)},[rotating])
  return <section className="basket-stage-wrapper">
    <div className="stage-eyebrow"><span>01 / YOUR PICNIC IN 3D</span><Box size={15}/></div>
    <div className="three-card">
      <div className="three-heading"><span>A new perspective</span><span className="three-label">3D STUDIO</span></div>
      <div ref={basketTargetRef}>
        {failed ? <div className="three-fallback"><Box size={32}/><p>อุปกรณ์นี้ยังเปิดมุมมอง 3D ไม่ได้</p><button onClick={onSwitchClassic}>กลับไปใช้เวอร์ชันภาพเดิม</button></div> :
          <div className="three-canvas" ref={host}/>}
      </div>
      {!failed && <>
        <p className="three-hint">ลากเพื่อหมุนดูตะกร้ารอบด้าน</p>
        <div className="three-controls">
          <button onClick={()=>scene.current?.rotate(-1)} aria-label="หมุนตะกร้าไปทางซ้าย"><ArrowLeft size={16}/></button>
          <button onClick={()=>setRotating(value=>!value)} aria-pressed={rotating}><Rotate3D size={16}/>{rotating?'หยุดหมุน':'หมุนอัตโนมัติ'}</button>
          <button onClick={()=>scene.current?.rotate(1)} aria-label="หมุนตะกร้าไปทางขวา"><ArrowRight size={16}/></button>
          <button onClick={()=>{setRotating(false);scene.current?.reset()}} aria-label="คืนมุมมองเริ่มต้น"><RotateCcw size={15}/></button>
        </div>
      </>}
      {total>12 && <p className="basket-preview-note">ภาพจัดวางตัวอย่าง · ดูครบ {total} รายการในตะกร้า</p>}
      <button className="three-summary" onClick={onOpenDrawer}>
        <ShoppingBasket size={17}/><span>ตะกร้าปิกนิกของคุณ</span><span>{total ? total+' รายการ':'ยังไม่มีผลไม้'}</span><ArrowRight size={16}/>
      </button>
    </div>
    <p className="basket-footnote">มุมมองใหม่ · ตะกร้าใบเดียวกัน <span>Made to explore</span></p>
  </section>
}
