'use strict'

let soundOn = true
let audioContext = null
const soundBtn = $('sound')

function beep(frequency, durationMs) {
  if (!soundOn) {
    return
  }

  try {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContext = new AudioContext()
    }

    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.type = 'square'
    oscillator.frequency.value = frequency
    gain.gain.value = 0.035

    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start()
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + durationMs / 1000
    )
    oscillator.stop(audioContext.currentTime + durationMs / 1000)
  } catch (error) {
    console.error('Audio Unavailable')
  }
}

soundBtn.addEventListener('click', () => {
  soundOn = !soundOn
  soundBtn.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF'
  soundBtn.setAttribute('aria-pressed', String(soundOn))
  beep(720, 60)
})
