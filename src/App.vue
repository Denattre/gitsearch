<template>
 <div>
   <search @input="debouncedSearch" v-model="query" />
   <ul>
     <li v-for="rep in repList" :key="rep.name">
       <h2>Заголовок разделитель</h2>
       <ul>
      <li>
        <!-- <a href="${rep.owner.html_url}">{{rep.owner.login}}</a> -->
      </li>
      <li>
        <!-- <a href="${rep.html_url}">{{rep.name}}</a> -->
      </li>
      <!-- <li>{{rep.language}}</li>
      <li>{{rep.stargazers_count}}</li> -->
   </ul>
     </li>
   </ul>
   
 </div>
</template>

<script>
import Search from './components/Search.vue'
import _debounce from 'lodash.debounce';
import axios from 'axios'
export default {
  components: {
    Search,
  },
  data() {
    return {
      query: '',
      repList: null,
      }
  },
  methods: {
    debouncedSearch: _debounce(function () {
      axios.get(`https://api.github.com/search/repositories?q=${this.query}`)
      .then(function (response) {
      this.repList = response.data.items
      console.log(this.repList)
      })
      .catch(function (error) {
        console.log(error);
      });
      }, 500),
  }
}
</script>

<style>

</style>
