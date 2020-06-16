<template>
  <div class="container">页面不存在，{{ time }} s后自动返回首页...</div>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      time: 3,
    };
  },
  mounted() {
    this.timeout = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        // this.$router.push('/');
      }
    }, 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
