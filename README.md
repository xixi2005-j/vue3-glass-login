# Vue3 玻璃拟态登录页

基于 Vue 3 的玻璃拟态风格登录注册页组件，支持 GSAP 动画，开箱即用。

## ✨ 特性

- 玻璃拟态设计，backdrop-filter 毛玻璃效果
- 登录注册一体化，无需切换页面
- 支持自定义主标题、副标题、背景图片
- GSAP 页面加载动画，流畅自然
- 响应式布局，适配移动端
- TypeScript 支持

## 🚀 安装

```bash
npm install vue3-glassmorphism-login
```

或者直接将 `GlassmorphismLogin.vue` 组件复制到你的项目中。

## 📖 使用方法

```vue
<template>
  <GlassmorphismLogin
    :background-image="bgImage"
    title="我的系统"
    subtitle="欢迎登录"
    :loading="loading"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>

<script setup>
import { ref } from 'vue'
import { GlassmorphismLogin } from 'vue3-glassmorphism-login'
import bgImage from './assets/background.jpg'

const loading = ref(false)

function handleLogin(form) {
  loading.value = true
  setTimeout(() => {
    alert(`登录成功！\n用户名: ${form.username}`)
    loading.value = false
  }, 1500)
}

function handleRegister(form) {
  alert(`注册成功！\n用户名: ${form.username}`)
}
</script>
```

## 📋 Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `backgroundImage` | String | 是 | - | 背景图片地址 |
| `title` | String | 否 | `故障工单系统` | 左侧主标题 |
| `subtitle` | String | 否 | `网络故障快速响应平台` | 左侧副标题 |
| `loading` | Boolean | 否 | `false` | 加载状态 |
| `enableAnimation` | Boolean | 否 | `true` | 是否启用 GSAP 动画 |

## 🎯 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `login` | `{ username: string, password: string }` | 登录表单提交 |
| `register` | `{ username: string, password: string }` | 注册表单提交 |

## 🛠️ 技术栈

- Vue 3 + TypeScript
- GSAP 动画
- CSS3（backdrop-filter、渐变）

## 🖼️ 背景图片来源

背景图片来源于 [Unsplash](https://unsplash.com/photos/aerial-photography-of-mountain-range-covered-with-snow-under-white-and-blue-sky-at-daytime-9wg5jCEPBsw)，如有侵权告知删除。图片可以自行切换。

## 👤 作者

xixi2005-j
