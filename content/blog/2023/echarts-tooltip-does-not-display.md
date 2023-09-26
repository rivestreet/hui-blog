---
date: 2023-09-20 17:20:21
tags:
  - echarts
title: echarts tooltip 无法正常显示
description: 在 Vue3 中使用 Echarts 的时候，tooltip无法正常显示
---

> 技术栈：Vue3 + Echarts

在 Vue3 中使用 Echarts 的时候，tooltip无法正常显示

<img src="https://huyu-blog.oss-cn-hangzhou.aliyuncs.com/img/image-20230920165619388.png" alt="tooltip" style="zoom: 33%;" />

看看 echarts 的 options 有没有配置

```ts
options = {
    tooltip: {
      show: true,
      trigger: "axis", // "item" || "axis"
    },
}
```

> 配置了但是还是没有显示 `tooltip`

+ **注意：**
  + `trigger`为 `item` 时可以正常显示
  + 为 `axis` 时无法显示



### 为什么

 **如果将 echarts 实例赋值给 ref 响应式 Proxy对象，会导致tooltip不显示**



### **解决方案**

看代码：

```ts
// const myChart = ref(null); // ❎
// const myChart = null; // ✅
const myChart = shallowRef(null); // ✅
myChart.value = echarts.init(/* */);
```

> echarts 实例不能使用 `ref` 响应式对象，要使用`shallowRef`







### shallowRef

看看[vue官网](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)的介绍

> [`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 的浅层作用形式。
>
> - **类型**
>
>   ```ts
>   function shallowRef<T>(value: T): ShallowRef<T>
>   
>   interface ShallowRef<T> {
>     value: T
>   }
>   ```
>
> - **详细信息**
>
>   和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问是响应式的。
>
>   `shallowRef()` 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。
>
> - **示例**
>
>   ```js
>   const state = shallowRef({ count: 1 })
>   
>   // 不会触发更改
>   state.value.count = 2
>   
>   // 会触发更改
>   state.value = { count: 2 }
>   ```
>
> - **参考**
>
>   - [指南 - 减少大型不可变结构的响应性开销](https://cn.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)
>   - [指南 - 与其他状态系统集成](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems)
