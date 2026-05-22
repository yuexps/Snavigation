<template>
  <div class="all-set">
    <n-tabs class="set" size="large" justify-content="space-evenly" animated>
      <n-tab-pane name="main" tab="基础设置">
        <n-scrollbar class="scrollbar">
          <n-h6 prefix="bar"> 主题与壁纸 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">主题类别</span>
            </div>
            <n-select class="set" v-model:value="themeType" :options="themeTypeOptions" />
          </n-card>
          <n-card
            class="set-item cover"
            :content-style="{
              flexDirection: 'column',
              alignItems: 'flex-start',
            }"
          >
            <div class="name">
              <span class="title">壁纸偏好</span>
            </div>
            <n-grid
              class="cover-selete"
              responsive="screen"
              cols="1 s:3 m:3 l:3"
              :x-gap="16"
              :y-gap="16"
            >
              <!-- 本地默认 -->
              <n-grid-item
                :class="backgroundType === 0 ? 'item check' : 'item'"
                @click="handleWallpaperClick(0)"
              >
                <span class="name">本地默认</span>
              </n-grid-item>

              <!-- 每日一图 -->
              <n-grid-item
                :class="backgroundType === 1 ? 'item check' : 'item'"
                @click="handleWallpaperClick(1)"
              >
                <span class="name">每日一图</span>
              </n-grid-item>

              <!-- 自定义壁纸 -->
              <n-grid-item
                :class="['item', 'custom-wallpaper-item', backgroundType === 4 ? 'check' : null]"
                @click="handleWallpaperClick(4)"
              >
                <span class="name">自定义壁纸</span>
                <div class="edit-icon" @click.stop="customCoverModal = true" title="配置自定义壁纸">
                  <SvgIcon iconName="icon-setting" />
                </div>
              </n-grid-item>
            </n-grid>
          </n-card>
          <n-h6 prefix="bar"> 搜索 </n-h6>

          <n-card class="set-item">
            <div class="name">
              <span class="title">搜索建议</span>
            </div>
            <n-switch v-model:value="showSuggestions" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">跳转方式</span>
            </div>
            <n-select class="set" v-model:value="urlJumpType" :options="urlJumpTypeOptions" />
          </n-card>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="personalization" tab="个性调整">
        <n-scrollbar class="scrollbar">
          <n-h6 prefix="bar"> 壁纸 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">壁纸遮罩</span>
            </div>
            <n-switch v-model:value="showBackgroundGray" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">壁纸模糊</span>
            </div>
            <n-slider
              class="set"
              v-model:value="backgroundBlur"
              :step="0.01"
              :min="0"
              :max="10"
              :tooltip="false"
            />
          </n-card>
          <n-h6 prefix="bar"> 天气与时间 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">天气显示</span>
            </div>
            <n-switch v-model:value="showWeather" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">一言显示</span>
            </div>
            <n-switch v-model:value="showHitokoto" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">时钟样式</span>
            </div>
            <n-select class="set" v-model:value="timeStyle" :options="timeStyleOptions" />
          </n-card>
          <n-card v-if="timeStyle === 'one'" class="set-item">
            <div class="name">
              <span class="title">时间显秒</span>
            </div>
            <n-switch v-model:value="showSeconds" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">时钟显零</span>
            </div>
            <n-switch v-model:value="showZeroTime" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">显示农历</span>
            </div>
            <n-switch v-model:value="showLunar" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">12 小时制</span>
            </div>
            <n-switch v-model:value="use12HourFormat" :round="false" />
          </n-card>
          <n-h6 prefix="bar"> 搜索框 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">自动收缩</span>
            </div>
            <n-switch v-model:value="smallInput" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">自动聚焦</span>
            </div>
            <n-switch v-model:value="autoFocus" :round="false" />
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">自动失焦</span>
            </div>
            <n-switch v-model:value="autoInputBlur" :round="false" />
          </n-card>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="other" tab="其他设置">
        <n-scrollbar class="scrollbar">
          <n-h6 prefix="bar"> 数据管理 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">清除全站数据</span>
              <span class="tip">若站点显示异常或出现问题时可尝试此操作</span>
            </div>
            <n-button strong secondary @click="resetSite"> 清除全站数据 </n-button>
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">备份当前配置</span>
              <span class="tip">将当前站点的个性化配置导出为备份文件</span>
            </div>
            <n-button strong secondary @click="backupSite"> 备份当前配置 </n-button>
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">恢复备份数据</span>
              <span class="tip">从备份的配置文件中恢复您的个性化设置</span>
            </div>
            <input
              ref="recoverRef"
              type="file"
              style="display: none"
              accept=".json"
              @change="recoverSite"
            />
            <n-button strong secondary @click="recoverRef?.click()"> 恢复备份数据 </n-button>
          </n-card>
          <n-h6 prefix="bar"> 快捷网址 </n-h6>
          <n-card class="set-item">
            <div class="name">
              <span class="title">导出快捷网址</span>
              <span class="tip">将快捷网址列表导出为书签 HTML 文件</span>
            </div>
            <n-button strong secondary @click="downloadShortcutFile"> 导出快捷网址 </n-button>
          </n-card>
          <n-card class="set-item">
            <div class="name">
              <span class="title">导入快捷网址</span>
              <span class="tip">从书签 HTML 文件中导入快捷网址</span>
            </div>
            <input ref="shortCutUploadRef" type="file" style="display: none" accept=".html" @change="uploadShortcutFile" />
            <n-button strong secondary @click="clickShortcutUpload"> 导入快捷网址 </n-button>
          </n-card>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
    <!-- 自定义壁纸 -->
    <n-modal preset="card" title="自定义壁纸" v-model:show="customCoverModal" :bordered="false">
      <n-form>
        <n-form-item label="自定义壁纸链接">
          <n-input
            clearable
            type="text"
            v-model:value="customCoverUrl"
            placeholder="请输入自定义壁纸链接"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button strong secondary @click="customCoverModal = false"> 取消 </n-button>
          <n-button strong secondary @click="setCustomCover"> 确认 </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  NH6,
  NTabs,
  NTabPane,
  NSpace,
  NCard,
  NSwitch,
  NSelect,
  NScrollbar,
  NButton,
  NGrid,
  NGridItem,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NSlider,
} from "naive-ui";
import { storeToRefs } from "pinia";
import { setStore, statusStore, siteStore } from "@/stores";
import identifyInput from "@/utils/identifyInput";

