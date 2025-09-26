// ==================================================
// Canvas Setup
// ==================================================
const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// ==================================================
// Constants (tweakable)
// ==================================================
const PLAYER_RADIUS = 30
const PLAYER_SPEED = 5
const MONSTER_MIN_RADIUS = 8
const MONSTER_MAX_RADIUS = 150
const MONSTER_SPEED_BASE = 50
const BOSS_SIZE = 120
const BOSS_SPEED = 1.5
const BOSS_SPAWN_TIME = 100 // changed from 200

// ==================================================
// Global Variables
// ==================================================
const bullets = []
const monsters = []
const gifts = []
let animationId
let time = 0
let score = 0
let bossLevel = false
let guardLevel = false
let drawBoss = false
let guardsSpawned = 0
let gameEnded = false
let xPos = 0
let yPos = 0

// Power-ups
let powerUpMode = false
let tripleShootPwrUp = false
let shieldPwrUp = false
let invinceibleMode = false
let shockwavePWRUp = false

// ==================================================
// Helper Functions
// ==================================================
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNumBetween0and100PerSec() {
  return randomNum(0, 100)
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1)
}

// ==================================================
// Classes
// ==================================================
class Player {
  constructor(x, y, radius, speed) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
  }

  draw() {
    c.fillStyle = 'white'
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fill()
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
  }
}

class Monster {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.draw()
  }

  draw() {
    c.fillStyle = this.color
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fill()
  }
}

class Bullet {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.draw()
  }

  draw() {
    c.fillStyle = this.color
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fill()
  }
}

class Boss {
  constructor(x, y, size, speed) {
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed
  }

  update() {
    // move toward player
    const angle = Math.atan2(player.y - this.y, player.x - this.x)
    this.x += Math.cos(angle) * this.speed
    this.y += Math.sin(angle) * this.speed
    this.draw()
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
  }
}

// ==================================================
// Initialization
// ==================================================
const player = new Player(canvas.width / 2, canvas.height / 2, PLAYER_RADIUS, PLAYER_SPEED)
let boss = new Boss(canvas.width, canvas.height / 2, BOSS_SIZE, BOSS_SPEED)

// ==================================================
// Spawn Monsters
// ==================================================
function spawnMonsters() {
  setInterval(() => {
    const radius = Math.random() * (MONSTER_MAX_RADIUS - MONSTER_MIN_RADIUS) + MONSTER_MIN_RADIUS
    let x, y
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 : canvas.width
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 : canvas.height
    }

    const angle = Math.atan2(player.y - y, player.x - x)
    const color = `rgb(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(0, 255)})`
    const velocity = { x: Math.cos(angle) * MONSTER_SPEED_BASE / radius, y: Math.sin(angle) * MONSTER_SPEED_BASE / radius }

    monsters.push(new Monster(x, y, radius, color, velocity))
  }, 2800)
}

// ==================================================
// Animate Game
// ==================================================
function animate() {
  animationId = requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  player.draw()
  if (drawBoss) boss.update()

  monsters.forEach((monster, index) => {
    monster.update()

    // Collision with player
    if (distance(player.x, player.y, monster.x, monster.y) < player.radius + monster.radius) {
      if (shieldPwrUp) {
        shieldPwrUp = false
        monsters.splice(index, 1)
      } else if (invinceibleMode) {
        monsters.splice(index, 1)
      } else {
        gameEnded = true
        cancelAnimationFrame(animationId)
      }
    }

    // Collision with bullets
    bullets.forEach((bullet, bulletIndex) => {
      if (distance(bullet.x, bullet.y, monster.x, monster.y) < bullet.radius + monster.radius) {
        monsters.splice(index, 1)
        bullets.splice(bulletIndex, 1)
        score += randomNum(0, 5)
      }
    })
  })

  bullets.forEach((bullet, index) => {
    bullet.update()
    if (bullet.x < 0 || bullet.y < 0 || bullet.x > canvas.width || bullet.y > canvas.height) bullets.splice(index, 1)
  })

  // Display score/time
  c.fillStyle = 'white'
  c.font = '23px Comic Sans MS'
  c.fillText(`Time survived: ${parseInt(time)}s`, 10, 50)
  c.fillText(`Score: ${parseInt(score)}`, canvas.width / 2, 50)
}

// ==================================================
// Event Listeners
// ==================================================
addEventListener('mousemove', (event) => {
  xPos = event.clientX
  yPos = event.clientY
})

addEventListener('click', () => {
  const angle = Math.atan2(yPos - player.y, xPos - player.x)
  const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 }
  bullets.push(new Bullet(player.x, player.y, 5, 'white', velocity))
})

addEventListener('keydown', (e) => {
  if (gameEnded) return
  switch (e.key) {
    case 'w': player.move(0, -PLAYER_SPEED); break
    case 'a': player.move(-PLAYER_SPEED, 0); break
    case 's': player.move(0, PLAYER_SPEED); break
    case 'd': player.move(PLAYER_SPEED, 0); break
  }
})

// ==================================================
// Timers
// ==================================================
setInterval(() => {
  time++
  if (time === BOSS_SPAWN_TIME) {
    bossLevel = true
    drawBoss = true
  }
}, 1000)

// Start the game
spawnMonsters()
animate()
