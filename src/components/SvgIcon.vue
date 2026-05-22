<template>
  <svg
    v-if="iconName === 'icon-metaso'"
    :class="svgClass"
    viewBox="0 0 1024 1024"
    aria-hidden="true"
  >
    <path
      d="M512 85.333c0 235.644 191.022 426.667 426.667 426.667-235.644 0-426.667 191.022-426.667 426.667 0-235.644-191.022-426.667-426.667-426.667 235.644 0 426.667-191.022 426.667-426.667z"
      fill="currentColor"
    />
    <path
      d="M768 128c0 70.693 57.307 128 128 128-70.693 0-128 57.307-128 128 0-70.693-57.307-128-128-128 70.693 0 128-57.307 128-128z"
      fill="currentColor"
    />
  </svg>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "i-icon",
  },
});

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `i-icon ${props.className}`;
  }
  return "i-icon";
});
</script>

<style lang="scss">
.i-icon {
  width: 1em;
  height: 1em;
  min-width: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
