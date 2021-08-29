<template>
  <div id="app">
    <background></background>
    <div style="position:absolute;top:510px;">{{ mapx.tranX + player.x }}</div>
    <div style="position:absolute;top:530px;">{{ player.y }}</div>
    <button style="position:absolute;top:550px;" @click="alertMsg">游戏说明</button>
  </div>
</template>

<script>
import Background from './view/Background'
import global from './js/global'
export default {
  name: 'App',
  components: {
    Background
  },
  data() {
    return {
      mapx: global.map,
      player: global.player
    }
  },
  methods: {
    alertMsg() {
      alert(
        '可按键，q（左上）  w（上）  e（右上）  a(左)   s(下落)  d（右）  z （左下） x（趴下）  c（右上）  shift(射击)  space（跳） enter （切换子弹） 先按shift再按方向键可边动边射击，通关条件，在终点将俩个喷射散弹的装置破坏掉 '
      )
    }
  }
}
</script>

<style></style>
