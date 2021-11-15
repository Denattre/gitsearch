<template>
  <div>
    <input :value="modelValue" @input="updateInput" type="text" placeholder="Введите текст">
  </div>
</template>

<script>

  export default {
    props:{
      modelValue:[String],
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