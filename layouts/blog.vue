<script lang="ts" setup>
import {navLinks, siteConfig} from "~/site.config";
</script>


<template>
    <section class="min-h-screen mx-auto max-w-65ch 2xl:max-w-85ch pt-12 pb-8 px-8">
        <header class="flex justify-between items-center mb-20">
            <a class="text-2xl font-hand op-60" href="/">{{ siteConfig.author }}</a>
            <nav class="flex justify-around rounded-full shadow-2xl shadow-gray-400 px-3">
                <nuxt-link v-for="item in navLinks" :key="item.path" :to="item.path"
                           class="py-3 px-5 transition-transform duration-200 hover:scale-125">
                    <span class="hidden sm:block">{{ item.title }}</span>
                    <span :class="item.icon" class="sm:hidden"></span>
                </nuxt-link>
            </nav>
            <dark-mode></dark-mode>
        </header>
        <main class="flex-1">
            <slot></slot>
        </main>
        <footer class="text-sm mt-20 flex items-center text-gray-500 dark:text-slate-400">
            <div class="flex items-center flex-col md:flex-row gap-1em">
                <span class="op-50 text-sm">
                    <a class="link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noopener noreferrer"
                       target="_blank">
                      CC BY-NC-SA 4.0
                    </a>
                    2023-PRESENT © {{ siteConfig.author }}
                </span>
            </div>
        </footer>
    </section>
</template>