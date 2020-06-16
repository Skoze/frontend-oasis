<template>
  <div class="multi-search">
    <h3>组合查询</h3>
    <v-text-field
      class="text"
      label="作者"
      hide-details
      maxlength="40"
      v-model="q0"
      placeholder=" "
      :disabled="loading"
      @keyup.enter="submit"
    ></v-text-field
    ><v-text-field
      class="text"
      label="机构"
      hide-details
      maxlength="40"
      v-model="q1"
      placeholder=" "
      :disabled="loading"
      @keyup.enter="submit"
    ></v-text-field>
    <v-text-field
      class="text"
      label="会议"
      hide-details
      maxlength="40"
      v-model="q2"
      placeholder=" "
      :disabled="loading"
      @keyup.enter="submit"
    ></v-text-field>
    <v-text-field
      class="text"
      label="关键词"
      hide-details
      maxlength="40"
      v-model="q3"
      placeholder=" "
      :disabled="loading"
      @keyup.enter="submit"
    ></v-text-field>
    <div class="picker-wrap">
      <OAYearPicker
        label="起始时间"
        :start="yearStart"
        :end="yearEnd"
        :allowedEnd="q5"
        placeholder=" "
        v-model="q4"
        :disabled="loading"
      ></OAYearPicker>
      <OAYearPicker
        label="截止时间"
        :start="yearStart"
        :end="yearEnd"
        :allowedStart="q4"
        placeholder=" "
        v-model="q5"
        :disabled="loading"
      >
      </OAYearPicker>
    </div>
    <v-btn
      class="btn primary white--text"
      @click="submit"
      :loading="loading || !queryString"
    >
      搜索
    </v-btn>
  </div>
</template>
<script>
import OAYearPicker from './OAYearPicker';
import { getYearRange } from '@/api';
export default {
  props: ['query', 'loading'],
  components: {
    OAYearPicker,
  },
  data() {
    return {
      q0: '',
      q1: '',
      q2: '',
      q3: '',
      q4: NaN,
      q5: NaN,
      yearStart: NaN,
      yearEnd: NaN,
    };
  },
  created() {
    this.queryChange();
  },
  computed: {
    queryString: function () {
      let result = [];
      for (let i = 0; i < 6; i++) {
        const key = `q${i}`;
        if (this[key]) {
          result.push(`${key}=${encodeURIComponent(this[key])}`);
        }
      }
      return result.join('&');
    },
  },
  watch: {
    query: 'queryChange',
  },
  methods: {
    getYearRange() {
      getYearRange().then(({ startYear, endYear }) => {
        this.yearStart = startYear;
        this.yearEnd = endYear;
        this.q4 = this.q4 || this.yearStart;
        this.q5 = this.q5 || this.yearEnd;
      });
    },
    queryChange() {
      this.q0 = this.query.q0;
      this.q1 = this.query.q1;
      this.q2 = this.query.q2;
      this.q3 = this.query.q3;
      this.q4 = this.query.q4 && parseInt(this.query.q4);
      this.q5 = this.query.q5 && parseInt(this.query.q5);
      this.getYearRange();
    },
    submit() {
      if (this.queryString) {
        this.$emit('submit', this.queryString);
      }
    },
  },
};
</script>

<style scoped>
.multi-search {
  width: 100%;
  text-align: center;
}
.picker-wrap {
  display: flex;
}
.picker-wrap > * {
  margin-right: 5%;
}
.picker-wrap > *:last-child {
  margin-right: 0;
}
.multi-search > * {
  margin-bottom: 5%;
  min-width: 35% !important;
}
.multi-search > *:last-child {
  margin-bottom: 0;
}
</style>
