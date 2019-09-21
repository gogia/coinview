<template>
  <div>
    <TopBar> </TopBar>

    <BottomBar> </BottomBar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./TopBar.vue";
import BottomBar from "./BottomBar.vue";

export default Vue.extend({
  components: {
    TopBar,
    BottomBar
  }
});
</script>
