---
date: 2023-09-13 13:55:21
tags:
  - css
title: Unocss的使用
description: Unocss的使用
---

[UnoCSS: The instant on-demand Atomic CSS engine](https://unocss.dev/)
[样式文档](https://unocss.dev/interactive/)

[来源：UnoCSS给了我一个不用tailwindcss的理由 - 掘金](https://article.juejin.cn/post/7244818201976078394)

## 安装依赖

```shell
pnpm i unocss 
```

```shell
# 重置样式 引入自己自定义的样式也可以
pnpm i @unocss/reset
```

```shell
# 如果需要使用 UnoCSS 的图标预设，还需要安装@iconify/json
pnpm i @iconify/json
```

## 集成 UnoCSS

### 1. 修改 `vite.config.js`,添加 unocss plugin

```js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
// https://vitejs.dev/config/ 
export default defineConfig({
	plugins: [vue(), unocss()]
})
```

### 2. 修改 `main.ts` 和 `style.css`

```ts
import {createApp} from 'vue'
/** 重置样式 这里引入自定义的重置样式也可 */
import '@unocss/reset/tailwind.css'
/**
 * 项目内的样式，
 * 注意：最好放在重置样式后，uno.css前
 * */
import './style.css'
/** 引入uno.css，不引入不生效 */
import "virtual:uno.css"
import App from './App.vue'

createApp(App).mount('#app')
```

```css
/* TODO: 不清晰 */
:root {
    --primary-color: #316c72;
    --dark-bg: #18181c;
}

html {
    font-size: 4px;
/ / * 方便unocss计算：1单位 = 0.25 rem = 1 px
}

body {
    font-size: 16px;
}

html,
body,
#app {
    height: 100%;
    margin: 0;
    padding: 0;
}

html.dark {
    background: var(--dark-bg);
}

```

+ 注意：不管是UnoCSS还是tailwindcss、windicss，默认 4单位 = 1rem，即 1单位 = 1/4rem，而 rem 是相对于html的 font-size
  来计算的，一般来说大部分浏览器的html默认 font-size 为 16px，即 1rem = 16px，也就是说 Unocss 的1单位换算成 px 就是
  4px，这种方式没什么问题，但对于习惯了使用px计算的人来说，每次都要心算一遍要写多少单位就略显麻烦了。那么有没有办法让 unocss
  的`1单位=1px`了，这样就没有心算成本了，答案是当然有：由公式`1单位 = 0.25 * ${html font-size} = 1px`可知：将 html 的
  font-size 应该为 4px 即可

## Presets 预设

[Attributify preset](https://unocss.dev/presets/attributify#properties-conflicts)

> TODO：这个很强大

### presetAttributify

例如：presetAttributify 可以在标签上直接写 CSS 样式

```vue

<div bg-green-50 un-hover="bg-green-200" un-text-xl text-center/>
```

## Icon（图标）

[Icons preset](https://unocss.dev/presets/icons)

**安装：**

```shell
pnpm add - D @iconify/json / [你想要的收藏]
```

```ts
// uno.config.ts
import {defineConfig, presetIcons} from 'unocss'

export default defineConfig({
    presets: [
        presetIcons({
            /* options */
        }),
        // ...other presets
    ],
})
```

安装 `@unocss` 时会自带 `preset-icons`，所以安装 `@iconify-json` 图标就可以了

[所有可用图标 -> Icônes](https://icones.js.org/)

**使用：**

```vue
<span class="i-logos-vue text-3xl"/>
<button class="i-carbon-sun dark:i-carbon-moon"/>
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"/>
```

> 还可以自定义图标
> [自定义图标](https://article.juejin.cn/post/7244818201976078394#heading-14)

## Rulers （规则）

[Rules](https://unocss.dev/config/rules)

```ts
export default defineConfig({
    // ...UnoCSS options
    rules: [
        [
            // 多行文本超出部分省略号 line-n
            /^line-(\d+)$/,
            ([, l]) => {
                if (~~l === 1) {
                    return {
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap",
                        width: "100%",
                    }
                }
                return {
                    overflow: "hidden",
                    display: "-webkit-box",
                    "-webkit-box-orient": "vertical",
                    "-webkit-line-clamp": l,
                }
            },
        ],
    ],
})
```

## Shortcuts（快捷方式）

[Shortcuts](https://unocss.dev/config/shortcuts)

```ts
// 自定义快捷方式
export default defineConfig({
    shortcuts: {
        "bg-main": "bg-green-50",
    }
})
```

```html
<div class="bg-main"/>
```

## transformer

### Directives（指令）

[Directives transformer](https://unocss.dev/transformers/directives)

**安装：**

```shell
pnpm add -D @unocss/transformer-directives
```

```ts
// uno.config.ts
import {defineConfig} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    // ...
    transformers: [
        transformerDirectives(),
    ],
})
```

**使用：**

> 可以使用 `@apply`、`@screen`和`theme()` 指令

```css
.btn {
    @apply rounded px-2 border-none bg-blue-5 text-white;
}
```

> 注意：在 `scss` 文件中使用 `@apply` 写法，会出现 vscode 无法识别的问题

```css
.btn {
    --at-apply: rounded px-2 border-none bg-blue-5 text-white;
}
```

> 可以使用 `--at-apply`

### Variant Group ( 前缀组)

[Variant group transformer](https://unocss.dev/transformers/variant-group)

> 解决繁琐的多次写前缀的情况

**安装：**

```shell
pnpm add -D @unocss/transformer-variant-group
```

```ts
// uno.config.ts
import {defineConfig} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
    // ...
    transformers: [
        transformerVariantGroup(),
    ],
})
```

**使用：**

```html

<div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/> <!-- 简化之后： -->
<div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
```

### Compile Class（构建合并多个原子类到一个类）

[Compile class transformer](https://unocss.dev/transformers/compile-class)

```shell
# install
pnpm add -D @unocss/transformer-variant-group
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

**使用：**

```html
<div class=":uno: text-center sm:text-left">
  <div class=":uno: text-sm font-bold hover:text-red"/>
</div>
```

最终编译的结果：

```html
<div class="uno-qlmcrp">
  <div class="uno-0qw2gr"/>
</div>
```

### Attributify JSX（支持 JSX）

[Attributify JSX transformer](https://unocss.dev/transformers/attributify-jsx)

## Theme

[Theme](https://unocss.dev/config/theme)

```ts
// uno.config.ts
import {defineConfig} from "unocss"

export default defineConfig({
// ...UnoCSS options
    theme: {
        colors: {
            success: "#67C23A",
            warning: "#E6A23C",
            danger: "#F56C6C",
        },
    },
})
```

## 注意事项：

+ 使用 `Ant Design Vue` 时， unocss 的重置样式让，`a-button` 的默认按钮变透明
  + 在 `main.ts` 中引入 `import '@unocss/reset/tailwind-compat.css'`
  + 而不是 `import '@unocss/reset/tailwind.css'`
  + 即可解决