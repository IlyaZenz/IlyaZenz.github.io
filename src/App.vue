<script setup lang="ts">
import Header from '@/components/Header.vue'
import './style.css'
import { NConfigProvider, NMessageProvider} from 'naive-ui'
import { useTheme } from '@/composable/useTheme'

const { naiveTheme } = useTheme()
</script>

<style scoped></style>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-message-provider>
      <Header/>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>
