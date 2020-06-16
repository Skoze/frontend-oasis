<template>
  <main class="home">
    <div class="search-wrap">
      <div class="logo">
        <strong>O</strong>
        <span>nline gr</span>
        <strong>A</strong>
        <span>ph </span>
        <strong>S</strong>
        <span>ystem for acdem</span>
        <strong>I</strong>
        <span>c</span>
        <strong>S</strong>
      </div>
      <OASearch @submit="submit"> </OASearch>
    </div>
  </main>
</template>

<script>
import OASearch from '@/components/OASearch.vue';

export default {
  name: 'Home',
  components: {
    OASearch,
  },
  methods: {
    submit(queryString) {
      const route = `/search?${queryString}`;
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-wrap {
  flex: 0 1 800px;
  position: relative;
}
.logo {
  position: absolute;
  top: -4em;
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  font-size: 2rem;
  color: lightgray;
  transition: color 5s 1s;
}
strong {
  color: black;
}
.logo strong {
  font-size: 2em;
}
</style>
