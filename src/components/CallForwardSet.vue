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
          <span class="set-btn" @click="setStatus(item)">
            <img v-show="item.actived==='0'" src="../assets/huzhuan_btn_close.png" alt="">
						<img v-show="item.actived==='1'" src="../assets/huzhuan_btn_open.png" alt="">
          </span>
        </div>
      </div>
      <div class="tip">
        提示：呼转状态以手机端的为准，当呼转状态与实际不一致或设置延时时，可前往手机端，手动设置呼转状态
      </div>
      <div class="close-btn" @click="close">关闭</div>
    </div>
  </div>
</template>

<script>
import icon1 from '../assets/ic_huzhuan1.png';
import icon2 from '../assets/ic_huzhuan2.png';
import icon3 from '../assets/ic_huzhuan3.png';
import {getCallForwardStatus, setCallForwardStatus} from '@/api/index.js'

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
					actived: '',
					typeID: 4
				},
				{
					icon:icon2,
					title:'占线',
					text:'手机占线、主动挂机时转至语音信箱',
					actived: '',
					typeID: 2
				},
				{
					icon:icon3,
					title:'无人接听',
					text:'无人接听时转至语音信箱',
					actived: '',
					typeID: 5
				}
			]
    };
  },
  created() {
		getCallForwardStatus({queryType:'getcallforward',optWay:"25"}).then(res=>{
			// 返回结果中 1表示开启 0表示关闭
			this.list[0].actived = res.cfnrc;
			this.list[1].actived = res.cfbf;
			this.list[2].actived = res.cfnry;
		})
  },
  mounted() {},
  methods: {
		setStatus(item) {
			setCallForwardStatus({
				queryType: 'setcallforward',
				cfType: item.typeID,
				callState: item.actived==='1' ? '0' : '1'
			}).then(res=>{
				const {msg, result} = res;
				if(result==='true') { // 后端返回的result是字符串。。
					item.actived = item.actived==='1' ? '0' : '1';
					this.$toast.success(msg)
					this.$emit('update');
				}else{
					this.$toast.fail(msg)
				}
			})
		},
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
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .callforward-set {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
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