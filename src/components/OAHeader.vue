<template>
  <v-app-bar app class="primary white--text pb-0">
    <router-link to="/">
      <strong class="white--text" style="text-decoration:none">OASIS</strong>
    </router-link>
    <nav>
      <router-link to="/" class="nav-item" active-class="nav-active" exact>
        <span>首页</span>
      </router-link>
      <router-link
        to="/ranking"
        class="nav-item"
        active-class="nav-active"
        exact
      >
        <span>学术排名</span>
      </router-link>
      <router-link
        v-if="user.role === 'administrator'"
        to="/updateData"
        class="nav-item"
        active-class="nav-active"
        exact
      >
        <span>更新数据</span>
      </router-link>
    </nav>
    <v-spacer></v-spacer>
    <v-btn
      class="primary--text white elevation-0"
      v-if="user.role === 'guest'"
      @click="$router.push('/login')"
    >
      登录
    </v-btn>
    <div v-else>
      欢迎，
      {{ user.name }}
      <v-btn
        @click="
          logout();
          $router.push('/');
        "
        class="primary--text white elevation-0"
      >
        退出
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['logout']),
  },
};
</script>

<style scoped>
nav {
  margin-left: 2em;
  height: 100%;
  display: flex;
}
nav .nav-item {
  position: relative;
  top: 5px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0 1.5em;
  height: 100%;
  line-height: 48px;
}
nav .nav-item.nav-active {
  color: white;
  border-bottom: 3px aliceblue solid;
}
strong {
  font-size: 1.5em;
  margin-left: 1em;
}
</style>
