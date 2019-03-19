/* eslint-disable */
const vFilter = {
  formatMoney: function(val, flag) {
    if (flag === 'No') {
      return val
    } else if (flag === 'Yes') {
      if (val != undefined) {
        val = val.toString().replace(/[^\d\.-]/g, '')
        if (isNaN(val)) {
          val = '0'
        }
        let sign = val == (val = Math.abs(val))
        val = Math.floor(val * 100 + 0.50000000001)
        let cents = val % 100
        val = Math.floor(val / 100).toString()
        if (cents < 10) {
          cents = '0' + cents
        }
        for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
          val =
            val.substring(0, val.length - (4 * i + 3)) +
            ',' +
            val.substring(val.length - (4 * i + 3))
        }
        return (sign ? '' : '-') + val + '.' + cents
      }
    }
  },
  //去除金额中的逗号
  unformatMoney: function(val) {
    if (val != undefined) {
      return val.replace(/,/g, '')
    }
  },
  //如果是正数加正号
  formatMoneyAdd: function(val, flag) {
    if (flag === 'No') {
      return val
    } else if (flag === 'Yes') {
      if (val != undefined) {
        val = val.toString().replace(/[^\d\.-]/g, '')
        if (isNaN(val)) {
          val = '0'
        }
        let sign = val == (val = Math.abs(val))
        val = Math.floor(val * 100 + 0.50000000001)
        let cents = val % 100
        val = Math.floor(val / 100).toString()
        if (cents < 10) {
          cents = '0' + cents
        }
        for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
          val =
            val.substring(0, val.length - (4 * i + 3)) +
            ',' +
            val.substring(val.length - (4 * i + 3))
        }
        return (sign ? '+' : '-') + val + '.' + cents
      }
    }
  },
  //接收金额是以分为单位的，转换成元
  formatMoneyPoint(val) {
    if (val != undefined) {
      val = val.toString().replace(/[^\d\.-]/g, '')
      if (isNaN(val)) {
        val = '0'
      }
      let sign = val == (val = Math.abs(val))
      val = Math.floor(val + 0.50000000001)
      let cents = val % 100
      val = Math.floor(val / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val =
          val.substring(0, val.length - (4 * i + 3)) +
          ',' +
          val.substring(val.length - (4 * i + 3))
      }
      return (sign ? '' : '-') + val + '.' + cents
    }
  },
  formatAccId: function(val) {
    if (val != undefined) {
      return val
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  // 银行卡号脱敏处理
  formatAccIdHide: function(val) {
    if (val != undefined) {
      var temp = val
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
      return '**** **** **** ***' + temp.substr(-5)
    }
  },
  formatMonth: function(val) {
    if (val != undefined) {
      var month = val.toString().substring(4, 6)
      return month
    }
  },
  formatYear: function(val) {
    if (val != undefined) {
      var year = val.toString().substring(0, 4)
      return year
    }
  },
  //超过长度用...表示
  strLength: function(str, len) {
    var l = str.length
    if (l <= len) {
      return str
    } else {
      return str.slice(0, len) + '...'
    }
  }
}
export default vFilter

var pdDate = function(vas) {
  vas = vas < 10 ? '0' + vas : vas
  return vas
}
