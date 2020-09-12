<template>
  <div id="app">
<h1>Currency Table</h1>
    <v-table  v-bind:currency_data="CURRENCY"   />
  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import  vTable from './components/v-table'
export default {
  name: 'App',
  components: {
    vTable
  },
  data: () =>{
    return{

    }
},
  computed:{
    ...mapGetters([
      'CURRENCY'
    ])},
  methods:{
    ...mapActions([
      'GET_EXCHANGE_RATE'
    ])
  },
  mounted() {
    this.GET_EXCHANGE_RATE()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 0.8em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  scroll-behavior: smooth;



}
</style>
