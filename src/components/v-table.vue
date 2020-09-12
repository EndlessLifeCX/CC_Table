<template>
  <div class="v-table">
    <div class="v-date-picker">
      <v-date-picker
              v-bind:currency_data="currency_data"   v-on:childToParent="onChildClick"
              v-bind:filtered_data="filtered_data" v-bind:ccFilterIsActive="ccFilterIsActive"
              v-bind:currencyFilter="currencyFilter"
              ref="calendar"
      ></v-date-picker></div>


    <div class="v-table__header">
<!--      <p >№</p>-->
        <p>Цифровой код</p>
        <p>Название валюты</p>
            <select v-model="selectCurrency">
                <option value="0"  @click="reset" >Все валюты</option>
                <option v-for="currency in allCurrencies"
                    :key="currency.id"
                      @click="currencyFilter"
                >{{currency}}</option>
            </select>
      <p>Курс к гривне</p>
      <p>Дата курса</p>
    </div>
    <div class="v-table__body">
      <div v-if="!ccFilterIsActive  && !dateFilterIsActive">
          <v-table-row
                  v-for="row in paginatedItems"
                  :key="row.id"
                  :row_data="row"
          /></div>
       <div v-else> <v-table-row
              v-for="row in paginatedFilteredItems"
              :key="row.id"
              :row_data="row"
      /></div>
    </div>
      <div v-if="!ccFilterIsActive && !dateFilterIsActive">
     <div class="v-table__pagination">
      <div class="page"
        v-for="page in pages"
           :key="page"
           :class="{page__selected: page === pageNumber}"
           @click="pageClick(page)"
      >{{page}}</div>
    </div>
      </div>
      <div v-if="ccFilterIsActive || dateFilterIsActive">
          <div class="v-table__pagination">
          <div class="page"
               v-for="page in filteredPages"
               :key="page"
               :class="{page__selected: page === pageNumber}"
               @click="pageClick(page)"
          >{{page}}</div>
          </div>
      </div>
  </div>
</template>

<script>
    import vTableRow from './v-table-row'
    import vDatePicker from './v-datepicker'
    import {all_Currencies} from "../vuex/store";

    export default {
  name: 'v-table',
  components: {vTableRow,  vDatePicker},
  props: {
      currency_data : {
      type : Array,
      default : ()=>{
        return []
      }
    },
},
 data(){
    return{
        dateFilterIsActive:false,
        ccFilterIsActive: false,
        filtered_data: [],
        selectCurrency : 0,
        allCurrencies: all_Currencies,
        itemsPerPage:40,
        pageRange:2,
        pageNumber :1
    }},

  computed:{

    rangeStart:function(){
        let start = this.pageNumber - this.pageRange;
        return (start>0) ? start :1
        },


    rangeEnd:function(){
        let totalpages= 1096/40;
        let end = this.pageNumber + this.pageRange;
        return (end<totalpages) ? end : this.paginatedItems
        },


    pages(){

       let pages=[] ;
        for(let i=this.rangeStart; i<=this.rangeEnd;i++){
            pages.push(i);
        }
        // return Math.ceil(1096/40);
        return pages;
    },

      filteredPages(){
        return Math.ceil(this.filtered_data.length/40);
    },
    paginatedItems(){

      let from =(this.pageNumber-1)*this.itemsPerPage;
      let to = from+this.itemsPerPage;
      return this.currency_data.slice(from,to);
    },
      paginatedFilteredItems(){

      let from =(this.pageNumber-1)*this.itemsPerPage;
      let to = from+this.itemsPerPage;
      return this.filtered_data.slice(from,to);
    },

  },
  methods:{

      pageClick(page){
        this.pageNumber=page;
        window.scrollTo(0,55);
      },
      reset(){
           this.filtered_data= this.currency_data;
           this.ccFilterIsActive=false;
           if(this.dateFilterIsActive) this.$refs.calendar.findDate();

      },
      currencyFilter() {
          if(this.dateFilterIsActive){
              console.log(this.selectCurrency!==0);
              this.ccFilterIsActive = this.selectCurrency !== 0;
              this.filtered_data= this.currency_data;

              this.$refs.calendar.findDate();

              this.filtered_data = this.filtered_data.filter(currency => currency.cc === this.selectCurrency);

          }
          else{
              console.log(this.selectCurrency);
              this.filtered_data= this.currency_data;
              this.ccFilterIsActive = this.selectCurrency !== 0;

              this.filtered_data = this.filtered_data.filter(currency => currency.cc === this.selectCurrency);

              return this.filtered_data

              }



      },
      onChildClick (...args) {
            const[x,y] = args;
          this.filtered_data = x;
          this.dateFilterIsActive= y;

      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .v-date-picker{
        padding: 10px;
    }
    .v-table__body{
        min-height: 500px;
    }
  .v-table{
    max-width: 900px;
    margin: 0 auto;
  }
.v-table__header{
  display: flex;
  justify-content: space-around;

}
.v-table__header p {
  flex-basis: 20%;
  text-align: left;
  padding: 8px 16px;

  box-shadow:   -2px 8px 4px rgba(0,0,0,0.25);
}
  .v-table__header select {
      border: none;
      height: 43px;
      font-size: 0.8em;
      flex-basis: 20%;
      text-align: left;
      padding: 8px 16px;

  box-shadow:   -2px 8px 4px rgba(0,0,0,0.25);
}
.v-table__pagination{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.page{
  margin:8px 0 0 4px;
  padding: 8px ;
  border:solid 1px #bdbdbd;
}
.page:hover{
  cursor:pointer;
  background: #b9f1ff;
}

 .page__selected{
    background: aqua;
}
</style>
