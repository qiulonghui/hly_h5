<template>
  <div class="player-container">
    <span class="p-btn"  @click="handleBtnClick">
      <img v-show="lyPlay" src="../assets/stop.png" alt="">
			<img v-show="!lyPlay" src="../assets/play@2x.png" alt="">
    </span>
    <div class="progress-wrap">
      <div class="inline-bar" :style="{width:percent+'%'}"></div>
    </div>
    <span class="time">{{Math.round(dur)}}”</span>
  </div>
</template>

<script>
export default {
  props: {
		lyPlay: {
			type:Boolean,
			required: true
		},
		dur: {
			required: true
		},
		curTime: {
			required: true
		},
	},
  data() {
    return {};
	},
	created() {
	},
  mounted() {
	},
  methods: {
		handleBtnClick() {
			this.$emit('control-play')
		}
	},
	computed:{
		percent() {
			return Math.round((this.curTime/Number(this.dur))*100)
		}
	}
};
</script>
<style lang="scss" scoped>
.player-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  .p-btn {
    width: 58px;
    height: 58px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .progress-wrap {
    width: 320px;
    height: 8px;
    background-color: #d5dbdf;
    border-radius: 1px;
    margin: 0 20px;
    overflow: hidden;
    .inline-bar {
      width: 0;
      height: 8px;
      background-color: #2888ff;
    }
  }
}
</style>