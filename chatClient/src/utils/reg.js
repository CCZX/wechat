/**
 * 1. 正则表达式
 * 2. 验证信息
 */

export const validateNickname = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    if (value.length > 12) {
      callback(new Error("请输入不超过12位字符"));
      return;
    }
    callback();
  }
}
export const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    let reg = /^1[3|4|5|7|8]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的手机格式！"));
      return;
    }
    callback();
  }
}
export const validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    let reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱格式！"));
      return;
    }
    callback();
  }
}
export const validateSignature = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    if (value.length > 100) {
      callback(new Error("请输入不超过100位字符"));
      return;
    }
    callback();
  }
}

/**16进制颜色 */
export const colorHexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
