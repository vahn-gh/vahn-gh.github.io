'use strict'

const moreListWrap = $('morelist-wrap')
const moreDetailWrap = $('moredetail')
const moreList = $('morelist')

function createMoreListItem(topic) {
  const li = document.createElement('li')
  const b = document.createElement('button')

  b.type = 'button'
  b.dataset.id = topic.id
  b.innerHTML = '<span class="co"></span>'

  b.querySelector('.co').textContent = topic.title
  b.addEventListener('click', () => {
    openMoreTopic(topic.id)
  })

  li.appendChild(b)

  return li
}

MORE_TOPICS.forEach(topic => {
  moreList.appendChild(createMoreListItem(topic))
})

function openMoreTopic(id) {
  const topic = MORE_TOPICS.find(t => t.id === id)

  if (!topic) {
    return
  }

  $('m-title').textContent = topic.title

  const body = $('m-body')
  body.innerHTML = ''

  topic.body.forEach(t => {
    const p = document.createElement('p')
    p.className = 'dim'
    p.textContent = t
    body.appendChild(p)
  })

  moreListWrap.style.display = 'none'
  moreDetailWrap.classList.add('live')
  crumb.textContent = topic.title.toUpperCase()
  viewport.scrollTop = 0

  beep(880, 70)
}

function closeMoreTopic() {
  moreDetailWrap.classList.remove('live')
  moreListWrap.style.display = 'block'
  crumb.textContent = 'MORE'
  viewport.scrollTop = 0
  beep(420, 70)
}

function closeMoreSilently() {
  moreDetailWrap.classList.remove('live')
  moreListWrap.style.display = 'block'
}

$('backmore').addEventListener('click', closeMoreTopic)
