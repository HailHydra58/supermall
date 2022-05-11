<template>
	<div id="category">
		<scroll class="content">
			<category-left-list :leftList="leftList" />
		</scroll>
	</div>
</template>

<script>
	import Scroll from '@/components/common/scroll/Scroll'
	
	import CategoryLeftList from './childComps/CategoryLeftList.vue'

	export default {
		name: "Category",
		components: {
			Scroll,
			CategoryLeftList
		},
		data() {
			return {
				leftList: ['正在流行', '上衣', '裤子', '裙子', '内衣', '女鞋', '男友', '包包', '运动', '配饰', '美妆', '个护', '家具', '百货', '母婴',
					'食品'
				]
			}
		},
	}
</script>

<style scoped>
	.content {
		height: calc(100% - 49px);
		overflow: hidden;
	}
</style>
