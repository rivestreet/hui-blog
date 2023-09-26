// uno.config.ts
import {defineConfig, presetAttributify, presetUno, presetIcons, presetWebFonts, transformerDirectives} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import {navLinks, socialLinks} from './site.config'

const compoundLinks = [...navLinks, ...socialLinks]
const safeNavIcon = compoundLinks.map(link => link.icon)

export default defineConfig({
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
        'text-title': 'text-xl sm:text-3xl',
        'hover': 'op-70 hover:op-100 cursor-pointer transition-opacity',
        'deep-hover': 'op-20 hover:op-70 cursor-pointer transition-opacity',
        'bd': 'border-gray-500 border-1',
        'text-deep': 'c-black dark:c-white',
    },
    theme: {
        colors: {
            primary: 'var(--primary)',
            container: 'var(--c-bg)',
        },
        extend: {
            borderRadius: {
                common: 'var(--common-rd)',
            },
        },
    },
    presets: [
        presetAttributify(),
        presetUno({
            dark: 'class',
        }),
        presetIcons({
                warn: true,
                extraProperties: {
                    'display': 'inline-block',
                    'vertical-align': 'middle',
                    'width': '1.2em',
                    'height': '1.2em',
                }
            }
        ),
        presetWebFonts({
            provider: 'google', // default provider
            fonts: {
                sans: ['Inter', 'Noto Sans Simplified Chinese'],
                mono: ['Fira Mono:400,700'],
                hand: ['Dancing Script'],
            },
        })
    ],
    transformers: [
        transformerVariantGroup(),
        transformerDirectives(),
    ],
    safelist: [...safeNavIcon],
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