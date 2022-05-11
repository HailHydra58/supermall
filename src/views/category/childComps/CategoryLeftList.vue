<template>
	<div id="leftList">
		<ul>
			<li class="biankuang" v-for="item in this.leftList">{{item}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
	  name: 'CategoryLeftList',
		props: {
			leftList: {
				type: Array,
				default: []
			},
		},
	}
</script>
<style scoped>
	#leftList {
		width: 77px;
		
	}
	.biankuang {
		width: 77px;
		height: 85px;
		font-size: 13px;
		line-height: 85px;
		text-align: center;
	}
</style>
