import {vnode} from "./vnode";

export function h(sel, data, c) {
	// 如果参数不等于3, sel类型不等于string, data类型不等于object, c为null或undefined
	// 那么抛出一个错误
	if (
		arguments.length !== 3
		|| typeof sel !== "string"
		|| typeof data !== "object"
		|| c === null
		|| typeof c === "undefined"
	) {
		throw new Error("参数不等于3 或者 类型不正确")
	}
	
	let text = undefined;
	let children = undefined
	let ele = undefined
	
	if (typeof c === 'string') { // c类型为string
		text = c; // c是text
	} else if (Array.isArray(c)) { // c类型为Array
		children = c; // c是children
	} else if (c.sel) { // c存在sel属性
		children = [c]; // c是单个h() 方法
	}
	
	
	return vnode(sel, data, text, children, ele);
}
