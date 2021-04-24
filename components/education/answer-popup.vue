<template>
  <div class="popup-box flex-ccc" v-if="show_popup">
    <div class="is-orrect-1" v-if="is_orrect === 1">
      <div class="answer-bg-wrap">
        <img class="answer-bg" src="/static/images/education/xunzhang-2.png" />
      </div>
      <div class="answer-content-bottom flex-bc">
        <div class="item flex-ccc" @click="$nav('mall')">
          <span>勋章抵</span>
          <span>现金购物</span>
        </div>

        <div class="item flex-ccc" @click="$nav('archives')">
          <span>获取</span>
          <span>更多勋章</span>
        </div>

        <div class="item flex-ccc" @click="onReplay">
          <span>重看视频</span>
        </div>
      </div>
    </div>

    <div class="answer-content" v-else>
      <div class="answer-content-wrap">
        <div class="popup-title">答题赢勋章</div>
        <div class="popup-desc">勋章兑换福利</div>
        <div class="answer-title">{{title}}</div>
        <div
          class="option-item flex-c"
          v-for="(item, index) in option"
          :key="index"
          @click="SelectOption(index)"
        >
          <template v-if="is_orrect > 0">
            <img
              src="/static/images/education/round_check_fill.png"
              class="choose-img"
              v-if="item.answer"
            />
            <img
              src="/static/images/education/round_close_fill.png"
              class="choose-img"
              v-if="item.select && !item.answer"
            />
          </template>

          <div class="option-item-box">
            <div
              class="option-label"
              :class="{
              'select': item.select
            }"
            >{{item.option}}</div>
            <div class="option-value">{{item.value}}</div>
          </div>
        </div>
      </div>
      <div class="btn" @click="Confirm">确认</div>

      <!-- <div class="answer-content-wrap">
        <div class="popup-title">答题赢勋章</div>
        <div class="popup-desc">勋章兑换福利</div>
        <template v-if="is_orrect === 1">
          <div class="answer-success">
            <img src="/static/images/education/xunzhang.png" />
            <p class="desc-1">恭喜你！你答对了~</p>
            <p class="desc-2">快去消防学历查看吧！</p>
          </div>
        </template>
        <template v-else>
          <div class="answer-title">{{title}}</div>
          <div
            class="option-item flex-c"
            v-for="(item, index) in option"
            :key="index"
            @click="SelectOption(index)"
          >
            <template v-if="is_orrect > 0">
              <img
                src="/static/images/education/round_check_fill.png"
                class="choose-img"
                v-if="item.answer"
              />
              <img
                src="/static/images/education/round_close_fill.png"
                class="choose-img"
                v-if="item.select && !item.answer"
              />
            </template>
            <span
              class="option-label"
              :class="{
              'select': item.select
            }"
            >{{item.option}}</span>
            {{item.value}}
          </div>
        </template>
        <div class="btn" @click="Confirm">确认</div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show_popup: false,
      title: '的话号码',
      option: [
        {
          option: 'A',
          value: '110',
          select: false,
          answer: false
        },
        {
          option: 'B',
          value: '119 ',
          select: false,
          answer: true
        },
        {
          option: 'C',
          value: '120',
          select: false,
          answer: false
        },
        {
          option: 'D',
          value: '911',
          select: false,
          answer: true
        }
      ],
      // 选项状态0-在做题，1-已提交但正确，2-已提交但错误
      is_orrect: 0
    }
  },
  props: {
    show: Boolean,
    detail: null
  },
  methods: {
    SelectOption (index) {
      if (this.is_orrect === 0) {
        this.option[index].select = !this.option[index].select
      }
    },
    Confirm () {
      const isSelect = this.option.filter(({ select }) => select)
      if (isSelect.length === 0) {
        this.$toast('请选择选项')
        return
      }
      if (this.is_orrect === 0) {
        this.post({
          url: this.api('postAnswer'),
          data: {
            medal_id: this.detail.medal_id,
            content: isSelect.map(({ id }) => id).join(',')
          },
          loading: true
        }).then(res => {
          if (res.status) {
            this.is_orrect = 1
          } else {
            this.is_orrect = 2
          }
        })
      } else {
        this.$emit('update:show', false)
      }
    },
    GetData () {
      this.post({
        url: this.api('getAnswer'),
        data: {
          medal_id: this.detail.medal_id
        },
        loading: true
      }).then(res => {
        if (res.status) {
          this.show_popup = true
          this.title = res.data.topic_name
          this.option = res.data.medalList.map((item, index) => {
            return {
              id: item.id,
              option: item.option,
              value: item.option_content,
              select: false,
              answer: item.answer === '1'
            }
          })
        }
      })
    },
    onReplay () {
      this.$emit('update:show', false)
      this.show_popup = false
    }
  },
  mounted () {
    this.GetData()
  }
}
</script>

