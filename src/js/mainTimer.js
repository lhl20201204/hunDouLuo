import { triggerMonitor } from './triggerMonitor'
import { touchCheck } from './touchCheck'
let interval = 40
import global from './global'
export function mainTimer() {
  let timer = setInterval(function() {
    touchCheck(global)
  }, interval)
}
