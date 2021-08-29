function findNextLevel(nowX, nowY, map) {
  nowX = Math.floor(nowX)
  nowY = Math.floor(nowY)
  for (let i = 0; i < map[nowX].length; i++) {
    if (map[nowX][i] > nowY) {
      return map[nowX][i]
    }
  }
  return 600
}

function afterDropUpdateY(nowX, nowY, map) {
  nowX = Math.floor(nowX)
  nowY = Math.floor(nowY)
  for (let i = map[nowX].length - 1; i >= 0; i--) {
    if (map[nowX][i] > nowY - 8 && map[nowX][i] < nowY + 8) {
      return map[nowX][i]
    }
  }
  return nowY
}

function addBridge(map) {
  for (let i = 1648; i < 1936; i++) {
    map[i].unshift(200)
    map[i].sort(function(a, b) {
      return a - b
    })
  }

  for (let i = 2291; i < 2579; i++) {
    map[i].unshift(200)
    map[i].sort(function(a, b) {
      return a - b
    })
  }
  return map
}
function findHigherLevel(nowX, ground, map) {
  nowX = Math.floor(nowX)
  let j = nowX
  if (map[j]) {
    for (let i = map[j].length - 1; i >= 0; i--) {
      if (map[j] && map[j][i] < ground) {
        return map[j][i]
      }
    }
  }

  return 0
}
const WATER_HEIGHT = 450
function findNewSafeXY(start, map) {
  start = Math.floor(start)
  let random = Math.floor(50 + 80 * Math.random())
  for (let i = start + random; i < start + 1000; i++) {
    if (map[i]) {
      for (let x of map[i]) {
        if (x > 0 && x < WATER_HEIGHT) {
          return [i, x]
        }
      }
    }
  }
  return [0, 0]
}

import constValue from './constValue'
let map = {
  tranX: 0,
  res: require('../assets/img/sucai/background.png'),
  map: constValue.map,
  findNextLevel: findNextLevel,
  afterDropUpdateY: afterDropUpdateY,
  findHigherLevel: findHigherLevel,
  findNewSafeXY: findNewSafeXY,
  addBridge: addBridge
}

export default map
