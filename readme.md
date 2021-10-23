# snabbdom 虚拟DOM 手写代码

---

### 1 h.js

 - 创建虚拟节点 ✔
   - vnode.js

### 2 patch.js

 - 比较vnode1、vnode2, 然后更新页面DOM. 

#### 四命中查找 三 新后与旧前

			// 三新后与旧前
			// A  B  C  D
			// C2 B2 A2

```text
A   A2
A2  A2
A2  B   C   D

B   C   D   A2
C   D   B2  A2
D   C2  B2  A2

```

#### 四命中查找 四 新前与旧后

			// 四 新前与旧后
			// E  A  B  C
			// C2 B2 E2

```text
C   C2
C2  C2
A   B   C2

C2  A   B

C2  B2  A

```

#### 非四命中查找 

```text
M       A       N
B2      A2      N2      E2

B2      M       A       N
B2      M       A2      N
B2      A2      M       N
B2      A2      M       N2
B2      A2      N2      M
B2      A2      N2      E2      M

B2      A2      N2      E2 


```
每次取出一个新children子项, 在旧children中查找, 
有那么移动旧元素, 没有那么创建插入新元素


---

end
finished
