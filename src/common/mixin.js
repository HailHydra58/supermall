import {
		debounce
	} from "@/common/utils";
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			refresh: null
		}
	},
	mounted() {	//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		//监听item中图片加载完成
		// const refresh = debounce(this.$refs.scroll.refresh, 200) //调用防抖方法,传入延迟时间
		// this.$bus.$on('homeImageLoad', () => {
		// 	refresh()
		// })
		
		this.refresh = debounce(this.$refs.scroll.refresh, 200) //调用防抖方法,传入延迟时间
		//对监听的事情进行保存
		this.itemImgListener = () => {
			this.refresh()
		}
		this.$bus.$on('itemImageLoad', this.itemImgListener)
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false,
		}
	},
	methods: {
		backTopClick() { //点击返回顶部
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
	}
}