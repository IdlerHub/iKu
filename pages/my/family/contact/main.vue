<template>
  <div class="contact">
    <div class="textarea-box">
      <textarea v-model="content" placeholder="请输入您的问题或留言" rows="6" maxlength="-1"></textarea>
      <div class="btn-box">
        <post-button name="提交" size="XS" @clickBtn="submitContent"></post-button>
      </div>
    </div>
    <div class="panel">
      <div class="img-box">
        <img :src="code" @click="previewImage"> 
        <p v-if="code">点击放大长按可保存</p>
        <p v-else>该专员还没有二维码</p>
      </div>
      <div class="img-box" @click="contact">
        <img src="/static/images/common/contact.png"> 
        <p>呼叫顾问</p>
      </div>
    </div>
    <!-- 留言列表 -->
    <div v-show="questions.length > 0" class="panel block">
      <div 
        v-for="(item, index) in questions" 
        :key="index" 
        class="question" 
        :class="{'bd-b' : index !== questions.length - 1}"
      >
        <p>我的留言：</p>
        <p>{{ item.question }}</p>
        <div v-if="item.answer" class="answer">
          回复：{{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/button/button'
export default {
  components: {
    'post-button': Button
  },
  data () {
    return {
      content: '',
      phone: '',
      code: '',
      questions: []
    }
  },
  methods: {
    previewImage () {
      let that = this
      if (that.code) {
        wx.previewImage({
          current: that.code,
          urls: [that.code]
        })
      } else {
        that.$toast('该专员还没有二维码')
      }
    },
    saveImg () {
      let that = this
      wx.downloadFile({
        url: that.code,
        success (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success () {
              uni.showToast({
                title: '保存成功'
              })
            },
            fail () {
              uni.showToast({
                icon: 'none',
                title: '保存失败'
              })
            }
          })
        }
      })
    },
    contact () {
      let that = this
      wx.showModal({
        title: '与我联系',
        content: '确定呼叫号码为' + that.phone + '的用户？',
        confirmColor: '#0a2d8f',
        confirmText: '确定',
        cancelColor: '#000000',
        cancelText: '取消',
        success: res => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: that.phone // 仅为示例，并非真实的电话号码
            })
          }
        }
      })
    },
    submitContent () {
      this.content && this.postQuestion()
      !this.content && uni.showToast({
        icon: 'none',
        title: '请填写内容'
      })
    },
    async postQuestion () {
      let args = {
        url: this.api('addQuestion'),
        data: {
          question: this.content
        }
      }
      let res = await this.post(args)
      if (res.status) {
        uni.showToast({
          title: '提交成功'
        })
        this.content = ''
      }
      !res.status && uni.showToast({
        icon: 'none',
        title: '提交失败'
      })
    },
    async getInfo () {
      let args = {
        url: this.api('getConsultInfo')
      }
      let res = await this.get(args)
      if (res.status) {
        this.phone = res.data.employee_phone
        this.code = res.data.wx_code
        this.questions = res.data.question_list
      }
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
<style lang="less" scoped>
.contact {
  padding: 20rpx 24rpx;
  .textarea-box {
    position: relative;
    padding: 30rpx 20rpx 120rpx 20rpx;
    background: #fff;
    .br(10rpx);
    textarea {
      font-size: 30rpx;
      color: #999;
      width: 100%;
      padding: 30rpx 20rpx;
      box-sizing: border-box;
      border: 1px solid #c4c4c4;
      .br(10rpx);
    }
    .btn-box {
      position: absolute;
      bottom: 30rpx;
      right: 20rpx;
      z-index: 100;
    }
  }
  .panel {
    padding: 30rpx;
    background: #fff;
    .br(10rpx);
    margin-top: 20rpx;
    display: flex;
    justify-content: space-around;
    align-content: center;
    .img-box {
      color: #999;
      font-size: 26rpx;
      text-align: center;
      img {
        .w(150rpx);
        .h(150rpx);
        margin-bottom: 20rpx;
      }
    }
  }
  .block {
    display: block;
    font-size: 28rpx;
    color: #333;
    padding: 0 30rpx;
    .question {
      padding: 30rpx 0;
      .answer {
        padding: 25rpx 20rpx;
        color: #666;
        background: #f4f4f4;
      }
      .q {
        margin: 19rpx 0;
      }
    }
    .bd-b {
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
</style>

