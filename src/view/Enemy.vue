<template>
  <div>
    <div
      v-for="item of enemyList"
      class="enemyParent"
      :style="
        'transform: rotate(' +
          item.deg +
          'deg) scale(' +
          item.scale +
          ');left: ' +
          item.x +
          'px;top:' +
          item.y +
          'px;width:' +
          item.nowAction[4 * item.state] +
          'px;height:' +
          item.nowAction[4 * item.state + 1] +
          'px;'
      "
      :key="item.id"
    >
      <img
        :src="item.res"
        class="enemy"
        :style="
          'transform: translate(-' +
            item.nowAction[4 * item.state + 2] +
            'px,-' +
            item.nowAction[4 * item.state + 3] +
            'px);'
        "
      />
    </div>
  </div>
</template>

<script>
import global from '../js/global'
export default {
  name: 'Enemy',
  data() {
    return {
      enemyList: global.enemyList
    }
  }
}
</script>

<style scoped>
.enemyParent {
  position: absolute;
  overflow: hidden;
  transform-origin: 0 50% 0;
}

.enemy {
  position: absolute;
}
</style>
