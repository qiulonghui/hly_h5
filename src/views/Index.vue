<template>
  <div class="page">
    <div class="header">
      <span @click="controlPlayYdy">
        <img v-show="!ydyPlay" class="control-btn" src="../assets/h_play.png" alt="">
        <img v-show="ydyPlay" class="control-btn" src="../assets/icon-ydy_stop@2x.png" alt="">
      </span>
      <div class="l-title">
        <span class="label">当前应答语：</span>
        <span class="txt">爱你在心里口难开</span>
      </div>
      <span class="change-btn" @click="showActionAnswerSet">更换</span>
    </div>
    <div class="main">
      <div class="user-info" @click="showDialog">王大锤（122321321321）</div>
      <div class="info-time">2019/3/18 16:29 语音留言</div>
      <div class="cd-wrap">
        <img ref="cd" id="cd" class="cd" src="../assets/hejiao.png" alt="">
        <img class="pointer" src="../assets/icon-zhizhen.png" alt="">
      </div>
      <player :ly-play="lyPlay" :dur="lyDur" :cur-time="lyCurTime" @control-play="controlPlayLy"></player>
      <div class="text-container">
        语音转文字：你好，打扰了，请在收到留言后请尽快给我回电，我们一起讨论下周头脑风景会议主题的一些细节，还有人员签到的问题。我先把初稿发到了你的邮箱，请留意查收。
      </div>
      <div class="set-btn" @click="showActionCallSet"><img src="../assets/huzhuan .png" alt=""></div>
      <div class="row">↑向上滑动查看更多内容</div>
      <div class="tip">
        <div class="tip-title">
          <span class="txt">温馨提示</span>
        </div>
        <ul class="content">
          <li>通话过程中拨打电话时没有和留言提示音？也没有设置呼叫转移？请发短信指令“KHZ”到10658112设置；</li>
        </ul>
      </div>
      <audio ref="audio1" src="/static/music1.mp3" @ended="controlPlayYdy"></audio>
      <audio ref="audio2" src="/static/music2.m4a" @ended="controlPlayLy" @timeupdate="playTimeUpdate"></audio>
    </div>
    <m-dialog ref="mDialog" :dialogObj="dialogObj" @confirm='callTel'></m-dialog>
    <answer-set-switch ref="AnswerSetSwitch" @pause-other-play="currentPlayEnd"></answer-set-switch>
    <call-forward-set ref="CallForwardSet"></call-forward-set>
  </div>
</template>

