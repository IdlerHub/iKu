<template>
	<scroll-view class="scroll-right" scroll-y :scroll-into-view="'right' + right_index" scroll-with-animation="true" @scroll="scroll" :style="'height:' + windowHeight + 'px;'">
		<view ref="all" id="all">
			<template v-if="loadSuccess">
				<div v-for="(item, index) in list" class="item" :id="'right' + index" :key="index" @click="$nav('goodsDetail', { product_sn: item.product_sn })">
					<div class="title line-clamp">{{ item.product_name }}</div>
					<div class="content">
						<div class="cover-box">
							<img class="cover" mode="aspectFit" :src="item.thumb + imgProcess.wh300" :lazy-load="true" v-if="item.thumb" />
							<!-- <img mode="aspectFill" :src="item.thumb" lazy-load="true" v-if="item.thumb"> -->
							<img class="cover" mode="aspectFill" src="/static/images/common/default.png" v-else />
						</div>

						<div class="right flex-1">
							<!-- <div class="desc">{{ item.description }}</div> -->
							<div>
								<!-- 原价 -->
								<div class="price-row" :class="{ disabled: identity != 'user' }" v-if="showPrice">
									<span class="key">原价:</span>
									<span class="unit">￥</span>
									<span class="value">{{ item.price }}</span>
								</div>

								<!-- 档员价 -->
								<div class="price-row second" :class="{ disabled: identity != 'archives' }" v-if="showPrice">
									<span class="key">档员价:</span>
									<span class="unit">￥</span>
									<span class="value">{{ item.archives_price }}</span>
								</div>
								<!-- 义务宣传员价 -->
								<div class="price-row active" :class="{ disabled: identity != 'propaganda' }" v-if="showPrice">
									<span class="key">义务宣传员价:</span>

									<span class="unit">￥</span>
									<span class="value">{{ item.propaganda_price }}</span>
								</div>

								<!-- <div v-if="showPrice" class="price">
                <span>￥</span>
                <span class="lg">{{ item.price }}</span>
              </div>-->
								<!-- 单品单规格：添加数量 -->
								<template v-if="item.type == 1 && item.is_various === 0">
									<Stepper
										ref="stepper"
										:item="item"
										:index="index"
										:num.sync="item.goods_num"
										:limit="calLimit(item)"
										:max="calMax(item)"
										@addCart="addCart"
										@changeNum="changeCartNum"
									></Stepper>
								</template>
								<!-- 单品多规格，套餐 -->
								<div class="type flex-bc" v-else>
									<div></div>
									<div class="flex-c">
										<span>去选择型号</span>
										<i class="iconfont icon-roundrightfill"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<template v-if="list.length == 0">
					<NoList></NoList>
				</template>
			</template>
		</view>
	</scroll-view>
