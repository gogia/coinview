<template>
<div>
    
    <v-flex v-for="(myCoin, index) in coinList"
    :key="index">

        <!--         :coinName="coinList[index].name"
        :coinSymbol="coinSymbol[index].symbol" -->

        <CoinCard>

        </CoinCard>
    </v-flex>


    <!--
    <v-btn @click=testFunc>Test</v-btn>
    -->
</div>   
</template>


<script lang="ts">
import Vue from 'vue'
import { coin } from "./coinObject";
import CoinCard from "./CoinCard.vue"
export default Vue.extend({
    components:{
        CoinCard
    },

    computed: {
        coinList: {
            get():  [] {
                return this.$store.state.testCoins;
            }
        }
    },

    methods: {
        testFunc(){
            console.log(this.coinList);
        }

    },
    
})
</script>