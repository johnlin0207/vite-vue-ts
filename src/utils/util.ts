import { Res } from '@/utils/interface';

const isSuccess = (resData: Res) => {
  return resData.status === '0';
};

/**
 * 判断js数据结构是否是有效类型,数字0为有效类型;null,undefined,'',NaN都属于无效类型
 * @param obj
 * @returns {boolean|boolean}
 */
const isEmpty = (obj: any) => {
  const isEmptyArray =
    Object.prototype.toString.call(obj) === '[object Array]' &&
    obj.length === 0;
  const isEmptyObject =
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.keys(obj).length === 0;
  return (obj !== 0 && !obj) || isEmptyArray || isEmptyObject;
};

/**
 * 安全的获取对象深层次的属性值，用法参照lodash.get
 * @param obj
 * @param props
 * @param defaultValue
 * @returns {*}
 */
const get = (obj: object, props: string, defaultValue?: any) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return defaultValue;
  }
  const arr = props.split('.');
  let temp: any = obj;
  for (const i of arr) {
    if (!isEmpty(temp[i])) {
      // 该属性有值更新该属性值
      temp = temp[i];
    } else {
      // 该属性没值返回默认值
      temp = defaultValue;
      break;
    }
  }
  return temp;
};

export { isSuccess, isEmpty, get };
