import { getSrc } from './util'
import constValue from './constValue'
import { drop } from './playerDrop'
import { shot } from './shot'
import { playerMove } from './playerTimerStart'
import { monitorJump } from './playerMonitorJump'
let WATER_HEIGHT = 450
let reLifeTime = 2000
let invincibleTime = 3000
export class Player {
  constructor(x, y) {
    this.res = require('../assets/img/sucai/player.png')
    this.state = 0
    this.facingRight = true
    this.heightInMap = y
    this.nowDirectionIndex = 0
    this.deg = 0
    this.x = x
    this.y = y
    this.nowAction = constValue.nowAction
    this.bulletKind = 1
    this.life = 3
    this.isClimbing = false
    this.isDroping = false
    this.timer = null
  }
}

Player.prototype.timerStart = playerMove
Player.prototype.shot = shot

Player.prototype.drop = drop

Player.prototype.monitorJump = monitorJump

Player.prototype.clearTimer = function() {
  if (this.timer) {
    clearInterval(this.timer)
  }
  this.timer = null
  this.state = 0
}

Player.prototype.updateHeightInMap = function() {
  this.heightInMap = this.y
}
Player.prototype.reSetState = function() {
  this.state = 0
}

Player.prototype.splitArr = function(arr) {
  return arr.slice(this.facingRight ? 0 : 20, this.facingRight ? 20 : 40)
}

Player.prototype.setImgInWater = function() {
  this.nowAction = this.splitArr(constValue.arrays[10])
}

Player.prototype.notInWater = function() {
  return this.heightInMap !== WATER_HEIGHT
}

Player.prototype.getWidth = function() {
  return this.nowAction[this.state * 4 + 2]
}

Player.prototype.getHeight = function() {
  return this.nowAction[this.state * 4 + 3]
}

Player.prototype.died = function(map) {
  this.clearTimer()
  this.hadDied = true
  this.nowAction = constValue.playDiedAction[this.facingRight ? 0 : 1]
  let cnt = 0
  this.timer = setInterval(
    function() {
      this.state = cnt++
      this.x -= this.facingRight ? 20 : -20
      this.y += this.state < 3 ? -20 : 30
      if (cnt === 5) {
        clearInterval(this.timer)
        this.timer = null
        this.y = this.heightInMap + 20
        this.reLife(map)
      }
    }.bind(this),
    100
  )
}

Player.prototype.reLife = function(map) {
  let xy = map.findNewSafeXY(map.tranX, map.map)
  let timeout = setTimeout(
    function() {
      clearTimeout(timeout)
      this.hadDied = false
      this.heightInMap = xy[1]
      this.y = xy[1]
      this.x = xy[0] - map.tranX
      this.facingRight = true
      this.nowAction = constValue.arrays[0]
      this.nowDirectionIndex = 0
      this.state = 0
      this.nowDirectionIndex = 0
      this.timer = null
      this.invincible = true
      this.isClimbing = false
      this.isDroping = false
      setTimeout(
        function() {
          this.invincible = false
        }.bind(this),
        invincibleTime
      )
    }.bind(this),
    reLifeTime
  )
}
