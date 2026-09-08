import React, { useRef } from 'react'
import { Plus } from 'lucide-react'
import { FruitItem } from '../data/fruits'
import { soundManager } from '../utils/audio'

interface FruitCardProps {
  fruit: FruitItem
  quantityInBasket: number
  onAddToCart: (fruit: FruitItem, startPos: { x: number; y: number }) => void
}
const shortNames: Record<string,string> = {
  'cma-coconut':'มะพร้าว', 'shine-muscat':'องุ่นมัสคัท', 'golden-mango':'มะม่วง',
  'tubtim-pomelo':'ส้มโอ', 'japanese-melon':'เมล่อน', 'marian-plum':'มะยงชิด',
  strawberry:'สตรอว์เบอร์รี', mangosteen:'มังคุด', mandarin:'ส้มแมนดาริน'
}
export const FruitCard: React.FC<FruitCardProps> = ({fruit,quantityInBasket,onAddToCart}) => {
  const imageRef=useRef<HTMLImageElement>(null)
  return <button className={`fruit-choice ${quantityInBasket>0?'in-basket':''}`}
    aria-label={`หยิบ ${fruit.thaiName} ใส่ตะกร้า ราคา ${fruit.price} บาท ต่อ ${fruit.unit}${quantityInBasket>0 ? ` เลือกแล้ว ${quantityInBasket}` : ''}`}
    title={`${fruit.thaiName} · ฿${fruit.price} / ${fruit.unit}`}
    onClick={()=>{
      soundManager.playWoodClick()
      const rect=imageRef.current!.getBoundingClientRect()
      onAddToCart(fruit,{x:rect.left+rect.width/2,y:rect.top+rect.height/2})
    }}>
    <img ref={imageRef} src={fruit.image} alt="" />
    <span className="choice-name">{shortNames[fruit.id] || fruit.thaiName}</span>
    <span className="choice-price">฿{fruit.price.toLocaleString()}</span>
    <span className="choice-count" aria-hidden="true">{quantityInBasket>0?quantityInBasket:<Plus size={12}/>}</span>
  </button>
}
