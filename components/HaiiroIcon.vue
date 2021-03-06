<template>
  <svg
    :width="totalWidth"
    :height="totalHeight"
    :viewBox="viewBox"
    class="haiiroIcon"
    @mouseenter="hover"
    @mouseleave="unhover"
    @click="$emit('click')"
  >
    <rect
      v-for="rect in rectangles"
      :id="rect.id"
      :key="rect.id"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      :fill="rect.color"
    />
  </svg>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  import { namespace } from "vuex-class";
  import { name as PixelsNamespace } from "~/store/pixels";
  const PixelsStore = namespace(PixelsNamespace);

  @Component({
    props: {
      size: {
        type: Number,
        default: 30
      }
    }
  })
  export default class HaiiroIcon extends Vue {
    @PixelsStore.State currentColors: string[];
    @PixelsStore.Action hover;
    @PixelsStore.Action unhover;
    size: number;
    width: number;
    height: number;

    get viewBox (): string {
      return `0 0 ${this.totalWidth} ${this.totalHeight}`;
    }

    get totalWidth (): number {
      return this.size * 3 + this.size / 10;
    }

    get totalHeight (): number {
      return this.size * 3;
    }

    get rectangles (): {
      width: number;
      height: number;
      id: string;
      x: string | number;
      y: string | number;
      color: string;
    }[] {
      const base =  { width: this.size, height: this.size };
      const rightColX = this.size * 2.1;
      const bottomRowY = this.size * 2;
      const leftColX = this.size * 2;
      return [
        { ...base, id: "h-1-0", x: this.size, y: this.size, color: this.currentColors[0] },
        { ...base, id: "h-1-1", x: this.size, y: "0", color: this.currentColors[1] },
        { ...base, id: "h-2-0", x: leftColX , y: "0", color: this.currentColors[2] },
        { ...base, id: "h-2-2", x: "0.5", y: bottomRowY, color: this.currentColors[5] },
        { ...base, id: "h-3-0", x: this.size, y: bottomRowY, color: this.currentColors[6] }
      ];
    }
  }
</script>

<style lang="postcss" scoped>
  svg.haiiroIcon {
    display: inline-block;
    transition: ease 0.5s;
  }
  rect {
    transition: fill 0.75s ease;
  }
</style>

