<template>
  <div :class="{['dark']: darkThemeOn}">
    <div class="min-h-screen dark:bg-black pattern">
      <header class="flex justify-center flex-col min-w-full p-5">
        <h1 class="text-4xl m-auto mb-5 dark:text-white text-center">Поиск репозиториев по GitHub</h1>
        <DarkLightToggle class="m-auto" v-model="darkThemeOn"></DarkLightToggle>
      </header>

      <div class="w-3/4 border-b-2 m-auto mb-12" />

      <Search @input="debouncedSearch" v-model="query" />

      <div class="flex gap-1 w-3/4 m-auto mb-12 flex-col sm:flex-row sm:gap-6">
        <div class="w-full mt-5 m-auto mb-2 border-2 flex justify-between rounded-md cursor-pointer dark:bg-gray-500 dark:border-yellow-500">
          <select name="sort" id="sort" @change="changeSort" 
            class="flex-grow outline-none text-gray-600 py-1 px-3 cursor-pointer dark:bg-gray-500 dark:text-white">
            <option value="" selected>Наилучшее соответствие</option>
            <option value="stars">Звёзды</option>
          </select>
        </div>

        <div class="w-full mt-5 m-auto mb-2 border-2 flex justify-between rounded-md cursor-pointer dark:bg-gray-500 dark:border-yellow-500"
        :class="{['opacity-70']: !currentSort}">
          <select :disabled="!currentSort" name="order" id="order" @change="changeOrder" 
            class="flex-grow outline-none text-gray-600 py-1 px-3 cursor-pointer dark:bg-gray-500 dark:text-white">
            <option value="asc">По возрастанию</option>
            <option value="desc" selected>По убыванию</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="w-3/4 m-auto text-center dark:text-white">Загрузка...</div>

      <div v-if="!isLoading" class="w-3/4 m-auto">
        <ul v-if="repList.length" class="grid grid-cols-2 gap-6 lg:grid-cols-3 mb-12">
          <Card :repository="rep" v-for="rep in repList" :key="rep.id" />  
        </ul>
        <div v-else class="mb-6 dark:text-white">По вашему запросу ничего не найдено</div>
        <div class="flex justify-between gap-6 pb-6">
          <button 
            @click="prevPage" 
            :disabled="currentPage <= 1" 
            class="p-2 pl-5 pr-5 bg-white border-2 text-black text-lg rounded-lg transition-colors duration-700 transform focus:border-4 focus:border-indigo-300 opacity-70 cursor-default opacity-10 dark:bg-gray-200"
            :class="{['hover:bg-gray-500 hover:text-white cursor-pointer opacity-100 dark:hover:bg-yellow-500']: currentPage > 1}">
            Предыдущая страница
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage >= totalPages" 
            :class="{['hover:bg-gray-500 hover:text-white cursor-pointer opacity-100 dark:hover:bg-yellow-500']: currentPage < totalPages}"
            class="p-2 pl-5 pr-5 bg-white border-2 text-black text-lg rounded-lg transition-colors duration-700 transform focus:border-4 focus:border-indigo-300 opacity-70 cursor-default dark:bg-gray-200">
            Следующая страница
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DarkLightToggle from './components/DarkLightToggle.vue'
import Search from './components/Search.vue'
import Card from './components/Card.vue'
import debounce from 'lodash.debounce';
import axios from 'axios'
export default {
  components: {
    Search,
    Card,
    DarkLightToggle,
  },
  data() {
    return {
      query: '',
      apiUrl: 'https://api.github.com/search/repositories',
      repList: [],
      currentPage: 1,
      perPage: 10,
      totalPages: 0,
      isLoading: false,
      currentOrder: 'desc',
      currentSort: '',
      darkThemeOn: false,
      }
  },
  created() {
    this.query = this.$route.query.q
    this.debouncedSearch()
  },
  mounted() {
  
  },
  methods: {
    prevPage() {
      this.currentPage = this.currentPage <= 0 ? 0 : this.currentPage - 1
      this.searchQuery()
    },
    nextPage() {
      this.currentPage = this.currentPage >= this.totalPages ? this.totalPages : this.currentPage + 1
      this.searchQuery()
    },
    changeSort(event) {
      const value = event.target.value
      this.currentSort = value
      this.searchQuery()
    },
    changeOrder(event) {
      const value = event.target.value
      this.currentOrder = value
      this.searchQuery()
    },
    async searchQuery() {
      if (!this.query) return

      try {
        this.isLoading = true

        const response = await axios.get(this.apiUrl, {
          params: {
            per_page: this.perPage,
            page: this.currentPage,
            q: this.query,
            order: this.currentOrder,
            sort: this.currentSort
          }
        })
        this.repList = response.data.items
        this.totalPages = Math.ceil(response.data.total_count / this.perPage)

        this.isLoading = false
      } catch(error) {
          console.log(error);
      }
      this.$router.push({
        query: {
          q: this.query
        }
      })
    },
    debouncedSearch: debounce(function () {
          this.searchQuery()
         }, 500)
    }
}
</script>

<style>
  .pattern {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23beb1d4' fill-opacity='0.31' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
