<template>
	<div class="detail">
		<detail-nav-bar @titleClick="titleClick" ref="navBar"/>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="shop" />
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :paramInfo="paramInfo" ref="param" />
			<detail-comment-info :commentInfo="commentInfo" ref="comment" />
			<goods-list :goods="recommends" ref="goodsList" />
		</scroll>
		<back-top @click.native="backTopClick" v-show="isShowBackTop" />
		<detail-bottom-bar @addToCart="addToCart" />
		<!-- <toast :is-show="show" :message="message" /> -->
	</div>
</template>
<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	import Scroll from '@/components/common/scroll/Scroll.vue'
	import GoodsList from '@/components/content/goods/GoodsList.vue'
	import Toast from '@/components/common/toast/Toast.vue'

	import {
		getDetail,
		getRecommend,
		Goods,
		Shop,
		GoodsParam
	} from '@/network/detail.js'
	import {
		debounce
	} from '@/common/utils';
	import {
		itemListenerMixin, 
		backTopMixin
	} from '@/common/mixin.js'
	
	import { mapActions } from 'vuex'

	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList,
			// Toast
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0,
				// message: null,
				// show: false
			}
		},
		created() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				const data = res.result
				//1.获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages
				//2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//3.创建商铺信息的对象
				this.shop = new Shop(data.shopInfo)
				//4.保存商品的详情数据
				this.detailInfo = data.detailInfo
				//5.获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				//6.去除评论的信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
			})
			//3.请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			//4.给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
			this.getThemeTopY = debounce(() => {
				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop - 44)
				this.themeTopYs.push(Number.MAX_VALUE)
			}, 100)
		},
		mounted() {
			// //监听item中图片加载完成
			// const refresh = debounce(this.$refs.scroll.refresh, 200) //调用防抖方法,传入延迟时间
			// this.$bus.$on('detailImageLoad', () => {
			// 	refresh()
			// })
		},
		destroyed() {
			//取消全局事件的监听
			this.$bus.$off('itemImageLoad', this.itemImgListener)
		},
		methods: {
			...mapActions([
				'addCart'
			]),
			imageLoad() { //监听商品类的图片加载
				this.refresh() //防抖函数的刷新
				this.getThemeTopY() //防抖函数的获取4个类的offSetTop
			},
			titleClick(index) { //top的导航栏点击
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
			},
			contentScroll(position) {
				//1.获取y值和主题值的个数
				const y = -position.y
				let length = this.themeTopYs.length
				//2.position的y和主题中的值对比	(若采用有最大值法可以lenght-1减少一次遍历)
				for (let i = 0; i < length-1; i++) {
					//无最大值法↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
					//最后一个数值因为没有后者做对比了,所以得加一个"||"条件来出发最后一个数值
					//防止重复更改添加 "this.currentIndex !== i"
					// if(this.currentIndex !== i && ((this.themeTopYs[i] < y && y < this.themeTopYs[i + 1]) 
					// 	|| (i == length - 1 && y > this.themeTopYs[i]))) {
					// 	this.currentIndex =	i
					// 	this.$refs.navBar.currentIndex = i
					// }
					
					//有最大值法↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
					if(this.currentIndex !== i && (this.themeTopYs[i] < y && y < this.themeTopYs[i+1])) {
						this.currentIndex =	i
						this.$refs.navBar.currentIndex = i
					}
				}
				//3.判断BackTop是否显示
				this.isShowBackTop = y > 1000
			},
			addToCart() {
				//1.获取购物车需要点击的信息
				const product ={}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				//2.将商品添加到购物车
				// this.$store.commit('addCart', product)	//mutations用commit
				
				// this.$store.dispatch('addCart', product).then(res => {	//actions用dispatch
				// 	console.log(res)
				// })
				
				this.addCart(product).then(res => {
					// this.show = true
					// this.message = res
					// setTimeout(res => {
					// 	this.show = false
					// }, 1500)
					
					this.$toast.show(res, 1500)
				})
			}
		}
	}
</script>
<style scoped>
	.detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}

	.content {
		height: calc(100% - 44px - 49px);
	}
</style>
