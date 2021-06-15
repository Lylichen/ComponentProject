module.exports = {
  // 只限汉字
  checkWord: str => /^[\u4e00-\u9fa5]{0,}$/.test(str),
  // 只限英文和阿拉伯数字
  checkLetter: str => /^[A-Za-z0-9]+$/.test(str),
  // email地址
  checkEmail: str => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str),
  // 域名
  checkCDN: str => /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(str),
  // 手机号
  checkMobile: str => /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str),
  // 电话号码
  checkPhone: str => /^(\d{3,4})-?\d{7,8}$/.test(str),
  // 国内固定电话
  checkCallPhone: str => /^(\d{3,4})-?\d{7,8}$/.test(str),
  // 身份证号
  checkCardId: (str, type) => {
    // type-0：粗略校验(默认)
    // type-1: 详细校验
    if(type){
      
    }else{
      return /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/.test(str)
    }
  },
  // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
  checkName: str => /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(str),
  // 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
  checkPsw: str => /^[a-zA-Z]\w{5,17}$/.test(str),
  // 日期
  checkDate: str => /^\d{4}-\d{1,2}-\d{1,2}/.test(str),
  // 月
  checkMonth: str => /^(0?[1-9]|1[0-2])$/.test(str),
  // 天
  checkDay: str => /^((0?[1-9])|((1|2)[0-9])|30|31)$/.test(str),
  checkIP: str => /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str),
  // QQ
  checkQQ: str => /[1-9][0-9]{4,}/.test(str),
  // 邮编
  checkPostman: str => /[1-9]\d{5}(?!\d)/.test(str),
  // 格式化时间
  formatDate: str => {},
  // 剩余时间
  lastTime: str => {}
}