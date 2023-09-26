<script lang="ts" setup>
const props = defineProps(['article'])
</script>

<template>
    <DocTitle :article="props.article"/>
    <ContentRenderer :value="props.article"/>
    <doc-footer/>
</template>
