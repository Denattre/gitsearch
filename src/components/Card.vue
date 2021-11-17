<template>
  <li class="border-2 rounded-md p-5 bg-white dark:bg-gray-500 dark:border-yellow-500">
      <ul>
        <li>
          <a :href="repository.owner.html_url" target="_blank" class="underline text-blue-600 hover:text-blue-800 dark:text-yellow-500 dark:hover:text-yellow-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-1 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{repository.owner.login}}
          </a>
        </li>
        <li>
          <a :href="repository.html_url"  class=" underline text-blue-600 hover:text-blue-800 dark:text-yellow-500 dark:hover:text-yellow-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-1 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {{repository.name}}
          </a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-1 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {{repository.language || 'Не указан'}}
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-1 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {{repository.stargazers_count}}
        </li>
      </ul>
  </li>
</template>

<script>
  export default {
    props:{
      repository:{
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

</style>