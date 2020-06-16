<template>
  <div class="login-container">
    <v-card class="elevation-12 login-card">
      <v-card-title>
        用户登录
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="用户名"
          type="text"
          v-model="username"
          @keyup.enter="login"
        />
        <v-text-field
          label="密码"
          type="password"
          v-model="password"
          @keyup.enter="login"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" outlined @click="login">登录</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(['setUserToken']),
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.setUserToken({
          token: '',
          role: 'administrator',
          name: 'administrator'
        });
      } else {
        this.setUserToken({
          token: '',
          role: 'user',
          name: this.username
        });
      }
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  width: 30em;
}
</style>
