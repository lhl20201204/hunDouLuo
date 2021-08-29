import { isTouch, getSrc } from './util'
import constValue from './constValue'
let enemy
let bullet
let bulletMap = new Map()
  .set(0, constValue.bulletB)
  .set(1, constValue.bulletL)
  .set(2, constValue.bulletM)
  .set(3, constValue.bulletS)
  .set(4, constValue.bulletR)
  .set(5, constValue.bulletF)
export function touchCheck(global) {
  if (!global) {
    console.log('error:global不能为空')
    return
  }

  for (let i = 0; i < global.enemyList.length; i++) {
    enemy = global.enemyList[i]
    if ((!global.player.invincible && !enemy.canTouch) || enemy.typeIsGift) {
      if (
        !global.player.hadDied &&
        isTouch(
          global.player.x,
          global.player.y,
          global.player.getWidth(),
          global.player.getHeight(),
          enemy.x,
          enemy.y,
          enemy.getWidth(),
          enemy.getHeight()
        )
      ) {
        if (!enemy.typeIsGift) {
          global.player.life--
          global.player.hadDied = true
          global.player.died(global.map)
        }
        if (enemy.typeIsBullet || enemy.typeIsGift) {
          if (enemy.typeIsGift) {
            global.player.bulletKind = Math.floor(1 + 5 * Math.random())
            if (enemy.tempRes) {
              enemy.res = enemy.tempRes
              enemy.tempRes = null
            }
          }
          enemy.died(global, enemy)
        }

        break
      }
    }

    for (let j = 0; j < global.playerBullets.length; j++) {
      bullet = global.playerBullets[j]
      if (
        ((!enemy.canTouch && !enemy.typeIsBullet) || enemy.typeIsGift) &&
        isTouch(
          bullet.x,
          bullet.y,
          bullet.getWidth(),
          bullet.getHeight(),
          enemy.x,
          enemy.y,
          enemy.getWidth(),
          enemy.getHeight()
        )
      ) {
        if (enemy.typeIsGift) {
          if (!enemy.bulletNoTouch) {
            enemy.tempRes = enemy.res
            enemy.res = require('../assets/img/sucai/weapon.png')
            enemy.nowAction = bulletMap.get(Math.floor(1 + 5 * Math.random()))
            enemy.bulletNoTouch = true
            enemy.drop(global.map, function() {}.bind(this))
          }
        } else {
          enemy.life--
          if (enemy.life <= 0) {
            if (enemy.typeIsSmallBoss) {
              global.bossIsDied++
            }
            enemy.died(global, enemy)
            if (global.bossIsDied === 2) {
              for (let k = 0; k < global.enemyList.length; k++) {
                if (global.enemyList[k].typeIsBigBoss) {
                  global.enemyList[k].died(global, global.enemyList[k])
                  break
                }
              }
            }
          }
        }
        clearInterval(bullet.timer)
        bullet.timer = null
        global.playerBullets.splice(j, 1)
        break
      }
    }
  }
}
