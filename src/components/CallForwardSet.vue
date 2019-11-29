<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="callforward-set" @click.stop="bubbleHack">
      <div class="header">呼叫转移设置</div>
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
          <img class="icon" :src="item.icon" alt="">
          <div class="disc">
            <div class="m-txt">{{item.title}}</div>
            <div class="s-txt">{{item.text}}</div>
          </div>
          <span class="set-btn">
            <img v-show="!item.actived" src="../assets/huzhuan_btn_close.png" alt="">
						<img v-show="item.actived" src="../assets/huzhuan_btn_open.png" alt="">
          </span>
        </div>
      </div>
      <div class="tip">
        提示：呼转状态以手机端的为准，若呼转状态与实际不一致或设置延时，可查看温馨提示短信指令回复
      </div>
      <div class="close-btn" @click="close">关闭</div>
    </div>
  </div>
</template>

<script>
import icon1 from '../assets/ic_huzhuan1.png';
import icon2 from '../assets/ic_huzhuan2.png';
import icon3 from '../assets/ic_huzhuan3.png';
export default {
  props: {},
  data() {
    return {
			visiable: false,
			list: [
				{
					icon:icon1,
					title:'无法接通',
					text:'关机、无信号时转至语音信箱',
					actived: false,
					func: ''
				},
				{
					icon:icon2,
					title:'无法接通',
					text:'关机、无信号时转至语音信箱',
					actived: false,
					func: ''
				},
				{
					icon:icon3,
					title:'无法接通',
					text:'关机、无信号时转至语音信箱',
					actived: false,
					func: ''
				}
			]
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    close() {
      this.visiable = false;
    },
    show() {
      this.visiable = true;
    },
    bubbleHack() {
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .callforward-set {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    background-color: #fff;
    .header {
      height: 88px;
      background-color: #f5f8fc;
      line-height: 88px;
      border-bottom: 1px solid #dddddd;
      padding-left: 24px;
      text-align: left;
    }
    .list {
      color: #333333;
      text-align: left;
      .item {
        display: flex;
        align-items: center;
        height: 136px;
        border-bottom: 1px solid #dddddd;
        padding: 0 37px;
        .icon {
          width: 70px;
          height: 70px;
          margin-right: 20px;
        }
        .disc {
          flex: 1;
          .m-txt {
            margin-bottom: 10px;
            font-size: 32px;
          }
          .s-txt {
            color: #999999;
            font-size: 24px;
          }
        }
        .set-btn {
          width: 100px;
          height: 57px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .tip {
      height: 118px;
      padding: 23px 38px 0 38px;
      font-size: 26px;
      color: #999999;
      line-height: 40px;
      text-align: left;
    }
    .close-btn {
      width: 750px;
      height: 96px;
      box-shadow: 0px -5px 30px 0px rgba(0, 0, 0, 0.1);
      font-size: 32px;
      color: #2888ff;
      line-height: 96px;
    }
  }
}
</style>