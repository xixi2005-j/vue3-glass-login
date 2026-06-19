# Vue3 玻璃拟态登录页

一个基于 Vue 3 的玻璃拟态风格登录页组件，支持 GSAP 动画，开箱即用。

## ✨ 特性

- 玻璃拟态设计，backdrop-filter 毛玻璃效果
- 支持自定义标题、副标题、背景图片、按钮文字
- GSAP 页面加载动画，流畅自然
- 响应式布局，适配移动端
- TypeScript 支持
- 简单易用，快速集成

## 🚀 安装

```bash
npm install vue3-glassmorphism-login
```

或者直接将 `GlassmorphismLogin.vue` 组件复制到你的项目中。

## 📖 使用方法

### 基础用法

```vue
<template>
  <GlassmorphismLogin
    title="欢迎回来"
    subtitle="请登录以继续"
    @login="handleLogin"
  />
</template>

<script setup>
import GlassmorphismLogin from './components/GlassmorphismLogin.vue'

function handleLogin(form) {
  console.log('用户名:', form.username)
  console.log('密码:', form.password)
}
</script>
```

### 完整配置

```vue
<template>
  <GlassmorphismLogin
    :background-image="bgImage"
    title="故障工单系统"
    subtitle="网络故障快速响应平台"
    login-text="登 录"
    loading-text="登录中..."
    username-label="用户名"
    username-placeholder="请输入用户名"
    username-error="请输入用户名"
    password-label="密码"
    password-placeholder="请输入密码"
    password-error="请输入密码"
    :show-register="true"
    register-hint="还没有账号？"
    register-text="立即注册"
    :loading="isLoading"
    :enable-animation="true"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>
```

## 📋 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backgroundImage` | String | `''` | 背景图片地址 |
| `title` | String | `'欢迎回来'` | 主标题 |
| `subtitle` | String | `'请登录以继续'` | 副标题 |
| `loginText` | String | `'登 录'` | 登录按钮文字 |
| `loadingText` | String | `'登录中...'` | 加载状态文字 |
| `usernameLabel` | String | `'用户名'` | 用户名标签 |
| `usernamePlaceholder` | String | `'请输入用户名'` | 用户名占位符 |
| `usernameError` | String | `'请输入用户名'` | 用户名验证错误提示 |
| `passwordLabel` | String | `'密码'` | 密码标签 |
| `passwordPlaceholder` | String | `'请输入密码'` | 密码占位符 |
| `passwordError` | String | `'请输入密码'` | 密码验证错误提示 |
| `showRegister` | Boolean | `true` | 是否显示注册链接 |
| `registerHint` | String | `'还没有账号？'` | 注册提示文字 |
| `registerText` | String | `'立即注册'` | 注册链接文字 |
| `loading` | Boolean | `false` | 加载状态 |
| `enableAnimation` | Boolean | `true` | 是否启用动画 |

## 🎯 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `login` | `{ username: string, password: string }` | 登录表单提交时触发 |
| `register` | - | 点击注册链接时触发 |

## 🎨 自定义背景图片

```vue
<script setup>
import bgImage from './assets/your-image.jpg'
</script>

<template>
  <GlassmorphismLogin :background-image="bgImage" />
</template>
```

## 🛠️ 技术栈

- Vue 3（Composition API）
- TypeScript
- GSAP（动画）
- CSS3（backdrop-filter、渐变）

## 🌐 浏览器支持

- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

## 📄 许可证

MIT

## 🖼️ 背景图片来源

背景图片来源于 [Unsplash](https://unsplash.com/photos/aerial-photography-of-mountain-range-covered-with-snow-under-white-and-blue-sky-at-daytime-9wg5jCEPBsw)，如有侵权告知删除。图片可以自行切换。

## 👤 作者

金曦 (Jin Xi)

## 🤝 贡献

欢迎提交 Pull Request！
