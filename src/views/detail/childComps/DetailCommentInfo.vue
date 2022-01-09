<template>
	<div id="commentInfo" v-if="Object.keys(commentInfo).length !== 0">
		<div class="title">
			<!-- 顶部 -->
			<span>用户评价</span>
			<span id="more">更多</span>
		</div>
		<div class="info">
			<!-- 评价 -->
			<div class="u-info">
				<img :src="commentInfo.user.avatar" />
				<span>{{commentInfo.user.uname}}</span>
			</div>
			<div>
				<div class="content">{{commentInfo.content}}</div>
				<p class="content-info">
					{{commentInfo.created | dateShow}} {{commentInfo.style}}
				</p>
			</div>
		</div>
		<div class="shop-reply" v-if="commentInfo.explain !== null">
			{{commentInfo.explain}}
		</div>
		<div class="commentInfo-img" v-if="commentInfo.images !== null">
			<!-- 图片为空不显示 -->
			<img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
		</div>
	</div>
</template>
<script>
	import {
		formatDate
	} from '@/common/utils.js'

	export default {
		name: 'DetailCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		filters: {
			dateShow(value) {
				//1.将时间戳转成Date对象
				const data = new Date(value * 1000)
				//2.将data进行格式化
				return formatDate(data, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>
<style scoped>
	#commentInfo {
		font-size: 0.65rem;
		padding: 0.42rem 0.34rem;
	}

	.title {
		padding: 0.42rem 0;
		padding-bottom: 0.8rem;
		border-bottom: 0.08rem solid rgba(128, 128, 128, 0.3);
		position: relative;
	}

	#more {
		position: absolute;
		right: -4px;
		top: 0px;
	}

	#more::after {
		content: "";
		background: url("../../../assets/img/detail/right_arrow.svg") 0 0/1.06rem 1.06rem;
		display: inline-block;
		position: relative;
		top: 0.26rem;
		width: 1.06rem;
		height: 1.06rem;
	}

	.u-info {
		padding: 0.42rem 0;
		line-height: 27px;
		display: flex;
	}

	.u-info img {
		width: 27px;
		height: 27px;
		border-radius: 50%;
		border: 0.04rem solid rgba(128, 128, 128, 0.3);
	}

	.u-info span {
		margin-left: 0.42rem;
	}

	.content {
		line-height: 1rem;
		color: #666;
	}

	.content-info {
		color: #999;
		padding: 0.3rem 0;
	}

	.shop-reply {
		border-top: 0.04rem solid rgba(128, 128, 128, 0.4);
		padding: 0.5rem 0;
		color: gray;
		line-height: 0.8rem;
	}

	.commentInfo-img img {
		margin-right: 0.21rem;
		width: auto;
		height: 4.26rem;
	}
</style>
