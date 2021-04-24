<template>
	<div class="search">
		<div class="top-fixed">
			<Search :placeholder="placeholder" @search="onSearch"></Search>
			<template v-if="type === 0 || type === 2">
				<Tab @clickTab="clickTab" :tab_list="tab_list" :tab_index.sync="tab_index"></Tab>
			</template>
		</div>
		<div class="search-height"></div>
		<div class="tab-height" v-if="type === 0 || type === 2"></div>
    <div class="list" v-if="target.list.length > 0">
      <div v-for="(item, index) in target.list" :key="index">
        <template v-if="target_name === 'products'">
          <ProductItem :item="item"></ProductItem>
        </template>
        <template v-if="target_name === 'consultants'">
          <ConsultantItem :item="item"></ConsultantItem>
        </template>
        <template v-if="target_name === 'classes'">
          <ClassItem :item="item"></ClassItem>
        </template>
      </div>
    </div>
		<template v-if="target.list.length === 0">
			<NoData></NoData>
		</template>
	</div>
</template>

<script>
import Search from '@/components/common/search/search-input'
import Tab from '@/components/common/tab/tab'
import NoData from '@/components/common/no-data/no-search'
import ProductItem from '@/components/common/card/goods'
import ConsultantItem from '@/components/common/card/consults'
import ClassItem from '@/components/common/card/course'

export default {
  components: {
    Search,
    Tab,
    NoData,
    ProductItem,
    ConsultantItem,
    ClassItem
  },
  data () {
    return {
      type: 0, // 0: 全部（首页）1：产品（分类） 2：顾问，课堂（课堂）
      search_val: '', // 搜索内容
      tabs: [
        [
          {
            name: '产品',
            type: 1,
            target: 'products'
          },
          {
            name: '顾问',
            type: 2,
            target: 'consultants'
          },
          {
            name: '课堂',
            type: 3,
            target: 'classes'
          }
        ],
        [
          {
            name: '产品',
            type: 1,
            target: 'products'
          }
        ],
        [
          {
            name: '顾问',
            type: 2,
            target: 'consultants'
          },
          {
            name: '课堂',
            type: 3,
            target: 'classes'
          }
        ]
      ],
      tab_index: 0, // 当前tab
      placeholders: [
        '产品、服务专员、课堂',
        '产品',
        '服务专员、课堂'
      ],
      placeholder: '',
      products: {
        list: [],
        page: 1,
        total_pages: 1,
        limit: 10
      },
      consultants: {
        list: [],
        page: 1,
        total_pages: 1,
        limit: 10
      },
      classes: {
        list: [],
        page: 1,
        total_pages: 1,
        limit: 10
      },
      target_name: ''
    }
  },
  computed: {
    tab_list: function () {
      return this.tabs[this.type]
    },
    target: function () {
      let val = this.tab_list[this.tab_index].target
      this.target_name = val
      return this[val]
    }
  },
  onLoad () {
    Object.assign(this, this.$options.data())
  },
  mounted () {
    this.type = Number(this.$root.$mp.query.type)
    this.placeholder = this.placeholders[this.type]
  },
  methods: {
    clickTab (index) {
      if (this.search_val) {
        if (this.target.list.length === 0) {
          this.search()
        }
      }
    },
    onSearch (val) {
      // 每次更换搜索词时，重新搜索
      if (this.search_val !== val) {
        this.search_val = val
        this.products.list = []
        this.consultants.list = []
        this.classes.list = []
        this.search()
      }
    },
    async search () {
      let api = 'search' + this.target_name.substring(0, 1).toUpperCase() + this.target_name.substring(1)
      console.log('api', api)
      let args = {
        url: this.api(api),
        data: {
          keywords: this.search_val,
          page: this.target.page,
          limit: this.target.limit
        },
        loading: true,
        title: '搜索中...'
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data
        if (this.target_name === 'classes') {
          this.target.list = this.target.list.concat(re.items)
        } else {
          this.target.list = this.target.list.concat(re[this.target_name])
        }
        this.target.total_pages = re.total_pages
      } else {
        this.$toast(res.msg)
      }
    },
    loadMore () {
      if (this.target.total_pages > this.target.page) {
        this.target.page++
        this.search()
      }
    }
  },
  onReachBottom () {
    this.loadMore()
  }
}
</script>
<style lang="less" scoped>
.search {
	.list {
		margin: 20rpx 24rpx;
		flex: 1;
	}
}
</style>

