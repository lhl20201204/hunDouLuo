const TIMER_INTERVAL = 100
const TIMER_NUMS = 5
export function playerMove(global, fn) {
  if (this.timer) {
    console.log('正在运行着')
    return
  }

  if (!global) {
    console.log('global不能为空')
    return
  }
  this.reSetState()
  this.timer = setInterval(
    function() {
      if (!fn()) {
        this.state++
        if (this.state === TIMER_NUMS) {
          this.clearTimer()
        }
      }
    }.bind(this),
    TIMER_INTERVAL
  )
}
