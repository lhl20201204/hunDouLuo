import { Player } from './player'
import map from './map'
import constValue from './constValue'
import { triggerMonitor } from './triggerMonitor'
let deleteEnemyById = function(id) {
  if (global.enemyList.length === 0) {
    console.log('删除失败')
    return
  }
  for (let i = 0; i < global.enemyList.length; i++) {
    if (global.enemyList[i].id === id) {
      global.enemyList.splice(i, 1)
      break
    }
  }
}

let deleteBulletById = function(id) {
  if (global.playerBullets.length === 0) {
    console.log('删除失败')
    return
  }
  for (let i = 0; i < global.playerBullets.length; i++) {
    if (global.playerBullets[i].id === id) {
      global.playerBullets.splice(i, 1)
      break
    }
  }
}
let player = new Player(80, 200)

const shotDeg = new Map()
  .set(1, 225)
  .set(2, 270)
  .set(3, 315)
  .set(4, 180)
  .set(6, 0)
  .set(7, 135)
  .set(9, 45)
let global = {
  reset: true,
  uniqueId: 0,
  map: map,
  player: player,
  playerBullets: [],
  enemyList: [],
  enemyMap: new Map(),
  deleteEnemyById: deleteEnemyById,
  deleteBulletById: deleteBulletById,
  shotDeg: shotDeg,
  bossIsDied: false,
  resetGame: function() {
    //todo constValue.copy 重写
    this.reset = true
    this.enemyMap.clear()
    while (this.playerBullets.length) {
      //这里不能直接 =【】,不然vue不会响应式删除已渲染的
      this.playerBullets.pop().clearTimer()
    }

    this.bossIsDied = 0
    while (this.enemyList.length) {
      //这里不能直接 =【】,不然vue不会响应式删除已渲染的
      this.enemyList.pop().clearTimer()
    }
    this.map.tranX = 0
    this.player.x = 80
    this.player.y = 200
    this.player.bulletKind = 1
    this.player.deg = 0
    this.player.facingRight = true
    this.player.heightInMap = 200
    this.player.isClimbing = false
    this.player.isDroping = false
    this.player.life = 3
    this.player.clearTimer()
    constValue.total = JSON.parse(JSON.stringify(constValue.copy))
    this.map.map = this.map.addBridge(constValue.map)
    constValue.map = this.map.map
    triggerMonitor(global)
  }
}
export default global
