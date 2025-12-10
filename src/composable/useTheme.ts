import { ref, computed, watchEffect } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

const THEME_KEY = 'theme'
type ThemeMode = 'light' | 'dark'

const mode = ref<ThemeMode>(
  (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light'
)

const isDark = ref(mode.value === 'dark')

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    mode.value = isDark.value ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, mode.value)
  }

  watchEffect(() => {
    const html = document.documentElement
    html.classList.toggle('dark', isDark.value)
  })

  const naiveTheme = computed(() =>
    isDark.value ? darkTheme : lightTheme
  )

  return {
    isDark,
    toggleTheme,
    naiveTheme
  }
}