<script>
import Player from "../components/Player";
import {getUserInfo, init} from "../api/index";
export default {
  name: "index",
  components: {
    Player,
    MDialog: () => import("../components/common/MDialog"),
    AnswerSetSwitch: () => import("../components/AnswerSetSwitch"),
    CallForwardSet: () => import("../components/CallForwardSet")
  },
  props: {},
  data() {
    return {
      ydyPlay: false, // 应答播放状态
      lyPlay: false, // 留言播放状态
      lyDur: null, // 留言音频时长
      lyCurTime: null, // 留言当前播放位置
      dialogObj: {
        content: "12321321",
        confirmBtnTxt: "回拨"
      }
    };
  },
  created() {
		init({queryType: 'authent',userId: '15915089824'})
		getUserInfo({queryType:'targetmsg'})
	},
  mounted() {
    this.audio1 = this.$refs.audio1; // 应答语audio
    this.audio2 = this.$refs.audio2; // 留言audio
  },
  methods: {
    // handleAudioLoaded() {
    //   // 留言音频加载完毕
    //   this.lyDur = this.audio2.duration;
    //   this.lyCurTime = this.audio2.currentTime;
    //   alert(this.lyDur)
    // },
    playTimeUpdate() {
      // 留言播放中
      this.lyDur = this.audio2.duration;
      this.lyCurTime = this.audio2.currentTime;
    },
    // 播放当前应答语
    controlPlayYdy() {
			this.lyPlay = false;
			this.$refs.AnswerSetSwitch.initBtn();
			this.$refs.AnswerSetSwitch.audioPlay = false;
      this.ydyPlay = !this.ydyPlay;
    },

    // 更换其他应答语播放
    currentPlayEnd() {
      this.lyPlay = false;
      this.ydyPlay = false;
    },

    // 播放留言
    controlPlayLy() {
			this.ydyPlay = false;
			this.$refs.AnswerSetSwitch.initBtn();
			this.$refs.AnswerSetSwitch.audioPlay = false;
      this.lyPlay = !this.lyPlay;
    },

    showDialog() {
      this.$refs["mDialog"].show();
    },
    callTel() {
      var a = document.createElement("a");
      a.setAttribute("href", "tel:12121212");
      a.click();
    },
    showActionAnswerSet() {
      this.$refs["AnswerSetSwitch"].show();
    },
    showActionCallSet() {
      this.$refs["CallForwardSet"].show();
    }
  },
  watch: {
    ydyPlay(newVal) {
      if (newVal) {
        this.audio1.play();
      } else {
        this.audio1.pause();
      }
    },
    lyPlay(newVal) {
      const cdDom = this.$refs.cd;
      if (newVal) {
        this.audio2.play();
        cdDom.style.animationPlayState = "running";
      } else {
        this.audio2.pause();
        cdDom.style.animationPlayState = "paused";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  min-height: 100%;
  text-align: center;
  background-color: #f3f8fe;
  padding-bottom: 28px;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    height: 108px;
    padding: 0 28px;
    box-shadow: 0px 1px 1px 0px rgba(172, 183, 192, 0.5);
    background-color: #fff;
    .control-btn {
      width: 70px;
      height: 70px;
      margin-top: 22px;
      margin-right: 8px;
    }
    .l-title {
      flex: 1;
      font-size: 30px;
      font-weight: 500;
      color: rgba(51, 54, 59, 1);
      line-height: 36px;
      text-align: left;
      .label {
        color: #abacac;
      }
    }
    .change-btn {
      width: 120px;
      height: 48px;
      background: rgba(40, 136, 255, 0);
      border: 2px solid rgba(40, 136, 255, 1);
      border-radius: 24px;
      color: rgba(40, 136, 255, 1);
      line-height: 48px;
      font-size: 28px;
    }
  }

  .main {
    padding-top: 36px;
    .user-info {
      font-size: 34px;
      font-weight: bold;
      color: #323235;
      margin-bottom: 18px;
    }
    .info-time {
      font-size: 26px;
      color: #323235;
      margin-bottom: 44px;
    }
    .cd-wrap {
      position: relative;
      width: 455px;
      height: 455px;
      margin: 0 auto;
      .cd {
        width: 100%;
        height: 100%;
      }
      .pointer {
        position: absolute;
        right: -30px;
        width: 145px;
        height: 254px;
      }
    }
  }

  .text-container {
    width: 629px;
    margin: 0 auto;
    font-size: 30px;
    font-weight: 500;
    color: rgba(32, 32, 33, 1);
    line-height: 48px;
    margin-top: 26px;
  }
  .set-btn {
    width: 320px;
    height: 95px;
    margin: 0 auto;
    margin-top: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .row {
    text-align: center;
    color: #999999;
    font-size: 13px;
    margin-top: 25px;
    margin-bottom: 58px;
  }
  .tip {
    width: 702px;
    margin: 0 auto;
    box-shadow: 0px 8px 10px 0px rgba(180, 188, 194, 0.2);
    border-radius: 8px;
    padding: 40px 30px;
    box-sizing: border-box;
    background-color: #fff;
    .tip-title {
      position: relative;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 36px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        background-color: #a6aab3;
      }
      .txt {
        position: relative;
        z-index: 2;
        background-color: #fff;
        padding: 0 20px;
      }
    }
    .content {
      text-align: left;
      color: #494d55;
    }
  }
}

#cd {
  animation: cdRotate 10s linear infinite;
  animation-play-state: paused;
}
@keyframes cdRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
