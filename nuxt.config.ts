// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@unocss/nuxt",
        "@vueuse/nuxt",
        '@nuxt/content',
    ],
    app: {
        rootId: 'nuxt-root',
        head: {
            title: "Evan_Sky",
            bodyAttrs: {
                class: 'font-sans',
            },
        },
    },
    content: {
        // 代码高亮
        highlight: {
            // 主题
            theme: {
                default: 'vitesse-light',
                dark: 'one-dark-pro',
                sepia: 'monokai',
            },
            // 预加载
            preload: [
                'vue',
                'js',
                'ts',
                'html'
            ],

        },

    },
    css: [
        '@unocss/reset/tailwind.css',
        '@/assets/styles/global.scss',
        '@/assets/styles/theme.css',
        '@/assets/styles/transition.css',
        '@/assets/styles/markdown.scss',
    ]
})
