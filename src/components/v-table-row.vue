<template>
    <div class="v-table-row">
<!--        <div class="row" :for="id">{{id}}</div>-->
       <div class="row r030">{{row_data.r030}}</div>
       <div class="row text">{{row_data.txt}}</div>
       <div class="row cc">{{row_data.cc}}</div>
       <div class="row rate">{{row_data.rate}}</div>
       <div class="row exchangedate">{{row_data.exchangedate}}</div>
    </div>

</template>

<script>
    export default {
        name: "v-table-row",
        props:{
            row_data:{
                type: Object,
                default:()=>{
                    return{}}
            }
        },
        mounted() {
            this.id = this._uid
        }
    }
</script>

<style scoped>
.v-table-row{
    display: flex;
    justify-content: space-around;
}
.row{
    flex-basis: 20%;
    padding: 8px 16px;
    text-align: left;
}
.v-table-row:nth-child(odd){
    background: #b9f1ff;
}
</style>