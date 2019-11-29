<template>
  <div v-if="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="dialog" @click.stop="bubbleHack">
      <div class="content">{{dialogObj.content}}</div>
      <div class="footer">
        <div class="btn cancel-btn" @click="close">取消</div>
        <div class="btn confirm" @click="handleConfirmEvent">{{dialogObj.confirmBtnTxt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogObj: {
      type: Object,
      default: function() {
        return {
          content: "hello",
          confirmBtnTxt: "确定"
        };
      }
    }
  },
  data() {
    return {
			visiable: false
		};
  },
  methods: {
		close(){
			this.visiable = false;
		},
		show() {
			this.visiable = true;
		},
		bubbleHack() {
			return false
		},
		handleConfirmEvent() {
			this.$emit('confirm');
			this.close();
		}
	},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.mask {
	position:fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: rgba($color: #000000, $alpha: 0.5);
	.dialog{
		width: 600px;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius:12px;
		.content{
			padding: 85px 80px;
			text-align: center;
			color: #060001;
			font-size:34px;
			font-weight:500;
		}
		.footer{
			display: flex;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			.btn{
				flex: 1;
				height: 96px;
				line-height: 96px;
				font-size: 32px;
			}
			.cancel-btn{
				border-right: 1px solid rgba(0, 0, 0, 0.1);
				color: #3E90FF;
			}
			.confirm{
				color: #0EBF38;
			}
		}
	}
}
</style>