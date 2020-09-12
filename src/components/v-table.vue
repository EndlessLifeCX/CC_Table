<template>
  <div class="v-table">
  </div>
</template>

<script>
export default {
  name: 'v-table',
  props: {
    currency_data : {
      type : Array,
      default : ()=>{
        return []
      }
    },
},
 data(){
    return{}},
  computed:{}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
