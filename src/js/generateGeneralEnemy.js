import { Enemy } from './enemyObject'
export function createEnemy(global, x, fn, id) {
  if (!global) {
    console.log('error:global不能为空')
    return
  }
  let enemyMap = global.enemyMap
  if (!enemyMap) {
    console.log('error：传进来的enemyMap不能为空')
    return
  }

  if (enemyMap.get(x) && enemyMap.get(x).timer) {
    return
  }
  let player = global.player
  let map = global.map

  if (!player) {
    console.log('error：传进来的对象不能为空')
    return
  }
  if (!map) {
    console.log('error：传进来的map不能为空')
    return
  }

  if (!enemyMap.has(x)) {
    let enemy = new Enemy(id)
    //console.log('创建新的敌人', enemy.id)
    enemy.serialNumber = x
    enemyMap.set(x, enemy)
  }

  let enemy = enemyMap.get(x)
  enemy.resetAttribute()
  enemy.originX = enemy.x
  enemy.x -= map.tranX

  if (enemy.x < player.x && !enemy.facingRight) {
    enemy.changeDirection()
  }
  if (enemy.x > 0) {
    global.enemyList.push(enemy)
    enemy.timerStart(enemy)
  }

  fn(enemy)
}
