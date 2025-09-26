// ----------------------
// DOM ELEMENTS (Game Assets & UI)
// ----------------------

const gift = document.getElementById('gift')                     // Gift image (used as power-up or collectible)
const seasonSkinHTML = document.getElementById('elf skin')       // Decorative seasonal skin on player (cosmetic)
const canvas = document.querySelector('canvas')                  // Main game canvas
const c = canvas.getContext('2d')                                // 2D rendering context
const body = document.querySelector('body')                      // Page body (likely used for event listeners)
const clickAudio = document.getElementById('click-sound')        // Sound played on clicking/shooting
const squidgameBackgroundAudio = document.getElementById('background-music') // Background music

// Message elements displayed during story or gameplay
const firstMessageFromRealWorld = document.getElementById('first message')
const secondMessage = document.getElementById('second-meassage') // (Spelling typo in ID: should be "message")
const thirdMessage = document.getElementById('third-message')
const fourthMessage = document.getElementById('4th-message')
const fifthMessage = document.getElementById('5th-message')
const sixthMessage = document.getElementById('6th-message')
const seventhMessage = document.getElementById('7th-message')

// ----------------------
// GAME STATE VARIABLES
// ----------------------

let mode                           // Game mode (story, endless, boss, etc.)
let gameEnded = false              // Has the game ended?
let invinceibleMode = false        // Is the player currently invincible?
let points = 0                     // Points system (could be used for progression)
let time = 0                       // Elapsed game time (ms or seconds)
let powerUpMode = false            // General flag for any power-up active
let shieldPwrUp = false            // Shield power-up active
let tripleShootPwrUp = false       // Triple shooting power-up active
let shockwavePWRUp = false         // Shockwave power-up active
let animationId                    // Reference to the animation frame (used to stop loop)
let bossLevel = false              // Flag for boss level
let spawnMonstersID                // Interval ID for spawning monsters
let numberOfMonstersSpawnedInBossMode = 0  // Counter for boss phase monsters
let playerX = innerWidth / 2       // Default player X (center screen)
let playerY = innerHeight / 2      // Default player Y
let score = 0                      // Game score
let drawBoss = false               // Is boss being rendered?
let guardLevel = false             // Guard enemy level active
let guardsSpawned = 0              // Number of guards spawned
let guardsLeft = 0                 // Remaining guards
let shootingIntervalPwrUp          // Interval ID for triple shot power-up

// ----------------------
// CANVAS CONFIGURATION
// ----------------------

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// ----------------------
// GAME SETTINGS (STORAGE)
// ----------------------

// Frames per second (not directly used, likely for timing reference)
localStorage.setItem('frames per second', 100)

// Power-up frequency: default to 15 seconds if not already stored
if (localStorage.getItem('ms per pwr up') === null) {
    localStorage.setItem('ms per pwr up', 15000)
}

// ----------------------
// HELPER FUNCTIONS
// ----------------------

// Returns a random integer between min and max
function randomNum(min, max) {
    let num = Math.random() * (max - min) + min
    return Math.floor(num)
}

// ----------------------
// GAME ENTITIES (CLASSES)
// ----------------------

// 1. GIFT — collectible or power-up
class Gift {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    draw() {
        c.drawImage(gift, this.x, this.y, 50, 50)
    }
}

// 2. SEASON SKIN — cosmetic skin that follows player
class SeasonSkin {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    draw() {
        c.drawImage(seasonSkinHTML, this.x, this.y, 22, 22)
    }
}

// 3. BOSS — large rectangular enemy, moves left
class Boss {
    constructor(x, y, sideLenght, color, velocity) {
        this.x = x
        this.y = y
        this.sideLenght = sideLenght
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.sideLenght, this.sideLenght)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity    // Horizontal movement
    }
}

// 4. GLITCHDRIFT — static/animated block used as obstacle or hazard
class GlitchDrift {
    constructor(x, y, sideLenght, color) {
        this.x = x
        this.y = y
        this.sideLenght = sideLenght
        this.color = color
    }

    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.sideLenght, this.sideLenght)
        c.fillStyle = this.color
        c.fill()
    }
}

// 5. TURRET — circular shooter, could be enemy or background element
class Turret {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

// 6. PLAYER — main character controlled by user
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

// 7. BULLET — projectile fired by player
class Bullet {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()

        // Apply animation easing with GSAP (can be removed if not needed)
        gsap.to(this.x, { x: this.x - this.velocity.x })
        gsap.to(this.y, { y: this.y - this.velocity.y })

        // Update position manually
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

// 8. MONSTER — enemy that chases/moves toward player
class Monster {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

// 9. PARTICLE — visual effect (e.g. explosion, spark)
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

// ----------------------
// GAME ENTITY INSTANCES
// ----------------------

// Default player and different colored versions for power-ups
const player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white')
const playerPowerUp = new Player(player.x, player.y, 10, 'blue')                 // Generic power-up mode
const tripleShooterPlayer = new Player(player.x, player.y, 10, 'green')         // Triple shooter active
const sheildPlayer = new Player(player.x, player.y, 10, 'rgb(0, 255, 255)')     // Shield active
const invinciblePlayer = new Player(player.x, player.y, 10, '#FFD700')         // Invincibility mode
const shockwavePWRUpPlayer = new Player(player.x, player.y, 10, 'rgb(232, 172, 172)') // Shockwave active

// Boss appears from the right side and moves left
const boss = new Boss(canvas.width - canvas.width / 5, 0, canvas.height, 'rgb(84,232,255)', -0.2)

// Cosmetic skin to overlay on player
let seasonSkin = new SeasonSkin(player.x - 11, player.y - 11)

// ----------------------
// ACTIVE GAME OBJECTS (Dynamic)
// ----------------------

const bullets = []             // All bullets currently on screen
const specialBullets = []      // Special/projectiles from power-ups
const monsters = []            // Enemy monsters
const gifts = []               // Power-up gifts on screen
