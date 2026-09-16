'use strict'

const scrollOffset = 90

function press(direction) {
  if (TABS[tabIndex] === 'tetris') {
    gameInput(direction)
    return
  }

  if (direction === 'left') {
    setTab(tabIndex - 1)
  } else if (direction === 'right') {
    setTab(tabIndex + 1)
  } else if (direction === 'up') {
    viewport.scrollBy({
      top: -scrollOffset,
      behavior: 'smooth',
    })
  } else if (direction === 'down') {
    viewport.scrollBy({
      top: scrollOffset,
      behavior: 'smooth',
    })
  }
}
;[...document.querySelectorAll('.dpad button')].forEach(b => {
  b.addEventListener('click', () => {
    press(b.dataset.dir)
  })
})

function actionA() {
  if (TABS[tabIndex] === 'tetris') {
    gameAction()
    return
  }

  if (TABS[tabIndex] !== 'work') {
    setTab(1)
    return
  }

  if (detailWrap.classList.contains('live')) {
    return
  }

  const first = jobList.querySelector('button')

  if (first) {
    first.focus()
  }

  beep(660, 60)
}
$('btnA').addEventListener('click', actionA)
$('btnB').addEventListener('click', () => {
  if (TABS[tabIndex] === 'tetris') {
    gameBack()
  } else if (detailWrap.classList.contains('live')) {
    closeJob()
  } else {
    beep(300, 70)
  }
})

document.addEventListener('keydown', e => {
  const t = e.target.tagName

  if (t === 'INPUT' || t === 'TEXTAREA') {
    return
  }

  if (e.key === 'ArrowLeft') {
    press('left')
    e.preventDefault()
  } else if (e.key === 'ArrowRight') {
    press('right')
    e.preventDefault()
  } else if (e.key === 'ArrowUp') {
    press('up')
    e.preventDefault()
  } else if (e.key === 'ArrowDown') {
    press('down')
    e.preventDefault()
  } else if (e.key === 'a' || e.key === 'A') {
    actionA()
  } else if (e.key === 'b' || e.key === 'B' || e.key === 'Escape') {
    if (TABS[tabIndex] === 'tetris') {
      gameBack()
    } else if (detailWrap.classList.contains('live')) {
      closeJob()
    }
  }
})
