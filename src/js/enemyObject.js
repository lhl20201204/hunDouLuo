import { getSrc } from './util'
import constValue from './constValue'
import { enemyMove } from './enemyMove'
import { shot } from './shot'
import global from './global'
import { died } from './died'
let WATER_HEIGHT = 450
let GROUND_HEIGHT = 417
let id = 0
let timerCount = 5
let max = 5
let timerTime = 100

let jumpMax = 24
let jumpTime = 20
let jumpMid = 12
let faceR = [2]
let isGift = [2]
let isBridge = [4]
let isWhiteTank = [5]
let isRedTank = [6]
let isBigBoss = [7]
let isSmallBoss = [8]
export class Enemy {
  constructor(myId) {
    this.id = global.uniqueId++
    this.deg = 0
    if (global.reset) {
      id = 0
      global.reset = false
    }

    if (typeof myId === 'number') {
      this.dataId = myId
    } else {
      this.dataId = id++
    }
    this.resetAttribute()
  }
}

Enemy.prototype.getCanTouch = function(kind) {
  switch (kind) {
    case 0:
      return false
    case 1:
      return false
    case 2:
      return true
    case 3:
      return true
    case 4:
      return true
    case 5:
      return false
    case 6:
      return false
    case 7:
      return true
    case 8:
      return false
  }
}

Enemy.prototype.getBulletKind = function(kind) {
  return kind !== 8 ? Math.floor(Math.random() * 6) : 3
}

Enemy.prototype.getSrc = function(kind) {
  switch (kind) {
    case 0:
      return require('../assets/img/sucai/enemy.png')
    case 1:
      return require('../assets/img/sucai/enemy.png')
    case 2:
      return require('../assets/img/sucai/weapon.png')
    case 3:
      return require('../assets/img/sucai/tank.png')
    case 4:
      return require('../assets/img/sucai/tank.png')
    case 5:
      return require('../assets/img/sucai/tank.png')
    case 6:
      return require('../assets/img/sucai/tank.png')
    case 7:
      return require('../assets/img/sucai/boss.png')
    case 8:
      return require('../assets/img/sucai/boss.png')
  }
}

Enemy.prototype.getLife = function(kind) {
  switch (kind) {
    case 0:
      return 1
    case 1:
      return 1
    case 2:
      return 1
    case 3:
      return 1
    case 4:
      return 1
    case 5:
      return 2
    case 6:
      return 5
    case 7:
      return 10
    case 8:
      return 10
  }
}

Enemy.prototype.getNowAction = function(kind) {
  switch (kind) {
    case 0:
      return constValue.enemyAction[this.facingRight ? 0 : 1]
    case 1:
      return constValue.enemyShotUpAction[this.facingRight ? 0 : 1]
    case 2:
      return constValue.bulletGift
    case 3:
      return constValue.gift
    case 4:
      return constValue.bridge
    case 5:
      return constValue.whiteTankLeft
    case 6:
      return constValue.redTank
    case 7:
      return constValue.bigBoss
    case 8:
      return constValue.smallBoss
  }
}
Enemy.prototype.getNowDirectionIndex = function(kind) {
  return this.facingRight ? 6 : 4
}

Enemy.prototype.timerStart = enemyMove
Enemy.prototype.shot = shot
Enemy.prototype.died = died
Enemy.prototype.changeDirection = function() {
  this.facingRight = !this.facingRight
  this.nowAction = constValue.enemyAction[this.facingRight ? 0 : 1]
  this.nowDirectionIndex = this.facingRight ? 6 : 4
}
Enemy.prototype.trackDirection = function(player) {
  if (player.x < this.x && player.y < this.y - 50) {
    this.facingRight = false
    this.nowDirectionIndex = 1
  } else if (player.x > this.x && player.y < this.y - 50) {
    this.facingRight = true
    this.nowDirectionIndex = 3
  } else if (player.x < this.x && player.y < this.y + 50) {
    this.facingRight = false
    this.nowDirectionIndex = 4
  } else if (player.x > this.x && player.y < this.y + 50) {
    this.facingRight = true
    this.nowDirectionIndex = 6
  } else if (player.x < this.x && player.y > this.y + 50) {
    this.facingRight = false
    this.nowDirectionIndex = 7
  } else if (player.x > this.x && player.y > this.y + 50) {
    this.facingRight = true
    this.nowDirectionIndex = 9
  }

  if (this.typeIsTank) {
    if (player.x > this.x - 50 && player.x < this.x + 50) {
      this.facingRight = player.x > this.x
      if (player.y > this.y) {
        this.nowDirectionIndex = 8
      } else {
        this.nowDirectionIndex = 2
      }
    }
  }
}

Enemy.prototype.clearTimer = function() {
  if (this.timer) {
    clearInterval(this.timer)
  }
  this.timer = null
}

