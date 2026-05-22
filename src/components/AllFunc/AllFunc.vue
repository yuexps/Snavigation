<template>
  <!-- 功能区 -->
  <div
    :class="status.mainBoxBig ? 'main-box big' : 'main-box'"
    @click.stop
    @contextmenu.stop="
      (e) => {
        e.preventDefault();
      }
    "
  >
    <Transition name="fade" mode="out-in">
      <AllBox v-if="status.siteStatus === 'box'" />
      <AllSet v-else-if="status.siteStatus === 'set'" />
    </Transition>
  </div>
</template>

<script setup>
import { statusStore } from "@/stores";
import AllBox from "@/components/AllFunc/AllBox.vue";
import AllSet from "@/components/AllFunc/AllSet.vue";

const status = statusStore();
</script>

<style lang="scss" scoped>
.main-box {
  position: absolute;
  width: 80%;
  height: 64vh;
  max-width: 1200px;
  background-color: var(--main-background-light-color);
  backdrop-filter: blur(20px);
  color: var(--main-text-color);
  border-radius: 8px;
  transition:
    opacity 0.3s,
    transform 0.3s,
    margin-top 0.3s,
    height 0.3s;
  z-index: 2;
  .all-set {
    overflow: hidden;
    height: 100%;

    :deep(.n-tab-pane) {
      padding: 20px 0 !important;
    }

    :deep(.scrollbar) {
      max-height: calc(64vh - 84px);
      transition: max-height 0.3s;

      .n-scrollbar-container {
        padding: 0 20px !important;
        box-sizing: border-box;
      }
    }
    :deep(.set-item) {
      width: 100%;
      border-radius: var(--rounded-lg) !important;
      margin-bottom: 16px;
      border: none;
      box-shadow: var(--main-box-shadow);
      --n-color: var(--main-background-light-color);

      .n-card__content {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 16px 20px !important;

        .desc {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          @media (max-width: 768px) {
            flex-direction: column !important;
            align-items: flex-start !important;
            .name {
              margin-bottom: 12px !important;
            }
          }
        }

        .name {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left !important;
          flex: 1 1 0% !important;
          min-width: 0 !important;
          padding-right: 24px !important;

          .title {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: var(--main-text-color) !important;
            display: block !important;
            white-space: normal !important;
          }

          .tip {
            font-size: 12.5px !important;
            opacity: 0.72 !important;
            color: var(--main-text-color) !important;
            display: block !important;
            white-space: normal !important;
            margin-top: 4px !important;
            line-height: 1.4 !important;
          }
        }

        .set {
          width: 200px !important;
          flex-shrink: 0 !important;
        }

        .n-switch,
        .n-button {
          flex-shrink: 0 !important;
        }

        // 响应式布局：小屏自动回落到第二行
        @media (max-width: 768px) {
          flex-direction: column !important;
          align-items: flex-start !important;

          .name {
            width: 100% !important;
            padding-right: 0 !important;
            margin-bottom: 12px !important;
          }

          .set {
            width: 100% !important;
            min-width: 100% !important;
          }

          .n-button {
            width: 100% !important;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .all-box {
    overflow: hidden;
    height: 100%;
    :deep(.n-tab-pane) {
      .scrollbar {
        max-height: calc(64vh - 84px);
      }
      .not-shortcut {
        min-height: calc(64vh - 84px);
      }
      &.no-padding {
        .scrollbar {
          max-height: calc(64vh - 44px);
        }
      }
    }
  }
  &.big {
    height: 80%;
    margin-top: 0 !important;
    :deep(.scrollbar) {
      max-height: calc(80vh - 84px);
    }
  }
  @media (max-width: 478px) {
    height: 60vh;

    .all-set {
      :deep(.scrollbar) {
        max-height: calc(60vh - 84px) !important;
      }
    }

    .all-box {
      :deep(.n-tab-pane) {
        .scrollbar {
          max-height: calc(60vh - 84px) !important;
        }
        .not-shortcut {
          min-height: calc(60vh - 84px) !important;
        }
        &.no-padding {
          .scrollbar {
            max-height: calc(60vh - 44px) !important;
          }
        }
      }
    }
  }
}
</style>
