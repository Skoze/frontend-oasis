<template>
  <div class="institution-container" v-if="institution">
    <h1 :style="{ color }" class="institution-name">
      {{ institution.name }}
    </h1>
    <OABadgeList
      class="list-container"
      :items="relatedAuthors"
      :limit="10"
      type="author"
    >
      <template #title>相关学者</template>
      <template #subtitle>共 {{ authorCount }} 人</template>
    </OABadgeList>
    <OABadgeList
      class="list-container"
      :items="fieldOfResearchs"
      :limit="15"
      type="keyword"
    >
      <template #title>主要研究方向</template>
    </OABadgeList>
    <OAPublicationGraph
      class="graph-bar"
      :data="institution.publicationOfYear"
    />
    <OAPaperList :items="institution.papers"> </OAPaperList>
  </div>
  <div
    v-else-if="!loading"
    style="margin:auto;width:fit-content;padding-top:20vh;text-align:center"
  >
    <img src="@/assets/no-data.svg" />
    <div>没有找到该机构的数据</div>
  </div>
</template>
<script>
import OAPublicationGraph from '@/components/OAPublicationGraph';
import { queryInstituteDetail } from '@/api';
import { mapGetters } from 'vuex';
import OAPaperList from '@/components/OAPaperList';
import OABadgeList from '@/components/OABadgeList';
export default {
  props: ['id'],
  components: {
    OAPublicationGraph,
    OAPaperList,
    OABadgeList,
  },
  data() {
    return {
      institution: null,
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['activity2Color']),
    color() {
      return this.activity2Color(this.institution.activity, 'institution');
    },
    relatedAuthors() {
      return this.institution.relatedAuthors;
    },
    fieldOfResearchs() {
      return this.institution.fieldOfResearch;
    },
    authorCount() {
      return this.institution.relatedAuthors.length;
    },
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      queryInstituteDetail(this.id).then(
        (data) => {
          this.institution = data;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.institution-container {
  width: 80%;
}
.institution-container .institution-name {
  font-size: 2.5em;
}
.list-container {
  margin: 1em 0;
}
.graph-bar {
  width: 100%;
  height: 15em;
}
.badge {
  width: fit-content;
  margin: 0.5em 0.6em;
}
</style>
