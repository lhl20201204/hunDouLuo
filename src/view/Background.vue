<template>
  <div class="background">
    <img :src="getRes" :style="'transform: translateX(-' + getTranX + 'px)'" />
    <Player></Player>
    <Bullet></Bullet>
    <Enemy></Enemy>
  </div>
</template>

<script>
import global from '../js/global'
import { monitorKeyboardOperation } from '../js/communicate'
import { actionExecution } from '../js/keyAction'
import { mainTimer } from '../js/mainTimer'
import { triggerMonitor } from '../js/triggerMonitor'
import Player from './Player'
import Bullet from './Bullet'
import Enemy from './Enemy'
export default {
  name: 'Background',
  data() {
    return {
      map: global.map
    }
  },
  components: {
    Enemy,
    Player,
    Bullet
  },
  computed: {
    getRes() {
      return this.map.res
    },
    getTranX() {
      return this.map.tranX
    }
  },
  created() {
    //整个程序监听入口
    triggerMonitor(global)
    monitorKeyboardOperation(actionExecution)
    mainTimer()
  }
}
</script>

<style scoped>
.background {
  position: absolute;
  height: 500px;
  width: 1000px;
  overflow: hidden;
}
.background img {
  height: 100%;
}
</style>
