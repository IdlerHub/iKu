<template>
	<div class="classroom">
		<div class="top">
			<SearchBar placeholder="搜索服务专员" @clickSearch="toSearch"></SearchBar>
			<Banner :banner="banner"></Banner>
		</div>

		<div class="bottom" :style="bottomStyle">
			<!-- 分类 -->
			<ScrollLeft :list="cate_list" :chosen_index="selected_tab" :customStyle="customStyle" @changeTab="changeTab"></ScrollLeft>

			<!-- 专员 -->
			<ScrollRight
				v-if="selected_tab === 0"
				:list="cate_list[selected_tab].list || []"
				:loadSuccess="loadSuccess"
				:customStyle="customStyle"
				@MoreGoods="loadMore"
			></ScrollRight>

			<!-- 教程 -->
			<ScrollClasses
				v-if="selected_tab !== 0"
				:list="cate_list[selected_tab].list || []"
				:loadSuccess="loadSuccess"
				:customStyle="customStyle"
				@MoreClasses="loadMore"
			></ScrollClasses>
		</div>
		<MenuGroup></MenuGroup>
	</div>
</template>
<script>
import ScrollLeft from '@/components/common/scroll/scrollLeft';
import ScrollRight from '@/components/classroom/scrollRight';
import ScrollClasses from '@/components/classroom/scrollClasses';
import SearchBar from '@/components/common/search/search-default';
import MenuGroup from '@/components/common/menu/menuGroup';
import Banner from '@/components/common/banner/banner';
import Panel from '@/components/common/share-in/panel';
import { Pageshare } from '@/utils/Mixin';
export default {
	mixins: [Pageshare],
	components: {
		ScrollLeft,
		ScrollRight,
		SearchBar,
		Banner,
		ScrollClasses,
		MenuGroup,
		Panel
	},
	data() {
		return {
			init: false,
			selected_tab: 0,
			cate_list: [
				{
					list: []
				}
			],
			loadSuccess: false,
			banner: '',
			page: 1,
			total_pages: 1,
			limit: 10,
			screenHeight: 0,
			topHeight: 189,
			sharePageKey: 'employee'
		};
	},
	mounted() {
		wx.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},
	onShow() {
		this.onInit();
		this.getSelectInfo();
	},
	methods: {
		onInit() {
			this.page = 1;
			if (!this.init) {
				this.cate_list[0].list = [];
			}
			this.getCates();
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/main?type=2'
			});
		},
		changeTab(i) {
			this.selected_tab = i;
			this.getConsultants();
		},
		async getCates() {
			let args = {
				url: this.api('getCates'),
				loading: true
			};
			let res = await this.httpGet(args);
			if (res.status) {
				this.cate_list = res.data;
				let target = this.$root.$mp.query.cate_sn;

				this.cate_list.length &&
					this.cate_list.forEach((item, i) => {
						item.list = [];
						if (target === item.cate_sn + '') {
							this.selected_tab = i;
						}
					});

				this.getConsultants();
			}

			this.getSelectInfo();
		},
		async getConsultants() {
			this.loadSuccess = false;
			let args = {
				url: this.api('getConsultants'),
				data: {
					page: this.page,
					limit: this.limit,
					cate_sn: this.cate_list[this.selected_tab].cate_sn
				},
				loading: this.cate_list[this.selected_tab].list.length === 0
			};
			let res = await this.httpGet(args);
			if (res.status) {
				let re = res.data;

				if (this.page === 1) {
					this.banner = re.banner;
					this.cate_list[this.selected_tab].list = re.lists;
				} else {
					let list = this.cate_list[this.selected_tab].list;
					this.cate_list[this.selected_tab].list = list.concat(re.lists);
				}
				this.sharePageTitle = re.share_name;
				this.total_pages = re.total_pages;
			} else {
				uni.showToast({
					title: res.msg ? res.msg : '系统繁忙,请稍候',
					icon: 'none'
				});
			}
			this.init = true;
			this.loadSuccess = true;
			this.getSelectInfo();
		},
		loadMore() {
			if (this.total_pages > this.page) {
				this.page++;
				this.getConsultants();
			}
		},
		getSelectInfo() {
			const query = wx.createSelectorQuery();
			query.select('.top').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(res => {
				this.topHeight = parseFloat(res[0].height).toFixed(2);
			});
		}
	},
	computed: {
		bottomStyle() {
			if (this.screenHeight > this.topHeight) {
				return `height:${this.screenHeight - this.topHeight - 50}px;`;
			}

			return '';
		},
		customStyle() {
			return `height:100%;box-sizing: border-box;`;
		}
	},
	onShareAppMessage() {
		this.$Tool.SetRecordScene({
			page: 'share',
			content_type: 'share_page',
			content_id: this.sharePageTitle
		});
		return {
			title: this.sharePageTitle,
			path: `/pages/classroom/index/main?uid=${this.uid}&t=s`
		};
	},
	onPullDownRefresh() {
		uni.hideNavigationBarLoading(); // 完成停止加载
		uni.stopPullDownRefresh(); // 停止下拉刷新

		this.onInit();
	}
};
</script>
<style lang="less" scoped>

.classroom {
	// position: fixed;
	.h(100vh);
	.w(100vw);
	box-sizing: border-box;
	// top: 0;
	// left: 0;
	// overflow: hidden;
	display: flex;
	flex-direction: column;

	.bottom {
		// flex: 1;
		display: flex;
	}
}
</style>
