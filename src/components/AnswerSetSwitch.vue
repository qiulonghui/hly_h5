<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="container" @click.stop="bubbleHack">
      <div class="header">
        <div class="h-text">当前应答语：</div>
        <div class="defult-item">
          <span class="play-btn" @click="handlePlay(list[0])">
            <img v-show="!list[0].play" src="../assets/h_play.png" alt="">
            <img v-show="list[0].play" src="../assets/icon-ydy_stop@2x.png" alt="">
          </span>
          <div class="text">
            <div class="n">{{list[0].title}}</div>
          </div>
          <span class="border-btn">恢复默认</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
          <span class="play-btn" @click="handlePlay(item)">
            <img v-show="!item.play" src="../assets/h_play.png" alt="">
            <img v-show="item.play" src="../assets/icon-ydy_stop@2x.png" alt="">
          </span>
          <div class="text">
            <div class="n">{{item.title}}</div>
            <div class="s">{{item.text}}</div>
          </div>
          <span class="border-btn">更换</span>
        </div>
      </div>
      <div class="footer">
        <div class="btn close" @click="close">关闭</div>
        <div class="btn other">换一批</div>
      </div>
    </div>
    <audio ref="audio" :src="audioSrc" @ended="handlePlayEnd"></audio>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      audioPlay: false,
      visiable: false,
      audioSrc: "",
      list: [
        {
          id: 1,
          play: false,
          title: "爱你在心口难开1",
          text: "守护平安团圆，有我一路相伴",
          url: "/static/music1.mp3"
        },
        {
          id: 2,
          play: false,
          title: "爱你在心口难开2",
          text: "守护平安团圆，有我一路相伴",
          url:
            "http://old.haolingsheng.com/download/ring/000/083/94361f9da252817d600d076d3dc13baa.mp3"
        },
        {
          id: 3,
          play: false,
          title: "爱你在心口难开3",
          text: "守护平安团圆，有我一路相伴",
          url:
            "http://hao.haolingsheng.com/ring/000/995/f1b408f77bc8d27a6f5665c1be02df5d.mp3"
        },
        {
          id: 4,
          play: false,
          title: "爱你在心口难开4",
          text: "守护平安团圆，有我一路相伴",
          url:
            "http://hao.haolingsheng.com/ring/000/995/fdd1115ac2c3e1dc84ea878082741e1b.mp3"
        },
        {
          id: 5,
          play: false,
          title: "爱你在心口难开5",
          text: "守护平安团圆，有我一路相伴",
          url:
            "http://hao.haolingsheng.com/ring/000/995/53142bfe578261cc624b0247baea084a.mp3"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.audio = this.$refs.audio;
    console.log(this.audio)
  },
  methods: {
    close() {
      this.visiable = false;
    },
    show() {
      this.visiable = true;
    },
    handlePlay(item) {
      this.audioSrc = item.url;
      if (!item.play) {
        this.initBtn()
      }
      item.play = !item.play;
			this.audioPlay = item.play;
			this.$emit('pause-other-play')
		},
		handlePlayEnd() {
			this.initBtn();
		},
		initBtn() {
			this.list.map(x => {
				x.play = false;
			});
		},
    bubbleHack() {
      return false;
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
      this.$nextTick(() => {
        this.audio.play();
      });
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
  z-index: 9999;
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