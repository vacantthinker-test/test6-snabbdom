/**
 * 比较新旧虚拟节点, 然后更新页面DOM
 * @param vnode1
 * @param vnode2
 */
import {vnode} from "./vnode";
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";

export function patch(vnode1, vnode2) {
	// console.log('patch vnode1 vnode2')
	
	// 在第一次patch() 执行时, vnode1 可能是真实DOM
	// 	patch.js 比较的是虚拟DOM, 那么需要转化vnode1
	//	首先判断一下vnode1
	if (vnode1.sel === undefined) {
		vnode1 = createNode(vnode1)
	}
	
	// 新旧节点都是虚拟的, 开始比较
	if (sameVnode(vnode1, vnode2)) {
		// console.log('sameVnode') // 一样的节点
		// 接下来比较标签内的属性
		setTimeout(() => patchVnode(vnode1, vnode2), 600)
		
	} else {
		// console.log('not sameVnode') // 节点不一样
		
		let domElement = vnode1.ele; // 真实DOM
		
		// 创建新元素,
		let newChild = createElement(vnode2) // vnode2是预期节点, 根据vnode2来创建DOM
		// 插入新元素,
		// let refChild = vnode1.ele
		domElement.parentNode.insertBefore(newChild, domElement)
		
		// 删除旧元素, 延迟600ms
		setTimeout(() => domElement.remove(), 600)
		
	}
	
}

/**
 * 新旧虚拟节点是一样的么? 比较两者的key和sel属性是不是一样的?
 * @param vnode1
 * @param vnode2
 * @returns {boolean}
 */
export function sameVnode(vnode1, vnode2) {
	if (!vnode1 || !vnode2) return ;
	
	if (!(vnode1.sel && vnode2.sel)){
		throw new Error("vnode1 and vnode2 不是虚拟节点, 请传入正确的参数")
	}
	let sameKey = vnode1.key === vnode2.key;
	let sameSel = vnode1.sel === vnode2.sel;
	return sameKey && sameSel;
}

/**
 * 转化真实DOM为虚拟节点
 * @param vnode1
 * @returns {{data, children, sel, text, key: *, ele}}
 */
function createNode(vnode1) {
	let sel = vnode1.tagName.toLowerCase()
	let data = undefined
	let text = vnode1.textContent
	let children = undefined // <div id="app"></div> 第一次patch就是这个标签进行
	// 比较, 一个空的div
	// vnode1 真实DOM作为ele
	return vnode(sel, data, text, children, vnode1);
}
