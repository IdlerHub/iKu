<template>
  <div class="package-guige-popup">
    <Popup :show.sync="show">
      <div class="hd flex">
        <img
          :lazy-load="true"
          mode="aspectFill"
          :src="detail.thumb + imgProcess.wh200"
        />
        <div class="info flex-1 flex-cb">
          <div class="name line-clamp">{{ detail.package_name }}</div>
          <div class="price" v-if="select_goods_num >= detail.total_goods_num">
            <span>￥</span>
            <span class="lg">{{ total_price }}</span>
          </div>
          <div class="price" v-else>未达套餐标准</div>
          <div class="gray">商品编号: {{ detail.product_sn }}</div>
          <div class="gray">
            <span>共 {{ detail.total_goods_num }} 件单品</span>
            <span>已选 {{ select_goods_num }} 件</span>
          </div>
        </div>
        <i class="iconfont icon-close" @click="$emit('update:show', false)"></i>
      </div>
      <div class="bd flex-1">
        <div
          class="list-item"
          v-for="(item, index) in detail.goods_list"
          :key="index"
        >
          <div>{{ item.product_name }}</div>
          <div class="line flex-bc">
            <div class="left active">{{ item.spec_name }}</div>
            <Stepper
              :stepper_value.sync="item.goods_num"
              min="0"
              :max="item.max"
              :limit="item.limit"
              @updateNum="updateGuige"
            ></Stepper>
          </div>
        </div>
      </div>
      <div class="ft flex-bc border-1px-t">
        <div class="btn-box" v-if="guige_open_type === 0">
          <Btn name="加入购物车" :type="buttonType" @clickBtn="addCart"></Btn>
        </div>
        <div class="btn-box" v-if="guige_open_type === 0">
          <Btn
            name="立即购买"
            :type="buyButtonType"
            @clickBtn="toComfirm"
          ></Btn>
        </div>
        <div class="team-btn" v-if="guige_open_type === 1">
          <div class="team-btn flex-ccc" @click="toTeam">拼团购买</div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/common/popup/popup";
import Btn from "@/components/common/button/button";
import Stepper from "@/components/common/stepper/square";

