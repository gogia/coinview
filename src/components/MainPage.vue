<template>
  <div>
    <TopBar> </TopBar>
    <CoinDialog/>
    <BottomBar> </BottomBar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar.vue";
import BottomBar from "./BottomBar.vue";
import CoinDialog from "./CoinDialog.vue";

export default Vue.extend({
  components: {
    TopBar,
    BottomBar,
    CoinDialog
  }
});
</script>
