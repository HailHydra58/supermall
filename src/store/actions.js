import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types.js';

export default {
	addCart(context, payload) { //payload新添加的商品
		return new Promise((resolve, reject) => {
			//1.查找之前数组中是否有该商品
			//用for循环找出↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			// let oldProduct = null
			// for (let item of state.cartList) {
			// 	if (item.iid == payload.iid) {
			// 		oldProduct = item
			// 	}
			// }
			//用find函数找出↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)

			//2.判断oldProduct
			if (oldProduct) {
				context.commit(ADD_COUNTER, oldProduct)
				resolve('当前的商品数量+1')
			} else {
				payload.count = 1
				context.commit(ADD_TO_CART, payload)
				resolve('成功添加商品')
			}
		})
	}
}
