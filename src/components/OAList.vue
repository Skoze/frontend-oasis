<template>
  <div>
    <h3 class="list-title">
      <span><slot name="title"></slot></span>
      <span class="subtitle"><slot name="subtitle"></slot></span>
      <v-spacer></v-spacer>
      <span><slot name="right"></slot></span>
    </h3>
    <slot>
      <div style="margin:auto;width:fit-content;padding-top:2em">
        <img src="@/assets/no-data.svg" />
      </div>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.list-title {
  color: grey;
  border-bottom: 1px solid;
  font-weight: normal;
  display: flex;
  align-items: baseline;
}
.subtitle {
  font-size: 0.8em;
  padding-left: 1em;
}
</style>
