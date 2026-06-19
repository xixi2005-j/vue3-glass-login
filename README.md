# Vue3 Glassmorphism Login

A beautiful glassmorphism login page component for Vue 3 with GSAP animations.

## Features

- ✨ Glassmorphism design with backdrop-filter blur effect
- 🎨 Customizable colors, text, and background image
- 🚀 Smooth GSAP animations on page load
- 📱 Responsive design for mobile devices
- 🔧 Easy to integrate with any Vue 3 project
- 💪 TypeScript support

## Preview

![Preview](https://img.shields.io/badge/preview-live-brightgreen)

## Installation

```bash
npm install vue3-glassmorphism-login
```

Or copy the `GlassmorphismLogin.vue` component directly into your project.

## Usage

### Basic Usage

```vue
<template>
  <GlassmorphismLogin
    title="Welcome Back"
    subtitle="Please sign in to continue"
    @login="handleLogin"
  />
</template>

<script setup>
import GlassmorphismLogin from './components/GlassmorphismLogin.vue'

function handleLogin(form) {
  console.log('Username:', form.username)
  console.log('Password:', form.password)
}
</script>
```

### With All Props

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImage` | String | `''` | Background image URL |
| `title` | String | `'Welcome Back'` | Main title text |
| `subtitle` | String | `'Please sign in to continue'` | Subtitle text |
| `loginText` | String | `'登 录'` | Login button text |
| `loadingText` | String | `'登录中...'` | Loading state text |
| `usernameLabel` | String | `'用户名'` | Username field label |
| `usernamePlaceholder` | String | `'请输入用户名'` | Username placeholder |
| `usernameError` | String | `'请输入用户名'` | Username validation error |
| `passwordLabel` | String | `'密码'` | Password field label |
| `passwordPlaceholder` | String | `'请输入密码'` | Password placeholder |
| `passwordError` | String | `'请输入密码'` | Password validation error |
| `showRegister` | Boolean | `true` | Show register link |
| `registerHint` | String | `'还没有账号？'` | Register hint text |
| `registerText` | String | `'立即注册'` | Register link text |
| `loading` | Boolean | `false` | Loading state |
| `enableAnimation` | Boolean | `true` | Enable GSAP animations |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `login` | `{ username: string, password: string }` | Emitted when login form is submitted |
| `register` | - | Emitted when register link is clicked |

## Customization

### Background Image

Pass a URL or import an image:

```vue
<script setup>
import bgImage from './assets/your-image.jpg'
</script>

<template>
  <GlassmorphismLogin :background-image="bgImage" />
</template>
```

### Colors

The component uses CSS custom properties. Override them in your parent component:

```css
:root {
  --login-primary: #2196F3;
  --login-primary-hover: #1976D2;
  --login-gradient-start: #2196F3;
  --login-gradient-end: #81D4FA;
}
```

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- GSAP (animations)
- CSS3 (backdrop-filter, gradients)

## Browser Support

- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

## License

MIT

## Author

金曦 (Jin Xi)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
