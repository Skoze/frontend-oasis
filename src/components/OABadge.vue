<template>
  <a class="badge-wrap" :href="href" :style="{ 'border-color': color }">
    <span class="icon" :style="{ 'background-color': color }">
      <slot name="icon">
        <OAIcon color="white" type="default"></OAIcon>
      </slot>
    </span>
    <span :class="{ name: true, hide }">
      <slot></slot>
    </span>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import OAIcon from './OAIcon';
export default {
  components: { OAIcon },
  props: {
    activity: Number,
    type: String,
    href: String,
    hide: Boolean,
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
.badge-wrap {
  border-bottom: 2px solid;
  display: inline-flex;
  text-decoration: none;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.badge-wrap > .icon {
  flex: 0 0 auto;
  display: inline-block;
  padding: 0 0.2em;
  color: white;
  text-align: center;
  min-width: 1.5em;
  font-weight: bold;
}
.badge-wrap > .name.hide {
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge-wrap:hover > .name.hide {
  white-space: normal;
}
.name {
  overflow: hidden;
  padding: 0 0.5em;
  word-break: keep-all;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
