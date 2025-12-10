<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="true"
    preset="card"
    title="Вход в систему"
    :style="{ width: '400px' }"
  >
    <n-card :bordered="false" size="small">
      <n-form ref="formRef" :model="formValue" :rules="rules" @submit.prevent="handleLogin">
        <n-form-item label="E-mail или Логин" path="username">
          <n-input v-model:value="formValue.username" placeholder="Введите логин" clearable />
        </n-form-item>

        <n-form-item label="Пароль" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            show-password-on="click"
            placeholder="Введите пароль"
            clearable
          />
        </n-form-item>

        <n-form-item>
          <n-button type="primary" attr-type="submit" block :loading="loading"> Войти </n-button>
        </n-form-item>
      </n-form>

      <div class="text-center mt-4">
        <n-button text type="primary" @click="$emit('request-register')">
          Нет аккаунта? Зарегистрироваться
        </n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton,
  useMessage, // Хук для уведомлений
} from 'naive-ui'
import { useAuth } from '@/composable/useAuth';

const { login } = useAuth();
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show', 'login-success', 'request-register'])

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val),
})

const message = useMessage()
const formRef = ref(null)
const loading = ref(false)

const formValue = ref({
  username: '',
  password: '',
})

const rules = {
  username: {
    required: true,
    message: 'Пожалуйста, введите логин',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: 'Пожалуйста, введите пароль',
    trigger: ['blur', 'input'],
  },
}


const handleLogin = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        if (formValue.value.username === 'test' || 'ilya' && formValue.value.password === '123') {
          const userToken = 'fake-jwt-token-12345';
          localStorage.setItem('username', formValue.value.username);
          login(userToken);
          message.success('Вход выполнен успешно!')
          emit('login-success')
          showModal.value = false
        } else {
          message.error('Неверный логин или пароль.')
        }
      }, 1000)
    } else {
      message.error('Пожалуйста, заполните все обязательные поля.')
    }
  })
}
</script>
<style scoped></style>
