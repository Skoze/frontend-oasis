<template>
  <v-icon class="middle" v-if="vIcon" :color="color" dense>{{ vIcon }}</v-icon>
  <img class="middle image" v-else-if="svg" :src="svg" />
</template>

<script>
const type2Icon = {
  default: 'mdi-cube-outline',
  rotate: 'mdi-repeat',
  cloud: 'mdi-cloud-outline',
  list: 'mdi-view-list',
  author: 'mdi-face',
  keyword: 'mdi-file-search',
};

const type2Svg = {
  institution: 'affiliation',
};

export default {
  props: {
    type: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      default: 'black',
    },
  },
  computed: {
    vIcon() {
      return type2Icon[this.type];
    },
    svg() {
      if (type2Svg[this.type]) {
        const name = type2Svg[this.type];
        try {
          return require(`@/assets/${name}_${this.color}.svg`);
        } catch {
          try {
            return require(`@/assets/${name}.svg`);
          } catch {
            return;
          }
        }
      } else {
        return undefined;
      }
    },
  },
};
</script>

<style scoped>
.middle {
  display: inline-block;
  vertical-align: middle;
}
.image {
  width: 1.2em;
  height: 1.2em;
  padding: 0.12em;
}
</style>
