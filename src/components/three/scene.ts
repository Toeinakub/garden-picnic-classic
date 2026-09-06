import * as T from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { BasketItem } from '../../App'
import { getBasketLayout } from '../../utils/basketLayout'

const material = (color: T.ColorRepresentation, roughness = .72) => new T.MeshStandardMaterial({ color, roughness })
function mesh(geometry: T.BufferGeometry, mat: T.Material, parent: T.Object3D, x=0, y=0, z=0) {
  const object = new T.Mesh(geometry, mat)
  object.position.set(x,y,z)
  object.castShadow = true
  object.receiveShadow = true
  parent.add(object)
  return object
}
function tube(points: T.Vector3[], radius: number, mat: T.Material, parent: T.Object3D, closed=false) {
  return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points, closed), Math.max(32,points.length*3), radius, 5, closed), mat, parent)
}
function dispose(root: T.Object3D) {
  const geometries = new Set<T.BufferGeometry>()
  const materials = new Set<T.Material>()
  root.traverse(object => {
    if (object instanceof T.Mesh) {
      geometries.add(object.geometry)
      for (const m of Array.isArray(object.material) ? object.material : [object.material]) materials.add(m)
    }
  })
  geometries.forEach(g=>g.dispose())
  materials.forEach(m=>m.dispose())
}
function fruitModel(id: string) {
  const group = new T.Group()
  const green = material('#477c36')
  const stem = material('#65512a')
  const sphere = (color: string, x=0,y=0,z=0, sx=1,sy=1,sz=1) => {
    const m = mesh(new T.SphereGeometry(.25,24,16), material(color,.58),group,x,y,z)
    m.scale.set(sx,sy,sz)
    return m
  }
  const leaf = (x=0,y=.28,z=0, angle=.5) => {
    const m=mesh(new T.SphereGeometry(.12,12,8),green,group,x,y,z)
    m.scale.set(.5,.13,1.4); m.rotation.set(.2,angle,.3)
  }
  const stalk = (y=.28) => mesh(new T.CylinderGeometry(.016,.022,.13,6),stem,group,0,y,0)
  switch (id) {
    case 'shine-muscat':
      for(let row=0;row<4;row++) {
        const n=5-row
        for(let j=0;j<n;j++) {
          const a=j/n*Math.PI*2+row*.7
          sphere(j%2?'#718e30':'#8da844',Math.cos(a)*(.15-row*.025),.25-row*.14,Math.sin(a)*(.15-row*.025),.46,.52,.46)
        }
      }
      stalk(.4);leaf(.1,.42);break
    case 'cma-coconut':
      sphere('#809957',0,0,0,1,1.12,1)
      mesh(new T.CylinderGeometry(.16,.21,.12,12),material('#d7c9ab'),group,0,.22,0)
      mesh(new T.CylinderGeometry(.013,.013,.32,8),material('#bf9b63'),group,.065,.42,0).rotation.z=-.22
      break
    case 'golden-mango':
      sphere('#dda02c',0,0,0,.8,1.35,.8).rotation.z=-.35
      stalk(.34);leaf(.09,.34);break
    case 'tubtim-pomelo':
      sphere('#83973e',0,0,0,1.12,1.05,1.12)
      // A rosy cut face makes the pomelo recognisable from the front.
      mesh(new T.CircleGeometry(.215,32),material('#d78089'),group,0,.02,.245)
      for(let i=0;i<9;i++) {
        const a=i/9*Math.PI*2
        const segment=mesh(new T.SphereGeometry(.055,12,8),material('#bd4f64'),group,Math.cos(a)*.135,Math.sin(a)*.135+.02,.26)
        segment.scale.set(.7,1.4,.25);segment.rotation.z=a-Math.PI/2
      }
      leaf(0,.29);break
    case 'japanese-melon':
      sphere('#94ac5b',0,0,0,1.12,1.05,1.12)
      for(let i=0;i<8;i++) {
        const ring=mesh(new T.TorusGeometry(.263,.006,4,36),material('#bcb58a'),group)
        ring.rotation.y=i/8*Math.PI
      }
      stalk();break
    case 'marian-plum':
      for(let i=0;i<3;i++) sphere('#d58d27',(i-1)*.18,i===1?.08:0, i===1?-.07:.04,.65,.82,.65)
      leaf(.05,.28);break
    case 'strawberry': {
      const profile=[new T.Vector2(0,-.3),new T.Vector2(.10,-.22),new T.Vector2(.20,-.08),new T.Vector2(.24,.10),new T.Vector2(.18,.22),new T.Vector2(0,.23)]
      mesh(new T.LatheGeometry(profile,28),material('#bd343e',.43),group)
      const seedMat=material('#d7ad67')
      for(let i=0;i<32;i++) {
        const y=-.19+(i%5)*.082
        const a=i*2.399
        const radius=y<-.05?.13+(y+.19)*.5:.224
        const seed=mesh(new T.SphereGeometry(.012,6,4),seedMat,group,Math.cos(a)*radius,y,Math.sin(a)*radius)
        seed.scale.y=1.6
      }
      for(let i=0;i<5;i++)leaf(Math.sin(i*1.26)*.06,.235,Math.cos(i*1.26)*.06,i*1.26)
      break
    }
    case 'mangosteen':
      sphere('#673953',0,0,0,1.03,.91,1.03)
      for(let i=0;i<4;i++)leaf(Math.sin(i*1.57)*.06,.23,Math.cos(i*1.57)*.06,i*1.57)
      stalk(.26);break
    default:
      sphere('#d88125',0,0,0,1.06,.91,1.06)
      stalk(.25);leaf(.08,.28)
  }
  return group
}

