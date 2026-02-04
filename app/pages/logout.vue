<script setup lang="ts">
const {clear: clearSession} = useUserSession();
clearSession();
</script>

<template>
<p>{{$t('Logging out')}}</p>
</template>

<style scoped>

</style>