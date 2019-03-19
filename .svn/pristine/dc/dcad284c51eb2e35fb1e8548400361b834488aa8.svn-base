<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">{{$t('phoneNo')}}</el-col>
        <el-col :span="18" style="text-align: left;color: #333333;">199****6668</el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right" style="letter-spacing:2vw">
          {{$t('checkNum')}}
        </el-col>
        <el-col :span="9" class="el-col-title">
          <el-input type="Number" oninput="if(value.length>6)value= value.slice(0,6)" v-model="smsCode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="9" class="yan">
          <el-button v-bind:class="{'el-btn-disable1':!flag1, 'el-btn1':flag1}" :disabled="!flag1" @click="getNo">{{btntxt}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="next" class="el-btn" :disabled="disabledFlag">{{$t('changeBindPhone')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      userName: '',
      flag1: true,
      btntxt: '获取验证码',
      disabledFlag: true
    }
  },
  methods: {
    positive () {
      this.$message('打开摄像头识别卡号')
    },
    back () {
      history.back()
    },
    next () {
      let vm = this
      vm.$router.push({ path: '/changePhoneNoSuccess' })
    },
    getNo () {
      let vm = this
      this.time = 60
      this.timer()
      vm.$http.post('/salary/h5/send_sms_code', {
        mobile_number: vm.params.mblPh_No,
        SIGNDATA: vm.params.ebnk_Sign_Accno,
        scene: 'FETCH' }).then(
        function (result) {
          console.log(result.data)
        })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
        this.flag1 = false
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.flag1 = true
      }
    }
  },
  watch: {
    userName: {
      handler: function (val) {
        if (val) {
          this.disabledFlag = false
        }
      }
    }
  }
}
</script>
<style>
.is-disabled {
  background: #2f7dcd !important;
  opacity: 0.5;
}
</style>
<style scoped>
.el-col-10 {
  text-align: left;
  line-height: 5vw;
  font-size: 3vw;
  font-family: PingFang-SC-Medium;
  color: #999999;
}
.el-row-tip {
  font-size: 5vw;
  font-family: PingFang-SC-Bold;
  color: #333333;
  margin-bottom: 2vh;
}
.el-btn-in {
  background-color: #1388bd;
  color: #ffffff;
  line-height: 4vh;
  font-size: 6vw;
  font-family: PingFang-SC-Bold;
  border-radius: 10px;
  width: 40vw;
}
.el-btn-up {
  background-color: #ffffff;
  color: #000000;
  line-height: 4vh;
  font-size: 6vw;
  font-family: PingFang-SC-Bold;
  border-radius: 10px;
  width: 40vw;
}
.el-header {
  height: 100% !important;
  text-align: center;
  font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
  font-size: 4vh;
  color: #ffffff;
  background: #5077aa;
  letter-spacing: 1px;
  overflow: hidden;
}
.img {
  width: 20vh;
  height: 12vh;
  margin-left: 3vh;
  float: left;
}
</style>
