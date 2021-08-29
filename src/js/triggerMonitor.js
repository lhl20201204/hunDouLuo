import { createEnemy } from './generateGeneralEnemy'
import constValue from './constValue'
let delay = 500
let copy = [0]
export function triggerMonitor(global) {
  if (!global) {
    console.log('error:global不能为空')
    return
  }
  let player = global.player
  let map = global.map
  let enemyMap = global.enemyMap
  if (!player) {
    console.log('error：传进来的对象不能为空')
    return
  }
  if (!map) {
    console.log('error：传进来的map不能为空')
    return
  }
  if (!enemyMap) {
    console.log('error：传进来的enemyMap不能为空')
    return
  }

  let totalX = player.x + map.tranX

  for (let x of constValue.total) {
    if (totalX > x[0]) {
      if (!enemyMap.has(x[0] * 1000)) {
        let id = 0
        createEnemy(global, x[0] * 1000, function(enemy) {
          id = enemy.dataId
          if (copy.indexOf(enemy.kind) != -1) {
            for (let i = 1; i <= 3; i++) {
              if (!enemyMap.has(x[0] * 1000 + i) && Math.random() > 0.5) {
                let timeOut = setTimeout(function() {
                  clearTimeout(timeOut)
                  createEnemy(global, x[0] * 1000 + i, function(enemy) {}, id)
                }, i * delay)
              }
            }
          }
        })
      }
    }
    if (x[0] < map.tranX) {
      x[0] = Number.MAX_VALUE
    }
  }
}
