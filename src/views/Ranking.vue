<template>
  <div class="ranking-container">
    <v-tabs v-model="index" vertical>
      <v-tab
        v-for="rankType in types"
        :key="rankType"
        class="tab"
        active-class="selected"
      >
        {{ getName(rankType) }}
      </v-tab>
      <v-tab-item v-for="rankType in types" :key="rankType" class="tab-item">
        <OARankingList :type="rankType"></OARankingList>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import OARankingList from '@/components/OARankingList';
const nameMap = {
  scholar: '学者',
  institution: '机构',
  researchdirection: '研究方向',
  thesis: '论文',
};

export default {
  components: { OARankingList },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    types() {
      return Object.keys(nameMap);
    },
  },
  methods: {
    getName(type) {
      return nameMap[type];
    },
  },
};
</script>

<style scoped>
.ranking-container {
  width: 90%;
}
.tab {
  border-right: 1px solid lightgrey;
  margin-right: 3em;
}
.tab.selected {
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  border-right: none;
}
.tab-item {
}
</style>
