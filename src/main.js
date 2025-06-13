import { createApp } from "vue";
// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// IconFont
import SvgIcon from "@/components/SvgIcon.vue";
// 主组件
import App from "@/App.vue";
// 全局样式
import "@/style/global.scss";

// 根组件
const app = createApp(App);

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 挂载
app.use(pinia);
app.component("SvgIcon", SvgIcon);
app.mount("#app");

// 定义全局回调函数
window.json = function(data) {
  console.log("JSONP response:", data);
  // 处理返回的数据
  if (Array.isArray(data.s)) {
    console.log("搜索建议：", data.s);
  } else {
    console.warn("接口返回的数据格式不正确:", data.s);
  }
};