<style lang="less" scoped>
.popup-box {
  position: fixed;
  top: 0;
  left: 0;
  .w(100vw);
  .h(100vh);
  .bg(rgba(0, 0, 0, 0.5));
  z-index: 300;

  .answer-content {
    .bg(#fff);
    .br(10rpx);
    .w(600rpx);
    padding-bottom: 41rpx;
    .popup-title {
      text-align: center;
      .fz(32rpx);
      margin-top: 40rpx;
      font-weight: bold;
    }
    .popup-desc {
      text-align: center;
      .c(#0a2d8f);
      .fz(28rpx);
      margin-top: 23rpx;
    }
    .answer-title {
      padding: 0 46rpx;
      .fz(30rpx);
      .c(#333);
      margin-top: 40rpx;
      margin-bottom: 31rpx;
    }
    .answer-success {
      margin-top: 50rpx;
      text-align: center;
      img {
        .w(200rpx);
        .h(200rpx);
      }
      .desc-1 {
        .c(#0a2d8f);
        .fz(30rpx);
        margin-top: 39rpx;
      }
      .desc-2 {
        margin-top: 20rpx;
        .c(#333);
        .fz(26rpx);
      }
    }
    .option-item {
      padding: 0 46rpx;
      // .h(54rpx);
      margin-bottom: 30rpx;
      font-family: "WeChatNumber-151125";
      position: relative;
      .choose-img {
        .w(54rpx);
        .h(54rpx);
        margin-right: 21rpx;
        position: absolute;
        top: 0;
        left: 46rpx;
        .bg(#fff);
      }
      .option-item-box {
        display: flex;
        .option-label {
          .w(54rpx);
          .h(54rpx);
          .lh(54rpx);
          .br(27rpx);
          .bg(#c4c4c4);
          .c(#fff);
          .fz(35rpx);
          font-family: SourceHanSansCN-Normal;
          text-align: center;
          margin-right: 21rpx;
          &.select {
            .bg(#0a2d8f);
          }
        }
        .option-value {
          padding-top: 15rpx;
          flex: 1;
          word-break: break-all;
        }
      }
    }
    .btn {
      .w(508rpx);
      .h(80rpx);
      .lh(80rpx);
      margin: 53rpx auto 0;
      text-align: center;
      .c(#fff);
      .fz(34rpx);
      background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%),
        linear-gradient(#0a2d8f, #0a2d8f);
      background-blend-mode: normal, normal;
      box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(10, 45, 143, 0.2);
      border-radius: 40rpx;
      &:active {
        opacity: 0.8;
      }
    }
  }

  // 四期
  .is-orrect-1 {
    width: 630rpx;
    height: 750rpx;
    box-sizing: border-box;
    position: relative;
    .answer-bg-wrap {
      width: 630rpx;
      height: 750rpx;
      z-index: 300;
      position: absolute;
      bottom: 0;
      left: 0;
      .answer-bg {
        width: 630rpx;
        height: 955rpx;
        display: block;
        z-index: 310;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    .answer-content-bottom {
      width: 100%;
      padding: 0 39rpx;
      box-sizing: border-box;
      z-index: 400;
      position: absolute;
      bottom: 60rpx;
      left: 0;
      .item {
        width: 156rpx;
        height: 104rpx;
        border: 1px solid #ffffff;
        border-radius: 10rpx;
        font-family: SourceHanSansCN-Normal;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #ffffff;
      }
    }
  }
}
</style>
