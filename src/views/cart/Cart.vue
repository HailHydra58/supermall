<template>
	<div class="cart">
		<!-- 导航栏 -->
		<nav-bar class="home-nav">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<!-- 商品的列表 -->
		<cart-list></cart-list>
		<!-- 底部汇总 -->
		<cart-bottom-bar />
	</div>
</template>

<script>
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	
	import NavBar from '@/components/common/navbar/NavBar.vue'

	import {
		mapGetters
	} from 'vuex';

	export default {
		name: "Cart",
		components: {
			CartList,
			CartBottomBar,
			NavBar
		},
		computed: {
			...mapGetters([
				'cartLength'
			])
		}
	}
</script>

<style scoped>
	.cart {
		height: 100vh
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>
