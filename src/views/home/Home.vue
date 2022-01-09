<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar> <!-- 顶部 -->
		<tab-control 
			:titles="['流行', '新款', '精选']" 
			ref="tabControl1" 
			@tabClick="tabClick" 
			class="tab-control" 
			v-show="isTabFixd" /> <!-- 下拉的项目选择 -->
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
			@pullingUp="loadMore">
			<!-- 滚动组件 传入值为3 -->
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/> <!-- 轮播图 -->
			<recommend-view :recommends="recommends" /> <!-- 页面推荐 -->
			<feature-view /> <!-- 本周流行 -->
			<tab-control 
				:titles="['流行', '新款', '精选']" 
				ref="tabControl2" 
				@tabClick="tabClick" /> <!-- 下拉的项目选择 -->
			<goods-list :goods="showGoods" /> <!-- 下拉的图片等 -->
		</scroll>
		<back-top @click.native="backTopClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar.vue'
	import TabControl from "@/components/content/tabControl/TabControl";
	import GoodsList from '@/components/content/goods/GoodsList'
	import Scroll from '@/components/common/scroll/Scroll'

	import HomeSwiper from "./childComps/HomeSwiper";
	import RecommendView from "./childComps/RecommendView";
	import FeatureView from "./childComps/FeatureView";

	import {
		getHomeMultidata,
		getHomeGoods
	} from "@/network/home.js";
	import {
		debounce
	} from "@/common/utils";
	import {itemListenerMixin, backTopMixin} from '@/common/mixin.js'

	export default {
		name: "Home",
		components: {
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			HomeSwiper,
			RecommendView,
			FeatureView
		},
		mixins: [itemListenerMixin,backTopMixin],	//高级函数混入
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				},
				currentType: 'pop',
				tabOffsetTop: 0,
				isTabFixd: false,
				saveY: 0
			}
		},
		created() { //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
			// 2. 请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() { //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
			// 1. 发送多个网络请求
			this.getHomeMultidata()
		},
		methods: {
			tabClick(index) { //下拉的项目选择
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break;
					case 1:
						this.currentType = 'new'
						break;
					case 2:
						this.currentType = 'sell'
						break;
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			contentScroll(position) { //传递Scroll的实时下拉位置
				//1.判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000
				//2.决定tabControl是否吸顶(position: fixed)
				this.isTabFixd = (-position.y) > this.tabOffsetTop
			},
			loadMore() { //下拉加载以及局部scroll刷新
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {	//获取tabControl的offsetTop
				//所有的组件都有一个属性$el:用于获取子组件中的元素
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
				
			},
			getHomeMultidata() { //轮播图
				getHomeMultidata().then(response => {
					// console.log(response); // this.result = response.data
					this.$nextTick(() => {
						this.banners = response.data.banner.list // 保存数据
						this.recommends = response.data.recommend.list
					})
					
				})
			},
			getHomeGoods(type) { //循环下拉图
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// let array = res.data.list const NewArray = [...res.data.list, ...array]
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		activated() {
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
		},
		deactivated() {
			//1.保存当前Y值
			this.saveY = this.$refs.scroll.getScrollY()
			//2.取消全局事件的监听
			this.$bus.$off('itemImageLoad', this.itemImgListener)
		}
	}
</script>

<style scoped>
	#home {
		/*padding-top: 44px;*/
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		/*在我们使用浏览器原生滚动时,为了让导航不跟着一起滚动*/
		/*position: fixed;*/
		/*left: 0;*/
		/*right: 0;*/
		/*top: 0;*/
		/* z-index: 1; */
	}

	/*.content {*/
	/*  position: absolute;*/
	/*  overflow: hidden;*/
	/*  top: 44px;*/
	/*  bottom: 49px;*/
	/*  left: 0;*/
	/*  right: 0;*/
	/*}*/
	.content {
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

	.tab-control {
		position: relative;
		z-index: 9;
	}

	.content {
		height: calc(100% - 44px - 49px);
		overflow: hidden;
		/*margin-top: 44px!important;*/
	}

	/*.content {*/
	/*  height: calc(100% - 93px);*/
	/*  overflow: hidden;*/
	/*  margin-top: 44px!important;*/
	/*}*/
</style>
