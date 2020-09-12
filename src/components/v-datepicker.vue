<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    // import {low_year} from "../vuex/store";

    export default {
        name:'v-date-picker',
        components: { DatePicker },
        props:{
            currencyFilter:{
                type: Function
            },
            filtered_data:{
                type:Array
            },
            currency_data : {
                type : Array,
                default : ()=>{
                    return []
                }},
            ccFilterIsActive :{
                type: Boolean
            }


        },

        data() {
            return {

                // filtered_data:[],
                time1:null,
                dateFilterIsActive:false

            };
        },
        methods:{
            findDate() {
                if(this.time1[0]==null) {
                    if(this.ccFilterIsActive){

                        this.dateFilterIsActive=false;
                        this.filtered_data = this.currency_data;
                        this.emitToParent();
                        this.currencyFilter();

                        return this.filtered_data;
                    }
                   else{
                       this.dateFilterIsActive=false;
                    this.filtered_data = this.currency_data;
                        this.emitToParent();
                    return this.filtered_data;}
                 }
                console.log("PRAVDA NE PONYA");

                this.filtered_data = this.currency_data;
                this.filtered_data = this.filtered_data.filter(date =>  {
                    let dayStart = this.time1[0].split(".").reverse();
                    let dayEnd = this.time1[1].split(".").reverse();
                  let startdate =  date.exchangedate.split(".").reverse();
                    if( new Date(startdate[0],startdate[1],startdate[2])>= new Date(dayStart[0],dayStart[1],dayStart[2])
                        && new Date(startdate[0],startdate[1],startdate[2])<= new Date(dayEnd[0],dayEnd[1],dayEnd[2])){
                        return date;
                    }
                });
                this.dateFilterIsActive=true;
                console.log(this.filtered_data);

                this.emitToParent();
                return this.filtered_data;

            },
            emitToParent () {
                this.$emit('childToParent', this.filtered_data, this.dateFilterIsActive);

            }
        }
    };
</script>

<template>
    <div>

        <date-picker v-model="time1"  @change="findDate"    range type="date" valueType="DD.MM.YYYY" ></date-picker>
    </div>
</template>