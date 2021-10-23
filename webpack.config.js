const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: 'development', // 开发模式
	// 显示的就是当前编码的代码
	devtool: 'source-map', // 开发工具 源码映射, 即在浏览器(例如chrome)debug调试时,
	resolve: { // 解析
		modules: [
			path.resolve(__dirname, ''), // 自己写的package, 左侧的snabbdom文件夹
			// 安装的package
			path.resolve(__dirname, 'node_modules') // dependencies, devDependencies
		]
	},
	entry: './src/index.js', // 输入
	output: { // 输出
		filename: 'bundle.js', // 文件名
		path: path.resolve(__dirname, 'dist') // 路径, 输出路径
	},
	plugins: [ // 插件
		// 为模板, 根据mode, 去除多余空格, 代码缩减为一行, 添加打包好的js文件. 等操作
		new HtmlWebpackPlugin({ // html打包插件, 以template属性对应的html文件
			template: 'public/index.html',
		})
	]
};

module.exports = config;
