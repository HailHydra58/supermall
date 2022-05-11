module.exports = {
	//   configureWebpack: {
	//     resolve: {
	//       alias: {
	//         "assets": '@/assets',
	//         "common": '@/common',
	//         "components": '@/components',
	//         "views": '@/views',
	//         "network": '@/network',
	//       }
	//     }
	//   }
	devServer: {
		proxy: {
			//配置代理
			"/user": { //凡是以 /jsonp 开头的请求,请求代理
				// 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
				target: 'http://www.e8088.com',
				// onProxyReq(proxyReq) {
				// 	proxyReq.setHeader("Origin", 'http://www.e8088.com')
				// 	proxyReq.setHeader("Referer", 'http://www.e8088.com/')
				// },
				// 允许跨域
				changeOrigin: true,
				// 如果是https接口，需要配置这个参数
				secure: false,
				// ws: true,
				// pathRewrite: {
				// 	'^/jsonp': ''
				// }
			},
			
		}
	}
}
