import  Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
Vue.use(Vuex);

export const all_Currencies = ['USD','EUR','PLN'];
export const high_year = [31,29,31,30,31,30,31,31,30,31,30,31];
export const low_year =  [31,28,31,30,31,30,31,31,30,31,30,31];
const current_year = new Date().getFullYear()-1;
const store = new  Vuex.Store ({
state:{
    currency:[]
},
actions: {
    async GET_EXCHANGE_RATE({commit}) {
        let currMonth;
        let currentDay;
        let certainYear = [];
        let currentYearMonths;
        if (current_year % 4 === 0) {
            currentYearMonths = high_year
        } else {
            currentYearMonths = low_year
        }

        for (let months in currentYearMonths) {
            currMonth = parseInt(months) + 1;
            for (let days = 1; days <= currentYearMonths[months]; days++) {
                currentDay = days;
                if (currMonth < 10) {
                    currMonth = `0${currMonth}`
                }
                if (currentDay < 10) {
                    currentDay = `0${currentDay}`
                }
                for (let currency in all_Currencies) {
                    await axios(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${all_Currencies[currency]}&date=${current_year}${currMonth}${currentDay}&json`, {
                        method: 'GET'
                    })
                        .then((response) => {
                            // console.log(response.data[0]);
                            certainYear.push(response.data[0]);
                            commit('SET_EXCHANGE_RATE_TO_VUEX', certainYear);
                        })
                }
                currentDay = parseInt(currentDay);
                currMonth = parseInt(currMonth);
            }

        }
        console.log(current_year % 4);
        console.log(certainYear);
        return commit('SET_EXCHANGE_RATE_TO_VUEX', certainYear);



    }
},
mutations:{
    SET_EXCHANGE_RATE_TO_VUEX :(state,currency) =>{
        state.currency = currency
    }
},
getters:{
 CURRENCY(state){
     return state.currency;
 }
}

});
export default store;