'use strict'

const TETRIS_COLS = 9
const TETRIS_ROWS = 16
const TETRIS_CELL = 20

const TETRIS_SHAPES = {
  I: {
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#40312f',
  },
  J: {
    matrix: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#5c2339',
  },
  L: {
    matrix: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a17d45',
  },
  O: {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: '#e0b26b',
  },
  S: {
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#7a5d32',
  },
  T: {
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#3b1626',
  },
  Z: {
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#c9a46b',
  },
}
const TETRIS_TYPES = Object.keys(TETRIS_SHAPES)

function randomTetrisType() {
  return TETRIS_TYPES[Math.floor(Math.random() * TETRIS_TYPES.length)]
}

function rotateMatrix(matrix) {
  const size = matrix.length
  const result = []

  for (let x = 0; x < size; x++) {
    const row = []

    for (let y = size - 1; y >= 0; y--) {
      row.push(matrix[y][x])
    }

    result.push(row)
  }

  return result
}

class TetrisPiece {
  constructor(type, x, y) {
    const shape = TETRIS_SHAPES[type]

    this.type = type
    this.matrix = shape.matrix.map(row => row.slice())
    this.color = shape.color
    this.x = x
    this.y = y
  }
}

class Tetris {
  constructor(canvas, nextCanvas, scoreEl, linesEl) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.nextCanvas = nextCanvas
    this.nextCtx = nextCanvas.getContext('2d')
    this.scoreEl = scoreEl
    this.linesEl = linesEl

