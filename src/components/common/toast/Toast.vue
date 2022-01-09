<template>
	<div class="toast" v-show="isShow">
		<p>{{message}}</p>
	</div>
</template>
<script>
	export default {
	  name: 'Toast',
		// props: {
		// 	isShow: {
		// 		type: Boolean,
		// 		default: false
		// 	},
		// 	message: {
		// 		type: String,
		// 		default: null
		// 	}
		// },
		data() {
			return {
				message: '',
				isShow: false
			}
		},
		methods: {
			show(message, duration = 1500) {
				this.isShow = true
				this.message = message
				
				setTimeout(() => {	//多久后消失
					this.isShow = false
					this.message = ''
				}, duration)
			}
		}
	}
</script>
<style scoped>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 8px 10px;
		z-index: 999;
		color: #fff;
		background-color: rgba(0, 0, 0, .6);
	}
</style>
