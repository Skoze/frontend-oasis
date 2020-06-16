<template>
  <v-card class="document-card">
    <div v-if="!data" class="loading">
      <v-progress-circular indeterminate color="#777"></v-progress-circular>
      <div>正在加载中</div>
    </div>
    <template v-else>
      <h2>{{ data.documentTitle }}</h2>
      <table>
        <tr>
          <td>作者:</td>
          <td>
            <OAChip
              v-for="author in data.authors"
              type="author"
              :key="author.id"
              :activity="author.activity"
              :href="`/scholar/${author.id}`"
            >
              {{ author.name }}
            </OAChip>
          </td>
        </tr>
        <tr>
          <td>机构:</td>
          <td>
            <OAChip
              v-for="affiliation in data.authorAffiliations"
              type="institution"
              :key="affiliation.id"
              :activity="affiliation.activity"
              :href="`/institution/${affiliation.id}`"
            >
              {{ affiliation.name }}
            </OAChip>
          </td>
        </tr>
        <tr>
          <td>会议:</td>
          <td>
            <a
              :href="`/conference/${data.publicationTitle.id}`"
              style="text-decoration:none"
            >
              {{ data.publicationTitle.name }}
            </a>
          </td>
        </tr>
        <tr>
          <td>关键词:</td>
          <td>
            <OAChip
              v-for="keyword in data.keywords"
              type="keyword"
              :key="keyword.id"
              :activity="keyword.activity"
              :href="`/researchdirection/${keyword.id}`"
            >
              {{ keyword.name }}
            </OAChip>
          </td>
        </tr>
        <tr v-for="item in displayData" :key="item.name">
          <td>{{ item.name }}:</td>
          <td>{{ item.val }}</td>
        </tr>
        <tr>
          <td>论文链接:</td>
          <td>
            <a :href="data.pdflink" target="_blank">{{ data.pdflink }}</a>
          </td>
        </tr>
      </table>
    </template>
  </v-card>
</template>

<script>
import { queryPaperDetail } from '@/api';

import OAChip from './OAChip';
const keys = [
  // ['authors', '作者'],
  // ['authorAffiliations', '机构'],
  // ['publicationTitle', '会议'],
  // ['keywords', '关键词'],
  ['publicationYear', '发表时间'],
  ['paperAbstract', '摘要'],
  ['publisher', '出版商'],
  ['doi', 'DOI']
  // ['pdflink', '论文链接'],
];
export default {
  props: ['doi'],
  components: { OAChip },
  data() {
    return {
      data: null
    };
  },
  created() {
    queryPaperDetail(this.doi).then(data => {
      this.data = data;
    });
  },
  watch: {
    doi(val) {
      if (val) {
        this.data = null;
        queryPaperDetail(val).then(data => {
          this.data = data;
        });
      }
    }
  },
  computed: {
    displayData() {
      const result = [];
      for (let [key, name] of keys) {
        const val = this.data[key];
        if (val) {
          result.push({ name, val });
        }
      }
      return result;
    }
  }
};
</script>

<style scoped>
.document-card {
  padding: 1em 2em;
  min-width: fit-content;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: auto;
}

tr {
  vertical-align: top;
}

td:first-child {
  min-width: 6em;
  text-align: end;
  padding-right: 0.5em;
}
table tr:nth-child(even) {
  background-color: rgba(0, 0, 128, 0.03);
}
</style>
