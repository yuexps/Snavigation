import axios from "@/utils/request";
import fetchJsonp from "fetch-jsonp";

/**
 * 获取天气
 * https://lbs.amap.com/api/webservice/guide/api/weatherinfo
 */
// 获取高德地理位置信息
export const getAdcode = async (key) => {
  return axios({
    method: "GET",
    url: "https://restapi.amap.com/v3/ip",
    params: { key },
  });
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  return axios({
    method: "GET",
    url: "https://restapi.amap.com/v3/weather/weatherInfo",
    params: { key, city, extensions: "base" },
  });
};

// 获取搜索建议的函数
export const getSearchSuggestions = async (keyWord) => {
  try {
    const encodedKeyword = encodeURIComponent(keyWord);
    const script = document.createElement("script");
    script.src = `https://suggestion.baidu.com/su?wd=${encodedKeyword}&cb=json`;
    document.head.appendChild(script);

    // 添加一个超时机制，避免长时间等待
    const timeout = setTimeout(() => {
      console.error("JSONP 请求超时");
      document.head.removeChild(script);
    }, 5000);

    // 定义一个 Promise，用于等待回调函数执行
    return new Promise((resolve, reject) => {
      window.json = (data) => {
        clearTimeout(timeout); // 清除超时
        document.head.removeChild(script); // 移除 script 标签
        if (Array.isArray(data.s)) {
          resolve(data.s); // 返回搜索建议
        } else {
          reject(new Error("接口返回的数据格式不正确"));
        }
      };
    });
  } catch (error) {
    console.error("处理搜索建议发生错误：", error);
    return Promise.reject(error);
  }
};

// 获取一言的函数
export const getHitokoto = async () => {
  return axios({
    method: "GET",
    url: "https://v1.hitokoto.cn/",
  });
};
