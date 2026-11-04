'use strict'

const jobList = $('joblist')

function createJobListItem(job) {
  const li = document.createElement('li')
  const b = document.createElement('button')

  b.type = 'button'
  b.dataset.id = job.id
  b.innerHTML = '<span class="co"></span><span class="yr"></span>'

  b.querySelector('.co').textContent = job.co
  b.querySelector('.yr').textContent = job.yr
  b.addEventListener('click', () => {
    openJob(job.id)
  })

  li.appendChild(b)

  return li
}

JOBS.forEach(job => {
  jobList.appendChild(createJobListItem(job))
})

function appendBullets(ul, bullets) {
  bullets.forEach(bullet => {
    const li = document.createElement('li')

    if (typeof bullet === 'string') {
      li.textContent = bullet
    } else {
      const nested = document.createElement('ul')
      nested.className = 'bul'
      li.textContent = bullet.text
      appendBullets(nested, bullet.bullets)
      li.appendChild(nested)
    }

    ul.appendChild(li)
  })
}

function openJob(id) {
  const job = JOBS.find(j => j.id === id)

  if (!job) {
    return
  }

  $('d-title').textContent = `${job.co} // ${job.role}`
  $('d-meta').textContent = `${job.dates} - ${job.about}`

  const ul = $('d-bullets')
  ul.innerHTML = ''
  appendBullets(ul, job.bullets)

  listWrap.style.display = 'none'
  detailWrap.classList.add('live')
  crumb.textContent = job.co.toUpperCase()
  viewport.scrollTop = 0

  beep(880, 70)
}

function closeJob() {
  detailWrap.classList.remove('live')
  listWrap.style.display = 'block'
  crumb.textContent = 'WORK'
  viewport.scrollTop = 0
  beep(420, 70)
}

$('back').addEventListener('click', closeJob)
