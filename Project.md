# Project: CMA Garden Picnic Night — "Pack Your Picnic Basket" Web App

## 1. ภาพรวมโปรเจกต์ (Project Overview)
ต้นแบบเว็บแอปพลิเคชัน (Mobile-first Interactive Prototype) สำหรับงาน **"CMA Back to Basic: Garden Picnic Night"** ของสถาบันวิทยาการตลาดทุน (วตท.) วันพฤหัสบดีที่ 24 กันยายน 2569 เพื่อใช้เป็น Mockup นำเสนอผู้บริหาร โดยเน้นประสบการณ์จัดตะกร้าผลไม้พรีเมียมกลับบ้าน (Souvenir Experience: Take the Picnic Home) ในรูปแบบที่โต้ตอบได้จริงบนมือถือ

---

## 2. กลุ่มเป้าหมายและธีมงาน (Target & Theme)
* **ผู้ใช้งาน:** ผู้บริหารระดับสูง วตท. (จำนวนประมาณ 100 ท่าน)
* **คอนเซปต์:** "Back to Basic: กลับสู่ความเรียบง่าย ที่ทำให้เราใกล้กันมากขึ้น"
* **สไตล์ดีไซน์:** Premium Rustic, Naturally Elegant
* **โทนสีหลัก:** Forest Green (`#0B2217`, `#0D2217`), Cream (`#F8F5EE`), Warm Amber / Gold (`#D4AF37`, `#EEC95D`), และสัมผัสไม้อบอุ่น

---

## 3. ฟังก์ชันหลักของระบบ (Key Features)
1. **Interactive Drop Animation (Gravity Drop):**
   * แตะเลือกผลไม้จากลิสต์ด้านล่าง แล้วมีอนิเมชันผลไม้ลอยโค้งตกลงสู่ตะกร้าสานปิกนิกอย่างสมจริง
   * ตะกร้าเด้งรับแรงกระแทก (Spring Physics Bounce) พร้อมเสียงสัมผัสตกกระทบแบบธรรมชาติผ่าน Web Audio API
2. **Horizontal Swipe Shelf (Thumb-zone Friendly):**
   * เชลฟ์ผลไม้จัดวางแนวนอนด้านล่างหน้าจอ รองรับการปัดซ้าย-ขวาด้วยนิ้วโป้ง
   * แสดงสถานะ `in-basket` และป้ายจำนวนชิ้น `xN` บนตัวการ์ดทันที
3. **Visual Fruit Stacking in Basket:**
   * ผลไม้ที่ถูกเลือกจะปรากฏสะสมซ้อนกันจริงอยู่ภายในตะกร้าสาน
4. **Personalized Monogram Tag:**
   * บริการสลักชื่อย่อหรือรุ่น (เช่น วตท.33 / K.Somchai) ลงบนป้ายหนังแท้ติดตะกร้า พร้อมแสดง Live Preview
5. **PromptPay Cashless Payment & Digital Token:**
   * จำลองขั้นตอนการชำระเงินด้วย Dynamic Thai QR Code
   * ระบบออก **Digital Picnic Token (VIP Pass)** สำหรับนำไปแสดงรับตะกร้าผลไม้จริง ณ จุด "The Garden Pantry" เวลา 22.00 น.

---

## 4. โครงสร้างเทคโนโลยี (Tech Stack & Architecture)
* **Frontend:**
  * Framework: React 18 + TypeScript (รันบน Vite)
  * Styling: Vanilla CSS (Custom Design Tokens, Glassmorphism, 100dvh Mobile Layout)
  * Sound: Web Audio API (Synthesized Haptic Feedback)
  * Libraries: `lucide-react`, `canvas-confetti`, `qrcode`
* **Infrastructure Target:**
  * Hosting & Deployment: **Vercel** (พร้อมไฟล์ `vercel.json` รองรับ SPA rewrites)
  * Database & Backend: **Supabase** (เตรียมไฟล์เชื่อมต่อ `src/lib/supabase.ts` รองรับทั้ง Supabase Table และ Local Storage fallback)

---

## 5. รายการไฟล์สำคัญในโปรเจกต์
* `Project.md` — เอกสารสรุปรายละเอียดโปรเจกต์และทิศทางการพัฒนา
* `src/App.tsx` — ตัวควบคุม State รวม เลย์เอาต์ และแอนิเมชัน
* `src/styles/index.css` — ดีไซน์ซิสเต็ม ธีมสี CMA และแอนิเมชัน
* `src/data/fruits.ts` — แคตตาล็อกผลไม้พรีเมียม 6 ชนิด
* `src/components/PicnicBasket.tsx` — คอมโพเนนต์ตะกร้าสานและผลไม้สะสมด้านใน
* `src/components/FruitShelf.tsx` — เชลฟ์เลื่อนผลไม้แนวนอน
* `src/components/FruitCard.tsx` — การ์ดผลไม้พร้อมปุ่มกดและ badge นับจำนวน
* `src/components/DropEffect.tsx` — เอฟเฟกต์ผลไม้ลอยตกลงตะกร้า
* `src/components/BasketDrawer.tsx` — หน้าสรุปตะกร้า สลักป้ายชื่อ และยอดรวม
* `src/components/CheckoutModal.tsx` — หน้า QR PromptPay และตั๋วรับของ VIP Token
* `src/lib/supabase.ts` — โมดูลเชื่อมต่อฐานข้อมูล Supabase
* `vercel.json` — การตั้งค่าสำหรับ Deploy บน Vercel

---

## 6. สิ่งที่ต้องทำต่อ (Next Steps)
* [ ] รีทัชและตัดขอบภาพผลไม้และตะกร้าปิกนิกด้วย AI (`rembg`) ให้ขอบเนียนใสแบบ Transparent ไร้รอยขอบขาว
* [ ] ตั้งค่าตัวแปร `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY` เมื่อพร้อมเชื่อมต่อ Database จริงบน Supabase
* [ ] นำขึ้น Deploy บน Vercel เพื่อแชร์ลิงก์ให้ทีมงานและผู้บริหารทดสอบผ่านอุปกรณ์จริง
