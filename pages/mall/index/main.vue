<template>
	<div class="mall" v-if="!loading">
		<template v-if="saomajin">
			<Panel :member="member" @submit="submit"></Panel>
		</template>
		<template v-else>
			<SearchBar placeholder="搜索产品" @clickSearch="toSearch"></SearchBar>
			<Banner :banner="cate_list[left_index].banner" v-if="cate_list[left_index] && cate_list[left_index].banner"></Banner>
		</template>

		<div class="bottom">
			<ScrollLeft :leftToRight="leftToRight" :list="cate_list"></ScrollLeft>
			<!-- 1期 -->
			<!-- <ScrollRight :rightToLeft="rightToLeft" :list="goods_list" :loadSuccess="loadSuccess"></ScrollRight> -->
			<!-- 2期 -->
			<ScrollRightV2 :rightToLeft="rightToLeft" :list="goods_list" :loadSuccess="loadSuccess" :showPrice="showPrice" :identity="identitykey"></ScrollRightV2>
		</div>
		<MenuGroup type="4"></MenuGroup>
	</div>
</template>
<script>
import ScrollLeft from '@/components/mall/index/scrollLeft';
import ScrollRight from '@/components/mall/index/scrollRight';
import ScrollRightV2 from '@/components/mall/index/scrollRight-v2';
import SearchBar from '@/components/common/search/search-default';
import MenuGroup from '@/components/common/menu/menuGroup';
import Banner from '@/components/common/banner/banner';
import Panel from '@/components/common/share-in/panel';
import { mapState } from 'vuex';

import { Pageshare } from '@/utils/Mixin';
export default {
	mixins: [Pageshare],
	components: {
		ScrollLeft,
		ScrollRight,
		ScrollRightV2,
		SearchBar,
		Banner,
		MenuGroup,
		Panel
	},
	data() {
		return {
			loading: true,
			cate_list: [],
			selected_tab: 0, // 左栏
			leftToRight: [],
			rightToLeft: [],
			goods_list: [],
			member: {}, // 专员信息
			loadSuccess: false,
			saomajin: false,
			showPrice: true,
			sharePageKey: 'goods',
			identitykey: ''
		};
	},
	mounted() {
		if (uni.getStorageSync('code')) {
			const code = parseInt(uni.getStorageSync('code')) || 0;
			this.saomajin = code === 3;
			this.showPrice = !(code === 1);
			if (this.saomajin) {
				this.getEmployeeInfo();
			}
			wx.removeStorageSync('code');
			wx.removeStorageSync('employee');
		}

		wx.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},
	onShow() {
		this.getAllGoods();
		this.getCartList();
		this.$Tool.SetRecordParameter({ page: 'goods_list' });
		const identitykey = wx.getStorageSync('identity');
		this.identitykey = identitykey || this.identitykey;
	},
	computed: {
		...mapState('Scroll', ['left_index'])
	},
	methods: {
		// 提交问卷
		submit() {
			this.saomajin = false;
		},
		// 获取专员信息
		async getEmployeeInfo() {
			let args = {
				url: this.api('getConsultantDetailV2'),
				data: {
					employee_no: uni.getStorageSync('employee')
				}
			};
			let res = await this.get(args);
			if (res.status) {
				this.member = res.data;
			}
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/main?type=1'
			});
		},
		// 获取所有商品
		async getAllGoods() {
			let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
			let args = {
				url: this.api('getShopCat'),
				data: {
					is_need_product: 1,
					open_id: openId
				},
				loading: this.loading
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;

				this.cate_list = re.cate;
				let right = 0;
				let arr = [];
				this.cate_list.forEach((item, i) => {
					if (item.product_list) {
						arr = arr.concat(item.product_list);
						// this.goods_list = this.goods_list.concat(item.product_list)
						this.setRightToLeft(i, item.product_list.length);
						this.setLightToRight(i, right);
						right += item.product_list.length;
					}
				});
				this.goods_list = arr;
			} else {
				this.$toast(res.msg);
			}
			this.loading = false;
			this.loadSuccess = true;
		},
		// 右栏对应的左栏
		setRightToLeft(left, len) {
			let start = this.rightToLeft.length;

			for (let i = 0; i < len; i++) {
				this.rightToLeft[start + i] = left;
			}
		},
		// 左栏对应的右栏
		setLightToRight(left, right) {
			this.leftToRight[left] = right;
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
				let num = parseInt(res.data.shop_cart_goods_num) || '';
				// 购物车角标
				wx.setTabBarBadge({
					index: 3,
					text: num.toString()
				});
			} else {
				wx.removeTabBarBadge({
					index: 3
				});
			}
		}
	},
	watch: {},
	onShareAppMessage() {
		this.$Tool.SetRecordScene({
			page: 'share',
			content_type: 'share_page',
			content_id: this.sharePageTitle
		});
		return {
			title: this.sharePageTitle,
			path: `/pages/mall/index/main?uid=${this.uid}&t=s`
		};
	},
	onPullDownRefresh() {
		uni.hideNavigationBarLoading(); // 完成停止加载
		uni.stopPullDownRefresh(); // 停止下拉刷新

		// this.onInit()
	},
	onUnload() {
		this.$Tool.SetBrowseID();
	}
};
</script>
<style lang="less" scoped>

.mall {
	position: fixed;
	.h(100vh);
	.w(100vw);
	top: 0;
	left: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.bottom {
		flex: 1;
		display: flex;
	}
}
</style>
