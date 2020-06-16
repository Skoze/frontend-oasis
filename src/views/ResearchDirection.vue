<template>
  <div class="research-direction-container" v-if="researchDirection">
    <h1 :style="{ color }" class="research-direction-name">
      {{ researchDirection.name }}
    </h1>
    <OABadgeList
      class="list-container"
      :items="relatedAuthors"
      :limit="15"
      type="author"
    >
      <template #title>相关学者</template>
    </OABadgeList>
    <OABadgeList
      class="list-container"
      :items="relatedInstitutions"
      :limit="10"
      type="institution"
    >
      <template #title>相关机构</template>
    </OABadgeList>
    <OAPublicationGraph
      class="graph-bar"
      graphType="line"
      :data="researchDirection.publicationOfYear"
    />
    <OAPaperList :items="researchDirection.papers"> </OAPaperList>
  </div>
  <div
    v-else-if="!loading"
    style="margin:auto;width:fit-content;padding-top:20vh;text-align:center"
  >
    <img src="@/assets/no-data.svg" />
    没有该研究方向的数据
  </div>
</template>
<script>
import OAPublicationGraph from '@/components/OAPublicationGraph';
import { queryResearchDirectionDetail } from '@/api';
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
      researchDirection: null,
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['activity2Color']),
    color() {
      return this.activity2Color(this.researchDirection.activity, 'keyword');
    },
    relatedAuthors() {
      return this.researchDirection.relatedAuthors;
    },
    relatedInstitutions() {
      return this.researchDirection.relatedInstitution;
    },
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      queryResearchDirectionDetail(this.id).then(
        (data) => {
          this.researchDirection = data;
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
.research-direction-container {
  width: 80%;
}
.research-direction-container .research-direction-name {
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
