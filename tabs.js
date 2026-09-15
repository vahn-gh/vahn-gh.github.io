'use strict'

function setTab(i, isQuiet) {
  tabIndex = (i + TABS.length) % TABS.length

  TABS.forEach((name, n) => {
    const on = n === tabIndex
    $(`t-${name}`).setAttribute('aria-selected', String(on))
    $(`p-${name}`).classList.toggle('live', on)
  })

  if (TABS[tabIndex] !== 'work') {
    closeJobSilently()
  }

  crumb.textContent = TABS[tabIndex].toUpperCase()
  viewport.scrollTop = 0

  if (!isQuiet) {
    beep(560, 55)
  }
}

function closeJobSilently() {
  detailWrap.classList.remove('live')
  listWrap.style.display = 'block'
}

TABS.forEach((name, n) => {
  $(`t-${name}`).addEventListener('click', () => {
    setTab(n)
  })
})
