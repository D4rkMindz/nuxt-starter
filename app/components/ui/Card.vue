<!-- components/ui/Card.vue -->
<template>
  <div
      class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border"
  >
    <!-- Header -->
    <div
        v-if="$slots.header || $slots.title || $slots.description || $slots.action"
        class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[.card-action]:grid-cols-[1fr_auto] pb-6"
    >
      <div>
        <div v-if="$slots.title" class="leading-none">
          <slot name="title" />
        </div>
        <div v-if="$slots.description" class="text-muted-foreground">
          <slot name="description" />
        </div>
      </div>
      <div v-if="$slots.action" class="card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end">
        <slot name="action" />
      </div>
    </div>

    <!-- Content -->
    <div v-if="$slots.default" class="px-6 pb-6">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="flex items-center px-6 pb-6 border-t pt-6">
      <slot name="footer" />
    </div>
  </div>
</template>
