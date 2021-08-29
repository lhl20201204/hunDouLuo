import { getSrc } from './util'
import { bulletMove } from './bulletMove'
import global from './global'
import { died } from './died'

let power = new Map()
  .set(0, 1)
  .set(1, 3)
  .set(2, 2)
  .set(3, 2)
  .set(4, 2)
  .set(5, 2)
export class Bullet {
  constructor(kind, deg, x, y, w, h, tranX, tranY) {
    this.kind = kind
    this.power = this.getPower()
    this.deg = deg
    this.scale = 1
    this.nowAction = [
      w,
      h,
      tranX,
      tranY,
      w,
      h,
      tranX,
      tranY,
      w,
      h,
      tranX,
      tranY,
      w,
      h,
      tranX,
      tranY,
      w,
      h,
      tranX,
      tranY,
      w,
      h,
      tranX,
      tranY
    ]
    this.state = 0
    this.id = global.uniqueId++
    this.res = require('../assets/img/sucai/weapon.png')
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.tranX = tranX
    this.tranY = tranY
    this.canTouch = false
    this.typeIsBullet = true
  }
}
Bullet.prototype.getPower = function() {
  return power.get(this.kind)
}

Bullet.prototype.getWidth = function() {
  return this.nowAction[this.state * 4]
}
Bullet.prototype.getHeight = function() {
  return this.nowAction[this.state * 4 + 1]
}
Bullet.prototype.clearTimer = function() {
  if (this.timer) {
    clearInterval(this.timer)
  }
  this.timer = null
}

Bullet.prototype.timerStart = bulletMove
Bullet.prototype.died = died
