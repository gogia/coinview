<template>
  <v-container>
    <TopBar> </TopBar>
    <CoinBox />
    <CoinDialog />
    <ListDialog />
    <BottomBar> </BottomBar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar.vue";
import BottomBar from "./BottomBar.vue";
import CoinDialog from "./CoinDialog.vue";
import ListDialog from "./ListDialog.vue";
import CoinCard from "./CoinCard.vue";
import CoinBox from "./CoinBox.vue";

export default Vue.extend({
  components: {
    TopBar,
    BottomBar,
    CoinDialog,
    ListDialog,
    CoinCard,
    CoinBox
  }
});
</script>
