let ctx: AudioContext | null = null

function ac(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function play(freq: number, duration: number, type: OscillatorType = "square", volume = 0.08) {
  const c = ac()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

export function sfxClick() {
  play(800, 0.06, "square", 0.04)
}

export function sfxDiscovery() {
  play(523, 0.1, "sine", 0.08)
  setTimeout(() => play(659, 0.1, "sine", 0.08), 100)
  setTimeout(() => play(784, 0.15, "sine", 0.08), 200)
}

export function sfxEndTurn() {
  play(300, 0.08, "triangle", 0.05)
}

export function sfxMove() {
  play(400, 0.05, "sine", 0.03)
}

export function sfxReveal() {
  play(600, 0.08, "triangle", 0.05)
  setTimeout(() => play(900, 0.1, "triangle", 0.05), 80)
}

export function sfxGameOver() {
  const notes = [440, 392, 349, 262]
  notes.forEach((f, i) => setTimeout(() => play(f, 0.2, "sine", 0.06), i * 150))
}
