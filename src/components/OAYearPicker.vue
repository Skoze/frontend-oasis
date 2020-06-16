<template>
  <div class="year-picker" @mousedown="hold = true">
    <v-text-field
      @focus="
        show = true;
        hold = false;
      "
      @blur="onBlur"
      ref="input"
      readonly
      :disabled="disabled"
      :label="label"
      hide-details
      :value="year"
      :outlined="outlined"
      :dense="dense"
      :flat="flat"
      :solo="solo"
      :placeholder="placeholder"
    ></v-text-field>

    <div :class="{ 'year-wrapper': true, show }">
      <div v-if="!range" class="loading">
        <v-progress-circular indeterminate color="#777"></v-progress-circular>
        加载中...
      </div>
      <template v-else>
        <v-btn
          v-for="n in range"
          :key="n"
          :class="{ selected: year === n }"
          :disabled="
            n < (allowedStart || listStart) || n > (allowedEnd || listEnd)
          "
          text
          tile
          block
          @click="
            $emit('change', n);
            $refs.input.blur();
            show = false;
          "
          >{{ n }}
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'year',
    event: 'change'
  },
  props: {
    year: Number,
    start: Number,
    end: Number,
    allowedStart: Number,
    allowedEnd: Number,
    outlined: Boolean,
    dense: Boolean,
    flat: Boolean,
    solo: Boolean,
    label: String,
    placeholder: String,
    disabled: Boolean
  },
  data() {
    return {
      show: false,
      hold: false
    };
  },
  computed: {
    listStart() {
      if (this.start !== undefined && this.allowedStart !== undefined) {
        return Math.min(this.start, this.allowedStart);
      } else if (this.start !== undefined) {
        return this.start;
      } else if (this.allowedStart !== undefined) {
        return this.allowedStart;
      } else {
        return this.year - 5;
      }
    },
    listEnd() {
      if (this.end !== undefined && this.allowedEnd !== undefined) {
        return Math.max(this.end, this.allowedEnd);
      } else if (this.end !== undefined) {
        return this.end;
      } else if (this.allowedEnd !== undefined) {
        return this.allowedEnd;
      } else {
        return this.year + 5;
      }
    },
    range() {
      if (!isNaN(this.listEnd) && !isNaN(this.listStart)) {
        return Array.from(
          Array(this.listEnd - this.listStart + 1),
          (val, index) => this.listEnd - index
        );
      } else {
        return null;
      }
    }
  },
  methods: {
    onBlur() {
      if (this.hold) {
        this.$refs.input.focus();
        this.hold = false;
      } else {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped>
.year-picker {
  position: relative;
}
.year-wrapper {
  position: absolute;
  max-height: 15em;
  overflow: auto;
  width: 100%;
  z-index: 100;
  background: white;
  border: 1px solid lightgray;
  transition: all 400ms 200ms;
  transform-origin: 30% 0;
  transform: scale(0);
}
.year-wrapper > * {
  transition: all 200ms;
}
.year-wrapper.show {
  transform: scale(1);
  transition: all 400ms;
}
.selected {
  font-size: 1.2em;
  color: #1976d2;
}
.loading {
  padding: 10%;
  font-size: 0.8em;
}
</style>
