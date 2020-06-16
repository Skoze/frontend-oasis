<template>
  <v-hover v-slot:default="{ hover }">
    <a :class="{ 'chip-wrap': true, link: !!href }" :href="href">
      <span
        class="chip-content"
        :style="{
          'border-color': color,
          'background-color': hover ? color : 'white',
        }"
      >
        <slot></slot>
      </span>
    </a>
  </v-hover>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    activity: Number,
    type: String,
    href: String,
  },
  computed: {
    ...mapGetters(['activity2Color']),
    color() {
      return this.activity2Color(this.activity, this.type);
    },
  },
};
</script>
<style scoped>
.chip-wrap {
  display: inline-block;
  position: relative;
  cursor: default;
  line-height: 1em;
  margin: 0.1em 0.2em;
}
.chip-wrap.link {
  cursor: pointer;
}
.chip-wrap:hover {
  z-index: 10;
}
.chip-wrap:hover .chip-content {
  width: 100vw;
  color: white;
  transition-duration: 0.2s;
  transition: width 1s;
}
.chip-content {
  width: 100%;
  max-width: fit-content;
  padding: 0.2em 0.5em;
  border-radius: 1em;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border: 3px solid;
  color: grey;
}
</style>