const set = setStore();
const status = statusStore();
const site = siteStore();
const { shortcutData } = storeToRefs(site);
const {
  themeType,
  backgroundType,
  backgroundCustom,
  showBackgroundGray,
  backgroundBlur,
  smallInput,
  autoFocus,
  autoInputBlur,
  showLunar,
  showWeather,
  showSeconds,
  showZeroTime,
  use12HourFormat,
  showSuggestions,
  showHitokoto,
  urlJumpType,
  timeStyle,
} = storeToRefs(set);
const recoverRef = ref(null);
const customCoverModal = ref(false);
const customCoverUrl = ref("");

// 主题类别
const themeTypeOptions = [
  {
    label: "浅色模式",
    value: "light",
  },
  {
    label: "深色模式",
    value: "dark",
  },
];

// 切换壁纸
const handleWallpaperClick = (type) => {
  if (type === 0) {
    backgroundType.value = 0;
    $message.success("已切换为本地默认，刷新后生效");
  } else if (type === 1) {
    backgroundType.value = 1;
    $message.success("已切换为每日一图，刷新后生效");
  } else if (type === 4) {
    if (backgroundCustom.value) {
      backgroundType.value = 4;
      $message.success("已切换为自定义壁纸，刷新后生效");
    } else {
      $message.info("无自定义数据，请配置");
      customCoverModal.value = true;
    }
  }
};

// 链接跳转方式
const urlJumpTypeOptions = [
  {
    label: "新页面打开",
    value: "open",
  },
  {
    label: "当前页打开",
    value: "href",
  },
];

// 时钟样式
const timeStyleOptions = [
  {
    label: "横向排布",
    value: "one",
  },
  {
    label: "竖向排布",
    value: "two",
  },
];

// 自定义壁纸
const setCustomCover = () => {
  if (identifyInput(customCoverUrl.value) === "url") {
    backgroundType.value = 4;
    backgroundCustom.value = customCoverUrl.value;
    customCoverModal.value = false;
    $message.success("已切换为自定义壁纸，刷新后生效");
  } else {
    $message.error("请输入正确的网址");
  }
};

