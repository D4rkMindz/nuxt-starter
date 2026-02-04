<script setup lang="ts">
const ID = Math.random().toString(36)
const props = defineProps({
  type: String,
  label: String
})
</script>

<template>
  <div>
    <label v-if="props.label" :for="ID">{{ props.label }}</label>
    <textarea :id="ID"/>
  </div>
</template>

<style scoped>
@reference "#main";

textarea {
  @apply border border-s px-2 py-1 mx-2 my-1
}
</style>