<template>
  <div class="conference-container" v-if="conference">
    <h1 class="conference-name">
      {{ conference.name }}
    </h1>
    <OABadgeList
      class="list-container"
      :items="fieldOfResearchs"
      :limit="15"
      type="keyword"
    >
      <template #title>主要研究方向</template>
    </OABadgeList>
    <OAPaperList :items="conference.papers"> </OAPaperList>
  </div>
  <div
    v-else-if="!loading"
    style="margin:auto;width:fit-content;padding-top:20vh;text-align:center"
  >
    <img src="@/assets/no-data.svg" />
    <div>没有找到该会议的数据</div>
  </div>
</template>

<script>
import { queryConferenceDetail } from '@/api';
import OAPaperList from '@/components/OAPaperList';
import OABadgeList from '@/components/OABadgeList';
export default {
  props: ['id'],
  components: {
    OAPaperList,
    OABadgeList,
  },
  data() {
    return {
      conference: null,
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  computed: {
    fieldOfResearchs() {
      return this.conference.fieldOfResearches;
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      queryConferenceDetail(this.id).then(
        (data) => {
          this.conference = data;
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
.conference-container {
  width: 80%;
}
.conference-container .conference-name {
  color: grey;
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
