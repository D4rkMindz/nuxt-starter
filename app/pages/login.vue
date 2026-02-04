<script setup lang="ts">

import Input from "~/components/ui/form/Input.vue";

const {loggedIn, user, fetch: refreshSession, clear: clearSession} = useUserSession()
clearSession()
const credentials = reactive({
  username: '',
  password: '',
})

async function login() {
  try {
    console.log("Logging in")
    const response = await $fetch('/auth/login', {
      method: 'POST',
      body: credentials,
    })

    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/')
  } catch {
    alert('Bad credentials')
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <Input type="text" :placeholder="$t('Username')" v-model="credentials.username" aria-autocomplete="username"/>
      <Input type="password" :placeholder="$t('Password')" v-model="credentials.password" aria-autocomplete="password"/>
      <button type="submit">{{ $t('Login') }}</button>
    </form>
  </div>
</template>

<style scoped>

</style>