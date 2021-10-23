/**
 * 根据参数, 返回一个vnode对象
 * @param sel 选择器 例如div, ul, li
 * @param data 数据 例如 key: value, class: [], prop: []
 * @param text 文本 html标签内的文本内容
 * @param children 子元素 例如ul中的li
 * @param ele DOM元素, 虚拟节点对应的真实节点DOM元素
 * @returns {{data, children, sel, text, key: *, ele}}
 */
export function vnode(sel, data, text, children, ele) {
	const key = data !== undefined ? data.key : undefined
	return {
		sel, data, text, children, ele, key
	}
}