Enemy.prototype.monitorWaterUpGround = function(map) {
  if (!this.notInWater() && map.tranX + this.x >= 0 && map.map[map.tranX + this.x].indexOf(GROUND_HEIGHT) !== -1) {
    //水中上岸
    this.clearTimer()
    this.state = 0
    this.speedX = 10
    this.heightInMap = GROUND_HEIGHT
    this.y = this.heightInMap
    this.nowAction = constValue.enemyAction[this.facingRight ? 0 : 1]
    this.timerStart(this)
  }
}

Enemy.prototype.jump = function(map, y) {
  this.clearTimer()
  this.lastJump = true
  let count = 0
  this.timer = setInterval(
    function() {
      this.x += 4 * (this.facingRight ? 1 : -1)
      if (count < jumpMid) {
        this.y -= y || 10
      } else {
        this.y += y || 10
      }
      this.monitorJump(map)
      count++
      if (count === jumpMax) {
        this.clearTimer()
        this.state = 0
        this.lastReverse = false
        this.timerStart(this)
      }
    }.bind(this),
    jumpTime
  )
}

Enemy.prototype.monitorJump = function(map) {
  let heightLevel = map.findHigherLevel(map.tranX + this.x, this.heightInMap, map.map)
  if (this.y < heightLevel) {
    this.clearTimer()
    this.y = heightLevel
    this.lastReverse = false
    this.lastJump = false
    this.state = 0
    this.heightInMap = this.y
    this.timerStart(this)
  }
}

Enemy.prototype.reverse = function(map) {
  this.clearTimer()
  this.lastReverse = true
  this.lastJump = false
  this.state = 0
  this.facingRight = !this.facingRight
  this.nowAction = constValue.enemyAction[this.facingRight ? 0 : 1]
  this.timerStart(this)
}

Enemy.prototype.drop = function(map, fn) {
  this.clearTimer()
  let nextLevel = map.findNextLevel(map.tranX + this.x, this.y, map.map)
  if (fn) {
    nextLevel += 25 //
  }
  let d = (nextLevel - this.y) / timerCount
  let count = 0
  this.timer = setInterval(
    function() {
      count++
      this.y += d
      if (fn) {
        this.x += 4
      }
      if (count === max) {
        this.clearTimer()
        this.state = 0
        this.heightInMap = map.afterDropUpdateY(map.tranX + this.x, this.y, map.map)
        this.y = this.heightInMap
        if (!this.notInWater()) {
          this.nowAction = constValue.enemyWaterAction[this.facingRight ? 0 : 1]
          this.speedX = 8
        }
        this.lastJump = false
        this.lastReverse = false
        if (!fn) {
          this.timerStart(this)
        } else {
          fn()
        }
      }
    }.bind(this),
    timerTime
  )
}

Enemy.prototype.notInWater = function() {
  return this.heightInMap !== WATER_HEIGHT
}

Enemy.prototype.resetAttribute = function() {
  this.x = constValue.total[this.dataId][1]
  this.y = constValue.total[this.dataId][2]
  this.facingRight = faceR.indexOf(this.kind) === -1 ? false : true
  this.state = 0
  this.heightInMap = this.y
  this.kind = constValue.total[this.dataId][3]
  this.scale = 1
  if (isGift.indexOf(this.kind) !== -1) {
    this.typeIsGift = true
  }

  if (isBridge.indexOf(this.kind) !== -1) {
    this.typeIsBridge = true
  }

  if (isWhiteTank.indexOf(this.kind) !== -1) {
    this.typeIsTank = true
    this.typeIsWhiteTank = true
  }

  if (isRedTank.indexOf(this.kind) !== -1) {
    this.typeIsTank = true
    this.typeIsRedTank = true
  }

  if (isBigBoss.indexOf(this.kind) !== -1) {
    this.typeIsBoss = true
    this.typeIsBigBoss = true
    this.scale = 2.2
  }

  if (isSmallBoss.indexOf(this.kind) !== -1) {
    this.typeIsBoss = true
    this.typeIsSmallBoss = true
    this.scale = 1.5
  }

  this.life = this.getLife(this.kind)
  this.bulletKind = this.getBulletKind(this.kind)
  this.nowAction = this.getNowAction(this.kind)
  this.nowDirectionIndex = this.getNowDirectionIndex(this.kind)
  this.speedX = 10
  this.timer = null
  this.lastJump = false
  this.lastReverse = false
  this.canTouch = this.getCanTouch(this.kind)
  this.res = this.getSrc(this.kind)
}

Enemy.prototype.getWidth = function() {
  return this.nowAction[this.state * 4 + 0]
}

Enemy.prototype.getHeight = function() {
  return this.nowAction[this.state * 4 + 1]
}
