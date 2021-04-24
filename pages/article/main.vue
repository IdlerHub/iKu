<template>
	<div class="article" v-if="!loading">
		<div class="hd border-1px-b">{{ title }}</div>
		<div class="bd"><wxParse :content="content"></wxParse></div>
		<MenuShare></MenuShare>
		<MenuCart></MenuCart>
	</div>
</template>

<script>
import MenuShare from '@/components/common/menu/share';
import MenuCart from '@/components/common/menu/cart';
import wxParse from '@/components/common/wxParse/wxParse';
import { Pageshare } from '@/utils/Mixin';
export default {
	mixins: [Pageshare],
	components: {
		MenuShare,
		MenuCart,
		wxParse
	},
	data() {
		return {
			loading: true,
			id: 0,
			title: '',
			content: '',
			width: 375,
			share_name: ''
		};
	},
	onLoad() {
		Object.assign(this, this.$options.data());
		const that = this;
		const query = wx.createSelectorQuery();
		query
			.select('.bd')
			.boundingClientRect(function(res) {
				that.width = res.width;
			})
			.exec();
	},
	onShow() {
		this.id = this.$root.$mp.query.id;
		this.getArticle();
	},
	methods: {
		async getArticle() {
			let args = {
				url: this.api('getArticle'),
				data: {
					id: this.id
				},
				loading: this.loading
			};
			let res = await this.httpGet(args);
			if (res.status) {
				let re = res.data;

				this.title = re.title;
				this.content = re.content;
				this.share_name = re.share_name || '';
			} else {
				uni.showToast({
					title: res.msg || '系统繁忙,请稍候',
					icon: 'none'
				});
			}
			this.loading = false;
		}
	},
	onShareAppMessage() {
		this.$Tool.SetRecordScene({
			page: 'share',
			content_type: 'share_page',
			content_id: this.share_name || this.title
		});
		return {
			title: this.share_name || this.title,
			path: `/pages/article/main?id=${this.id}&uid=${this.uid}&t=s`
		};
	}
};
</script>
<style lang="less" scoped>

.article {
	padding: 0 44rpx;
	.bg;
	min-height: 100vh;
	.hd {
		padding-top: 30rpx;
		padding-bottom: 40rpx;
		font-weight: bold;
		font-size: 36rpx;
		color: @font-color-primary;
	}
}
</style>
