<template>
  <OAList class="badge-list">
    <template #title><slot name="title"></slot></template>
    <template #subtitle><slot name="subtitle"></slot></template>
    <template #right>
      <v-btn
        v-if="hasPaperCountProperty && hasCitationProperty"
        text
        tile
        small
        class="my-btn"
        @click="changeDataType"
      >
        <OAIcon class="hover-rotate" type="rotate"></OAIcon>
        <span v-if="dataType === 'citation'">发文量</span>
        <span v-if="dataType === 'count'">引用数</span>
      </v-btn>
      <v-btn
        v-if="hasData"
        text
        tile
        small
        class="my-btn"
        @click="changeDisplayType"
      >
        <span v-if="displayType === 'list'">
          <OAIcon type="cloud"></OAIcon>
          <span>云图</span>
        </span>
        <span v-if="displayType === 'cloud'">
          <OAIcon type="list"></OAIcon>
          <span>列表</span>
        </span>
      </v-btn>
    </template>
    <div v-if="displayType === 'cloud'" class="word-cloud">
      <OAWordCloud :words="cloudWords" />
    </div>
    <transition-group name="list-transition" v-if="displayType === 'list'">
      <OABadge
        class="list-transition-item"
        :style="{ display: line ? 'flex' : undefined }"
        :type="type"
        v-for="item in sortedItems"
        :key="item.id"
        :activity="item.activity"
        :href="`/${urlPrefix}/${item.id}`"
      >
        <template #icon>
          <OAIcon color="white" :type="type"></OAIcon>
        </template>
        {{ item.name }}
        <span
          v-if="dataType === 'count' && item.paperCount !== undefined"
          class="tag"
        >
          发文量{{ item.paperCount }}
        </span>
        <span
          v-if="dataType === 'citation' && item.citationCount !== undefined"
          class="tag"
        >
          引用数{{ item.citationCount }}
        </span>
      </OABadge>
    </transition-group>
  </OAList>
</template>

<script>
import OAList from './OAList';
import OABadge from './OABadge';
import OAIcon from './OAIcon';
import OAWordCloud from './OAWordCloud';
import { sortByDesc } from '@/utils/sort';
import { mapGetters } from 'vuex';

const type2UrlPrefix = {
  author: 'scholar',
  keyword: 'researchdirection',
  institution: 'institution',
};

export default {
  components: {
    OAList,
    OABadge,
    OAIcon,
    OAWordCloud,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 3,
    },
    type: {
      type: String,
      default: '',
    },
    line: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataType: null,
      displayType: 'list',
    };
  },
  created() {
    if (this.hasPaperCountProperty) {
      this.dataType = 'count';
    } else if (this.hasCitationProperty) {
      this.dataType = 'citation';
    }
  },
  computed: {
    ...mapGetters(['activity2Color']),
    sortedItems() {
      if (this.dataType === 'count') {
        return sortByDesc(
          'paperCount',
          'activity',
          'citationCount'
        )(this.items).slice(0, this.limit);
      } else if (this.dataType === 'citation') {
        return sortByDesc(
          'citationCount',
          'activity',
          'paperCount'
        )(this.items).slice(0, this.limit);
      } else {
        return sortByDesc(
          'activity',
          'citationCount',
          'paperCount'
        )(this.items).slice(0, this.limit);
      }
    },
    hasPaperCountProperty() {
      if (!this.items.length) {
        return false;
      }
      if (this.items[0] && this.items[0].paperCount !== undefined) {
        return true;
      }
      return false;
    },
    hasCitationProperty() {
      if (!this.items.length) {
        return false;
      }
      if (this.items[0] && this.items[0].citationCount !== undefined) {
        return true;
      }
      return false;
    },
    hasData() {
      return this.hasPaperCountProperty || this.hasCitationProperty;
    },
    urlPrefix() {
      return type2UrlPrefix[this.type];
    },
    cloudWords() {
      return this.sortedItems.map((item) => {
        let value = parseInt(item.activity);
        if (this.dataType === 'count') {
          value = parseInt(item.paperCount);
        } else if (this.dataType === 'citation') {
          value = parseInt(item.citationCount);
        }
        return {
          id: item.id,
          text: item.name,
          activity: item.activity,
          value,
          color: this.activity2Color(item.activity, this.type),
          href: `/${this.urlPrefix}/${item.id}`,
        };
      });
    },
  },
  methods: {
    changeDataType() {
      if (this.dataType === 'count' && this.hasCitationProperty) {
        this.dataType = 'citation';
      } else if (this.dataType === 'citation' && this.hasPaperCountProperty) {
        this.dataType = 'count';
      }
    },
    changeDisplayType() {
      if (this.displayType === 'list') {
        this.displayType = 'cloud';
      } else if (this.displayType === 'cloud') {
        this.displayType = 'list';
      }
    },
  },
};
</script>

<style scoped>
.badge-list {
  width: 100%;
  position: relative;
}
.list-transition-item {
  width: fit-content;
  margin: 0.4em 0.6em;
  transition: all 0.8s;
  transform-origin: left;
}
.my-btn:hover .hover-rotate {
  transform: rotate(90deg);
}
.tag {
  font-size: 0.7em;
  color: #aaa;
}
.list-transition-enter,
.list-transition-leave-to {
  opacity: 0;
  transform: scale(0.2);
}
.list-transition-leave-active {
  position: absolute;
  max-width: 100%;
}
.word-cloud {
  min-height: 150px;
  width: 100%;
  height: 25vw;
  max-width: 1200px;
  max-height: 600px;
  margin: 0.3em auto;
  display: block;
}
</style>