// 站点重置
const resetSite = () => {
  $dialog.warning({
    title: "站点重置",
    content: "确认重置站点为默认状态？你的全部数据以及自定义设置都将丢失！",
    positiveText: "重置",
    negativeText: "取消",
    onPositiveClick: () => {
      localStorage.clear();
      $message.info("站点重置成功，即将刷新");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
};

// 站点备份
const backupSite = () => {
  try {
    const date = new Date();
    const dateString = date.toISOString().replace(/[:.]/g, "-");
    const fileName = `Snavigation_Backup_${dateString}.json`;
    const jsonData = JSON.stringify(set.$state);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // 备份完成
    $message.success("站点备份成功");
  } catch (error) {
    console.error("站点备份失败：", error);
    $message.error("站点备份失败");
  }
};

// 站点恢复
const recoverSite = async () => {
  try {
    const fileInput = recoverRef.value;
    if (!fileInput?.files.length) {
      $message.error("请选择要恢复的备份文件");
      return false;
    }
    const file = fileInput.files[0];
    const jsonData = await file.text();
    const data = JSON.parse(jsonData);
    // 恢复数据
    $dialog.warning({
      title: "站点恢复",
      content: "确认使用该恢复文件？你现有的数据以及自定义设置都将被覆盖！",
      positiveText: "恢复",
      negativeText: "取消",
      onPositiveClick: async () => {
        const isSuccess = await set.recoverSiteData(data);
        if (isSuccess) {
          $message.info("站点恢复成功，即将刷新");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          $message.error("站点数据恢复失败，请重试");
        }
      },
      onNegativeClick: () => {
        recoverRef.value.value = null;
      },
    });
  } catch (error) {
    console.error("站点数据恢复失败：", error);
    $message.error("站点数据恢复失败，请重试");
  }
};

// 导出快捷网址为书签 HTML
function downloadShortcutFile() {
  let DTinnerStr = "";
  shortcutData.value.forEach((item) => {
    DTinnerStr += `<DT><A HREF="${item.url}" >${item.name}</A> \n`;
  });
  const htmlStr = `
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'none'; img-src data: *; object-src 'none'"></meta>
    <TITLE>Bookmarks</TITLE>
    <H1>MSFXP-Search导航文件</H1>
    <DL><p>
        <DT><H3 ADD_DATE="1716991740" LAST_MODIFIED="1716991740">MSFXP-Search导航文件</H3>
        <DL><p>
            ${DTinnerStr}
        </DL><p>
    </DL>
  `;
  const blob = new Blob([htmlStr], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "MSFXP-Search导航文件.html";
  a.click();
  URL.revokeObjectURL(url);
}

// 导入快捷网址（解析书签 HTML）
function uploadShortcutFile(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = function () {
      if (typeof fileReader.result === "string") {
        parserBookmarksFile(fileReader.result);
      }
    };
    // 清空以允许重复选择同一文件
    event.target.value = null;
  }
}

function parserBookmarksFile(result) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(result, "text/html");
  const aElements = doc.querySelectorAll("a");
  aElements.forEach((a) => {
    const isDuplicate = shortcutData.value?.some(
      (item) => item.name === a.textContent || item.url === a.href,
    );
    if (isDuplicate) return;
    shortcutData.value.push({
      id: shortcutData.value.length,
      name: a.textContent,
      url: a.href,
    });
  });
  $message.success("快捷网址导入成功");
}

const shortCutUploadRef = ref(null);
function clickShortcutUpload() {
  shortCutUploadRef.value?.click();
}

onMounted(() => {
  // 检测是否存在自定义壁纸
  if (backgroundCustom.value) customCoverUrl.value = backgroundCustom.value;
});

</script>

<style lang="scss">
.cover-selete {
  margin-top: 16px;
  .item {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded-pill) !important;
    background-color: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-sizing: border-box;
    transition:
      transform 0.2s cubic-bezier(0.25, 1, 0.5, 1),
      background-color 0.25s,
      border-color 0.25s,
      box-shadow 0.25s !important;

    .name {
      font-size: 13.5px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.72) !important;
      transition: color 0.25s;
    }

    &.check {
      background-color: rgba(255, 255, 255, 0.12) !important;
      border: 1.5px solid var(--apple-primary) !important;

      .name {
        color: var(--apple-primary) !important;
      }
    }

    &.custom-wallpaper-item {
      position: relative;
      .edit-icon {
        position: absolute;
        right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.08);
        opacity: 0;
        transform: scale(0.8);
        transition:
          opacity 0.2s,
          transform 0.2s,
          background-color 0.2s;
        z-index: 2;

        .i-icon {
          margin-right: 0 !important;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.18);
          .i-icon {
            color: #ffffff;
          }
        }
      }

      &:hover {
        .edit-icon {
          opacity: 1;
          transform: scale(1);
        }
      }

      @media (max-width: 798px) {
        .edit-icon {
          opacity: 0.85;
          transform: scale(1);
        }
      }
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.12) !important;
      border-color: rgba(255, 255, 255, 0.15) !important;

      .name {
        color: #ffffff !important;
      }
    }

    &:active {
      transform: scale(0.95) !important;
    }
  }
}
</style>
