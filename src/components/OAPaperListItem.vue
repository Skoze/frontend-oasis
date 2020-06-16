<template>
  <v-card tile elevation="0" class="paper-item">
    <v-card-text>
      <h2>
        <a @click="$emit('select', item.doi)">{{ item.documentTitle }}</a>
      </h2>
      <span> 发表时间：{{ item.publicationYear }}</span>
      <span class="ml-10">被引用数：{{ item.referenceCount }} </span>
      <table>
        <tr>
          <td>作者：</td>
          <td>
            <OAChip
              class="chip"
              v-for="author in item.authors.slice(0, 3)"
              type="author"
              :key="author.name"
              :activity="author.activity"
              :href="`/scholar/${author.id}`"
            >
              {{ author.name }}
            </OAChip>
            <OAChip
              v-if="item.authors.length > 3"
              @click.native="$emit('select', item.doi)"
            >
              ...
            </OAChip>
          </td>
        </tr>
        <tr>
          <td>机构：</td>
          <td>
            <OAChip
              class="chip"
              v-for="(affiliation, index) in item.authorAffiliations.slice(
                0,
                3
              )"
              type="institution"
              :key="index"
              :activity="affiliation.activity"
              :href="`/institution/${affiliation.id}`"
            >
              {{ affiliation.name }}
            </OAChip>
            <OAChip
              v-if="item.authorAffiliations.length > 3"
              @click.native="$emit('select', item.doi)"
            >
              ...
            </OAChip>
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
import OAChip from './OAChip';
export default {
  props: { item: Object },
  components: { OAChip },
};
</script>

<style scoped>
.paper-item {
  margin-bottom: 1em;
}
.chip {
  max-width: 10em;
}
table td:first-child {
  width: 45px;
}
td {
  vertical-align: top;
}
</style>
