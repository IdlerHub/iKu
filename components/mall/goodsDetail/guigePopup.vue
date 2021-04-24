<template>
  <div class="guige-popup">
    <Popup :show.sync="show">
      <div class="hd flex">
        <img
          :lazy-load="true"
          mode="aspectFill"
          :src="detail.thumb + imgProcess.wh200"
        />
        <div class="info flex-1 flex-cb">
          <div class="name line-clamp">{{ detail.product_name }}</div>
          <div class="price">
            <span>￥</span>
            <span class="lg">{{ detail.total_price }}</span>
          </div>
          <!-- <div v-if="detail.goods_spec" class="sn">
            库存: {{ detail.goods_spec[guige_index].store }}
          </div> -->
          <div class="sn">商品编号: {{ detail.product_sn }}</div>
        </div>
        <i class="iconfont icon-close" @click="$emit('update:show', false)"></i>
      </div>
      <div class="bd flex-1">
        <div class="heading">规格</div>
        <div class="list flex">
          <div
            v-for="(item, index) in detail.goods_spec"
            class="list-item"
            :class="[
              guige_index == index && item.store != 0 ? 'active' : 'default',
              goods_num <= item.store && item.store != 0 ? '' : 'grey',
            ]"
            :key="index"
            @click="selectGuige(index, item.id)"
          >
            {{ item.spec_name }}
          </div>
        </div>
        <div class="amount flex-bc">
          <div class="left">
            购买数量
            <span class="hint">（限购{{ limitNum }}件）</span>
          </div>
          <Stepper
            :stepper_value.sync="goods_num"
            :limit="limitNum < store"
            :max="maxNum"
            @updateNum="getGuige"
          ></Stepper>
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
      guige_index: 0,
      detail: "", // 详情
      goods_num: 1,
      spec_id: 0, // 规格id
      maxNum: 1, // 最大可购数
      limitNum: 5, // 限购数量
      store: 1,
    };
  },
  computed: {
    buttonType() {
      return this.store > 0 ? "primaryB" : "disabled";
    },
    buyButtonType() {
      return this.store > 0 ? "primary" : "disabled";
    },
  },
  mounted() {
    this.getGuige();
  },
  methods: {
    selectGuige(index, id) {
      if (this.detail.goods_spec[index].store <= this.maxNum) {
        this.guige_index = index;
        this.spec_id = id;
        this.getGuige();
      }
    },
    async getGuige() {
      let openId = uni.getStorageSync("loginUserinfo")
        ? uni.getStorageSync("loginUserinfo").openId
        : "";
      let args = {
        url: this.api("getProductGuige"),
        data: {
          goods_id: this.goods_id,
          goods_num: this.goods_num,
          spec_id: this.spec_id,
          open_id: openId,
        },
      };
      let res = await this.get(args);
      if (res.status) {
        let re = res.data;
        this.detail = re;
        this.goods_num = Number(re.goods_num);
        const index = re.goods_spec.findIndex((item) => {
          return item.id === re.spec_id;
        });
        this.guige_index = index;
        this.limitNum = Number(
          re.goods_spec[this.guige_index].restricted_num -
            re.goods_spec[this.guige_index].order_count
        );
        this.store = Number(re.goods_spec[this.guige_index].store);
        this.maxNum = this.limitNum < this.store ? this.limitNum : this.store;
        this.spec_id = re.spec_id;
      } else {
        this.$toast(res.msg);
      }
    },
    // 加入购物车
    async addCart() {
      if (this.store > 0) {
        let args = {
          url: this.api("addProductGoods"),
          data: {
            goods_id: this.goods_id,
            goods_num: this.goods_num,
            spec_id: this.spec_id,
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
    async toComfirm() {
      if (this.store > 0) {
        let args = {
          url: this.api("confirmProductOrder"),
          data: {
            goods_id: this.goods_id,
            goods_num: this.goods_num,
            spec_id: this.spec_id,
            coupon_instance_id: "",
            is_group: 0,
            group_head_order_sn: "",
          },
          loading: true,
        };
        let res = await this.get(args);
        if (res.status) {
          // const re = res.data
          const q = {
            goods_id: this.goods_id,
            goods_num: this.goods_num,
            spec_id: this.spec_id,
            // address: JSON.stringify(re.address),
            // goods_list: JSON.stringify(re.goods_list || []),
            // total_price: re.total_price,
            is_group: 0,
            // coupon_list: JSON.stringify(re.coupon_instances || []),
            group_head_order_sn: "",
            is_coupon: 1,
          };
          this.$nav("productConfirm", q);
          this.$emit("update:show", false);
        } else {
          this.$toast(res.msg);
        }
        this.loading = false;
      } else {
        this.$toast("您好，库存不够了！");
      }
    },
    async toTeam() {
      if (this.store > 0) {
        let args = {
          url: this.api("confirmProductOrder"),
          data: {
            goods_id: this.goods_id,
            goods_num: this.goods_num,
            spec_id: this.spec_id,
            coupon_instance_id: "",
            is_group: 1,
            group_head_order_sn: "",
          },
          loading: true,
        };
        let res = await this.get(args);
        if (res.status) {
          // const re = res.data
          const q = {
            goods_id: this.goods_id,
            goods_num: this.goods_num,
            spec_id: this.spec_id,
            // address: JSON.stringify(re.address),
            // goods_list: JSON.stringify(re.goods_list || []),
            // total_price: re.total_price,
            is_group: 1,
            // coupon_list: JSON.stringify(re.coupon_instances || []),
            group_head_order_sn: "",
          };
          this.$nav("productConfirm", q);
          this.$emit("update:show", false);
        } else {
          this.$toast(res.msg);
        }
        this.loading = false;
      } else {
        this.$toast("您好，库存不够了！");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.guige-popup {
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
      .price {
        padding-top: 10rpx;
        flex: 1;
      }
      .sn {
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
    .list {
      margin: 0 -10rpx;
      flex-wrap: wrap;
      .list-item {
        box-sizing: border-box;
        margin: 30rpx 10rpx 0 10rpx;
        padding: 0 30rpx;
        min-width: 180rpx;
        line-height: 64rpx;
        text-align: center;
        border-radius: 8rpx;
      }
      .default {
        background: #f4f4f4;
      }
      .active {
        .bg(@theme-color);
        .c;
      }
      .grey {
        .c(#999);
      }
    }
    .amount {
      margin: 40rpx 0;
      .hint {
        .c(#999);
        .fz(26);
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
