<script lang="ts" setup>
import {formattedDate} from '@/utils'
import type {ParsedContent} from "@nuxt/content/dist/runtime/types";


const props = defineProps<{
    article: ParsedContent
}>()

</script>

<template>
    <div>
        <h1>{{ props.article.title }}</h1>
        <div class="op-50 mb-4em">
            <!--   发布时间   -->
            <div>{{ formattedDate(props.article.date) }}</div>
            <!--   更新时间   -->
            <div v-if="props.article.updated">Updated: {{ formattedDate(props.article.updated) }}</div>
            <!--   tags   -->
            <div class="flex gap-2">
                <NuxtLink
                    v-for="tag in props.article.tags" :key="tag" :to="`/tags/${tag}`"
                >
                    #{{ tag }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
