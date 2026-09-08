// Bulbs are sampled on the same quadratic curves as the cable.
const point = (a: number, b: number, c: number, t: number) => (1-t)**2*a + 2*(1-t)*t*b + t*t*c
const pendants = [
  ...[.12,.29,.47,.65,.83,1].map(t => ({x:point(-30,300,610,t),y:point(5,150,32,t)})),
  ...[.18,.36,.54,.72,.9].map(t => ({x:point(610,930,1230,t),y:point(32,140,8,t)}))
]
/** Decorative only: kept out of the accessibility tree and never intercepts taps. */
export function StringLights() {
  return <svg className="string-lights" viewBox="0 0 1200 180" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="bulb-halo"><stop stopColor="#ffd18a" stopOpacity=".55"/><stop offset="1" stopColor="#ffd18a" stopOpacity="0"/></radialGradient>
      <linearGradient id="bulb-glass" x2="0" y2="1"><stop stopColor="#fff4d0"/><stop offset="1" stopColor="#ffc778"/></linearGradient>
    </defs>
    <path d="M-30 5 Q300 150 610 32 Q930 140 1230 8" fill="none" stroke="#38372a" strokeWidth="3"/>
    {pendants.map(({x,y},i)=>
      <g key={x} className="light-pendant" style={{transformOrigin:`${x}px ${y}px`,animationDelay:`${i*-.7}s`}}>
        <path d={`M${x} ${y}v${i%2?23:13}`} stroke="#38372a" strokeWidth="2"/>
        <g transform={`translate(${x} ${y+(i%2?23:13)})`}>
          <circle cy="15" r="37" fill="url(#bulb-halo)"/>
          <rect x="-5" y="-1" width="10" height="9" rx="2" fill="#62513a"/>
          <path d="M-5 7C-13 14-12 27 0 28C12 27 13 14 5 7Z" fill="url(#bulb-glass)" stroke="#edbf78" strokeWidth=".8"/>
          <path d="M-3 10L-2 19H2L3 10" fill="none" stroke="#fffbea" strokeWidth="1.4"/>
        </g>
      </g>)}
  </svg>
}
