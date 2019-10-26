<template>
  <v-container fluid>
    <!--
    <TopBar> </TopBar>
    -->
    <CoinBox />
    <CoinDialog />
    <ListDialog />
    <OptionDialog/>
    <CoinOptionDialog/>
    <BottomBar> </BottomBar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar.vue";
import BottomBar from "./BottomBar.vue";
import CoinDialog from "./CoinDialog.vue";
import ListDialog from "./ListDialog.vue";
import OptionDialog from "./OptionDialog.vue"
import CoinOptionDialog from "./CoinOptionsDialog.vue"
import CoinCard from "./CoinCard.vue";
import CoinBox from "./CoinBox.vue";


export default Vue.extend({
  components: {
    TopBar,
    BottomBar,
    CoinDialog,
    ListDialog,
    OptionDialog,
    CoinOptionDialog,
    CoinCard,
    CoinBox
  }
});
</script>
