import global from './global'
import { mapMove } from './mapMove'
import constValue from './constValue'
let player = global.player
let map = global.map
const MAX_STATE = 4
const GROUND_HEIGHT = 417
const jumpKind = 10
const right = 4
const left = 8
const tempLength = 7154
const mapLength = 7400
export function monitorMovement() {
  if (!global) {
    console.log('error:global不能为空')
    return
  }

  if (player.x < 0) {
    player.x = 0
  }

  if (global.bossIsDied < 2 && player.x >= tempLength - map.tranX) {
    player.x = tempLength - 1 - map.tranX
  } else if (global.bossIsDied >= 2 && player.x >= mapLength - map.tranX) {
    player.x = mapLength - 1 - map.tranX
    global.resetGame()
    return true
  }

  if (player.nowDirectionIndex === jumpKind) {
    if (player.monitorJump(global)) {
      //如果上岸
      return true
    }
  }

  let width = player.nowAction[player.state * 4 + 2]
  if (
    !player.isDroping &&
    ((player.nowDirectionIndex === jumpKind && player.state === MAX_STATE) || player.nowDirectionIndex !== jumpKind) &&
    map.map[map.tranX + player.x].indexOf(player.heightInMap) === -1 &&
    map.map[map.tranX + player.x + width].indexOf(player.heightInMap) === -1
  ) {
    //脚下为空
    if (!player.hadDied && player.y === player.heightInMap) {
      player.drop(global)
      return true
    }
  }

  if (
    !player.notInWater() &&
    map.map[map.tranX + player.x + (player.facingRight ? player.getWidth() : 0)].indexOf(GROUND_HEIGHT) !== -1
  ) {
    //水中上岸
    player.clearTimer()
    player.y = GROUND_HEIGHT
    player.reSetState()
    player.updateHeightInMap()
    player.nowDirectionIndex = player.facingRight ? 6 : 4
    player.nowAction = player.facingRight ? constValue.arrays[right] : constValue.arrays[left]
    return true
  }

  mapMove(global)
  return false
}
