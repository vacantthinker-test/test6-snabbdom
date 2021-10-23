/**
 * 根据传入的虚拟节点vnode创建真实DOM节点
 * @param vnode
 * @returns {*}
 */
export function createElement(vnode){
	let sel = vnode.sel // 选择器
	// vnode.data 这里是不需要的 data中的key只在比较时需要用到, 和页面DOM无关
	let text = vnode.text // 文本
	let children = vnode.children // 子元素
	const domNode = document.createElement(sel)
	
	if (text){ // 如果text存在,
		domNode.innerText = text; // 更新文本
	}else if (children){ // 如果children存在
		children.forEach(child => { // 循环每一个child
			let newChild = createElement(child) // 创建节点
			domNode.appendChild(newChild) // 添加节点至父节点
		})
	}
	
	// console.log(domNode)
	vnode.ele = domNode
	return domNode;
}
