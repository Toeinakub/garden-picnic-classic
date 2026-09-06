// Web Audio API Synthesizer for organic picnic haptic sounds
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const soundManager = {
  muted: false,

  toggleMute(): boolean {
    this.muted = !this.muted
    return this.muted
  },

  playWoodClick() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(420, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06)

    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.06)
  },

  playDropSound() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // Low thud (basket impact)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(160, now)
    osc1.frequency.exponentialRampToValueAtTime(60, now + 0.14)

    gain1.gain.setValueAtTime(0.35, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    // Gentle high rustle
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(520, now + 0.02)
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.12)

    gain2.gain.setValueAtTime(0.12, now + 0.02)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    osc1.start(now)
    osc1.stop(now + 0.14)
    osc2.start(now + 0.02)
    osc2.stop(now + 0.12)
  },

  playSuccessChime() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const freqs = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

    freqs.forEach((f, idx) => {
      const startTime = now + idx * 0.08
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, startTime)

      gain.gain.setValueAtTime(0.15, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.6)
    })
  }
}
