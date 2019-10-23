<template>
  <v-dialog v-model="$store.state.optionMenu" persistent max-width="600px">
    <v-card dark>
        <v-layout justify-center>
        <v-container fluid>
        <v-overflow-btn
        :items="timeChoice"
        label="Time Range Select"
        hint="Time Range Select"
        @change="sendStore($event)"
        flat
        style="width: 50%"
        >
        </v-overflow-btn>
        </v-container>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#EDC3C5" @click="optionClose">Close</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

    data: () => ({
      timeChoice: ['1', '7', '14', 'max'],
    }),
    
    methods: {
    test(props: any){
        console.log(props);
    },

    sendStore(props: any){
        this.$store.commit("daySet", props);
    },
    
    optionClose(){
        this.$store.commit("optionMenuSet", false);
    }
    }


})
</script>