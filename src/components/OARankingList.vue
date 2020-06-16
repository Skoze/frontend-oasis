<template>
  <table class="ranking-list">
    <tr>
      <th>排名</th>
      <th>{{ name }}</th>
      <th
        v-for="header in headers"
        :key="header"
        @click="sort = header"
        class="sortable"
      >
        <span>{{ header2Label(header) }}</span>
        <v-icon
          small
          color="red"
          :class="{ 'sort-icon': true, show: sort === header }"
        >
          mdi-arrow-up-bold
        </v-icon>
      </th>
    </tr>
    <tr v-for="(item, index) in items" :key="item.id">
      <td>{{ index + 1 }}</td>
      <td>
        <a
          v-if="
            type === 'scholar' ||
              type === 'institution' ||
              type === 'researchdirection'
          "
          :href="`/${type}/${item.id}`"
        >
          {{ item.name }}
        </a>
        <span v-else>
          {{ item.name }}
        </span>
      </td>
      <td v-for="header in headers" :key="header">{{ item[header] }}</td>
    </tr>
  </table>
</template>
<script>
import {
  paperRanking,
  authorRanking,
  institutionRanking,
  researchDirectionRanking,
} from '@/api';

const nameMap = {
  scholar: '学者',
  institution: '机构',
  researchdirection: '研究方向',
  thesis: '论文',
};

const labelMap = {
  activity: '活跃度',
  citation: '引用数',
  publication: '论文数',
  firstAuthor: '第一作者数',
  hindex: 'h指数',
};

const fetchMap = {
  scholar: authorRanking,
  institution: institutionRanking,
  researchdirection: researchDirectionRanking,
  thesis: paperRanking,
};
export default {
  props: {
    type: { type: String, require: true },
  },
  data() {
    return {
      items: [],
      sort: 'activity',
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    headers() {
      if (!this.items.length) {
        return [];
      } else {
        return Object.keys(this.items[0]).filter(
          (prop) => prop !== 'name' && prop !== 'id'
        );
      }
    },
    name() {
      return nameMap[this.type];
    },
    fetch() {
      return fetchMap[this.type] || (() => Promise.resolve([]));
    },
  },
  watch: {
    sort(val) {
      this.fetchData(val);
    },
  },
  methods: {
    fetchData(val = 'activity') {
      this.fetch(val).then((trend) => {
        this.items = trend.map((item) => ({
          ...item,
          activity: isNaN(item.activity) ? undefined : item.activity.toFixed(2),
        }));
      });
    },

    header2Label(prop) {
      return labelMap[prop];
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.ranking-list {
  width: 100%;
}
.ranking-list tr th {
  vertical-align: middle;
  min-width: 10em;
}
.ranking-list tr {
  vertical-align: top;
}
.ranking-list tr td,
.ranking-list tr th {
  text-align: center;
  padding: 0.2em 1em;
}
.ranking-list tr:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.ranking-list tr > td:first-child,
.ranking-list tr > th:first-child {
  width: 4em;
}
.sortable {
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.sortable:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
.sort-icon {
  opacity: 0;
}
.sort-icon.show {
  opacity: 1;
}
</style>
