import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations.js"
import actions from "./actions.js"
import getters from "./getters.js"

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
	state: {	//相当于data
		cartList: []
	},
	mutations,//mutations唯一的目的就是修改state中状态,mutations中的每一个方法尽可能完成的事情比较单一一点
	actions,	//方法
	getters	//相当于计算属性
})

//3.挂载Vue实例上	
export default store