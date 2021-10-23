/**
 * 新旧虚拟节点一样, 那么进行其内容的更新比较
 * @param vnode1 旧节点
 * @param vnode2 新节点
 */
import {createElement} from "./createElement";
import {patchChildren} from "./patchChildren";

export function patchVnode(vnode1, vnode2) {
	if (!(vnode1.sel && vnode2.sel) || arguments.length !== 2){
		throw new Error("参数数量不正确 或者 vnode1 and vnode2 不是虚拟节点, 请传入正确的参数")
	}
	vnode2.ele = vnode1.ele // vnode2为虚拟节点, 创建时时没有真实DOM属性赋值的
	// console.log(vnode2)
	let domElement = vnode1.ele // 需要操作更新的DOM节点
	// console.log(domElement)
	
	let oldText = vnode1.text // 旧文本
	let newText = vnode2.text // 新文本
	let oldCh = vnode1.children // 旧children
	let newCh = vnode2.children // 新children
	
	if (newText) { // 如果新文本存在 并且 新children不存在
		// 新旧文本比较, 然后更新
		if (newText !== oldText) {
			domElement.textContent = ''
			domElement.innerText = newText
		}
	} else if (newCh) { // 新文本不存在 新children存在
		// "" 空字符串 if判断为false
		// oldText变量存在, 并且oldText 字符串length 大于等于0
		// 判断一个变量的属性时, 需要提前判断该属性是不是为null 或 undefined
		if (oldText === "" || oldText) { // 旧文本存在 新children存在
			// 旧文本为 空字符串 或者 存在旧文本
			domElement.textContent = ''
			
			newCh.forEach(child => {
				let newChild = createElement(child) // 根据虚拟节点创建DOM节点
				// console.log(newChild)
				domElement.appendChild(newChild) // 追加新元素至DOMElement
			})
			
		} else { // 新旧节点都有children 都无文本
			patchChildren(domElement, oldCh, newCh) // children比较
		}
	}
	
	
}
