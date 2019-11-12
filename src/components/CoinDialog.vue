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
            <v-btn color="#EDC3C5" @click="multiAct" :disabled="!valid" required>Add Coin</v-btn>
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
        (v && v.length >= 2) || "Name must be greater than 2 characters"
    ]
  }),

  computed: {
    test() {
      //console.log("LOCALSTORE");
      //console.log(JSON.parse(localStorage.Store));
      //console.log(this.$store.state.updateCoinsFromLocal);
      if (this.$store.state.updateCoinsFromLocal == true) {
        console.log("COINS NEED UPDATING");

        this.$store.state.updateCoins.forEach((element: any) => {
          this.newCoinSearch(element);
        });
      }
      this.$store.commit("updateSet", false);
    }
  },

  watch: {
    test() {
      console.log("test was called");
    }
  },

  methods: {
    newCoinSearch: async function(myCoin: any) {
      myCoin = myCoin.toLowerCase();
      console.log(myCoin);
      const CoinGecko = require("coingecko-api");
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins
        .fetch(myCoin)
        .then(null, this.coinVert(myCoin));

      const priceLog = await CoinGeckoClient.coins.fetchMarketChart(
        myCoin,
        { days: this.$store.state.daySelect }
      );
      let priceArr = this.marketData(priceLog);
      const coinyBoi = this.coinMint(coinDat, priceArr);
      this.dupeCheck(coinyBoi);
    },

    // only coinDat should be passed in
    coinMint(coinData: any, priceArr: number[]): coin {
      const coinyBoi = new coin(
        coinData.data.name,
        coinData.data.id,
        coinData.data.symbol.toUpperCase(),
        coinData.data.market_data.current_price.usd,
        coinData.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinData.data.market_data.price_change_percentage_24h,
        priceArr,
        0
      );
      console.log("COIN MINTED");
      console.log(coinyBoi);
      //this.$store.commit("arrayGen")
      return coinyBoi;
    },

    // youll have to add arguments to this for date and shit
    marketData(priceLog: any) {
      var priceArr: number[] = [];
      //console.log(priceArr);
      //console.log(priceLog);

      priceLog.data.prices.forEach((element: any) => {
        priceArr.push(element[1]);
      });
      //console.log("THIS IS THE PRICE ARRAY");
      //console.log(priceArr);
      return priceArr;
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
      console.log(coinDat);
      if (!coinDat.data.find((x: any) => x.symbol === mySymbol)) {
        this.textCode = 1;
      } else {
        const thing = coinDat.data.find((x: any) => x.symbol === mySymbol);
        console.log(thing.id);
        this.newCoinSearch(thing.id);
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
      console.log(`${myCoin.name} UPDATED!`);
      const coinsHeld = myCoin.coinsHeld;
      const CoinGecko = require("coingecko-api");
      const CoinGeckoClient = new CoinGecko();
      const coinDat = await CoinGeckoClient.coins.fetch(
        myCoin.id.toLowerCase().toString()
      );
      const priceLog = await CoinGeckoClient.coins.fetchMarketChart(myCoin.id, {
        days: this.$store.state.daySelect
      });
      let priceArr = this.marketData(priceLog);
      const index = this.$store.state.testCoins.findIndex(
        (x: coin) => x.id === myCoin.id
      );

      const coinyBoi = new coin(
        coinDat.data.name,
        coinDat.data.id,
        coinDat.data.symbol.toUpperCase(),
        coinDat.data.market_data.current_price.usd,
        coinDat.data.market_data.price_change_percentage_1h_in_currency.usd,
        coinDat.data.market_data.price_change_percentage_24h,
        priceArr,
        coinsHeld
      );

      this.$store.commit("updateStats", coinyBoi);
      //console.log("STATS UPDATED");
      //console.log(coinyBoi);
    },

    // Calculates an update time for setInterval that doesn't break API rate limiting rules.
    //THIS CODE NEEDS TO BE REWRITTEN MAKES TOO MANY API CALLS!
    optimizeTime(): number {
      let time = 0;
      time = Math.floor((90 * this.$store.state.testCoins.length) / 60) * 1750;
      return time;
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
      this.newCoinSearch(this.inputMessage);
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
      const msg = ["Coin Name", "Coin Name", "Duplicate Coin"];
      return msg[textCode];
    }
  }
});
</script>
