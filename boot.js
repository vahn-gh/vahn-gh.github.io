'use strict'

const reduce =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const screenEl = $('screen')
const boot = $('boot')
const app = $('app')

function finishBoot() {
  boot.classList.add('done')
  app.classList.add('on')
}

if (reduce) {
  finishBoot()
} else {
  screenEl.classList.add('powering')
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

  // safety: never leave the boot screen stuck
  setTimeout(() => {
    if (!app.classList.contains('on')) {
      finishBoot()
    }
  }, 4000)
}

setTab(0, true)
