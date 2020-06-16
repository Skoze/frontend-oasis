<template>
  <div class="spider-container">
    <v-text-field
      label="会议名称"
      v-model="conference"
      outlined
      flat
      tile
      dense
    ></v-text-field>
    <div class="year-wrap">
      <v-text-field
        class="year-input"
        label="起始年份"
        v-model="start"
        outlined
        flat
        tile
        dense
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field
        class="year-input"
        label="结束年份"
        v-model="end"
        outlined
        flat
        tile
        dense
      ></v-text-field>
    </div>
    <v-btn
      class="btn primary white--text"
      :loading="loading"
      :disabled="!query"
      tile
      @click.native="$emit('get', query)"
    >
      获取数据
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      conference: '',
      start: '',
      end: '',
    };
  },
  computed: {
    query() {
      const start = parseInt(this.start);
      const end = parseInt(this.end);
      if (this.conference && Number.isInteger(start) && Number.isInteger(end)) {
        return {
          conference: this.conference,
          start,
          end,
        };
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.spider-container {
  text-align: center;
}
.year-wrap {
  display: flex;
}
.year-wrap > .year-input {
  flex: 5;
}
</style>
