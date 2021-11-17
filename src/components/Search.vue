<template>
  <div class="w-3/4 mt-5 m-auto mb-2 border-2 flex justify-between rounde-md rounded-md py-1 px-3 dark:bg-gray-500 dark:border-yellow-500">
    <input :value="modelValue" @input="updateInput" class="flex-grow outline-none text-gray-600 focus:text-blue-600 dark:bg-gray-500 dark:text-white " type="text" placeholder="Введите название репозитория" />
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
  </div>
</template>

<script>

  export default {
    props:{
      modelValue: String,
    },
    methods: {
      updateInput(event){
        this.$emit('update:modelValue', event.target.value)
      }
      
    }
  }
</script>

<style scoped>

</style>