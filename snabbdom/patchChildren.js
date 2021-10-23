/**
 * 新旧节点children的比较
 * @param domElement 页面真实DOM节点
 * @param oldCh 旧children
 * @param newCh 新children
 */
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";
import {sameVnode} from "./patch";

export function patchChildren(domElement, oldCh, newCh) {
	console.log('patchChildren')
	
	// 四指针 四指针节点 while两两对比 if处理剩余的
	
	let oldStartIndex = 0
	let oldEndIndex = oldCh.length - 1
	let newStartIndex = 0
	let newEndIndex = newCh.length - 1
	
	let oldStartVnode = oldCh[oldStartIndex]
	let oldEndVnode = oldCh[oldEndIndex]
	let newStartVnode = newCh[newStartIndex]
	let newEndVnode = newCh[newEndIndex]
	
	let oldKeyMap
	let positionInOldKeyMap = undefined
	
	// 四命中查找
	// 一新前与旧前
	// 二新后与旧后
	// 三新后与旧前
	// 四新前与旧后
	
	while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
		if (sameVnode(oldStartVnode, newStartVnode)) { // ✔
			// 一新前与旧前
			// 更新节点
			console.log('类型一')
			patchVnode(oldStartVnode, newStartVnode)
			// 更新指针下标
			oldStartVnode = oldCh[++oldStartIndex]
			newStartVnode = newCh[++newStartIndex]
		} else if (sameVnode(oldEndVnode, newEndVnode)) { // ✔
			// 二新后与旧后
			console.log('类型二')
			patchVnode(oldEndVnode, newEndVnode)
			oldEndVnode = oldCh[--oldEndIndex]
			newEndVnode = newCh[--newEndIndex]
		} else if (sameVnode(oldStartVnode, newEndVnode)) { // ✔
			// 三新后与旧前
			// A  B  C  D
			// C2 B2 A2
			console.log('类型三')
			// 步骤分一二三 一更新节点 二移动节点 三更新指针
			patchVnode(oldStartVnode, newEndVnode)
			
			// 二移动节点 预期 C2 B2 A2
			let refChild = oldEndVnode.ele.nextSibling
			let newChild = oldStartVnode.ele
			domElement.insertBefore(newChild, refChild)
			
			oldStartVnode = oldCh[++oldStartIndex]
			newEndVnode = newCh[--newEndIndex]
		} else if (sameVnode(oldEndVnode, newStartVnode)) { // ✔
			// 四新前与旧后
			patchVnode(oldEndVnode, newStartVnode) // 一更新节点
			
			// 二移动节点
			let refChild = oldStartVnode.ele
			let newChild = oldEndVnode.ele
			domElement.insertBefore(newChild, refChild)
			
			// 三更新指针
			oldEndVnode = oldCh[--oldEndIndex]
			newStartVnode = newCh[++newStartIndex]
		} else {
			// 非四命中 乱序
			if (oldKeyMap === undefined) {
				oldKeyMap = createKeyMap(oldCh)
			}
			let lookupKey = newStartVnode.key
			positionInOldKeyMap = oldKeyMap[lookupKey]
			
			if (positionInOldKeyMap) {
				console.log('存在', lookupKey)
				let foundOldVnode = oldCh[positionInOldKeyMap]
				patchVnode(foundOldVnode, newStartVnode) // 一更新节点
				
				// 二移动节点
				let refChild = oldStartVnode.ele
				let newChild  = foundOldVnode.ele
				domElement.insertBefore(newChild, refChild)
				
				// 三标记已处理节点为undefined
				oldCh[positionInOldKeyMap] = undefined
				
			}else {
				console.log('不存在 需要创建', lookupKey)
				let refChild = oldStartVnode.ele
				let newChild = createElement(newStartVnode)
				domElement.insertBefore(newChild, refChild)
			}
			
			newStartVnode = newCh[++newStartIndex]
		}
	}
	
	// while为两两对比, if来处理剩余的
	if (oldStartIndex <= oldEndIndex || newStartIndex <= newEndIndex) {
		if (oldStartIndex > oldEndIndex) {
			// console.log('if')
			let refChild = oldCh[oldEndIndex].nextSibling
			// 新children还有个C2没有处理
			addVnode(domElement, refChild, newCh, newStartIndex, newEndIndex)
		} else {
			// console.log('else')
			// 有多余的, 需要删除
			removeVnode(oldCh, oldStartIndex, oldEndIndex)
		}
	}
}

function createKeyMap(oldCh) {
	const map = {}
	oldCh.forEach((child, index) => {
		// console.log(child, index, array)
		let key = child.key
		map[key] = index
	})
	// console.log(map)
	return map;
}

/**
 * 移除节点
 * @param children
 * @param startIndex
 * @param endIndex
 */
function removeVnode(children, startIndex, endIndex) {
	for (; startIndex <= endIndex; startIndex++) {
		let item = children[startIndex]
		if (item) {
			item.ele.remove()
		}
	}
}

/**
 * 添加节点
 * @param domElement
 * @param refChild
 * @param children
 * @param startIndex
 * @param endIndex
 */
function addVnode(domElement, refChild, children, startIndex, endIndex) {
	for (; startIndex <= endIndex; startIndex++) {
		let item = children[startIndex]
		let newChild = createElement(item)
		console.log(newChild)
		domElement.insertBefore(newChild, refChild)
	}
}

