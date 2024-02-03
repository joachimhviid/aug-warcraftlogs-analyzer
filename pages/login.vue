<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const { onLogin, getToken } = useApollo()

const logIn = async () => {
  const token = await getToken()
  if (token) {
    await onLogin(token)
    // Redirect to app page
    await router.push('/')
  }
}
</script>

<template>
  <div>
    <div class="max-w-screen-sm mx-auto bg-slate-600 p-4 rounded text-center my-8">
      <h1 class="text-2xl font-bold">Authorize application</h1>
      <button class="p-3 bg-emerald-600 rounded mt-3" @click="logIn">Log in with warcraftlogs</button>
    </div>
  </div>
</template>
