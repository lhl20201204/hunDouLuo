const MAX_STATE = 4
const WATER_HEIGHT = 450
const TIMER_INTERVAL = 100
const TIMER_NUMS = 5
export function drop(global) {
  if (!global) {
    console.log('error:global不能为空')
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
  if (player.isDroping) {
    console.log('重复调用')
    return
  }
  player.clearTimer()
  player.isDroping = true
  let nextLevel = map.findNextLevel(map.tranX + player.x, player.y, map.map)
  let d = (nextLevel - player.y) / (MAX_STATE + 1)
  let cnt = 0
  player.timer = setInterval(function() {
    player.y += d
    player.state = cnt++
    if (cnt === TIMER_NUMS) {
      player.clearTimer()
      player.y = map.afterDropUpdateY(map.tranX + player.x, player.y, map.map)
      player.updateHeightInMap()
      if (!player.hadDied && !player.notInWater()) {
        player.setImgInWater()
      }
      player.isDroping = false
      if (player.y > WATER_HEIGHT) {
        player.y = WATER_HEIGHT
        player.died(map)
      }
    }
  }, TIMER_INTERVAL)
}