export function createPicnicScene(host: HTMLDivElement, onFailure: () => void) {
  const scene = new T.Scene()
  const renderer = new T.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7))
  renderer.shadowMap.enabled=true
  renderer.shadowMap.type=T.PCFShadowMap
  renderer.outputColorSpace=T.SRGBColorSpace
  renderer.toneMapping=T.ACESFilmicToneMapping
  // Warm evening light with restrained highlights and readable shaded surfaces.
  renderer.toneMappingExposure=1.05
  host.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('aria-label','ตะกร้าสามมิติ ลากเพื่อหมุน หรือใช้ปุ่มปรับมุมมอง')
  const camera=new T.PerspectiveCamera(36,1,.1,50)
  camera.position.set(3.7,2.9,5.4)
  const controls=new OrbitControls(camera,renderer.domElement)
  controls.target.set(0,1.15,0)
  controls.enableDamping=true
  controls.enablePan=false
  controls.enableZoom=false
  controls.minPolarAngle=.45
  controls.maxPolarAngle=1.5
  controls.autoRotateSpeed=.7
  controls.update()
  controls.saveState()
  scene.add(new T.HemisphereLight('#e5dbc5','#2e4435',1.8))
  const key=new T.DirectionalLight('#ffe1ad',2.6)
  key.position.set(-3,6,5);key.castShadow=true
  key.shadow.mapSize.set(1024,1024);key.shadow.normalBias=.025
  key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=4;key.shadow.camera.bottom=-3
  scene.add(key)
  const rim=new T.DirectionalLight('#b9d0bd',1.2);rim.position.set(3,3,-3);scene.add(rim)
  const basket=new T.Group();scene.add(basket)
  const wicker=[material('#81512c'),material('#9d6839'),material('#b5834b')]
  // Tapered oval body with an open interior and actual interwoven strands.
  for(let row=0;row<16;row++) {
    const y=.34+row*.045
    const radius=.76+(y-.34)*.38
    const points=Array.from({length:97},(_,i)=>{
      const a=i/96*Math.PI*2
      const r=radius+Math.sin(a*40+row*Math.PI)*.013
      return new T.Vector3(Math.cos(a)*r*1.24,y,Math.sin(a)*r*.83)
    })
    tube(points,.022,wicker[row%3],basket)
  }
  for(let j=0;j<40;j++) {
    const a=j/40*Math.PI*2
    const points=Array.from({length:20},(_,i)=>{
      const y=.31+i*.038, r=.76+(y-.34)*.38+Math.sin(i*Math.PI+j*Math.PI)*.012
      return new T.Vector3(Math.cos(a)*r*1.24,y,Math.sin(a)*r*.83)
    })
    tube(points,.018,wicker[j%3],basket)
  }
  mesh(new T.CylinderGeometry(.79,.76,.07,48),wicker[0],basket,0,.31,0).scale.set(1.24,1,.83)
  for(const y of [.32,1.06]) {
    const r=y<.5?.76:1.04
    tube(Array.from({length:64},(_,i)=>{const a=i/64*Math.PI*2;return new T.Vector3(Math.cos(a)*r*1.24,y,Math.sin(a)*r*.83)}),.047,wicker[2],basket,true)
  }
  const linen=material('#c9bb9c')
  const lining=mesh(new T.CylinderGeometry(1.0,.86,.32,64,1,true),linen,basket,0,.88,0)
  lining.scale.set(1.24,1,.83);linen.side=T.DoubleSide
  for(let strand=0;strand<3;strand++) {
    tube(Array.from({length:49},(_,i)=>{
      const a=i/48*Math.PI
      return new T.Vector3(Math.cos(a)*1.28,1.02+Math.sin(a)*1.35,(strand-1)*.042)
    }),.033,wicker[strand],basket)
  }
  const tag=mesh(new T.BoxGeometry(.34,.16,.05),material('#80512f'),basket,0,.82,.84)
  for(const x of [-.135,.135])mesh(new T.SphereGeometry(.015,8,6),material('#dfbc70',.25),tag,x,0,.035)
  const pedestal=mesh(new T.CylinderGeometry(1.7,1.78,.16,80),material('#203b2c'),scene,0,.15,0)
  pedestal.receiveShadow=true
  mesh(new T.TorusGeometry(1.72,.009,6,80),material('#a88b54'),scene,0,.2,0).rotation.x=Math.PI/2

  const fruits=new T.Group();basket.add(fruits)
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let alive=true, visible=true, frame=0
  const animations: {group:T.Group; start:number; target:number}[]=[]
  function setItems(items: BasketItem[]) {
    const placements=getBasketLayout(items)
    const existing=new Map(fruits.children.map(child=>[child.name,child as T.Group]))
    const keys=new Set(placements.map(p=>p.key))
    for(const child of [...fruits.children])if(!keys.has(child.name)){fruits.remove(child);dispose(child)}
    animations.length=0
    placements.forEach((p,index)=>{
      let model=existing.get(p.key)
      const fresh=!model
      if(!model) {model=fruitModel(p.fruit.id);model.name=p.key;fruits.add(model)}
      const row=Math.floor(p.layer/10)
      model.position.set((p.x-50)/32,1.08+(3-row)*.19,(row-2)*.39)
      model.rotation.y=index*1.8
      model.rotation.z=p.rotation*.017
      model.scale.setScalar(.96)
      if(fresh&&!reduced) {animations.push({group:model,start:performance.now(),target:model.position.y});model.position.y+=.65}
    })
    host.dataset.fruitCount=String(placements.length)
  }
  function resize() {
    const {width,height}=host.getBoundingClientRect()
    if(!width||!height)return
    camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height)
  }
  const observer=new ResizeObserver(resize);observer.observe(host);resize()
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});intersection.observe(host)
  const lost=(event:Event)=>{event.preventDefault();onFailure()}
  renderer.domElement.addEventListener('webglcontextlost',lost)
  function animate(now:number) {
    if(!alive)return
    frame=requestAnimationFrame(animate)
    if(!visible||document.hidden)return
    for(const a of animations) {
      const t=Math.min(1,(now-a.start)/500)
      a.group.position.y=a.target+.65*Math.pow(1-t,3)
    }
    controls.update();renderer.render(scene,camera)
  }
  frame=requestAnimationFrame(animate)
  return {
    setItems,
    rotate: (direction:number)=>{
      const offset=camera.position.clone().sub(controls.target)
      offset.applyAxisAngle(new T.Vector3(0,1,0),direction*.3)
      camera.position.copy(controls.target).add(offset);controls.update()
    },
    reset:()=>controls.reset(),
    autoRotate:(value:boolean)=>{controls.autoRotate=value},
    destroy:()=>{
      if(!alive)return
      alive=false;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect()
      renderer.domElement.removeEventListener('webglcontextlost',lost)
      controls.dispose();dispose(scene);renderer.dispose();renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }
}
