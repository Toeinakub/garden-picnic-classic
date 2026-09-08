const leaves = [
  {x:22,y:193,r:-45}, {x:70,y:157,r:35}, {x:98,y:115,r:-50},
  {x:131,y:65,r:25}, {x:148,y:22,r:-40}, {x:15,y:105,r:-35}, {x:52,y:80,r:30}
]
export function GardenFoliage() {
  return <>{['left','right'].map(side =>
    <svg key={side} className={`garden-foliage garden-foliage-${side}`} viewBox="0 0 180 240" aria-hidden="true" focusable="false">
      <path d="M-20 235Q120 150 165 0M-10 120Q85 95 108-20" fill="none" stroke="#779260" strokeWidth="2" />
      {leaves.map(({x,y,r},i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <path d="M0-32C24-16 21 16 0 32C-21 16-24-16 0-32Z" fill={i%2 ? '#536f43' : '#435f3b'} />
        <path d="M0-26V27" stroke="#879a69" strokeOpacity=".35" fill="none" />
      </g>)}
    </svg>)}</>
}
