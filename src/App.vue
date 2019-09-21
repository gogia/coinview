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
  })
});
</script>
