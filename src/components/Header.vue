<template>
  <header class="bg-white dark:bg-black dark:text-white min-w-screen shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <nav class="flex items-center space-x-6">
          <RouterLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">
            <span class="text-indigo-600 ">SKU</span>eduApp
          </RouterLink>
          <RouterLink to="/" class="hover:text-indigo-400 transition">Главная</RouterLink>
          <RouterLink to="/favorites" class="hover:text-indigo-400 transition">
            Избранное
          </RouterLink>
        </nav>
        <div class="space-x-3">
          <template v-if = '!isLoggedIn'>
            <n-button-group>
              <n-button @click="showAuthModal = true" round>
                <template #icon>
                  <n-icon><LogInFilled /></n-icon>
                </template>
                Log In
              </n-button>
              <n-button round>
                <template #icon> </template>
                Sign Up
              </n-button>
            </n-button-group>
          </template>
          <template v-else>
            <n-button-group>
              <n-button @click="handleLogout" round>
                <template #icon>
                  <n-icon><LogInFilled /></n-icon>
                </template>
                Выход
              </n-button>
            </n-button-group>
          </template>
          <n-button quaternary circle @click="toggleTheme">
            <n-icon size="20">
              <Moon v-if="!isDark" />
              <Sunny v-else />
            </n-icon>
          </n-button>
        </div>
      </div>
    </div>
  </header>
  <AuthModal v-model:show="showAuthModal" @login-success="handleLoginSuccess"></AuthModal>
</template>
<style scoped></style>
<script setup lang="ts">
import { NButton, NButtonGroup, NIcon, useMessage } from 'naive-ui'
import { ref } from 'vue'
import AuthModal from '@/components/AuthModal.vue'
import { useAuth } from '@/composable/useAuth.ts'
import { Sunny, Moon } from '@vicons/ionicons5'
import { useTheme } from '@/composable/useTheme'

const { isLoggedIn, logout } = useAuth();

const showAuthModal = ref(false)
const { isDark, toggleTheme } = useTheme()
const message = useMessage()
const handleLoginSuccess = () => {
  message.success('Добро пожаловать!')
}

const handleLogout = () => {
  logout();
  message.info('Вы вышли из системы.');
}
</script>
