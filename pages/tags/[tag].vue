<script lang="ts" setup>
const route = useRoute()
const tag = route.params.tag as string

const queryResult = ref()
queryResult.value = await queryContent()
    .where({
        tags: {
            $contains: tag,
        },

    })
    .find()
</script>

<template>
    <div>
        <h1 class="text-title mb-2em">
            <NuxtLink class="hover" to="/tags">
                Tags
            </NuxtLink>
            / {{ tag }}
        </h1>
        <ul>
            <cell v-for="article in queryResult" :key="article._path" :article="article"/>
            <li v-if="queryResult.length === 0">
                <h1 class="text-2xl text-center">
                    No Corresponding Article For This Tag.😗
                </h1>
            </li>
        </ul>
    </div>
</template>
