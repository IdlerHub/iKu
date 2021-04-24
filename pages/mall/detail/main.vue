<template>
	<div class="goods-detail">
		<template v-if="swiper_list.length > 0">
			<Swiper ref="swiperVideo" :imgUrls="swiper_list" :autoplay="false" @pauseDetailVideo="pauseDetailVideo"></Swiper>
		</template>
		<!-- 商品信息 -->
		<div class="title-panel">
			<!-- 四期 -->
			<!-- 原价 -->
			<div class="price-row" :class="{ disabled: identity != 'user' }">
				<span class="key">原价：</span>
				<span class="unit">￥</span>
				<span class="value">{{ group_detail.group_type != 0 ? group_money : detail.price }}</span>
			</div>
			<!-- 档员价 -->
			<div class="price-row" :class="{ disabled: identity != 'archives' }">
				<span class="key">档员价：</span>
				<span class="unit">￥</span>
				<span class="value">{{ group_detail.group_type != 0 ? group_money : detail.archives_price }}</span>
			</div>
			<!-- 义务宣传员价 -->
			<div class="price-row" :class="{ disabled: identity != 'propaganda' }">
				<span class="key">义务宣传员价：</span>
				<span class="unit">￥</span>
				<span class="value">{{ group_detail.group_type != 0 ? group_money : detail.propaganda_price }}</span>
			</div>

			<!-- <p class="price">
        <span class="team-title" v-if="group_detail.group_type != 0">团购价</span>
        <span>￥</span>
        <span class="lg">{{group_detail.group_type != 0 ? group_money : detail.price}}</span>
      </p>-->

			<p class="org-price">
				<span class="team-number" v-if="group_detail.group_type">{{ group_need }}人成团</span>
				<span class="org-price-number" v-if="group_detail.group_type">原价￥{{ detail.price }}</span>
			</p>
			<p class="title">{{ detail.product_name }}</p>
			<!-- <p class="desc">快递：包邮</p> -->
		</div>
		<!-- 规格，参数，证书 -->
		<div class="group-panel">
			<!-- <div class="line flex-bc border-1px-b" @click="openGuigePopup(0)">
        <span>选择规格</span>
        <i class="iconfont icon-right"></i>
      </div>-->
			<div class="line flex-bc border-1px-b" @click="args_modal_show = true">
				<span>参数</span>
				<i class="iconfont icon-right"></i>
			</div>
			<div class="line flex-bc" @click="toCertification">
				<span>产品证书</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<!-- 详情 -->
		<div class="detail-panel">
			<div class="title">产品介绍</div>
			<div class="video-box" v-if="detail.content_video_thumb">
				<img mode="aspectFill" :src="detail.content_video_thumb + imgProcess.w375" v-if="guige_popup_show" />
				<video id="detailVideo" :src="detail.content_video" :poster="detail.content_video_thumb" object-fit="cover" v-else @play="onPlay"></video>
			</div>
			<template v-if="detail.detail">
				<u-parse :content="detail.detail"></u-parse>
				<!-- <wxParse :content="detail.detail"></wxParse> -->
			</template>
		</div>
		<!-- 推荐 -->
		<div class="recommend-panel">
			<Tab :tab_list="tab_list" :tab_index.sync="tab_index"></Tab>
			<template v-if="tab_index === 0 && recommend_goods.length > 0">
				<div class="scroll-x">
					<div v-for="(item, index) in recommend_goods" :key="index"><RecommendGoodsItem :item="item"></RecommendGoodsItem></div>
				</div>
			</template>
			<template v-if="tab_index === 1 && recommend_lessons.length > 0">
				<div class="scroll-x">
					<div v-for="(item, index) in recommend_lessons" :key="index"><RecommendLessonItem :item="item"></RecommendLessonItem></div>
				</div>
			</template>
			<template v-if="(tab_index === 0 && recommend_goods.length === 0) || (tab_index === 1 && recommend_lessons.length === 0)">
				<div class="no-recommend"><span>暂无推荐</span></div>
			</template>
		</div>
		<!-- 底部 -->
		<div class="bottom-fixed-h"></div>
		<div class="bottom-fixed flex">
			<div class="left flex-bc">
				<button class="nav" open-type="contact">
					<i class="iconfont icon-servicefill"></i>
					<span>客服</span>
				</button>
				<div class="nav" @click="$nav('cart')">
					<i class="iconfont icon-cartfill"></i>
					<span>购物车</span>
					<span class="num" v-if="cart_num > 0">{{ cart_num }}</span>
				</div>
			</div>
			<div
				class="right flex-1"
				:class="{
					'flex-bc': group_detail.group_type != 0,
					'no-team flex-bc': group_detail.group_type == 0
				}"
				style="padding-top:0;"
			>
				<block v-if="group_detail.group_type == 0"><Btn name="加入购物车" type="primaryB" @clickBtn="openGuigePopup(0)"></Btn></block>

				<!-- <Btn name="立即购买" :type="detail.is_show == 1 ? 'primary' : 'disabled'" @clickBtn="getGuige(2)"></Btn> -->
				<!-- <Btn name="原价购买" v-if="group_detail.group_type == 0" @clickBtn="getGuige(2)"></Btn> -->
				<Btn
					:name="group_detail.group_type == 0 ? '立即购买' : '原价购买'"
					:type="detail.is_show == 1 ? (group_detail.group_type == 0 ? 'primary' : 'primaryB') : 'disabled'"
					@clickBtn="getGuige(2)"
				></Btn>
				<Btn name="拼团购买" v-if="group_detail.group_type != 0" :type="group_detail.group_type != 0 ? 'primary' : 'disabled'" @clickBtn="getGuige(3)"></Btn>
			</div>
		</div>
		<!-- 分享按钮 -->
		<MenuShare></MenuShare>
		<!-- 档案按钮 -->
		<MenuProfile bottom="160rpx"></MenuProfile>
		<!-- 参数弹窗 -->
		<ArgumentsModal :showModal="args_modal_show" :list="detail.attributes" @closeModal="args_modal_show = false"></ArgumentsModal>
		<!-- 单品规格弹窗 -->
		<template v-if="guige_type == 1">
			<GuigePopup :show.sync="guige_popup_show" :guige_open_type="guige_open_type" :goods_id="goods_id" @updateCart="getGoodsDetail('update')"></GuigePopup>
		</template>
		<!-- 套餐规格弹窗 -->
		<template v-if="guige_type == 2">
			<PackageGuigePopup
				ref="packageDom"
				:show.sync="guige_popup_show"
				:guige_open_type="guige_open_type"
				:goods_id="goods_id"
				@updateCart="getGoodsDetail('update')"
			></PackageGuigePopup>
		</template>
	</div>
