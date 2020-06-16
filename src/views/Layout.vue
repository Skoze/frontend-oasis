<template>
  <v-app>
    <v-content v-if="done">
      <OAHeader></OAHeader>
      <router-view class="layout-content"></router-view>
    </v-content>
    <v-snackbar v-else v-model="snackbar" top color="error" :timeout="0">
      <span>无法连接到服务器</span>
      <v-btn text @click="snackbar = false">知道了</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import OAHeader from '@/components/OAHeader';
import { mapActions } from 'vuex';
export default {
  components: {
    OAHeader,
  },
  data() {
    return {
      done: false,
      snackbar: false,
    };
  },
  created() {
    this.updateAll().then(
      () => {
        this.done = true;
      },
      () => {
        this.snackbar = true;
      }
    );
  },
  methods: {
    ...mapActions(['updateAll']),
  },
};
</script>

<style scoped>
.layout-content {
  height: 100%;
  margin: auto;
  padding: 2em 0 4em;
}
</style>
