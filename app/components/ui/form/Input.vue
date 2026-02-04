<script setup lang="ts">
export interface InputProps {
  type: string,
  modelValue: string | number,
}

const props = defineProps<InputProps>()
const emit = defineEmits(['update:modelValue']);

function updateInput(e: any): void {
  emit("update:modelValue", e?.target?.value);
}
</script>

<template>
  <div>
    <input
        :type="props.type" :value="props?.modelValue" @input.prevent="(e) => updateInput(e)" v-bind="$attrs"/>
  </div>
</template>

<style scoped>
@import "tailwindcss";

input {
  @apply border rounded block grow bg-gray-600 py-1.5 pr-3 pl-1 my-2 text-base text-white placeholder:text-gray-200 focus:outline-none
}
</style>