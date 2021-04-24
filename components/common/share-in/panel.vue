<<template>
    <div class="panel">
        <official-account></official-account>
        <div class="like">
            <img src="/static/images/common/my_bg.png" class="bg">
            <div class="flex-c content">
                <img :src="member.photo_url || '/static/images/common/avatar.png'" class="avatar" @click="like">
                <p>请给我点赞！</p>
            </div>
        </div>
        <div class="question">
            <p class="bold">知识问答</p>
            <div class="q">
                <p>1、您对此次消防宣传讲习内容是否满意？</p>
                <p class="flex-bc">
                    <span class="flex-c" @click="method = 0">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': method == 0}"
                        ></i>
                        很满意
                    </span>
                    <span class="flex-c" @click="method = 1">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': method == 1}"
                        ></i>
                        一般
                    </span>
                    <span class="flex-c" @click="method = 2">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': method == 2}"
                        ></i>
                        不满意
                    </span>
                </p>
            </div>
            <div class="q">
                <p>2、您工作的场所是否已配备消防安全设备？</p>
                <p class="flex-bc">
                    <span class="flex-c" @click="understand = 0">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': understand == 0}"
                        ></i>
                        已配备
                    </span>
                    <span class="flex-c" @click="understand = 1">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': understand == 1}"
                        ></i>
                        未配备
                    </span>
                    <span class="flex-c" @click="understand = 2">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': understand == 2}"
                        ></i>
                        不清楚
                    </span>
                </p>
            </div>
            <div class="q">
                <p>3、您的家庭已配备哪些消防器材？</p>
                <p class="flex-bc">
                    <span class="flex-c" @click="way = 0">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': way == 0}"
                        ></i>
                        灭火器
                    </span>
                    <span class="flex-c" @click="way = 1">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': way == 1}"
                        ></i>
                        灭火宝
                    </span>
                    <span class="flex-c" @click="way = 2">
                        <i 
                          class="iconfont icon-round" 
                          :class="{'icon-radiobox active': way == 2}"
                        ></i>
                        防烟面具
                    </span>
                </p>
            </div>
            <div class="btn-box">
                <submit-button name="提交" size="XS" type="primary" @clickBtn="submit"></submit-button>
            </div>
        </div>
    </div>
</template>
<script>
import OfficialAccount from '@/components/common/official-account/official-account'
import Button from '@/components/common/button/button'
export default {
  components: {
    'official-account': OfficialAccount,
    'submit-button': Button
  },
  props: {
    member: {
      type: Object,
      default () {
        return {}
      }
    } // 专员信息
  },
  data () {
    return {
      method: 0,
      understand: 0,
      way: 0
    }
  },
  methods: {
    submit () {
      uni.showToast({
        title: '提交成功'
      })
      setTimeout(() => {
        this.$emit('submit')
      }, 1000)
    },
    async like () {
      let args = {
        url: this.api('thumbsUpConsultant'),
        data: {
          employee_no: this.member.employee_no,
          type: 1
        }
      }
      let res = await this.get(args)
      if (res.status) {
        wx.showToast({
          title: '点赞成功'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  padding: 20rpx 30rpx;
  background: #fff;
  font-size: 28rpx;
  .like {
    margin-top: 20rpx;
    padding: 25rpx 20rpx;
    position: relative;
    border-radius: 10rpx;
    box-shadow: 0px 8px 16px 0px rgba(21, 133, 236, 0.18);
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: inherit;
    }
    .content {
      color: #fff;
      .avatar {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .avatar, p {
        z-index: 2;
      }
    }
  }
  .question {
    .bold {  
      font-weight: bold;
    }
    p:first-child {
      margin-top: 40rpx;
    }
    .q:first-child {
      margin-top: 24rpx;
    }
    .q:not(:first-child) {
      margin-top: 30rpx;
    }
    .flex-bc {
      margin-top: 20rpx;
      .iconfont {
        margin-right: 13rpx;
        font-size: 40rpx;
      }
      .active {
        .c(@theme-color) !important;
      }
    }
    .btn-box {
      padding-top: 30rpx;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
