<template>
	<div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
		<table class="params-rule">
			<tr v-for="(tr,indey) in paramInfo.sizes[0]" :key="indey">
				<th>{{tr[0]}}</th>
				<td v-for="(td,indez) in tr.length - 1" :key="indez">{{tr[td]}}</td>
			</tr>
		</table>
		<table class="params-set">
			<tr v-for="(info,index) in paramInfo.infos">
				<th>{{info.key}}</th>
				<td>{{info.value}}</td>
			</tr>
		</table>
		<div class="info-img" v-if="paramInfo.image.length !== 0">
			<img :src="paramInfo.image" />
		</div>
	</div>
</template>
<script>
	export default {
	  name: 'DetailParamInfo',
		props: {
			paramInfo: {
				type: Object,
				default() {
					return {}
				}
			},
		}
	}
</script>
<style scoped>
.param-info {
  font-size: 14px;
  border-bottom: 4px solid rgba(128, 128, 128, 0.2);
}

.params-rule,
.params-set {
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  border-collapse: collapse; /* 可以合并邻近的边框，且可以让tr显示出边框 */
  margin: 10px auto;
  width: 40vh;
}
.params-rule tr,
.params-set tr {
  border-bottom: 0.5px solid rgba(128, 128, 128, 0.5);
}

.params-rule th {
  text-align: left;
  padding-right: 16px;
  white-space: nowrap;
}
.params-rule td {
  padding: 8px;
}

.params-set th {
  text-align: left;
  padding: 8px 56px 8px 0;
  white-space: nowrap;
}
.params-set td {
  color: var(--color-high-text);
}

.info-img img {
  width: 100%;
}
</style>

