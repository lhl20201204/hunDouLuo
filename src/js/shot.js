import { Bullet } from './bullet'
import constValue from './constValue'

const playerOfHeight = new Map()
  .set(1, -1)
  .set(20, -1)
  .set(21, -1)
  .set(3, -1)
  .set(4, 3)
  .set(6, 3)
  .set(7, 4)
  .set(80, 1)
  .set(81, 1)
  .set(9, 4)
const playerOfWidth = new Map()
  .set(1, 0)
  .set(20, 6)
  .set(21, 3)
  .set(3, 8)
  .set(4, 0)
  .set(6, 8)
  .set(7, 0)
  .set(80, 8)
  .set(81, -1)
  .set(9, 8)

const enemyOfHeight = new Map()
  .set(1, -1)
  .set(3, -1)
  .set(4, 1)
  .set(6, 1)
  .set(7, 4)
  .set(9, 4)
const enemyOfWidth = new Map()
  .set(1, 0)
  .set(3, 8)
  .set(4, 0)
  .set(6, 8)
  .set(7, 0)
  .set(9, 8)

const whiteTankOfHeight = new Map()
  .set(1, 0)
  .set(20, 0)
  .set(21, 0)
  .set(3, 1)
  .set(4, 3)
  .set(6, 3)
  .set(7, 6)
  .set(80, 8)
  .set(81, 8)
  .set(9, 6)
const whiteTankOfWidth = new Map()
  .set(1, 2)
  .set(20, 4)
  .set(21, 4)
  .set(3, 8)
  .set(4, 0)
  .set(6, 8)
  .set(7, 2)
  .set(80, 4)
  .set(81, 4)
  .set(9, 6)

const redTankOfWidth = new Map().set(4, 0)
const redTankOfHeight = new Map().set(4, 4)

export function shot(global, deg, enemy) {
  let player = enemy || global.player
  if (!player) {
    console.log('error：传进来的对象不能为空')
    return
  }
  let w = constValue.bulletArrays[player.bulletKind][0]
  let h = constValue.bulletArrays[player.bulletKind][1]

  let index = player.nowDirectionIndex
  if (player.nowDirectionIndex === 0 || player.nowDirectionIndex === 5 || player.nowDirectionIndex === 10) {
    index = player.facingRight ? 6 : 4
  }
  if (player.nowDirectionIndex === 2) {
    if (player.facingRight) {
      index = 20
    } else {
      index = 21
    }
  }
  if (player.nowDirectionIndex === 8) {
    if (player.facingRight) {
      index = 80
    } else {
      index = 81
    }
  }

  let width = playerOfWidth
  let height = playerOfHeight
  if (enemy) {
    width = enemyOfWidth
    height = enemyOfHeight
    if (enemy.typeIsWhiteTank) {
      width = whiteTankOfWidth
      height = whiteTankOfHeight
    } else if (enemy.typeIsRedTank) {
      width = redTankOfWidth
      height = redTankOfHeight
    }
  }
  if (enemy && enemy.typeIsTank) {
    if (enemy.nowDirectionIndex === 8) {
      deg = 90
    }
  }
  let x = player.x + (player.getWidth() / 8) * width.get(index)
  let y = player.y + (player.getHeight() / 8) * height.get(index)
  let tranX = constValue.bulletArrays[player.bulletKind][2]
  let tranY = constValue.bulletArrays[player.bulletKind][3]
  if (player.bulletKind !== 3) {
    let bullet = new Bullet(player.bulletKind, deg, x, y, w, h, tranX, tranY)
    if (!enemy) {
      global.playerBullets.push(bullet)
      bullet.timerStart(global, bullet)
    } else {
      global.enemyList.push(bullet)
      bullet.timerStart(global, bullet, enemy)
    }
  } else {
    for (let i = 0; i < 5; i++) {
      let bullet = new Bullet(player.bulletKind, deg - 30 + 15 * i, x, y, w, h, tranX, tranY)
      if (!enemy) {
        global.playerBullets.push(bullet)
        bullet.timerStart(global, bullet)
      } else {
        global.enemyList.push(bullet)
        bullet.timerStart(global, bullet, enemy)
      }
    }
  }
}
