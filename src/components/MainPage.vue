<template>
  <div>
    <TopBar> </TopBar>
    <CoinDialog />
    <ListDialog/>
    <BottomBar> </BottomBar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar.vue";
import BottomBar from "./BottomBar.vue";
import CoinDialog from "./CoinDialog.vue";
import ListDialog from "./ListDialog.vue"

export default Vue.extend({
  components: {
    TopBar,
    BottomBar,
    CoinDialog,
    ListDialog
  }
});
</script>
