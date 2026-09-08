export interface FruitItem {
  id: string
  name: string
  thaiName: string
  badge?: string
  description: string
  origin: string
  price: number
  unit: string
  image: string
  color: string
  lightColor: string
}

export const FRUIT_CATALOG: FruitItem[] = [
  {
    id: 'cma-coconut',
    name: 'CMA Signature Coconut',
    thaiName: 'มะพร้าวน้ำหอมบ้านแพ้ว',
    badge: 'หอมหวาน ชื่นใจ',
    description: 'เสิร์ฟทั้งลูก แช่เย็นชื่นใจ เลเซอร์ตราสัญลักษณ์ CMA Back to Basic หวานธรรมชาติ',
    origin: 'ดำเนินสะดวก / บ้านแพ้ว',
    price: 180,
    unit: 'ลูก',
    image: `${import.meta.env.BASE_URL}assets/coconut.png`,
    color: '#4B7B4B',
    lightColor: 'rgba(75, 123, 75, 0.15)'
  },
  {
    id: 'shine-muscat',
    name: 'Shine Muscat Grapes',
    thaiName: 'องุ่นไชน์มัสคัท ช่อทอง',
    badge: 'หวานกรอบ ไร้เมล็ด',
    description: 'ผลกลมโต ผิวตึงกรอบ ไร้เมล็ด หอมกลิ่นมัสกัต หวานฉ่ำ คัดสรรเกรดพรีเมียม',
    origin: 'ยามานาชิ / นากาโนะ',
    price: 590,
    unit: 'ช่อ (500g)',
    image: `${import.meta.env.BASE_URL}assets/shine_muscat.png`,
    color: '#7BA438',
    lightColor: 'rgba(123, 164, 56, 0.15)'
  },
  {
    id: 'golden-mango',
    name: 'Golden Nam Dok Mai',
    thaiName: 'มะม่วงน้ำดอกไม้สีทอง',
    badge: 'หอมหวาน เนื้อนุ่ม',
    description: 'เนื้อแน่นเนียนละเอียด ไร้เสี้ยน สีเหลืองทองอร่าม หอมหวานกลมกล่อม เหมาะทานเล่นหรือกับข้าวเหนียวมูน',
    origin: 'แปดริ้ว ฉะเชิงเทรา',
    price: 250,
    unit: 'ผลใหญ่ (2 ผล)',
    image: `${import.meta.env.BASE_URL}assets/golden_mango.png`,
    color: '#E6A123',
    lightColor: 'rgba(230, 161, 35, 0.15)'
  },
  {
    id: 'tubtim-pomelo',
    name: 'Siam Ruby Pomelo',
    thaiName: 'ส้มโอทับทิมสยาม GI',
    badge: 'หวานฉ่ำ พร้อมทาน',
    description: 'เนื้อกุ้งสีแดงทับทิมแวววาว เม็ดลีบ หวานฉ่ำนุ่มละมุน ไม่ขมติดปลายลิ้น สินค้าขึ้นทะเบียน GI',
    origin: 'ลุ่มน้ำปากพนัง นครศรีธรรมราช',
    price: 420,
    unit: 'กล่องแกะพร้อมทาน (450g)',
    image: `${import.meta.env.BASE_URL}assets/pomelo_tubtim.png`,
    color: '#C84C58',
    lightColor: 'rgba(200, 76, 88, 0.15)'
  },
  {
    id: 'japanese-melon',
    name: 'Japanese Crown Melon',
    thaiName: 'คราวน์เมล่อนญี่ปุ่นเขียว',
    badge: 'หอมละมุน',
    description: 'เนื้อเขียวมรกต ลายร่างแหละเอียด หอมหวานชื่นใจ ค่าความหวานบริกซ์สูงกว่า 14 Brix',
    origin: 'ชิซูโอกะ ญี่ปุ่น',
    price: 650,
    unit: 'เสี้ยวคัดพิเศษ (400g)',
    image: `${import.meta.env.BASE_URL}assets/japanese_melon.png`,
    color: '#5C9E3D',
    lightColor: 'rgba(92, 158, 61, 0.15)'
  },
  {
    id: 'marian-plum',
    name: 'Golden Marian Plum',
    thaiName: 'มะยงชิดทอง นครนายก',
    badge: 'หวานอมเปรี้ยว',
    description: 'ผลรูปไข่ใหญ่ เมล็ดลีบ ผิวเต่งตึงสีส้มทอง รสหวานกรอบอมเปรี้ยวนิดๆ สดชื่นกระปรี้กระเปร่า',
    origin: 'หุบเขานครนายก',
    price: 390,
    unit: 'กล่องของขวัญ (500g)',
    image: `${import.meta.env.BASE_URL}assets/marian_plum.png`,
    color: '#DE7C26',
    lightColor: 'rgba(222, 124, 38, 0.15)'
  },
  // Prototype selections and prices; confirm with the event supplier before launch.
  {
    id: 'strawberry',
    name: 'Garden Strawberries',
    thaiName: 'สตรอว์เบอร์รีคัดพิเศษ',
    badge: 'เปรี้ยวหวาน ลงตัว',
    description: 'สตรอว์เบอร์รีสีแดงสด หอมหวานอมเปรี้ยว คัดผลสวยสำหรับตะกร้าของขวัญ',
    origin: 'คัดสรรจากสวน',
    price: 320,
    unit: 'กล่อง (250g)',
    image: `${import.meta.env.BASE_URL}assets/strawberry.png`,
    color: '#CE4951',
    lightColor: 'rgba(206, 73, 81, 0.15)'
  },
  {
    id: 'mangosteen',
    name: 'Queen Mangosteen',
    thaiName: 'มังคุดเนื้อขาวคัดพิเศษ',
    badge: 'เนื้อขาว หวานละมุน',
    description: 'มังคุดเปลือกม่วง เนื้อขาวนุ่ม รสหวานละมุนอมเปรี้ยว สดชื่นในทุกคำ',
    origin: 'คัดสรรจากสวนไทย',
    price: 220,
    unit: 'ชุด (500g)',
    image: `${import.meta.env.BASE_URL}assets/mangosteen.png`,
    color: '#783F69',
    lightColor: 'rgba(120, 63, 105, 0.15)'
  },
  {
    id: 'mandarin',
    name: 'Golden Mandarin',
    thaiName: 'ส้มแมนดารินสีทอง',
    badge: 'ปอกง่าย ฉ่ำน้ำ',
    description: 'ส้มแมนดารินสีทอง กลีบฉ่ำน้ำ หอมสดชื่น ปอกง่าย เหมาะกับค่ำคืนปิกนิก',
    origin: 'คัดสรรจากสวน',
    price: 240,
    unit: 'ชุด (500g)',
    image: `${import.meta.env.BASE_URL}assets/mandarin.png`,
    color: '#E7922E',
    lightColor: 'rgba(231, 146, 46, 0.15)'
  }
]
