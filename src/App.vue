<template>
  <GlassmorphismLogin
    :background-image="bgImage"
    title="可修改主标题"
    subtitle="可修改副标题内容"
    :loading="loading"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlassmorphismLogin from './components/GlassmorphismLogin.vue'
import bgImage from './assets/background.jpg'

const loading = ref(false)

function handleLogin(form: { username: string; password: string }) {
  loading.value = true
  setTimeout(() => {
    alert(`登录成功！\n用户名: ${form.username}`)
    loading.value = false
  }, 1500)
}

function handleRegister(form: { username: string; password: string }) {
  alert(`注册成功！\n用户名: ${form.username}`)
}
</script>
