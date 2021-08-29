import constValue from './constValue'
const dx = 24
const upDy = 40
const downDy = (3 * upDy) / 2
const mid = 3
const right = 4
const left = 8
export function monitorJump(global) {
  if (!global) {
    console.log('error:global不能为空')
    return
  }
  let player = global.player
  let map = global.map
  if (!player) {
    console.log('error：传进来的对象不能为空')
    return false
  }
  if (!map) {
    console.log('error：传进来的map不能为空')
    return false
  }

  let width = player.getWidth()

  for (let i = 0; i < dx; i++) {
    let heightLevel = map.findHigherLevel(
      map.tranX + player.x + (player.facingRight ? -i : width + i),
      player.heightInMap,
      map.map
    )
    let curY
    if (player.state < mid) {
      curY = player.y + i * (upDy / dx)
    } else {
      curY = player.y - i * (downDy / dx)
    }
    if (curY <= heightLevel) {
      player.clearTimer()
      player.y = heightLevel
      player.x = player.x + (player.facingRight ? -i : width + i)
      player.updateHeightInMap()
      player.nowDirectionIndex = player.facingRight ? 6 : 4
      player.nowAction = player.facingRight ? constValue.arrays[right] : constValue.arrays[left]
      return true
    }
  }
  return false
}