</template>
<script>
import Stepper from '@/components/common/stepper/round';
import NoList from '@/components/common/no-data/no-list';
import { mapState, mapMutations } from 'vuex';
import { imgProcess } from '@/utils/imgProcess';
export default {
	components: {
		Stepper,
		NoList
	},
	props: {
		list: {
			type: [Array],
			default() {
				return [];
			}
		},
		height: {
			type: [Number],
			default: 400
		},
		loadSuccess: {
			type: [Boolean],
			default: false
		},
		rightToLeft: {
			type: Array,
			default: []
		},
		showPrice: {
			type: Boolean,
			default: true
		},
		identity: null
	},
	computed: {
		...mapState('Scroll', ['right_index'])
	},
	data() {
		return {
			windowHeight: 300,
			space: 195,
			imgPro: null,
			imgProcess,
			tHeight: 0,
			itemHeight: 195
		};
	},
	mounted() {
		let systemInfo = uni.getSystemInfoSync();
		let windowHeight = systemInfo.windowHeight;
		// console.log('windowHeight-', windowHeight)
		this.windowHeight = windowHeight - this.space;
		wx.nextTick(() => {
			this.getElementHeight('#all');
		});
		// console.log('windowHeight', this.windowHeight)
		// this.imgPro = this.imgProcess
		// console.log('this.imgProcess', this.imgProcess.wh100)
	},
	methods: {
		...mapMutations('Scroll', ['setLeftIndex', 'setRightIndex']),
		// 获取指定元素实际宽度
		getElementHeight(id = '') {
			let _query = wx.createSelectorQuery();
			_query.select(id).boundingClientRect();
			_query.exec(res => {
				if (res[0]) {
					this.tHeight = res[0].height || 0;
					this.itemHeight = this.tHeight / this.list.length;
				} else {
					this.getElementHeight(id);
				}
			});
		},
		calLimit(item) {
			const limit = Number(item.restricted_num - item.order_count) < 0 ? 0 : Number(item.restricted_num - item.order_count);
			const store = Number(item.store);
			return limit < store;
		},
		calMax(item) {
			const limit = Number(item.restricted_num - item.order_count) < 0 ? 0 : Number(item.restricted_num - item.order_count);
			const store = Number(item.store);
			return limit < store ? limit : store;
		},
		// 滚动
		scroll(e) {
			if (!this.tHeight) {
				this.getElementHeight('#all');
			}
			// console.log('e', e)/
			// 1个：185+210 = 195 这里要用px 滚动的单位是px
			let top = e.detail.scrollTop;
			let i = Math.floor(top / this.itemHeight);
			let left = this.rightToLeft[i];

			// 这里之所以设为空，是不让scroll-into-view保持有值的情况
			// scroll-into-view 有值的话，当滚动到改变left_index的时候，会触发重新滚到 scroll-into-view 的情况
			// 这个是为什么触发呢？
			this.setRightIndex('');
			this.setLeftIndex(left);
		},
		changeNum() {
			console.log('changeNum', arguments);
		},
		// 加入购物车
		async addCart(e, index, num) {
			let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
			let args = {
				url: this.api('addProductGoods'),
				data: {
					goods_id: e.id,
					goods_num: num,
					spec_id: e.spec_id ? e.spec_id : '',
					open_id: openId
				}
			};
			let res = await this.post(args);

			setTimeout(() => {
				this.getCartList();
			}, 500);

			if (res.status) {
				let re = res.data;
				this.list[index].shop_cart_id = re;
				this.list[index].goods_num = num;
			} else {
				this.$toast(res.msg);
			}
		},
		// 修改数量
		async changeCartNum(e, index, num) {
			console.log(e, index, num);
			let args = {
				url: this.api('changeCartNum'),
				data: {
					cart_id: e.shop_cart_id,
					goods_num: num
				}
			};
			let res = await this.post(args);

			setTimeout(() => {
				this.getCartList();
			}, 500);

			if (res.status) {
				this.list[index].goods_num = num;
			} else {
				this.$toast(res.msg);
			}
		},
		// 获取购物车，设置tabbar角标
		async getCartList() {
			let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
			let args = {
				url: this.api('getMyCartNum'),
				loading: false,
				open_id: openId
			};
			let res = await this.get(args);
			if (res.status && res.data && parseInt(res.data.shop_cart_goods_num) > 0) {
				this.cart_num = parseInt(res.data.shop_cart_goods_num) || '';

				// 购物车角标
				wx.setTabBarBadge({
					index: 3,
					text: this.cart_num.toString()
				});
			} else {
				wx.removeTabBarBadge({
					index: 3
				});
			}
		}
	}
};
</script>
<style lang="less" scoped>

.scroll-right {
	box-sizing: border-box;
	padding: 20rpx;
	.w(620rpx);
	.item {
		margin-bottom: 20rpx;
		padding: 30rpx 20rpx 0 0;
		box-sizing: border-box;
		.bg(#fff);
		.w(580rpx);
		// .h(185px);
		.br;
		.title {
			height: 32rpx;
			line-height: 32rpx;
			margin-bottom: 30rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			font-weight: bold;
			text-align: right;
			.fz(30rpx);
			.c(#333);
			.lh(1);
			// text-align: right;
		}
		.content {
			display: flex;
			.cover-box {
				width: 280rpx;
				height: 280rpx;
				position: relative;
				// left: -20rpx;
				.cover {
					width: 280rpx;
					height: 280rpx;
					flex-shrink: 0;
					// .w(130px);
					// .h(130px);

					.br;
				}
			}
		}
		.right {
			height: 280rpx;
			padding-top: 50rpx;
			text-align: right;
			box-sizing: border-box;
			.desc {
				.fz(26rpx);
				.c(#999);
				.line-clamp-multi(3);
			}
			.price {
				margin-bottom: 30rpx;
				font-size: 24rpx;
				color: @price-color;
				.lg {
					font-size: 32rpx;
				}
			}
			.type {
				// justify-content: center;
				padding-left: 20rpx;
				font-size: 26rpx;
				color: @theme-color;
				text-align: right;
				.iconfont {
					margin-left: 20rpx;
					.f(44);
					color: @theme-color;
				}
			}
			.price-row {
				width: 100%;
				box-sizing: border-box;
				text-align: right;
				white-space: nowrap;
			}
		}
	}
}
</style>
