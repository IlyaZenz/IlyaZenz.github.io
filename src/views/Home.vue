<template>
  <div class="relative min-h-screen">
    <div
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
      :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
      :class="{ 'opacity-100': backgroundImageUrl, 'opacity-0': !backgroundImageUrl }"
    >
      <div class="absolute inset-0 white bg-opacity-60"></div>
    </div>

    <div class="relative z-10 pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-white mb-8">
        Рынок криптовалют сегодня
      </h1>

      <CoinTable mode="all" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import axios from 'axios';
import CoinTable from '../components/CoinTable.vue';

const message = useMessage();
const backgroundImageUrl = ref('');

const fetchBackgroundImage = async () => {
  const UNSPLASH_ACCESS_KEY = 'H_vmoOXD2a5WJKxMC-nZx0LKj5h1DM5QZJVv4Nlq-pQ';
  const topic = 'finance';

  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        query: topic,
        orientation: 'landscape',
        count: 1
      }
    });
    backgroundImageUrl.value = response.data[0].urls.regular;
  } catch (error) {
    console.warn('Не удалось загрузить фоновое изображение с Unsplash. Используйте заглушку.', error);
    // Заглушка, если API не работает
    backgroundImageUrl.value = 'https://picsum.photos/1920/1080?random=1';
  }
};

onMounted(() => {
  fetchBackgroundImage();
});
</script>
