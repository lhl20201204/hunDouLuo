import constValue from './constValue'
import { getSrc } from './util'
import { createEnemy } from './generateGeneralEnemy'

let diedTime = 100
let max = 5
let canReLife = [0]
let delay = 10000
export function died(global, enemy) {
  enemy.typeIsGift = false
  enemy.canTouch = true
  enemy.clearTimer()
  let count = 0
  enemy.state = 0
  let t2 = enemy.nowAction
  enemy.nowAction = constValue.effectTranslate
  let t = enemy.res
  enemy.res = require('../assets/img/sucai/weapon.png')
  enemy.timer = setInterval(
    function() {
      enemy.state++
      if (enemy.state === max) {
        enemy.state = 0
      }
      count++
      if (count === max) {
        enemy.clearTimer()
        enemy.canTouch = false
        enemy.res = t
        enemy.nowAction = t2
        global.deleteEnemyById(enemy.id)
        if (canReLife.indexOf(enemy.kind) != -1) {
          let timeout = setTimeout(function() {
            clearTimeout(timeout)

            if (enemy.originX > global.map.tranX) {
              createEnemy(global, enemy.serialNumber, function() {})
            }
          }, delay)
        }
      }
    }.bind(this),
    diedTime
  )
}
