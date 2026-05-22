/**
 * 判断输入的字符串是网址、邮件地址还是普通文本。
 *
 * @param {string} input - 输入的字符串
 * @returns {string} - 返回 "url" 表示网址，"email" 表示邮件地址，"text" 表示普通文本
 */
const identifyInput = (input) => {
  if (!input) return "text";

  /**
   * 网址正则
   * 支持 http(s) 协议前缀，或匹配没有协议头但带有合法顶级域名结尾的普通网址/域名
   */
  const urlRegex = /^(?:https?:\/\/)?[\w.-]+\.[a-z]{2,6}(?::\d{1,5})?(?:\/\S*)?$/i;

  /**
   * 严谨的 IPv4 正则
   * 限制 4 段 0-255 之间的数字，并且将 "." 正确转义
   */
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  /**
   * 邮箱正则
   */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 判断是否为网址或 IP
  if (urlRegex.test(input) || ipv4Regex.test(input)) return "url";

  // 判断是否为邮件地址
  if (emailRegex.test(input)) return "email";

  // 默认返回普通文本
  return "text";
};

export default identifyInput;
