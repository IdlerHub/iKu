<template>
  <div class="consult" v-if="!loading">
    <NameCard
      :info="detail"
      @choose="onChoose"
      @thumbUp="thumbsUpConsultant(1)"
      @cancelThumb="thumbsUpConsultant(2)"
    ></NameCard>
    <div class="card">
      <div class="title c3">服务专员简介</div>
      <div class="c6" v-if="detail.title">
        <wxParse :content="detail.title"></wxParse>
      </div>
    </div>
    <div class="card">
      <div class="title c3">活动预告</div>
      <div class="box c6">精彩内容，敬请期待！</div>
    </div>
    <div class="card">
      <div class="title c3">往期课堂</div>
      <ScrollClass :list="detail.class_list || []"></ScrollClass>
    </div>
    <OfficialAccount></OfficialAccount>
    <!-- 取消点赞弹窗 -->
    <!-- <Like 
      :showModal="showModal" 
      @closeModal="showModal = false" 
      @like="thumbsUpConsultant(1)"
    ></Like> -->
    <!-- <template v-if="!showModal"> -->
    <MenuGroup></MenuGroup>
    <!-- </template> -->
    <ToastS :show.sync="thumb_show" title="点赞成功"></ToastS>
    <ToastM :show.sync="choose_show" title="已成为您的服务专员"></ToastM>
  </div>
</template>

<script>
import NameCard from "@/components/classroom/name-card";
// import Like from '@/components/classroom/like'
import MenuGroup from "@/components/common/menu/menuGroup";
import ToastS from "@/components/common/toast/toast-s";
import ToastM from "@/components/common/toast/toast-m";
// import wxParse from 'mpvue-wxparse'
import wxParse from "@/components/common/wxParse/wxParse";
import OfficialAccount from "@/components/common/official-account/official-account";
import ScrollClass from "@/components/classroom/scrollClass";

export default {
  components: {
    NameCard,
    // Like,
    ToastS,
    ToastM,
    wxParse,
    OfficialAccount,
    ScrollClass,
    MenuGroup,
  },
  data() {
    return {
      loading: true,
      employee_no: "",
      detail: "",
      showModal: false,
      thumb_show: false,
      choose_show: false,
      isConsult: false, // 扫码设置服务专员
      uid: "",
    };
  },
  onLoad() {
    Object.assign(this, this.$options.data());
  },
  onShow() {
    this.onInit();
    this.getUid();
    // this.$Tool.SetRecordParameter({
    //   page: 'user',
    //   content_type: 'employee'
    // })
  },
  methods: {
    // 获取用户分享id
    getUid() {
      wx.getStorage({
        key: "uid",
        success: (res) => {
          this.uid = res.data;
        },
      });
    },
    async onInit() {
      this.employee_no = this.$root.$mp.query.id;
      this.isConsult = this.$root.$mp.query.isConsult;

      await this.getConsultantDetail();
      if (this.isConsult) {
        this.chooseConsultant();
      } else {
        // this.showModal = this.detail.today_is_thumbs_up === 0
      }
    },
    // 顾问详情
    async getConsultantDetail() {
      let args = {
        url: this.api("getConsultantDetailV2"),
        data: {
          employee_no: this.employee_no,
        },
        loading: this.loading,
      };
      let res = await this.get(args);
      if (res.status) {
        let re = res.data;

        re.today_is_thumbs_up = Number(re.today_is_thumbs_up);
        this.detail = re;
        this.detail.user_exclusive_employee_no =
          this.detail.user_exclusive_employee_no || "0";
      } else {
        uni.showToast({
          title: res.msg ? res.msg : "系统繁忙,请稍候",
          icon: "none",
        });
      }
      this.loading = false;
    },
    // 点赞
    async thumbsUpConsultant(type) {
      let args = {
        url: this.api("thumbsUpConsultant"),
        data: {
          employee_no:
            type === 1
              ? this.employee_no
              : this.detail.today_thumbs_up_employee,
          type: type,
        },
      };
      let res = await this.get(args);
      if (res.status) {
        if (type === 1) {
          this.thumb_show = true;
        } else if (type === 2) {
          wx.showToast({
            title: "取消点赞",
            icon: "none",
          });
        }

        this.showModal = false;
        // 点赞成功，详情更新
        this.getConsultantDetail();
      } else {
        uni.showToast({
          title: res.msg ? res.msg : "系统繁忙,请稍候",
          icon: "none",
        });
      }
    },
    onChoose() {
      let that = this;
      if (this.detail.user_exclusive_employee_no !== "0") {
        uni.showModal({
          title: "是否更换服务专员？",
          content: "您已经选择其他专员为您的专属服务专员，确定要更换吗？",
          cancelColor: "#0a2d8f",
          cancelText: "确定",
          confirmColor: "#000000",
          confirmText: "取消",
          success: (res) => {
            if (res.cancel) {
              that.chooseConsultant();
            }
          },
        });
      } else {
        that.chooseConsultant();
      }
    },
    // 选为专员
    async chooseConsultant() {
      let args = {
        url: this.api("chooseConsultant"),
        data: {
          employee_no: this.employee_no,
        },
      };
      let res = await this.get(args);
      if (res.status) {
        this.choose_show = true;
        // 选为专员成功，详情更新
        this.getConsultantDetail();
      } else {
        uni.showToast({
          title: res.msg ? res.msg : "系统繁忙,请稍候",
          icon: "none",
        });
      }
    },
  },
  onShareAppMessage() {
    this.$Tool.SetRecordScene({
      page: "share",
      content_type: "share_page",
      content_id: this.detail.share_name || this.detail.employee_name || "",
    });
    return {
      title: this.detail.share_name || this.detail.employee_name || "",
      path: `/pages/classroom/consult/main?id=${this.employee_no}&uid=${this.uid}&t=s`,
    };
  },
  onUnload() {
    this.$Tool.SetBrowseID();
  },
};
</script>
<style lang="less" scoped>
.c3 {
  color: #333;
}
.c6 {
  color: #666;
}
.consult {
  padding: 20rpx 30rpx;
  .card {
    margin-top: 20rpx;
    .bg(#fff);
    border-radius: 10rpx;
    padding: 30rpx 20rpx;
    .fz(26rpx);
    .title {
      .fz(30rpx);
      font-weight: bold;
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .box {
      text-align: center;
    }
  }
}
</style>

