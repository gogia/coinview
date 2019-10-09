<template>
  <v-layout justify-center>
    <v-dialog v-model="$store.state.coinMenu" persistent max-width="600px">
      <v-form ref="form" @submit.prevent v-model="valid">
        <v-card dark>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    :label="headerNamer(textCode)"
                    color="#EDC3C5"
                    @click="resetMessage"
                    v-model="inputMessage"
                    :rules="inputRules"
                    required
                    v-on:keyup.enter="multiAct"
                    v-on:keyup.esc="closeClear"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Enter a coin name or symbol (ie: Bitcoin, BTC)</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#EDC3C5" @click="multiAct" :disabled="!valid" required
              >Add Coin</v-btn
            >
            <!--
              <v-btn
                color="#EDC3C5"
                flat
                @click="listDialogFlip"
                :disabled="listDisable()"
                >List Coins</v-btn
              >  
              <v-btn color="#EDC3C5" flat @click="optionsDialogFlip"
                >Options</v-btn
              >
            -->
            <v-btn color="#EDC3C5" @click="closeClear">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { coin } from "./coinObject";
export default Vue.extend({
  data: () => ({
    // Valid is for TextField Rules
    valid: true,

    // Handler for Error Messages
    textCode: 0,

    coinDialog: false,
    inputMessage: "",

    inputRules: [
      (v: any) =>
        (v && v.length >= 3) || "Name must be greater than 3 characters"
    ]
  }),

  methods: {
    coinSearch: async function(myCoin: any) {
      const CoinGecko = require("coingecko-api");
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.fetch(myCoin.toLowerCase());
      if (coinDat.success === false) {
        this.coinVert(myCoin);
        this.inputMessage = "";
        this.resetValidation();
      } else {
        const coinyBoi = this.coinMint(coinDat);

        this.dupeCheck(coinyBoi);
      }
    },

    // only coinDat should be passed in
    coinMint(coinData: any): coin {
      const coinyBoi = new coin(
        coinData.data.name,
        coinData.data.id,
        coinData.data.symbol.toUpperCase(),
        coinData.data.market_data.current_price.usd,
        coinData.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinData.data.market_data.price_change_percentage_24h
      );
      console.log(coinData.data.name);
      return coinyBoi;
    },

    // Final test before putting a coin into store.
    dupeCheck(myCoin: coin) {
      if (
        !this.$store.state.testCoins.some((item: any) => item.id === myCoin.id)
      ) {
        this.$store.commit("pushCoin", myCoin);
        this.interval();
      } else {
        this.textCode = 2;
      }
      this.inputMessage = "";
      this.resetValidation();
    },

    coinVert: async function(mySymbol: string) {
      mySymbol = mySymbol.toLowerCase();
      const CoinGecko = require("coingecko-api");
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.list();

      if (!coinDat.data.find((x: any) => x.symbol === mySymbol)) {
        this.textCode = 1;
      } else {
        const thing = coinDat.data.find((x: any) => x.symbol === mySymbol);
        this.coinSearch(thing.id);
      }
      this.inputMessage = "";
    },

    
    //Test Code
    updateWrapper: async function() {
      this.$store.state.testCoins.forEach((element: coin) => {
        this.coinUpdate(element);
      });
    },

    coinUpdate: async function(myCoin: coin) {
      const CoinGecko = require('coingecko-api');
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.fetch(
        myCoin.id.toLowerCase().toString(),
      );
      const index = this.$store.state.testCoins.findIndex(
        (x: coin) => x.id === myCoin.id,
      );

      const coinyBoi = new coin(
        coinDat.data.name,
        coinDat.data.id,
        coinDat.data.symbol.toUpperCase(),
        coinDat.data.market_data.current_price.usd,
        coinDat.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinDat.data.market_data.price_change_percentage_24h,
      );
    
      this.$store.commit('updateStats', coinyBoi);
      console.log("STATS UPDATED");
    },

    // Calculates an update time for setInterval that doesn't break API rate limiting rules.
    //THIS CODE NEEDS TO BE REWRITTEN MAKES TOO MANY API CALLS!
    optimizeTime(): number {
      let time = 1;
      let callsPerMinute = (60 / time) * this.$store.state.testCoins.length;

      while (callsPerMinute >= 90) {
        callsPerMinute = (60 / time) * this.$store.state.testCoins.length;
        time++;
      }
      return time * 1200;
      //console.log(`CALLS PER MINUTE: ${callsPerMinute}`);
    },

    interval() {
      let intr;
      switch (this.$store.state.testCoins.length) {
        case 0: {
          clearInterval(intr);
          break;
        }
        case 1: {
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
        default: {
          clearInterval(intr);
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
      }
      },
    //END TEST CODE
    

    multiAct() {
      this.coinSearch(this.inputMessage);
      this.resetValidation();
    },

    resetMessage() {
      this.textCode = 0;
    },

    closeClear() {
      this.resetMessage();
      this.$store.commit("menuSet", false);
      this.$store.commit("listMenuSet", false);
      //this.optionsDialog = false;
      //this.defaultDialog = false;
      this.inputMessage = "";
      this.resetValidation();
    },

    listDialogFlip() {
      this.resetMessage();
      this.$store.commit("menuSet", false);
      this.$store.commit("listMenuSet", true);
      //this.optionsDialog = false;
      this.resetValidation();
    },

    resetValidation() {
      (this.$refs.form as any).resetValidation();
    },

    headerNamer(textCode: number): string {
      const msg = ["Coin Name", "Invalid Coin", "Duplicate Coin"];
      return msg[textCode];
    }


  }
});
</script>
