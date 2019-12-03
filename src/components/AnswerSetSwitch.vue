<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="container" @click.stop="bubbleHack">
      <div class="header">
        <div class="h-text">当前应答语：</div>
        <div class="defult-item">
          <span class="play-btn" @click="handlePlay(selfCurYdy)">
            <img v-show="!selfCurYdy.play" src="../assets/h_play.png" alt="">
            <img v-show="selfCurYdy.play" src="../assets/icon-ydy_stop@2x.png" alt="">
          </span>
          <div class="text">
            <div class="n">{{selfCurYdy.title}}</div>
          </div>
          <span class="border-btn" @click="resetYdy">恢复默认</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="item in selfYdyList" :key="item.id" >
          <span class="play-btn" @click="handlePlay(item)">
            <img v-show="!item.play" src="../assets/h_play.png" alt="">
            <img v-show="item.play" src="../assets/icon-ydy_stop@2x.png" alt="">
          </span>
          <div class="text">
            <div class="n">{{item.title}}</div>
            <div class="s">{{item.abstr}}</div>
          </div>
          <span class="border-btn" @click="setYdy(item.voxfid)">更换</span>
        </div>
      </div>
      <div class="footer">
        <div class="btn close" @click="close">关闭</div>
        <div class="btn other" @click="other">换一批</div>
      </div>
    </div>
    <audio ref="audio" :src="audioSrc" @ended="handlePlayEnd"></audio>
  </div>
</template>

<script>
import {getUserType, getCallForwardStatus, setYdy, resetYdy } from "../api/index";

export default {
  props: {
		curYdy: Object,
		YdyList: Array
	},
  data() {
    return {
      audioPlay: false,
      visiable: false,
			audioSrc: "",
			userType: null
    };
  },
  created() {},
  mounted() {
    this.audio = this.$refs.audio;
  },
  methods: {
    close() {
      this.visiable = false;
    },
    show() {
      this.visiable = true;
    },
    handlePlay(item) {
      this.audioSrc = item.voxurl || this.curYdy.mp3url;
      if (!item.play) {
				this.initBtn()
			}
			if(item !== this.curYdy){
				this.curYdy.play=false;
			}
			item.play = !item.play;
			this.audioPlay = item.play;
			this.$emit('pause-other-play')
		},
		other() {
			this.$emit('change')
		},
		async setYdy(id) {
			const {usertype} = await getUserType({queryType:'getutype'});
			this.userType = usertype;
			// 设置应答流程为，查询用户类型，符合用户类型的，再查询转类型：cfbf、 cfnry、 cfnry 其中有值等于1 才去设置应答语，都没有等于1的 提示：请先开启语音信箱呼转
			// usertype 为4,9退订 3,8体验过期  5,10普通用户  这些用户设置不了应答语 提示 您尚未开通和留言业务  
			const notAllowList = ['4','9','3','8','5','10',]
			if(notAllowList.indexOf(this.userType) !== -1){ 
				this.$toast.fail('您尚未开通和留言业务')
			}else{
				const {cfbf, cfnrc, cfnry} = await getCallForwardStatus({queryType:'getcallforward',optWay:"25"});
				if([cfbf, cfnrc, cfnry].indexOf('1') === -1) {
					this.$toast.fail('请先开启语音信箱呼转')
				}else{
					// 设置应答语
					setYdy({fileId:id}).then(res=>{
						const {msg, result} = res;
						if(result==='true') { // 后端返回的result是字符串。。
							this.$emit('update');
						}else{
							this.$toast.fail(msg)
						}
					})
				}
			}
		},
		// 恢复默认应答语
		// 恢复默认应答语流程，先查询用户类型，符合用户类型，才去调恢复默认应答语接口， 恢复默认应答语接口，再查当前使用的应答语，这样才展示当前使用最新的应答语

		resetYdy() {
			const notAllowList = ['4','9','3','8','5','10',]
			if(notAllowList.indexOf(this.userType) !== -1){ 
				this.$toast.fail('您尚未开通和留言业务')
			}else{
				resetYdy({query:'restoreDefaultVox'}).then(res=>{
					const {msg, result} = res;
					if(result==='true') { // 后端返回的result是字符串。。
						this.$toast.success(msg)
						this.$emit('update');
					}else{
						this.$toast.fail(msg)
					}
				})
			}
		},
		handlePlayEnd() {
			this.curYdy.play=false;
			this.initBtn();
		},

		// 重置按钮
		initBtn() {
			this.selfYdyList.forEach(x => {
				x.play = false;
			});
		},
    bubbleHack() {
      return false;
    }
	},
	computed: {
		selfYdyList() {
			let arr = this.YdyList.map(item=>{
				this.$set(item,'play',false)
				return item;
			})
			return arr;
		},
		selfCurYdy() {
			this.$set(this.curYdy,'play',false)
			return 	this.curYdy;
		}
	},
  watch: {
    audioPlay(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.audio.play();
        });
      } else {
        this.audio.pause();
      }
    },
    audioSrc() {
      if(this.audioPlay) {
				this.$nextTick(() => {
					this.audio.play();
				});
			}
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

  .container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    text-align: left;
    .header {
      background-color: #f5f8fc;
      .h-text {
        padding: 0 23px;
        line-height: 80px;
        font-size: 28px;
        color: #999999;
      }
      .defult-item {
        display: flex;
        height: 80px;
        border-bottom: 1px solid #1f131414;
        padding: 6px 36px 0 36px;
        box-sizing: border-box;
        .text {
          flex: 1;
          color: #2888ff;
          line-height: 1.6;
          font-size: 30px;
        }
        .play-btn {
          width: 70px;
          height: 70px;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .border-btn {
          height: 50px;
          line-height: 50px;
          padding: 0 30px;
          border: 2px solid #2888ff;
          border-radius: 25px;
          font-size: 26px;
          color: #2888ff;
        }
      }
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        height: 130px;
        padding: 0 35px;
        border-bottom: 1px solid #1f131414;
        .text {
          flex: 1;
          .n {
            color: #333333;
            font-size: 30px;
            margin-bottom: 12px;
            font-weight: 500;
          }
          .s {
            font-size: 24px;
            color: #999999;
          }
        }
        .play-btn {
          width: 70px;
          height: 70px;
          margin-top: 18px;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .border-btn {
          height: 50px;
          line-height: 50px;
          padding: 0 30px;
          border: 2px solid #2888ff;
          border-radius: 25px;
          font-size: 26px;
          color: #2888ff;
        }
      }
    }
    .footer {
      display: flex;
      .btn {
        flex: 1;
        height: 96px;
        line-height: 96px;
        text-align: center;
      }
      .other {
        background-color: #2888ff;
        color: #fff;
      }
      .close {
        color: #2888ff;
      }
    }
  }
}
</style>