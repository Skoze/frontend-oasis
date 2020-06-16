<template>
  <main class="search-container">
    <OAMultiSearch
      class="multi-search"
      :query="query"
      @submit="submit"
      :loading="loading"
    ></OAMultiSearch>
    <OAPaperList class="paper-list" :items="data">
      <template #item="{item,onSelect}">
        <OAPaperListItem :item="item" @select="onSelect"></OAPaperListItem>
      </template>
    </OAPaperList>
    <aside class="side-bar" v-if="data">
      <OAList>
        <template #title>相关作者</template>
        <OABadge
          class="badge"
          v-for="author in sideData.authors"
          type="author"
          :key="author.id"
          :activity="author.activity"
          :href="`/scholar/${author.id}`"
        >
          <template #icon>
            <OAIcon color="white" type="author"></OAIcon>
          </template>
          {{ author.name }}
        </OABadge>
      </OAList>
      <OAList>
        <template #title>相关机构</template>
        <OABadge
          style="max-width: 90%;"
          class="badge"
          v-for="affiliation in sideData.affiliations"
          type="institution"
          :key="affiliation.id"
          :activity="affiliation.activity"
          :href="`/institution/${affiliation.id}`"
          hide
        >
          <template #icon>
            <OAIcon color="white" type="institution"></OAIcon>
          </template>
          {{ affiliation.name }}
        </OABadge>
      </OAList>
    </aside>
  </main>
</template>

<script>
import OAMultiSearch from '@/components/OAMultiSearch';
import OAPaperList from '@/components/OAPaperList';
import OAPaperListItem from '@/components/OAPaperListItem';
import OAList from '@/components/OAList';
import OABadge from '@/components/OABadge';
import OAIcon from '@/components/OAIcon';
import { sortByDesc } from '@/utils/sort';
import { queryPaper } from '@/api';
export default {
  props: ['query'],
  components: {
    OAMultiSearch,
    OAPaperList,
    OAList,
    OABadge,
    OAPaperListItem,
    OAIcon,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: undefined,
      loading: false,
    };
  },
  computed: {
    sideData() {
      let authors = [];
      let affiliations = [];
      let authorIdSet = new Set();
      let affiliationIdSet = new Set();
      for (let paper of this.data) {
        for (let author of paper.authors) {
          if (!authorIdSet.has(author.id)) {
            authors.push(author);
            authorIdSet.add(author.id);
          }
        }
        for (let affiliation of paper.authorAffiliations) {
          if (!affiliationIdSet.has(affiliation.id)) {
            affiliations.push(affiliation);
            affiliationIdSet.add(affiliation.id);
          }
        }
      }
      authors = sortByDesc('activity')([...authors]).slice(0, 10);
      affiliations = sortByDesc('activity')([...affiliations]).slice(0, 10);
      return { authors, affiliations };
    },
  },
  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      const {
        q0: authors,
        q1: institute,
        q2: conference,
        q3: keyword,
        q4: startYear,
        q5: endYear,
      } = this.query;
      if (
        authors ||
        institute ||
        conference ||
        keyword ||
        startYear ||
        endYear
      ) {
        this.loading = true;
        queryPaper(
          authors,
          institute,
          conference,
          keyword,
          startYear,
          endYear
        ).then(
          (val) => {
            this.data = val || [];
            this.loading = false;
          },
          () => {
            alert('搜索出错');
            this.loading = false;
          }
        );
      }
    },
    submit(queryString) {
      const route = `/search?${queryString}`;
      this.loading = true;
      this.data = undefined;
      this.$nextTick(() => {
        if (route == this.$route.fullPath) {
          this.fetchData();
        } else {
          this.$router.push(route);
        }
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  width: 96%;
  display: flex;
  align-items: flex-start;
}
.search-container > .multi-search,
.search-container > .side-bar {
  width: 280px;
  margin: 0 1em;
  flex: 0 0 auto;
}
.info-btn {
  font-size: smaller;
}
.paper-list {
  flex: 1;
}
.badge {
  margin: 0.3em 0.6em;
}
</style>
