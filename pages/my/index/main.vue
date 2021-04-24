<template>
	<div class="my">
		<Card :info="detail.people_info"></Card>
		<Features :detail="detail.people_info"></Features>
		<Orders :order="detail.order"></Orders>
		<NavList></NavList>
		<MenuGroup type="4"></MenuGroup>
		<div class="official-box"><OfficialAccount></OfficialAccount></div>
	</div>
</template>

<script>
import Card from '@/components/my/index/card';
import Features from '@/components/my/index/features';
import Orders from '@/components/my/index/orders';
import NavList from '@/components/my/index/list';
import MenuGroup from '@/components/common/menu/menuGroup';
import OfficialAccount from '@/components/common/official-account/official-account';

import { Pageshare } from '@/utils/Mixin';
export default {
	mixins: [Pageshare],
	components: {
		Card,
		Features,
		Orders,
		NavList,
		MenuGroup,
		OfficialAccount
	},
	data() {
		return {
			init: false,
			detail: '',
			sharePageKey: 'user'
			// isLoad:false
		};
	},
	onShow() {
		this.getCenter();
		this.$Tool.SetRecordParameter({ page: 'user' });
	},
	methods: {
		clickEvent() {
			uni.showToast({
				title: '精彩即将呈现',
				icon: 'none'
			});
		},
		async getCenter() {
			let args = {
				url: this.api('getCenter'),
				loading: !this.init,
				goLogin: false
				// checkCode:!this.isLoad
			};
			let res = await this.get(args);
			// this.isLoad = true

			if (res.status) {
				// this.detail = Object.assign(this.detail, res.data)
				this.detail = res.data;

				let uid = res.data && res.data.people_info && res.data.people_info.userid;

				wx.setStorage({
					key: 'uid',
					data: uid
				});
				wx.setStorageSync('identity', res.data.people_info.identity);
			} else {
				uni.showToast({
					title: res.msg ? res.msg : '系统繁忙,请稍候',
					icon: 'none'
				});
			}
			this.init = true;
		},
		// 我的分享码 第三阶段
		async recommendCode() {
			let args = {
				url: this.api('recommendCode'),
				loading: false
			};
			let res = await this.post(args);
			console.log('res', res);
		}
	},
	onPullDownRefresh() {
		wx.stopPullDownRefresh();
		this.getCenter();
	},
	onShareAppMessage() {
		this.$Tool.SetRecordScene({
			page: 'share',
			content_type: 'share_page',
			content_id: this.sharePageTitle
		});
		return {
			title: this.sharePageTitle,
			path: `/pages/my/index/main?uid=${this.uid}&t=s`
		};
	},
	onUnload() {
		this.$Tool.SetBrowseID();
	}
};
</script>
<style lang="less">

.my {
	margin: 0 30rpx;
	padding-bottom: 30rpx;
	.official-box {
		margin-top: 30rpx;
	}
	.caiNumber {
		.fz(40rpx);
	}
}
</style>