</template>
<script>
import SamePageMixin from '@/assets/mixins/samePage';
import Swiper from '@/components/common/swiper/swiper-video';
import Tab from '@/components/common/tab/tab';
import RecommendGoodsItem from '@/components/mall/goodsDetail/recommendGoodsItem';
import RecommendLessonItem from '@/components/mall/goodsDetail/recommendLessonItem';
import ArgumentsModal from '@/components/mall/goodsDetail/argumentsModal';
import GuigePopup from '@/components/mall/goodsDetail/guigePopup';
import PackageGuigePopup from '@/components/mall/goodsDetail/packageGuigePopup';
import MenuShare from '@/components/common/menu/share';
import MenuProfile from '@/components/common/menu/profile';
import Btn from '@/components/common/button/button';
// import wxParse from 'mpvue-wxparse';
// import wxParse from '@/components/common/wxParse/wxParse'
import uParse from '@/components/u-parse/u-parse.vue'

export default {
	mixins: [SamePageMixin],
	components: {
		Swiper,
		Tab,
		RecommendGoodsItem,
		RecommendLessonItem,
		ArgumentsModal,
		GuigePopup,
		PackageGuigePopup,
		MenuShare,
		MenuProfile,
		Btn,
		uParse
		// wxParse
	},
	data() {
		return {
			imgProcess: this.$imgProcess,
			loading: true,
			product_sn: 0, // 商品编号
			goods_id: 0, // 商品id
			swiper_list: [], // 轮播图列表
			detail: '', // 商品详情
			tab_list: [{ name: '推荐商品' }, { name: '推荐课程' }],
			tab_index: 0,
			recommend_goods: [], // 推荐商品
			recommend_lessons: [], // 推荐课程
			cart_num: 0,
			args_modal_show: false, // 参数弹窗
			guige_type: 0, // 1:单品，2：套餐
			guige_popup_show: false, // 规格弹窗
			guige_open_type: 0, // 规格打开方式 0-普通打开，1-拼团打开
			group_money: 0,
			group_need: 0,
			max: 100,
			group_detail: '',
			uid: '',
			identity: ''
		};
	},
	mounted() {
		this.product_sn = this.$root.$mp.query.product_sn;
		this.getGoodsDetail();
		this.getGroupDetail();
	},
	onShow() {
		this.getCartList();
		this.getUid();
		const identitykey = wx.getStorageSync('identity');
		this.identity = identitykey || this.identity;
	},
	methods: {
		pauseDetailVideo() {
			if (this.detail.content_video) {
				let video = wx.createVideoContext('detailVideo');
				video.pause();
			}
			console.log('stop');
		},
		onPlay() {
			if (this.$refs['swiperVideo']) {
				this.$refs['swiperVideo'].pauseAll();
			}
			// detailVideo
		},
		getUid() {
			wx.getStorage({
				key: 'uid',
				success: res => {
					this.uid = res.data;
				}
			});
		},
		// 打开规格选择窗
		openGuigePopup(type) {
			this.guige_popup_show = true;
			this.guige_open_type = type;
		},
		toCertification() {
			uni.navigateTo({
				url: `/pages/mall/certification/main?id=${this.product_sn}`
			});
		},
		// 团购商品详情
		getGroupDetail() {
			let args = {
				url: this.api('getGoodGroupDetail'),
				data: {
					product_sn: this.product_sn
				},
				loading: this.loading
			};
			this.get(args).then(res => {
				this.group_money = res.data.group_detail.group_price;
				this.group_need = res.data.group_detail.group_needs;
				this.group_detail = res.data.group_detail;

				let arr = [];
				if (res.data.imgs) {
					res.data.imgs.forEach(item => {
						let obj = {
							img: `${item.url}`
						};
						arr.push(obj);
					});
				}

				if (res.data.video) {
					let obj = {
						isVideo: true,
						video: res.data.video,
						video_poster: res.data.video_thumb,
						img: ''
					};
					arr.unshift(obj);
				}

				if (res.data.video_2) {
					let obj = {
						isVideo: true,
						video: res.data.video_2,
						video_poster: res.data.video_thumb2,
						img: ''
					};
					arr.unshift(obj);
				}
				this.swiper_list = arr;
			});
		},
		// 获取单品规格
		async getGuige(val) {
			// 判断商品是否下架
			if (parseInt(this.detail.is_show) === 1) {
				if (parseInt(this.guige_type) === 2) {
					// 如果是套餐则打开套餐规格窗
					if (val === 3) {
						this.$refs['packageDom'].toTeam();
						return;
					}
					const openType = val === 3 ? 1 : 0;
					this.openGuigePopup(openType);
				} else {
					// 单品 —— 团购：请求直接跳
					if (val === 3) {
						this.joinTeam();
						return;
					}
					// 如果是单品则获取规格判断是否打开规格选择器
					uni.showLoading();
					let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
					let args = {
						url: this.api('getProductGuige'),
						data: {
							goods_id: this.goods_id,
							goods_num: 1,
							spec_id: '',
							open_id: openId
						}
					};
					let res = await this.get(args);
					if (res.status) {
						let re = res.data;
						if (re.goods_spec.length > 1) {
							// 如果规格数大于1则打开规格选择器并判断是普通购买还是拼团购买
							const openType = val === 3 ? 1 : 0;
							this.openGuigePopup(openType);
						} else {
							// 规格数量为一，判断库存和限购数量
							if (re.goods_spec[0].store > 0) {
								if (re.goods_spec[0].restricted_num - re.goods_spec[0].order_count > 0) {
									val === 1 && this.addCart(re.spec_id);
									val === 2 && this.toComfirm(re.spec_id);
								} else {
									this.$toast('您好，超过限购数量了！');
								}
							} else {
								this.$toast('您好，库存不够了！');
							}
						}
					} else {
						this.$toast(res.msg);
					}
				}
			} else {
				this.$toast('商品已下架');
			}
		},
		// 加入购物车
		async addCart(id) {
			let args = {
				url: this.api('addProductGoods'),
				data: {
					goods_id: this.goods_id,
					goods_num: 1,
					spec_id: id
				}
			};
			let res = await this.post(args);

			if (res.status) {
				this.$emit('updateCart');
				this.$toast('成功加入购物车', 'success');
			} else {
				this.$toast(res.msg);
			}
		},
		// 立即购买
		async toComfirm(id) {
			// 显示规格弹框
			this.openGuigePopup(0);
			// let args = {
			//   url: this.api('confirmProductOrder'),
			//   data: {
			//     goods_id: this.goods_id,
			//     goods_num: 1,
			//     spec_id: id,
			//     coupon_instance_id: '',
			//     is_group: 0,
			//     group_head_order_sn: ''
			//   },
			//   loading: true
			// }
			// let res = await this.get(args)
			// if (res.status) {
			//   const re = res.data
			//   const q = {
			//     goods_id: this.goods_id,
			//     goods_num: 1,
			//     spec_id: id,
			//     address: JSON.stringify(re.address),
			//     goods_list: JSON.stringify(re.goods_list || []),
			//     total_price: re.total_price,
			//     is_group: 0,
			//     coupon_list: JSON.stringify(re.coupon_instances || []),
			//     group_head_order_sn: '',
			//     is_coupon: 1
			//   }
			//   this.$nav('productConfirm', q)
			// } else {
			//   this.$toast(res.msg)
			// }
			// this.loading = false
		},
		// 拼团
		async joinTeam() {
			let args = {
				url: this.api('groupConfirmOrder'),
				data: {
					goods_id: this.goods_id,
					coupon_instance_id: '',
					group_head_order_sn: ''
				},
				loading: true
			};
			let res = await this.get(args);
			if (res.status) {
				console.log(res);
				const re = res.data;
				const q = {
					goods_id: this.goods_id,
					goods_num: 1,
					spec_id: '',
					// address: JSON.stringify(re.address),
					// goods_list: JSON.stringify(re.goods_list || []),
					total_price: re.total_price,
					is_group: 1,
					// coupon_list: JSON.stringify(re.coupon.coupon_instance || []),
					group_head_order_sn: '',
					is_coupon: re.group_detail.is_coupon
				};
				this.$nav('productConfirm', q);
			} else {
				this.$toast(res.msg);
			}
			this.loading = false;
		},
		// 商品详情
		async getGoodsDetail(type) {
			let args = {
				url: this.api('getGoodsDetail'),
				data: {
					product_sn: this.product_sn
				},
				loading: this.loading
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;

				// this.cart_num = re.shop_cart_goods_num

				if (type !== 'update') {
					this.detail = re;
					this.goods_id = re.id;
					this.guige_type = Number(re.type);

					this.recommend_goods = re.recommend_goods ? re.recommend_goods : [];
					this.recommend_lessons = re.recommend_class ? re.recommend_class : [];
					let arr = [];
					if (re.imgs) {
						re.imgs.forEach(item => {
							let obj = {
								img: `${item.url}`
							};
							arr.push(obj);
						});
					}

					if (re.video) {
						let obj = {
							isVideo: true,
							video: re.video,
							video_poster: re.video_thumb,
							img: ''
						};
						arr.unshift(obj);
					}

					if (re.video_2) {
						let obj = {
							isVideo: true,
							video: re.video_2,
							video_poster: re.video_thumb2,
							img: ''
						};
						arr.unshift(obj);
					}
					this.swiper_list = arr;
				}
			} else {
				this.$toast(res.msg);
			}
			this.loading = false;
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
			this.cart_num = parseInt(res.data.shop_cart_goods_num) || 0;
			if (res.status && res.data && parseInt(res.data.shop_cart_goods_num) > 0) {
				// 购物车角标
				// wx.setTabBarBadge({
				//   index: 3,
				//   text: res.data.shop_cart_goods_num.toString()
				// })
			}
		}
	},
	watch: {
		guige_popup_show() {
			this.getCartList();
		},
		goods_id(to) {
			this.$Tool.SetRecordParameter({
				page: 'goods_list',
				content_type: 'goods',
				content_id: to
			});
		}
	},
	onShareAppMessage() {
		this.$Tool.SetRecordScene({
			page: 'share',
			content_type: 'share_page',
			content_id: this.detail.share_name || this.detail.product_name
		});
		return {
			title: this.detail.share_name || this.detail.product_name,
			path: `/pages/mall/detail/main?product_sn=${this.product_sn}&uid=${this.uid}&t=s`
		};
	},
	onUnload() {
		this.$Tool.SetBrowseID();
	}
};
</script>
<style lang="less" scoped>


