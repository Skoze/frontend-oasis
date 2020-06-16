<template>
  <div class="search">
    <v-text-field
      class="input"
      flat
      solo
      clearable
      hide-details
      prepend-inner-icon="mdi-magnify"
      v-model="str"
      maxlength="40"
      placeholder="作者、机构、会议或关键词(最多输入40个字符）"
      @keyup.enter.native="submit"
    >
      <template v-slot:prepend>
        <v-select
          class="select"
          :items="types"
          flat
          solo
          hide-details
          v-model="type"
        ></v-select>
      </template>
    </v-text-field>
    <v-btn class="btn white--text primary" tile text @click.native="submit">
      搜索
    </v-btn>
    <router-link class="advance" to="/search">组合搜索 ></router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      str: '',
      type: '作者',
      types: ['作者', '机构', '会议', '关键词']
    };
  },
  computed: {
    queryString() {
      return `q${this.types.indexOf(this.type)}=${encodeURIComponent(
        this.str
      )}`;
    }
  },
  methods: {
    submit() {
      if (this.str) {
        this.$emit('submit', this.queryString);
      }
    }
  }
};
</script>
<style scoped>
.search {
  display: flex;
  max-width: 800px;
  min-width: 450px;
  position: relative;
  max-height: 50px;
  align-items: center;
}
.search .input {
  border-radius: 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border: 1px solid;
  border-right: 0;
}
.search .select {
  width: 7em;
  margin-top: -12px;
  margin-left: 25px;
  border-radius: 0;
  border-right: 1px solid;
  border-color: #0003;
}
.search .btn {
  padding: 0 3em;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  text-transform: capitalize;
}
.search .advance {
  position: absolute;
  left: 100%;
  width: fit-content;
  top: 50%;
  transform: translateY(-50%);
  min-height: 0;
  margin-left: 1em;
  text-decoration: none;
}
.search > * {
  min-height: 50px;
  max-height: 50px;
}
</style>
