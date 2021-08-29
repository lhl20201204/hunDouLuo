import global from './global'
export function monitorKeyboardOperation(fn) {
  let TIME = {
    interval: 500,
    shotInterval: 100,
    shotTime: 0,
    time: 0
  }
  const BULLET_KIND_LEN = 6
  document.onkeydown = function(event) {
    let e = event || window.event
    if (e.code.toString() === 'Enter') {
      //换子弹
      global.player.bulletKind++
      if (global.player.bulletKind === BULLET_KIND_LEN) {
        global.player.bulletKind = 0
      }
    }
    if (global.player.hadDied) {
      console.log('player已死')
      return
    }

    let cur = new Date()
    if (cur - TIME.shotTime > TIME.shotInterval) {
      TIME.shotTime = cur
      if (e.shiftKey) {
        fn(11)
      }
    }

    if (global.player.isDroping) {
      console.log('player正在掉着')
      return
    }

    if (cur - TIME.time > TIME.interval) {
      TIME.time = cur
      if (e.code.toString() === 'KeyQ') {
        fn(1)
      } else if (e.code.toString() === 'KeyW') {
        fn(2)
      } else if (e.code.toString() === 'KeyE') {
        fn(3)
      } else if (e.code.toString() === 'KeyA') {
        fn(4)
      } else if (e.code.toString() === 'KeyS') {
        fn(5)
      } else if (e.code.toString() === 'KeyD') {
        fn(6)
      } else if (e.code.toString() === 'KeyZ') {
        fn(7)
      } else if (e.code.toString() === 'KeyX') {
        fn(8)
      } else if (e.code.toString() === 'KeyC') {
        fn(9)
      } else if (e.code.toString() === 'Space') {
        fn(10)
      }
    }
  }
}
