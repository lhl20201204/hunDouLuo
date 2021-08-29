const MID_VIEW_LEN = 500
const SCENE_LEN = 7400
const VIEW_LEN = 1000
export function mapMove(global) {
  if (!global) {
    //console.log('error:global不能为空')
    return
  }
  let player = global.player
  let map = global.map
  if (!map) {
    console.log('error：传进来的map不能为空')
    return
  }
  if (!player) {
    console.log('error：传进来的player不能为空')
    return
  }

  if (player.x > MID_VIEW_LEN && map.tranX < SCENE_LEN - VIEW_LEN) {
    let t = Math.ceil((player.x - MID_VIEW_LEN) / 2)
    map.tranX += t
    player.x -= t
    for (let i = 0; i < global.playerBullets.length; i++) {
      if (global.playerBullets[i]) {
        global.playerBullets[i].x -= t
      }
    }

    for (let i = 0; i < global.enemyList.length; i++) {
      if (global.enemyList[i]) {
        global.enemyList[i].x -= t
        if (global.enemyList[i].x < -global.enemyList[i].getWidth()) {
          clearInterval(global.enemyList[i].timer)
          global.enemyList[i].timer = null
          global.enemyList.splice(i, 1)
        }
      }
    }
  }
}
