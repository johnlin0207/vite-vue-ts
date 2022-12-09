// 为什么要把pinia实例过程提取出来？
// https://pinia.web3doc.top/core-concepts/outside-component-usage.html
import { createPinia } from 'pinia';
const pinia = createPinia();

export default pinia;