export default {
  components: {
    Popup,
    Btn,
    Stepper,
  },
  props: {
    goods_id: {
      type: [Number, String],
    },
    guige_open_type: [Number, String],
  },
  data() {
    return {
      imgProcess: this.$imgProcess,
      detail: "", // 详情
      select_goods_num: 0, // 选中数量
      total_price: 0,
    };
  },
  computed: {
    buttonType() {
      let store = 0;
      this.detail &&
        this.detail.goods_list.length &&
        this.detail.goods_list.forEach((item) => {
          store += Number(item.store);
        });
      return store > 0 ? "primaryB" : "disabled";
    },
    buyButtonType() {
      let store = 0;
      this.detail &&
        this.detail.goods_list.length &&
        this.detail.goods_list.forEach((item) => {
          store += Number(item.store);
        });
      return store > 0 ? "primary" : "disabled";
    },
  },
  mounted() {
    this.getGuige();
  },
  methods: {
    getGoodsList() {
      let arr = [];
      this.detail.goods_list.forEach((item) => {
        let obj = {
          product_id: item.product_id,
          spec_id: item.spec_id,
          goods_num: item.goods_num,
        };
        obj.goods_num > 0 && arr.push(obj);
      });
      return JSON.stringify(arr);
    },
    // 获取规格，数量
    async getGuige() {
      let openId = uni.getStorageSync("loginUserinfo")
        ? uni.getStorageSync("loginUserinfo").openId
        : "";
      let args = {
        url: this.api("getPackageGuige"),
        data: {
          goods_id: this.goods_id,
          open_id: openId,
        },
      };
      let res = await this.get(args);
      if (res.status) {
        let re = res.data;
        re.goods_list.length &&
          re.goods_list.forEach((item) => {
            item.limit = item.restrict_num - item.order_count < item.store;
            item.store = Number(item.store);
            item.max = item.limit
              ? Number(item.restrict_num - item.order_count)
              : item.store;
          });
        this.detail = re;
        this.select_goods_num = re.select_goods_num;
        this.total_price = re.total_price;
      } else {
        this.$toast(res.msg);
      }
    },
    // 更新规格价格，数量
    async updateGuige() {
      let list = this.getGoodsList();
      let openId = uni.getStorageSync("loginUserinfo")
        ? uni.getStorageSync("loginUserinfo").openId
        : "";
      let args = {
        url: this.api("getPackageGuige"),
        data: {
          goods_id: this.goods_id,
          goods_list: list,
          open_id: openId,
        },
      };
      let res = await this.get(args);
      if (res.status) {
        let re = res.data;
        this.select_goods_num = re.select_goods_num;
        this.total_price = re.total_price;

        if (this.select_goods_num < this.detail.total_goods_num) {
          this.$toast("产品数量未达套装标准，请增加数量");
        }
      } else {
        this.$toast(res.msg);
      }
    },
    // 加入购物车
    async addCart() {
      if (this.buttonType !== "disabled") {
        let list = this.getGoodsList();

        let args = {
          url: this.api("addPackageGoods"),
          data: {
            goods_id: this.goods_id,
            goods_list: list,
          },
        };
        let res = await this.post(args);

        if (res.status) {
          this.$emit("update:show", false);
          this.$emit("updateCart");
          this.$toast("成功加入购物车", "success");
        } else {
          this.$toast(res.msg);
        }
      } else {
        this.$toast("您好，库存不够了！");
      }
    },
    toComfirm() {
      if (this.buyButtonType !== "disabled") {
        if (this.select_goods_num >= this.detail.total_goods_num) {
          let list = this.getGoodsList();
          wx.setStorage({
            key: "package_ids",
            data: JSON.parse(list),
          });

          this.$nav("packageConfirm", {
            goods_id: this.goods_id,
            is_group: 0,
            group_head_order_sn: "",
          });
          this.$emit("update:show", false);
        } else {
          this.$toast("产品数量未达套装标准，请增加数量");
        }
      } else {
        this.$toast("您好，库存不够了！");
      }
    },
    toTeam() {
      if (this.buyButtonType !== "disabled") {
        if (this.select_goods_num >= this.detail.total_goods_num) {
          let list = this.getGoodsList();
          wx.setStorage({
            key: "package_ids",
            data: JSON.parse(list),
          });

          this.$nav("packageConfirm", {
            goods_id: this.goods_id,
            is_group: 1,
            group_head_order_sn: "",
          });
          this.$emit("update:show", false);
        } else {
          this.$toast("产品数量未达套装标准，请增加数量");
        }
      } else {
        this.$toast("您好，库存不够了！");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.package-guige-popup {
  .hd {
    flex-shrink: 0;
    padding: 40rpx 50rpx 50rpx 50rpx;
    box-sizing: border-box;
    height: 290rpx;
    img {
      flex-shrink: 0;
      margin-right: 20rpx;
      width: 200rpx;
      height: 200rpx;
      .br;
    }
    .info {
      overflow: hidden;
      .name {
        font-size: 28rpx;
        color: #666666;
      }
      .gray {
        font-size: 26rpx;
        color: #999;
      }
    }
    .icon-close {
      margin-left: 20rpx;
      .f(40);
      .c(#d4d4d4);
    }
  }
  .bd {
    padding: 0 50rpx;
    .f(26);
    .c(#333);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .list-item {
      font-size: 26rpx;
      color: #999999;
      .line {
        margin: 30rpx 0 50rpx 0;
      }
      .left {
        box-sizing: border-box;
        padding: 0 30rpx;
        min-width: 180rpx;
        line-height: 64rpx;
        background: #f4f4f4;
        color: #333333;
        text-align: center;
        border-radius: 8rpx;
        &.active {
          background: #0a2d8f;
          color: #ffffff;
        }
      }
    }
  }
  .ft {
    flex-shrink: 0;
    padding: 0 50rpx;
    height: 140rpx;
    .btn-box {
      .w(315rpx);
    }

    .team-btn {
      width: 100%;
      .h(80rpx);
      .lh(80rpx);
      .c(#fff);
      background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%),
        linear-gradient(#ff2c4c, #ff2c4c);
      background-blend-mode: normal, normal;
      box-shadow: 0rpx 8rpx 18rpx 0rpx rgba(10, 45, 143, 0.2);
      border-radius: 40rpx;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
