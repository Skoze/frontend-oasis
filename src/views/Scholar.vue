<template>
  <div class="scholar-container" v-if="author">
    <div class="basic-info">
      <div class="scholar-detail">
        <h1 :style="{ color }" class="scholar-name">
          {{ author.name }}
        </h1>
        <h3>
          <a
            :href="`/institution/${author.affiliationId}`"
            class="scholar-affiliation"
          >
            <OAIcon type="institution"></OAIcon>
            <span>{{ author.affiliation }}</span>
          </a>
        </h3>
        <h4>
          <span>总发文量：</span>
          <span>{{ author.totalPublication }}</span>
        </h4>
        <h4>
          <span>总被引量：</span>
          <span>{{ author.totalReferenceCount }}</span>
        </h4>
      </div>
      <OABadgeList
        class="scholar-research-direction"
        :items="fieldOfResearchs"
        :limit="10"
        type="keyword"
        line
      >
        <template #title>主要研究方向</template>
      </OABadgeList>
    </div>
    <OAPublicationGraph class="graph-bar" :data="author.publicationOfYear" />
    <OAPaperList :items="author.papers"> </OAPaperList>
  </div>
  <div
    v-else-if="!loading"
    style="margin:auto;width:fit-content;padding-top:20vh;text-align:center"
  >
    <img src="@/assets/no-data.svg" />
    <div>没有找到该学者的数据</div>
  </div>
</template>
<script>
import OAPublicationGraph from '@/components/OAPublicationGraph';
import { queryAuthorDetail } from '@/api';
import { mapGetters } from 'vuex';
import OAPaperList from '@/components/OAPaperList';
import OABadgeList from '@/components/OABadgeList';
import OAIcon from '@/components/OAIcon';
export default {
  props: ['id'],
  components: {
    OAPublicationGraph,
    OAPaperList,
    OABadgeList,
    OAIcon,
  },
  data() {
    return {
      author: null,
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['activity2Color']),
    color() {
      return this.activity2Color(this.author.activity, 'author');
    },
    fieldOfResearchs() {
      return this.author.fieldOfResearchs;
    },
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      queryAuthorDetail(this.id).then(
        (data) => {
          this.author = data;
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
.scholar-container {
  width: 80%;
}
.scholar-container .scholar-name {
  font-size: 2.5em;
}
.scholar-container .scholar-affiliation {
  text-decoration: none;
}
.scholar-research-direction {
  width: fit-content;
  max-width: 30vw;
}
.graph-bar {
  width: 100%;
  height: 15em;
}
.badge {
  display: flex;
  width: fit-content;
  margin: 0.3em 0.6em;
}
.basic-info {
  display: flex;
  justify-content: space-between;
}
</style>
