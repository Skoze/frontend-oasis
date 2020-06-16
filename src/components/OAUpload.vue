<template>
  <div class="upload-container">
    <v-file-input
      :disabled="loading"
      accept=".csv"
      chips
      solo
      outlined
      label="选择数据文件"
      clearable
      flat
      tile
      prepend-icon=""
      prepend-inner-icon="$file"
      v-model="val"
    ></v-file-input>
    <v-btn
      class="btn white--text primary"
      :loading="loading"
      :disabled="!val"
      tile
      @click.native="$emit('upload', val)"
    >
      上传
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      val: null,
    };
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
}
.upload-container .btn {
  padding: 0.5em 3em;
  margin: auto;
  display: block;
}
</style>
