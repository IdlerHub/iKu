<template>
	<div class="invoice">
		<div class="heading">发票</div>
		<div class="flex-c">
			<div class="btn" :class="[index == tab_index ? 'active' : 'default']" v-for="(item, index) in tab_list" :key="index" @click="switchTab(index)">{{ item.name }}</div>
		</div>
		<template v-if="tab_index == 0">
			<div class="input-box flex-bc">
				<input v-model="person_title" type="text" class="flex-1" placeholder="请输入抬头" />
				<template v-if="list && list.length > 0">
					<picker class="picker flex-cc" :value="person_picker_value" :range="list" range-key="title" @change="personChange"><i class="iconfont icon-right"></i></picker>
				</template>
			</div>
		</template>
		<template v-if="tab_index == 1">
			<div class="input-box flex-bc">
				<input v-model="company_title" type="text" class="flex-1" placeholder="请选择企业名称" />
				<template v-if="list && list.length > 0">
					<picker class="picker flex-cc" :value="company_picker_value" :range="list" range-key="title" @change="companyChange">
						<i class="iconfont icon-right"></i>
					</picker>
				</template>
			</div>
			<div class="input-box flex-bc"><input v-model="company_code" type="text" class="flex-1" placeholder="请输入企业统一社会信用代码" /></div>
		</template>
		<div class="bottom-fixed"><Btn name="确定" @clickBtn="onAddInvoice"></Btn></div>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';

export default {
	components: {
		Btn
	},
	data() {
		return {
			tab_list: [
				{
					type: 1,
					name: '个人',
					list: []
				},
				{
					type: 2,
					name: '单位',
					list: []
				}
			],
			tab_index: 0,
			// 个人
			person_picker_value: [],
			person_title: '',
			// 企业
			company_picker_value: [],
			company_title: '',
			company_code: ''
		};
	},
	computed: {
		list: function() {
			let arr = this.tab_list[this.tab_index].list;
			return arr;
		}
	},
	onLoad() {
		Object.assign(this, this.$options.data());
	},
	mounted() {
		this.getInvoiceRecord();
	},
	methods: {
		switchTab(index) {
			this.tab_index = index;
			let target = this.tab_list[this.tab_index].list;
			if (!target || target.length === 0) {
				this.getInvoiceRecord();
			}
		},
		personChange(e) {
			let val = e.detail.value;
			this.person_picker_value = val;
			this.person_title = this.list[val].title;
		},
		companyChange(e) {
			let val = e.detail.value;
			this.company_picker_value = val;
			this.company_title = this.list[val].title;
			this.company_code = this.list[val].code;
		},
		onAddInvoice() {
			if (this.tab_index === 0) {
				if (!this.person_title) {
					this.$toast('请输入抬头');
				} else {
					this.addInvoice();
				}
			}
			if (this.tab_index === 1) {
				if (!this.company_title) {
					this.$toast('请输入企业名称');
				} else if (!this.company_code) {
					this.$toast('请输入企业统一社会信用代码');
				} else {
					this.addInvoice();
				}
			}
		},
		async getInvoiceRecord() {
			let target = this.tab_list[this.tab_index];
			let args = {
				url: this.api('getInvoiceRecord'),
				data: {
					type: target.type
				}
			};
			let res = await this.post(args);

			if (res.status) {
				let re = res.data;
				if (re.items) {
					target.list = re.items;
				}
			} else {
				this.$toast(res.msg);
			}
		},
		async addInvoice() {
			let type = this.tab_index + 1;
			let args = {
				url: this.api('addInvoice'),
				data: {
					type: type,
					title: this.tab_index === 0 ? this.person_title : this.company_title,
					code: this.tab_index === 0 ? '' : this.company_code
				}
			};
			let res = await this.post(args);

			if (res.status) {
				let re = res.data;
				// 要把发票类型，id 传到确认订单页
				wx.setStorage({
					key: 'invoice',
					data: {
						type: type,
						id: re
					}
				});
				this.$toast('提交成功', 'success');
				setTimeout(() => {
					this.$nav('back');
				}, 1500);
			} else {
				this.$toast(res.msg);
			}
		}
	}
};
</script>
<style lang="less" scoped>

.invoice {
	box-sizing: border-box;
	padding: 30rpx;
	min-height: 100vh;
	.bg;
	.heading {
		margin-bottom: 40rpx;
		font-weight: bold;
		font-size: 32rpx;
		color: #333333;
	}
	.btn {
		margin-right: 20rpx;
		margin-bottom: 40rpx;
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 32rpx;
		text-align: center;
		.br(30rpx);
	}
	.default {
		color: #333333;
		.btn-border(30rpx, @border-color-primary);
	}
	.active {
		.bg(@theme-color);
		.c;
	}
	.input-box {
		box-sizing: border-box;
		margin-bottom: 20rpx;
		padding-left: 30rpx;
		height: 90rpx;
		background: #f4f4f4;
		font-size: 32rpx;
		border-radius: 45rpx;
		.picker {
			align-self: stretch;
			padding: 0 30rpx;
		}
	}
	.bottom-fixed {
		padding: 20rpx 30rpx;
	}
}
</style>
