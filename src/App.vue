<template>
  <v-app>
    <v-content>
      <MainPage></MainPage>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MainPage from "./components/MainPage.vue";

export default Vue.extend({
  name: "App",
  components: {
    MainPage
  },
  data: () => ({
    //
  }),

  created() {
    console.log(localStorage)
    console.log(JSON.parse(localStorage.Store));
    console.log(JSON.parse(localStorage.Store).testCoins);
    if(JSON.parse(localStorage.Store).testCoins.length != 0){
      JSON.parse(localStorage.Store).testCoins.forEach((element:any) => {
        console.log(element.name);
        this.$store.commit("pushUpdateCoin", element.name);
      });



      this.$store.commit("updateSet", true);
    }
  }
});
</script>
