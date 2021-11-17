<template>
  <div>
    <div class="w-full">
      <label 
        for="toggle"
        class="flex items-center cursor-pointer">
        <div class="relative">
          <input id="toggle" type="checkbox" class="sr-only" :value="modelValue" @change="updateTheme"/>
          <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div class="dot absolute w-6 h-6 bg-gray-200 rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div class="text-xl ml-3 text-gray-700 font-medium dark:text-white">
          {{theme}}
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      modelValue: [String, Boolean]
    },
    data() {
      return {
        theme: 'Тёмная тема'
      }
    },
    methods: {
      updateTheme(event){
        this.$emit('update:modelValue', event.target.checked);
        this.theme = event.target.checked ? 'Светлая тема' : 'Тёмная тема';
      }
    }
  }
</script>

<style scoped>
  input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #fdcf13;
}
</style>