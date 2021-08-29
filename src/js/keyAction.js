import global from './global'
import constValue from './constValue'
import { monitorMovement } from './moveMonitor'
import { triggerMonitor } from './triggerMonitor'
let player = global.player
const WATER_HEIGHT = 450
const GROUND_HEIGHT = 417
const defaultDx = 10
const dx = 27
const upDy = 40
const downDy = (3 * upDy) / 2
const mid = 3
const climbDy = 5
const hashMap = new Map()
  .set(1, 1)
  .set(2, 2)
  .set(3, 3)
  .set(4, 8)
  .set(5, 0)
  .set(6, 4)
  .set(7, 7)
  .set(8, 6)
  .set(9, 5)
  .set(10, 9)
  .set(11, 11)
  .set(12, 12)
  .set(13, 13)

const shotDeg = global.shotDeg
const waterBanAction = [5, 7, 8, 9, 10]
export function actionExecution(kind) {
  triggerMonitor(global)
  if (kind !== 11) {
    //每500秒调用
    if (player.isClimbing) {
      if (kind !== 8) {
        player.y -= 25
        player.isClimbing = false
      } else {
        return
      }
    }
    if (!player.notInWater()) {
      if (waterBanAction.indexOf(kind) !== -1) {
        console.log('水中禁止动作')
        return
      }
    }

    player.nowDirectionIndex = kind
    player.timerStart(global, function(params) {
      let flag = false
      let notInWater = player.notInWater()
      switch (kind) {
        case 1:
          player.facingRight = false
          player.x -= defaultDx
          player.nowAction = constValue.arrays[hashMap.get(notInWater ? kind : 10 + kind)]
          break
        case 2:
          player.nowAction = player.splitArr(constValue.arrays[hashMap.get(notInWater ? kind : 10 + kind)])
          break
        case 3:
          player.facingRight = true
          player.x += defaultDx
          player.nowAction = constValue.arrays[hashMap.get(notInWater ? kind : 10 + kind)]

          break
        case 4:
          player.facingRight = false
          player.x -= defaultDx
          if (notInWater) {
            player.nowAction = constValue.arrays[hashMap.get(kind)]
          } else {
            player.setImgInWater()
          }
          break
        case 5:
          if (player.state === 0 && player.heightInMap !== WATER_HEIGHT && player.heightInMap !== GROUND_HEIGHT) {
            player.nowDirectionIndex = player.facingRight ? 6 : 4
            flag = true
            player.drop(global)
            player.nowAction = player.splitArr(constValue.arrays[hashMap.get(kind)])
          }
          break
        case 6:
          player.facingRight = true
          player.x += defaultDx
          if (notInWater) {
            player.nowAction = constValue.arrays[hashMap.get(kind)]
          } else {
            player.setImgInWater()
          }
          break
        case 7:
          if (notInWater) {
            player.facingRight = false
            player.x -= defaultDx
            player.nowAction = constValue.arrays[hashMap.get(kind)]
          }
          break
        case 8:
          if (notInWater) {
            player.isClimbing = true
            player.y += climbDy
            player.nowAction = player.splitArr(constValue.arrays[hashMap.get(kind)])
          }
          break
        case 9:
          if (notInWater) {
            player.facingRight = true
            player.x += defaultDx
            player.nowAction = constValue.arrays[hashMap.get(kind)]
          }
          break
        case 10:
          if (notInWater) {
            player.x += player.facingRight ? dx : -dx
            if (player.state < mid) {
              player.y -= upDy
            } else {
              player.y += downDy
            }
            player.nowAction = player.splitArr(constValue.arrays[hashMap.get(kind)])
          }
          break
      }
      flag = monitorMovement()
      return flag
    })
  } else {
    //每100秒调用射击
    let index = player.nowDirectionIndex
    if (
      player.nowDirectionIndex === 0 ||
      player.nowDirectionIndex === 5 ||
      player.nowDirectionIndex === 8 ||
      player.nowDirectionIndex === 10
    ) {
      index = player.facingRight ? 6 : 4
    }
    let deg = shotDeg.get(index)
    if (!player.hadDied) {
      player.shot(global, deg)
    }
  }
}
