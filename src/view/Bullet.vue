<template>
  <div>
    <div
      v-for="item of bullets"
      class="bulletParent"
      :style="
        'transform: rotate(' +
          item.deg +
          'deg);left: ' +
          item.x +
          'px;top:' +
          item.y +
          'px;width:' +
          item.width +
          'px;height:' +
          item.height +
          'px'
      "
      :key="item.id"
    >
      <img
        :src="item.res"
        class="bullet"
        :style="'transform: translate(-' + item.tranX + 'px,-' + item.tranY + 'px);'"
      />
    </div>
  </div>
</template>

<script>
import global from '../js/global'
export default {
  name: 'PlayerBullet',
  data() {
    return {
      bullets: global.playerBullets
    }
  }
}
</script>

<style scoped>
.bulletParent {
  position: absolute;
  overflow: hidden;
  transform-origin: 0 50% 0;
}

.bullet {
  position: absolute;
}
</style>
