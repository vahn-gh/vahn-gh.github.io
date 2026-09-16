'use strict'

const POWER_ON_DURATION = 500
const FACE_DURATION = 900

const reduce =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const screenEl = $('screen')
const splash = $('splash')
const face = $('face')
const boot = $('boot')
const app = $('app')

function finishBoot() {
  boot.classList.add('done')
  app.classList.add('on')
}

function renderFace() {
  FACE_BITMAP.forEach(row => {
    row.forEach(px => {
      const cell = document.createElement('i')
      if (px) cell.classList.add('on')
      face.appendChild(cell)
    })
  })
}

function typeBootText() {
  const line = $('bootline')

  let i = 0
  const timer = setInterval(() => {
    i++
    line.textContent = BOOT_TEXT.slice(0, i)

    if (i >= BOOT_TEXT.length) {
      clearInterval(timer)
      line.innerHTML = BOOT_TEXT.replace(/\n/g, '<br>') + NAME_HTML
      setTimeout(finishBoot, 700)
    }
  }, 38)

  setTimeout(() => {
    beep(520, 90)
  }, 250)

  setTimeout(() => {
    if (!app.classList.contains('on')) {
      finishBoot()
    }
  }, 4000)
}

if (reduce) {
  finishBoot()
} else {
  screenEl.classList.add('powering')

  setTimeout(() => {
    renderFace()

    setTimeout(() => {
      splash.classList.add('done')
      typeBootText()
    }, FACE_DURATION)
  }, POWER_ON_DURATION)
}

setTab(0, true)
