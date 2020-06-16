<template>
  <svg ref="svg" width="100%" height="100%">
    <g
      ref="wordCloud"
      class="container"
      :transform="`translate(${size[0] / 2},${size[1] / 2})`"
    >
      <transition-group name="list-complete" tag="g">
        <text
          class="word"
          v-for="item in data"
          :key="item.id"
          :transform="`translate(${item.x},${item.y})`"
          :style="`font-size:${item.size}`"
          :fill="item.color"
          @click="item.href && $router.push(item.href)"
        >
          {{ item.text }}
        </text>
      </transition-group>
    </g>
  </svg>
</template>

<script>
import * as WordCloud from 'd3-cloud';
import * as d3 from 'd3';
import { sortByDesc } from '@/utils/sort';
export default {
  props: {
    words: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      graph: null,
      size: [0, 0],
      resizeListener: null,
      layout: null,
      data: [],
      bounds: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    };
  },
  mounted() {
    const svg = d3.select(this.$refs.svg);
    this.graph = d3.select(this.$refs.wordCloud);
    this.size = [parseInt(svg.style('width')), parseInt(svg.style('height'))];

    let timeout = null;
    this.resizeListener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.size = [
          parseInt(svg.style('width')),
          parseInt(svg.style('height')),
        ];
        this.update();
      }, 1000);
    };
    window.addEventListener('resize', this.resizeListener);

    this.layout = WordCloud()
      .rotate(0)
      .spiral('rectangular')
      .font('Impact')
      .timeInterval(10)
      .random(() => 0)
      .on('end', (...args) => {
        this.draw(...args);
      })
      .size(this.size);
    this.update();
  },
  computed: {
    box() {
      return [
        this.bounds[1].x - this.bounds[0].x,
        this.bounds[1].y - this.bounds[0].y,
      ];
    },
    scale() {
      const [width, height] = this.size;
      return (
        Math.min(
          width / Math.abs(this.bounds[1].x - width / 2),
          width / Math.abs(this.bounds[0].x - width / 2),
          height / Math.abs(this.bounds[1].y - height / 2),
          height / Math.abs(this.bounds[0].y - height / 2)
        ) / 2 || 1
      );
    },
  },
  watch: {
    words: 'update',
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  },
  methods: {
    draw(words, bounds) {
      this.data = diff(this.data, words);
      this.bounds = bounds;
      console.log(bounds);
    },
    update() {
      const max = Math.max(...this.words.map((word) => parseInt(word.value)));
      const min =
        Math.min(...this.words.map((word) => parseInt(word.value))) || 1;
      const maxSize = Math.min(...this.size) / 4;
      const logScales = d3.scaleLog([min, max], [maxSize / 4, maxSize]);

      this.layout
        .stop()
        .words(this.words.map(copyObject))
        .fontSize((d) => logScales(d.value))
        .start();
    },
  },
};

function copyObject(obj) {
  return {
    ...obj,
  };
}

const sortById = sortByDesc('id');

function diff(oldData, newData) {
  sortById(newData);
  let p1 = 0;
  let p2 = 0;
  while (p2 < newData.length) {
    if (p1 === oldData.length || oldData[p1].id !== newData[p2].id) {
      oldData.splice(p1, 1, newData[p2]);
      p1++;
      p2++;
    } else if (oldData[p1].id === newData[p2].id) {
      Object.assign(oldData[p1], newData[p2]);
      p1++;
      p2++;
    }
  }
  oldData.splice(p1);
  return [...oldData];
}
</script>

<style scoped>
.container {
  transition-duration: 1s;
  transition-delay: 1s;
}
.word {
  text-anchor: middle;
  font-family: Impact;
  transition-duration: 1s;
  cursor: pointer;
}
.word:hover {
  animation: blink 0.5s ease-in infinite alternate;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  font-size: 0;
}
.list-complete-enter-active {
  transition-delay: 0.5s;
  transition-duration: 0.5s;
}
.list-complete-leave-active {
  transition-duration: 0.5s;
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}
</style>
