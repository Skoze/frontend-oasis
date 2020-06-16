<template>
  <div class="pagination">
    每页显示：
    <span
      v-for="val in [5, 10, 20]"
      :key="val"
      :value="val"
      :class="{ toggle: true, selected: pageSize === val }"
      @click="pageSize = val"
    >
      {{ val }}
    </span>
    <div @click="pre" class="arrow">&lt;</div>
    <input
      class="input"
      type="text"
      v-model="page"
      @keyup.enter="goToCertainPage"
    />
    <div>/</div>
    <div>{{ pageCount }}</div>
    <div @click="next" class="arrow">&gt;</div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: NaN,
      pageSize: NaN,
    };
  },
  created() {
    this.page = this.value.page;
    this.pageSize = this.value.pageSize;
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
    pagination() {
      return { page: this.page, pageSize: this.pageSize };
    },
  },
  watch: {
    value(val) {
      this.page = val.page;
      this.pageSize = val.pageSize;
    },
    pageSize() {
      this.page = 1;
      this.$emit('input', this.pagination);
    },
  },
  methods: {
    next() {
      this.page++;
      this.goToCertainPage();
    },
    pre() {
      this.page--;
      this.goToCertainPage();
    },
    goToCertainPage() {
      const currVal = parseInt(this.page);
      if (isNaN(currVal)) {
        this.page = this.value.page;
        return;
      } else if (currVal > this.pageCount) {
        this.page = Math.max(1, this.pageCount);
      } else if (currVal < 1) {
        this.page = 1;
      } else {
        this.page = currVal;
      }
      this.$emit('input', this.pagination);
    },
  },
};
</script>
<style scoped>
.pagination {
  display: flex;
  height: 1.5em;
  line-height: 1.5em;
  user-select: none;
  justify-content: flex-end;
}
.pagination > * {
  margin: 0 0.2em;
}
.pagination .input {
  width: 40px;
  border: 1px solid #c1c5ca55;
}
.pagination .arrow {
  cursor: pointer;
  padding: 0 0.5em;
  color: #0008;
}
.pagination .arrow:hover {
  color: #1976d2;
}
.toggle:not(.selected) {
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}
.toggle {
  display: inline-block;
  padding: 0 0.15em;
}
</style>
