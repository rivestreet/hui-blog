<script lang="ts" setup>
import {getIncludedYearPosts} from '@/utils'

const posts = await getIncludedYearPosts('blog')
</script>

<template>
    <sub-nav></sub-nav>
    <post-list :posts="posts"/>
</template>
