<template>
  <div v-show="currentValue">
    <div class="gesturePwd">
      <div class="gesture-box">
        <span ref="gestureTitle" class="gestureTitle">{{$t('placeDrawPic')}}</span>
        <canvas ref="canvas" style="background-color:#34353A; display: inline-block; margin-top: 5vh; width: 90vw; height: 90vw;"></canvas>
        <!-- <a ref="updatePassword" class="update-pwd-msg" @click="updatePassword()">忘记手势密码</a> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    pwdState: {
      type: String,
      default: '2'
    }
  },
  data () {
    return {
      currentValue: false,
      ctx: '',
      width: 0,
      height: 0,
      devicePixelRatio: 0,
      chooseType: '',
      r: '',// 公式计算
      lastPoint: [],
      arr: [],
      restPoint: [],
      pswObj: {},
      canvas: '',
      salt: 'xxxx',
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.currentValue = val
      },
      immediate: true
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
    if (!this.pwdSlat) {
      this.pwdSlat = JSON.parse(sessionStorage.getItem('salt'))
    }
  },
  mounted () {
    this.setChooseType(3);
  },
  methods: {
    closePwd () {
      this.currentValue = false;
    },
    H5lock (obj) {
      this.height = obj.height;
      this.width = obj.width;
      this.chooseType = Number(window.localStorage.getItem('chooseType')) || obj.chooseType;
      this.devicePixelRatio = window.devicePixelRatio || 1;
    },
    // 初始化解锁密码面板 小圆圈
    drawCle (x, y) {
      this.ctx.strokeStyle = '#5077AA'; // 密码的点点默认的颜色
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    // 初始化圆心
    drawPoint (style) {
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.fillStyle = style;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2.5, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
      }
    },
    // 初始化状态线条
    drawStatusPoint (type) {
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.strokeStyle = type;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },
    // style:颜色 解锁轨迹
    drawLine (style, po, lastPoint) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = style;
      this.ctx.lineWidth = 8;
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
      for (var i = 1; i < this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
      }
      this.ctx.lineTo(po.x, po.y);
      this.ctx.stroke();
      this.ctx.closePath();
    },
    // 创建解锁点的坐标，根据canvas的大小来平均分配半径
    createCircle () {
      var n = this.chooseType;
      var count = 0;
      this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
      this.lastPoint = [];
      this.arr = [];
      this.restPoint = [];
      var r = this.r;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          count++;
          var obj = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          };
          this.arr.push(obj);
          this.restPoint.push(obj);
        }
      }
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (var i = 0; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y);
      }
      //return arr;
    },
    // 获取touch点相对于canvas的坐标
    getPosition (e) {
      var rect = e.currentTarget.getBoundingClientRect();
      var po = {
        x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
        y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
      };
      return po;
    },
    // 核心变换方法在touchmove时候调用
    update (po) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (var i = 0; i < this.arr.length; i++) { // 每帧先把面板画出来
        this.drawCle(this.arr[i].x, this.arr[i].y);
      }
      this.drawPoint('#5077AA'); // 每帧花轨迹
      this.drawStatusPoint('#5077AA'); // 每帧花轨迹
      this.drawLine('#5077AA', po, this.lastPoint); // 每帧画圆心
      for (var i = 0; i < this.restPoint.length; i++) {
        if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
          this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
          this.lastPoint.push(this.restPoint[i]);
          this.restPoint.splice(i, 1);
          break;
        }
      }
    },
    // touchend结束之后对密码和状态的处理
    storePass (psw) {
      if (this.pswObj.step == 1) {
        if (psw.length < 4) {
          this.drawStatusPoint('red');
          this.drawPoint('red');
          this.drawLine('red', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "red";
          gestureTitle.innerHTML = '至少输入4个点，请重试';
        } else {
          if (this.checkPass(this.toPasswordString(this.pswObj.fPassword), this.toPasswordString(psw))) {
            this.pswObj.step = 2;
            // this.pswObj.sPassword = this.toPasswordString(psw);
            this.$refs.gestureTitle.innerHTML = '密码设置成功';
            this.drawStatusPoint('#2CFF26');
            this.drawPoint('#2CFF26');
            window.localStorage.setItem('chooseType', this.chooseType);
            // 两次密码一致后保存密码跳转至下一页面
            let sha256 = require("js-sha256").sha256
            let shaPassword = sha256(this.salt + this.toPasswordString(psw))
            this.$emit('postSignPassword', shaPassword);
          } else {
            this.$refs.gestureTitle.innerHTML = '两次密码不一致，请重新设置密码';
            this.$refs.gestureTitle.style.color = "red";
            this.drawStatusPoint('red');
            this.drawPoint('red');
            delete this.pswObj.step;
            this.pswObj = {};
            this.reset();
          }
        }
      } else if (this.pswObj.step == 2) {
        let sha256 = require("js-sha256").sha256
        let shaPassword = sha256(this.salt + this.toPasswordString(psw))
        let vm = this
        vm.$http.post('/salary/h5/check_gesture_password', { gesture_password: shaPassword }).then(
          function (result) {
            if (result.data.stateFlag === '0') {
              var gestureTitle = vm.$refs.gestureTitle;
              gestureTitle.style.color = "#2CFF26";
              gestureTitle.innerHTML = '密码解锁成功';
              vm.drawStatusPoint('#2CFF26'); // 小点点外圈高亮
              vm.drawPoint('#2CFF26');
              vm.drawLine('#2CFF26', vm.lastPoint[vm.lastPoint.length - 1], vm.lastPoint);// 每帧画圆心
              // 校验密码成功重新设置手势密码
              vm.updatePassword();
            } else if (psw.length < 4) {
              vm.drawStatusPoint('red');
              vm.drawPoint('red');
              vm.drawLine('red', vm.lastPoint[vm.lastPoint.length - 1], vm.lastPoint);// 每帧画圆心
              var gestureTitle = vm.$refs.gestureTitle;
              gestureTitle.style.color = "red";
              gestureTitle.innerHTML = '至少输入4个点，请重试';
            } else {
              vm.drawStatusPoint('red');
              vm.drawPoint('red');
              vm.drawLine('red', vm.lastPoint[vm.lastPoint.length - 1], vm.lastPoint);// 每帧画圆心
              var gestureTitle = vm.$refs.gestureTitle;
              gestureTitle.style.color = "red";
              gestureTitle.innerHTML = '密码错误，请重新输入!';
            }
          }
        )
      } else {
        if (psw.length < 4) {
          this.drawStatusPoint('red');
          this.drawPoint('red');
          this.drawLine('red', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "red";
          gestureTitle.innerHTML = '至少输入4个点，请重试';
        } else {
          this.pswObj.step = 1;
          this.pswObj.fPassword = psw;
          this.$refs.gestureTitle.innerHTML = '设置成功，请再次绘制手势密码';
        }
      }
    },
    // 将密码数据转化为字符串
    toPasswordString (pswArr) {
      var ps = ''
      for (var i = 0; i < pswArr.length; i++) {
        ps += pswArr[i].index
      }
      return ps;
    },
    // 检验两次输入的密码是否一致
    checkPass (psw1, psw2) {
      return psw1 === psw2;
    },
    makeState () {
      // if (this.$refs.updatePassword && this.$refs.gestureTitle) {
      //   if (this.pswObj.step == 2) {
      //     this.$refs.updatePassword.style.display = 'block';
      //     var gestureTitle = this.$refs.gestureTitle;
      //     gestureTitle.style.color = "#FFFFFF";
      //     gestureTitle.innerHTML = '请输入手势密码';
      //   } else if (this.pswObj.step == 1) {
      //     this.$refs.updatePassword.style.display = 'none';
      //   } else {
      //     var gestureTitle = this.$refs.gestureTitle;
      //     gestureTitle.style.color = "#FFFFFF";
      //     this.$refs.updatePassword.style.display = 'block';
      //   }
      // }
      if (this.$refs.gestureTitle) {
        if (this.pswObj.step == 2) {
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "#FFFFFF";
          gestureTitle.innerHTML = '请输入手势密码';
        } else if (this.pswObj.step == 1) {
        } else {
          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "#FFFFFF";
        }
      }
    },
    setChooseType (type) {
      this.chooseType = type;
      this.init();
    },
    initDom () {
      this.chooseType = Number(window.localStorage.getItem('chooseType')) || 3;
      this.devicePixelRatio = window.devicePixelRatio || 1;
      var canvas = this.$refs.canvas;
      var width = this.width || this.getCanvasWidth();
      var height = this.height || this.getCanvasWidth();
      // 高清屏锁放
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * this.devicePixelRatio;
      canvas.width = width * this.devicePixelRatio;
    },
    init () {
      this.initDom();
      this.pswObj = {
        step: this.pwdState,
        sPassword: ''
      };
      this.lastPoint = [];
      this.makeState();
      this.touchFlag = false;
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.createCircle();
      this.bindEvent();
    },
    // 根据设备screen宽度设置canvas的宽度
    getCanvasWidth () {
      if (window.screen.width <= 639) {
        return window.screen.width * 0.9;
      }
      else if (window.screen.width >= 640 && window.screen.width <= 719) {
        return window.screen.width * 0.87;
      }
      else if (window.screen.width >= 720 && window.screen.width <= 749) {
        return window.screen.width * 0.85;
      }
      else if (window.screen.width >= 750 && window.screen.width <= 799) {
        return window.screen.width * 0.82;
      }
      else {
        return window.screen.width * 0.8;
      }
    },
    // 忘记手势密码时重新设置密码
    updatePassword () {
      window.localStorage.removeItem('chooseType');
      this.pswObj = {};
      this.$refs.gestureTitle.innerHTML = '请设置手势密码';
      this.reset();
    },
    // 组件重置
    reset () {
      this.makeState();
      this.createCircle();
    },
    bindEvent () {
      var self = this;
      this.canvas = this.$refs.canvas;
      // 开始触摸
      this.canvas.addEventListener("touchstart", function (e) {
        e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码
        var po = self.getPosition(e);
        for (var i = 0; i < self.arr.length; i++) {
          if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
            self.touchFlag = true;
            self.drawPoint(self.arr[i].x, self.arr[i].y);
            self.lastPoint.push(self.arr[i]);
            self.restPoint.splice(i, 1);
            break;
          }
        }
      }, false);
      // 触摸滑动
      this.canvas.addEventListener("touchmove", function (e) {
        if (self.touchFlag) {
          self.update(self.getPosition(e));
        }
      }, false);
      // 触摸结束
      this.canvas.addEventListener("touchend", function (e) {
        if (self.touchFlag) {
          self.touchFlag = false;
          self.storePass(self.lastPoint);
          setTimeout(function () {
            self.reset();
          }, 1000);
        }
      }, false);
    }
  }
}
</script>
<style>
.gesturePwd {
  background-color: #34353a;
}
.gesture-box {
  height: 85vh;
  padding-top: 15vh;
}
.gestureTitle {
  color: #ffffff;
  font-size: 5.2vw;
  font-family: PingFangHK-Regular;
  font-weight: normal;
}
.update-pwd-msg {
  display: block;
  font-family: PingFangHK-Regular;
  font-size: 4vw;
  color: #2f7dcd;
}
</style>