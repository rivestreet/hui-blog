<script lang="ts" setup>
const route = useRoute()
const post = route.params.post as Array<string>
const path = post.join('/')
</script>

<template>
    <section class="prose relative slide-enter-content">
        <ContentDoc :path="path">
            <template #default="{ doc }">
                <!--        目录        -->
                <doc-toc :toc="doc.body.toc"/>
                <!--        文章正文        -->
                <doc-render :article="doc"/>
                <doc-back/>
            </template>

            <template #empty>
                <h1 class="text-center">
                    Document is empty😅
                </h1>
            </template>

            <template #not-found>
                <h1 class="text-center">
                    Not Found Any Document😗
                </h1>
            </template>
        </ContentDoc>
    </section>
</template>
