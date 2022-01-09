<template>
	<div id="shop-item">
		<div class="item-selector">
			<check-button 
				@click.native="checkClick" 
				:is-checked="product.checked" 
				ref="checkButtonRef" 
			/>
		</div>
		<div class="item-img" @click="checkClick">
			<img :src="product.image" alt="商品图片" />
		</div>
		<div class="item-info" @click="infoClick(product)">
			<p class="item-title">{{ product.title }}</p>
			<p class="item-desc">{{ product.desc }}</p>
			<span class="item-price">${{ product.price }}</span>
			<span class="item-count">x{{ product.count }}</span>
		</div>
	</div>
</template>
<script>
	import CheckButton from "@/components/content/checkButton/CheckButton.vue"

	export default {
		name: 'CartListproduct',
		props: {
			product: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		components: {
			CheckButton
		},
		methods: {
			//信息点击事件
			infoClick(product) {
				this.$router.push("/detail/" + product.iid)
			},
			checkClick() {
				this.product.checked = !this.product.checked;
			}
		}
	}
</script>
<style scoped>
	#shop-item {
		width: 100%;
		/* height: 5.5rem; */
		height: 100px;
		border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
		display: flex;
		padding: 0.4rem;
		padding-left: 0rem;
	}

	.item-selector {
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 1px;
	}

	.item-img {
		width: 60px;
		height: 100%;
	}

	.item-img img {
		width: 100%;
		height: 100%;
		border-radius: 0.4rem;
	}

	.item-info {
		position: relative;
		width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
		margin-left: 0.4rem;
	}

	.item-info p {
		display: inline-block;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.item-title {
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
	}

	.item-desc {
		font-size: 0.6rem;
		color: gray;
	}

	.item-price {
		position: absolute;
		left: 0;
		bottom: 0.4rem;
		font-size: 15px;
		color: orangered;
	}

	.item-count {
		position: absolute;
		right: 0.4rem;
		bottom: 0.4rem;
		font-size: 13px;
	}
</style>