.no-team {
	padding-top: 20rpx;

	&.right-team {
		padding-top: 0;
	}
}
.goods-detail {
	.title-panel,
	.group-panel,
	.recommend-panel {
		margin-bottom: 20rpx;
	}
	.title-panel {
		padding: 30rpx;
		.bg(#fff);
		.lh;
		.team-title {
			margin-right: 4rpx;
		}
		.price {
			margin-bottom: 11rpx;
		}

		.org-price {
			margin-bottom: 20rpx;
			.team-number {
				.w(98rpx);
				.h(30rpx);
				.lh(30rpx);
				.bg(#fb2142);
				.br(15rpx);
				.c(#fff);
				.fz(22rpx);
				display: inline-block;
				text-align: center;
			}
			.org-price-number {
				.c(#fb2142);
				.fz(24rpx);
				margin-left: 20rpx;
			}
		}

		.title {
			.fz(32rpx);
			.c(#333);
			font-weight: bold;
		}
		.desc {
			margin-top: 30rpx;
			.fz(26rpx);
			.c(#999);
		}
		.price-row {
			text-align: left;
			.key {
				width: 170rpx;
				display: inline-block;
				vertical-align: middle;
			}
			.value {
				font-size: 40rpx;
			}
			&.disabled {
				.value {
					font-size: 36rpx;
				}
			}
		}
	}

	.group-panel {
		padding: 0 30rpx;
		.bg;
		font-size: 30rpx;
		color: #333333;
		.line {
			.lh(80rpx);
		}
	}
	.detail-panel {
		padding-top: 1px;
		.bg;
		.title {
			margin: 30rpx;
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
		}
		.video-box {
			margin: 30rpx;
			video,
			img {
				.w(690rpx);
				.h(460rpx);
			}
		}
		/deep/ .wxParse {
			.p {
				margin: 0 !important;
			}
		}
	}
	.recommend-panel {
		.scroll-x {
			margin-right: 20rpx;
			padding: 20rpx;
		}
		.no-recommend {
			padding-top: 20rpx;
			.w(100%);
			font-size: 30rpx;
			color: #999;
			text-align: center;
		}
	}
	.bottom-fixed,
	.bottom-fixed-h {
		height: 120rpx;
	}
	.bottom-fixed {
		padding-right: 30rpx;
		.bg;
		border-top: 1rpx solid @border-color-primary;
		.left {
			flex-shrink: 0;
			box-sizing: border-box;
			padding: 0 46rpx;
			width: 260rpx;
			font-size: 24rpx;
			color: #999999;
			.iconfont {
				margin-bottom: 10rpx;
				.f(40);
			}
			.nav {
				position: relative;
				line-height: 1;
				text-align: center;
			}
			.num {
				position: absolute;
				top: -10rpx;
				right: 0;
				font-size: 24rpx;
				color: @price-color;
			}
			button {
				.bg;
				line-height: 1;
				font-size: 24rpx;
				color: #999999;
				border-radius: 0;
			}
		}
	}
}
</style>
