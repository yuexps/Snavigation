<template>
  <Transition name="fade">
    <div
      v-if="set.showHitokoto && status.siteStatus === 'normal'"
      class="hitokoto-container"
      @click="updateHitokoto"
      @click.stop
      :title="isUpdating ? '正在加载中...' : '点击刷新一言'"
    >
      <Transition name="hitokoto-fade" mode="out-in">
        <div :key="hitokotoData.id || 'loading'" class="hitokoto-content">
          <span class="text">{{ hitokotoData.hitokoto ?? "正在聆听世界的声音..." }}</span>
          <span class="author" :class="{ show: hitokotoData.from }">
            —— {{ hitokotoData.from_who ? hitokotoData.from_who + " " : "" }}《{{
              hitokotoData.from
            }}》
          </span>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { setStore, statusStore } from "@/stores";
import { getHitokoto } from "@/api";

const set = setStore();
const status = statusStore();

// 一言数据
const hitokotoData = ref({
  id: "",
  hitokoto: "正在聆听世界的声音...",
  from: "",
  from_who: "",
});

// 加载状态锁
const isUpdating = ref(false);

// 获取一言数据
const fetchHitokotoData = async () => {
  try {
    const res = await getHitokoto();
    if (res && res.hitokoto) {
      hitokotoData.value = {
        id: res.id,
        hitokoto: res.hitokoto,
        from: res.from,
        from_who: res.from_who,
      };
    }
  } catch (error) {
    console.error("获取一言数据失败：", error);
    hitokotoData.value = {
      id: "error",
      hitokoto: "生活明朗，万物可爱。人间值得，未来可期。",
      from: "网络",
      from_who: "佚名",
    };
  }
};

// 点击更新一言
const updateHitokoto = async () => {
  if (isUpdating.value) return;
  isUpdating.value = true;
  await fetchHitokotoData();
  setTimeout(() => {
    isUpdating.value = false;
  }, 500); // 500ms 内限制重复点击以配合动画
};

onMounted(() => {
  fetchHitokotoData();
});
</script>

<style lang="scss" scoped>
.hitokoto-container {
  position: absolute;
  bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 80%;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1;
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s,
    transform 0.2s;
  color: var(--main-text-color);
  text-shadow: var(--main-text-shadow);

  &:hover {
    backdrop-filter: blur(20px);
    background-color: var(--main-background-light-color);
    .hitokoto-content {
      .author {
        opacity: 0.8;
        transform: translateY(0);
      }
    }
  }

  &:active {
    transform: scale(0.98);
  }

  .hitokoto-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;

    .text {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.5px;
      line-height: 1.5;
    }

    .author {
      font-size: 12px;
      opacity: 0;
      transform: translateY(5px);
      transition:
        opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      font-style: italic;
      color: var(--main-text-color);
      &.show {
        display: inline-block;
      }
    }
  }
}

// 一言切换淡入淡出动画
.hitokoto-fade-enter-active,
.hitokoto-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.hitokoto-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.hitokoto-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .hitokoto-container {
    bottom: 70px;
    max-width: 90%;
    padding: 6px 12px;
    .hitokoto-content {
      .text {
        font-size: 13.5px;
      }
      .author {
        opacity: 0.6;
        transform: translateY(0);
      }
    }
  }
}
</style>
