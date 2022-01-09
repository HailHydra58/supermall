<template>
	<div class="buttom-bar">
		<div class="check-button">
			<check-button @click.native="checkClick" :is-checked="isSelectAll" id="button" />
			<span>全选</span>
		</div>
		<div class="price">
			合计:{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去结算: {{checkLength}}
		</div>
	</div>
</template>
<script>
	import CheckButton from "@/components/content/checkButton/CheckButton.vue"

	import {
		mapGetters
	} from 'vuex';

	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters([
				'cartList'
			]),
			totalPrice() {
				return "￥" + this.cartList.filter(item => {
					return item.checked //过滤购物车选中的
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0).toFixed(2)
				//toFixed(2)保留两位小数
			},
			checkLength() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				//购物车无物品时设置全选为false
				if (this.cartList.length == 0) {
					return false
				}
				
				//1.如果筛选出空的勾选数量为0则返回全选为true
				// return !(this.cartList.filter(item => !item.checked).length)
				
				//2.如果找不到空的勾选则返回全选为true
				return !this.cartList.find(item => !item.checked)
				
				//3.普通遍历
				// for (let item of this.cartList) {
				// 	if (!item.checked) {
				// 		return false
				// 	}
				// 		return true
				// }
			}
		},
		methods: {
			checkClick() {	//全选点击
				if(this.isSelectAll) {	//全部选中
					this.cartList.forEach(item => item.checked = false)
				} else {	//部分||全部不选中
					this.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick() {
				if (!this.isSelectAll) {
					this.$toast.show('请选择购买的商品', 2000)
				}
			}
		}
	}
</script>
<style scoped>
	.buttom-bar {
		display: flex;
		line-height: 40px;
		padding-left: 5px;
		height: 40px;
		font-size: 14px;
		background-color: #eee;
	}

	#button {
		margin-top: 10px;
	}

	.check-button {
		display: flex;
	}

	.price {
		flex: 1;
		margin-left: 20px;
	}

	.calculate {
		padding-left: 6px;
		padding-right: 6px;
		background: #8F3F71;
		color: #fff;
	}
</style>