    this.board = this.createBoard()
    this.piece = null
    this.nextType = null
    this.score = 0
    this.lines = 0
    this.dropMs = 800
    this.timer = null
    this.started = false
    this.paused = false
    this.over = false
  }

  createBoard() {
    return Array.from({ length: TETRIS_ROWS }, () =>
      Array(TETRIS_COLS).fill(null)
    )
  }

  isActive() {
    return this.started && !this.paused && !this.over
  }

  collides(matrix, offX, offY) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (!matrix[y][x]) {
          continue
        }

        const boardX = offX + x
        const boardY = offY + y

        if (boardX < 0 || boardX >= TETRIS_COLS || boardY >= TETRIS_ROWS) {
          return true
        }

        if (boardY >= 0 && this.board[boardY][boardX]) {
          return true
        }
      }
    }

    return false
  }

  spawnPiece() {
    const type = this.nextType || randomTetrisType()

    this.nextType = randomTetrisType()

    const matrix = TETRIS_SHAPES[type].matrix
    const piece = new TetrisPiece(
      type,
      Math.floor((TETRIS_COLS - matrix[0].length) / 2),
      0
    )

    if (this.collides(piece.matrix, piece.x, piece.y)) {
      this.end()
    }

    return piece
  }

  lockPiece() {
    this.piece.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell) {
          return
        }

        const boardY = this.piece.y + y
        const boardX = this.piece.x + x

        if (boardY >= 0) {
          this.board[boardY][boardX] = this.piece.color
        }
      })
    })

    this.clearLines()
    this.piece = this.spawnPiece()
  }

  clearLines() {
    let cleared = 0

    this.board = this.board.filter(row => {
      const full = row.every(cell => cell)

      if (full) {
        cleared++
      }

      return !full
    })

    while (this.board.length < TETRIS_ROWS) {
      this.board.unshift(Array(TETRIS_COLS).fill(null))
    }

    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800]

      this.lines += cleared
      this.score += points[cleared] * (Math.floor(this.lines / 10) + 1)
      this.dropMs = Math.max(150, 800 - Math.floor(this.lines / 10) * 60)
      this.scoreEl.textContent = this.score
      this.linesEl.textContent = this.lines
      this.startLoop()
      beep(880, 90)
    }
  }

  move(dx, dy) {
    if (!this.isActive()) {
      return false
    }

    const nx = this.piece.x + dx
    const ny = this.piece.y + dy

    if (this.collides(this.piece.matrix, nx, ny)) {
      return false
    }

    this.piece.x = nx
    this.piece.y = ny

    return true
  }

  rotate() {
    if (!this.isActive()) {
      return
    }

    const rotated = rotateMatrix(this.piece.matrix)
    const kicks = [0, -1, 1, -2, 2]

    for (const kick of kicks) {
      if (!this.collides(rotated, this.piece.x + kick, this.piece.y)) {
        this.piece.matrix = rotated
        this.piece.x += kick
        beep(440, 40)
        return
      }
    }
  }

  softDrop() {
    if (!this.isActive()) {
      return
    }

    if (!this.move(0, 1)) {
      this.lockPiece()
    }
  }

  hardDrop() {
    if (!this.isActive()) {
      return
    }

    while (this.move(0, 1)) {
      // drop until it lands
    }

    this.lockPiece()
    beep(200, 60)
  }

  startLoop() {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      if (!this.move(0, 1)) {
        this.lockPiece()
      }

      this.draw()
    }, this.dropMs)
  }

  start() {
    this.board = this.createBoard()
    this.score = 0
    this.lines = 0
    this.dropMs = 800
    this.over = false
    this.paused = false
    this.started = true
    this.nextType = randomTetrisType()
    this.piece = this.spawnPiece()
    this.scoreEl.textContent = '0'
    this.linesEl.textContent = '0'
    this.startLoop()
    this.draw()
  }

  end() {
    this.over = true
    clearInterval(this.timer)
    beep(120, 300)
    this.draw()
  }

  togglePause() {
    if (!this.started || this.over) {
      return
    }

    this.paused = !this.paused

    if (this.paused) {
      clearInterval(this.timer)
    } else {
      this.startLoop()
    }

    this.draw()
  }

  handleInput(direction) {
    if (!this.started || this.over) {
      return
    }

    if (direction === 'left') {
      this.move(-1, 0)
    } else if (direction === 'right') {
      this.move(1, 0)
    } else if (direction === 'down') {
      this.softDrop()
    } else if (direction === 'up') {
      this.rotate()
    }

    this.draw()
  }

  handleAction() {
    if (!this.started || this.over) {
      this.start()
    } else {
      this.hardDrop()
    }

    this.draw()
  }

  handleDeactivate() {
    if (this.started && !this.over && !this.paused) {
      this.togglePause()
    }
  }

  drawCell(ctx, x, y, size, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2)
  }

  drawOverlay(lines) {
    const boxHeight = lines.length * 20 + 20

    this.ctx.fillStyle = 'rgba(64, 49, 47, 0.85)'
    this.ctx.fillRect(
      0,
      this.canvas.height / 2 - boxHeight / 2,
      this.canvas.width,
      boxHeight
    )

    this.ctx.fillStyle = '#ead7de'
    this.ctx.font = '12px "Press Start 2P", monospace'
    this.ctx.textAlign = 'center'

    lines.forEach((line, i) => {
      const y = this.canvas.height / 2 - boxHeight / 2 + 24 + i * 20
      this.ctx.fillText(line, this.canvas.width / 2, y)
    })
  }

  draw() {
    this.ctx.fillStyle = '#ead7de'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.board.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          this.drawCell(this.ctx, x, y, TETRIS_CELL, color)
        }
      })
    })

    if (this.piece) {
      this.piece.matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (!cell) {
            return
          }

          const boardY = this.piece.y + y

          if (boardY < 0) {
            return
          }

          this.drawCell(
            this.ctx,
            this.piece.x + x,
            boardY,
            TETRIS_CELL,
            this.piece.color
          )
        })
      })
    }

    this.nextCtx.fillStyle = '#ead7de'
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height)

    if (this.nextType) {
      const shape = TETRIS_SHAPES[this.nextType]
      const size = 14
      const offsetX =
        (this.nextCanvas.width - shape.matrix[0].length * size) / 2
      const offsetY = (this.nextCanvas.height - shape.matrix.length * size) / 2

      this.nextCtx.fillStyle = shape.color
      shape.matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (!cell) {
            return
          }

          this.nextCtx.fillRect(
            offsetX + x * size + 1,
            offsetY + y * size + 1,
            size - 2,
            size - 2
          )
        })
      })
    }

    if (!this.started) {
      this.drawOverlay(['PRESS A', 'TO START'])
    } else if (this.over) {
      this.drawOverlay(['GAME OVER', 'PRESS A'])
    } else if (this.paused) {
      this.drawOverlay(['PAUSED'])
    }
  }
}

const tetrisGame = new Tetris(
  $('tetris-canvas'),
  $('tetris-next'),
  $('t-score'),
  $('t-lines')
)

function gameInput(direction) {
  tetrisGame.handleInput(direction)
}

function gameAction() {
  tetrisGame.handleAction()
}

function gameBack() {
  tetrisGame.togglePause()
}

function gameActivate() {
  tetrisGame.draw()
}

function gameDeactivate() {
  tetrisGame.handleDeactivate()
}

tetrisGame.draw()
