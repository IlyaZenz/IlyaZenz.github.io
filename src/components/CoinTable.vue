<template>
  <div class="overflow-x-auto">
    <n-table :single-line="false" class="shadow-lg rounded-lg bg-white">
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Цена (USD)</th>
          <th>Изменение за 24ч</th>
          <th>Рыночная капитализация</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in filteredCoins" :key="coin.id">
          <td>
            <n-button
              text
              size="large"
              :type="isFavorite(coin.id) ? 'warning' : 'default'"
              @click="toggleFavorite(coin.id)"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.212a.75.75 0 010 1.058L8.24 7.842a.75.75 0 00-.03.774l.955 2.126a.75.75 0 01-.767.935l-2.738.56a.75.75 0 00-.472 1.258l1.733 2.185a.75.75 0 01.196.862l-1.076 2.45a.75.75 0 001.173.815l2.428-.485a.75.75 0 01.698 0l2.428.485a.75.75 0 001.173-.815l-1.076-2.45a.75.75 0 01.196-.862l1.733-2.185a.75.75 0 00-.472-1.258l-2.738-.56a.75.75 0 01-.767-.935l.955-2.126a.75.75 0 00-.03-.774l-2.548-3.572a.75.75 0 01-.06-.05z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
            </n-button>
          </td>
          <td class="flex items-center space-x-3">
            <span class="font-semibold">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</span>
          </td>
          <td>${{ coin.current_price.toLocaleString() }}</td>
          <td :class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'">
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </td>
          <td>${{ coin.market_cap.toLocaleString() }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { NTable, NButton, NAvatar, useMessage } from 'naive-ui'
import axios from 'axios'

const props = defineProps({
  mode: {
    type: String,
    default: 'all',
  },
})

const message = useMessage()
const coins = ref([])
const loading = ref(true)
const favoriteIds = ref(getInitialFavorites()) // Массив ID избранных монет

// === 1. API INTEGRATION (CoinGecko) ===
const fetchCoins = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    })
    coins.value = response.data
  } catch (error) {
    message.error('Ошибка загрузки данных о криптовалютах.')
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCoins()
})

function getInitialFavorites() {
  const saved = localStorage.getItem('cryptoFavorites')
  return saved ? JSON.parse(saved) : []
}

const saveFavorites = () => {
  localStorage.setItem('cryptoFavorites', JSON.stringify(favoriteIds.value))
}

const isFavorite = (id) => favoriteIds.value.includes(id)

const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id)
    message.info(`Удалено из избранного.`)
  } else {
    favoriteIds.value.push(id)
    message.success(`Добавлено в избранное!`)
  }
  saveFavorites()
}

const filteredCoins = computed(() => {
  if (props.mode === 'favorites') {
    return coins.value.filter((coin) => isFavorite(coin.id))
  }
  return coins.value
})

watch(
  favoriteIds,
  () => {
    if (props.mode === 'favorites') {
      // Принудительное обновление для страницы избранного
      // Если монет в списке стало 0, но на самом деле их может быть больше
    }
  },
  { deep: true },
)
</script>
