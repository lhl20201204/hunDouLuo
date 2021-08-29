<template>
    <div class="player" ref="pla"  :style="getStyle2">
    <img src="../assets/img/sucai/player.png" ref="people"  :style="getStyle1" >
    </div>
</template>

<script>
    import global from '../js/global'
    export default {
        name: "Player",
        data(){
             return{
                 player:global.player
             }
        },
        created() {

        },
        computed:{
            getStyle1(){
           return ' transform: translate(-'+this.player.nowAction[4*this.player.state]+'px,-'+this.player.nowAction[4*this.player.state+1]+'px);'
            },
            getStyle2(){
                return 'left: '+this.player.x+'px;top:'+this.player.y+'px;width:'+this.player.nowAction[4*this.player.state+2]+'px;height:'+this.player.nowAction[4*this.player.state+3]+'px'
            }
        }
    }
</script>

<style scoped>
    .player{
        position: absolute;
        overflow: hidden;
        transform: scale(1.2);
    }

</style>