<script setup lang="ts">
import type {User} from "~~/server/models/user.schema";
import DT from "#shared/utils/dt";

const users: Ref<User[]> = ref([])

onMounted(async () => {
  const r = await api('/user');
  const body = await r?.json();
  console.log('data', body);
  users.value = body.data;
})
</script>

<template>
  <div>
    <table class="striped-table">
      <thead>
      <tr>
        <th>{{ $t('ID') }}</th>
        <th>{{ $t('Username') }}</th>
        <th>{{ $t('Name') }}</th>
        <th>{{ $t('Role') }}</th>
        <th>{{ $t('Last login') }}</th>
        <th>{{ $t('Created at') }}</th>
        <th>{{ $t('Created by') }}</th>
        <th>{{ $t('Updated at') }}</th>
        <th>{{ $t('Updated by') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td>{{ DT.humanReadable(user.last_login) }}</td>
        <td>{{ DT.humanReadable(user.created) }}</td>
        <td>{{ user.created_by }}</td>
        <td>{{ DT.humanReadable(user.updated) }}</td>
        <td>{{ user.updated_by }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "tailwindcss";

.striped-table {
  /* Table layout and spacing */
  @apply w-full text-left border-collapse table-auto;

  thead {
    /* Header background and text styles */
    @apply bg-gray-800 text-white border-b;

    th {
      @apply py-3 px-4 text-sm font-semibold uppercase tracking-wider;
    }
  }

  tbody {
    tr {
      /* Bottom border for rows */
      @apply border-b border-gray-200;

      /* Striping logic: Applies light gray background to even rows */
      @apply even:bg-gray-50;

      /* Interaction: Slight darken on hover */

      &:hover {
        @apply bg-gray-100 text-gray-700 transition-colors duration-150;
      }
    }

    td {
      @apply py-3 px-4 text-sm;
    }
  }
}
</style>