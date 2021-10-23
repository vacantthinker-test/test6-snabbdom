import {h, patch} from "snabbdom"; // 在webpack设置resolve模块, 就可以这样直接使用了.
// 默认查找index.js文件, index.js 作为默认导出文件. 无其他功能.

const domApp = document.getElementById('app')

const vnode1 = h('ul', {}, [
	h('li', {key: 'M'}, 'M'),
	h('li', {key: 'A'}, 'A'),
	h('li', {key: 'N'}, 'N'),
	// h('li', {key: 'C'}, 'C'),
	// h('li', {key: 'D'}, 'D'),
])
// const vnode1 = h('div', {}, '新文本测试vnode1')
// console.log(vnode1) // 测试没问题

setTimeout(() => patch(domApp, vnode1), 600) // 延迟执行, 方便观测效果

//----------------------------------------------------------

const vnode2 = h('ul', {}, [
	// h('li', {key: 'C'}, 'C2'),
	h('li', {key: 'B'}, 'B2'),
	h('li', {key: 'A'}, 'A2'),
	h('li', {key: 'N'}, 'N2'),
	h('li', {key: 'E'}, 'E2'),
])


setTimeout(() => patch(vnode1, vnode2), 600) // 延迟执行, 方便观测效果

