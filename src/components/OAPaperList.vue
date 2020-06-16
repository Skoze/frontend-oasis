<template>
  <div>
    <OAList v-if="items">
      <template #title>
        论文
      </template>

      <template #right>
        <OAPagination
          class="pagination"
          v-model="value"
          :total="total"
          v-if="total > 5"
        />
      </template>
      <div v-for="item in displayItems" :key="item.doi" :item="item">
        <slot name="item" :item="item" :onSelect="() => (selected = item.doi)">
          <v-card tile outlined class="paper-item" @click="selected = item.doi">
            <v-card-text>
              <h2>{{ item.title }}</h2>
              <span> 发表时间：{{ item.publicationYear }}</span>
              <span class="ml-10">被引用数：{{ item.referenceCount }} </span>
            </v-card-text>
          </v-card>
        </slot>
      </div>
      <OAPagination v-model="value" :total="total" v-if="total > 5" />
    </OAList>
    <v-dialog
      :value="selected !== null"
      @input="selected = null"
      max-width="80%"
    >
      <v-card>
        <OAPaperDetail :doi="selected" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import OAList from './OAList';
import OAPaperDetail from './OAPaperDetail';
import OAPagination from './OAPagination';

export default {
  components: {
    OAPaperDetail,
    OAList,
    OAPagination,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      selected: null,
      value: { page: 1, pageSize: 5 },
    };
  },
  computed: {
    displayItems() {
      return this.items.slice(
        (this.value.page - 1) * this.value.pageSize,
        this.value.page * this.value.pageSize
      );
    },
    total() {
      return this.items.length;
    },
  },
};
</script>

<style scoped>
.paper-item {
  margin: 0.5em;
}
.pagination {
  font-size: 0.9em;
}
</style>
