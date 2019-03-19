<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" class="el-row-88bg-text">{{$t('msgNewTieCardM2')}}</el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">{{$t('phoneNo')}}</el-col>
        <el-col :span="18" class="el-col-title">
          <el-input v-model="phoneNo" oninput="if(value.length>11)value= value.slice(0,11)" placeholder="请输入预留手机号码" @blur="phoneNoInput"></el-input>
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">
          {{$t('checkNum')}}
        </el-col>
        <el-col :span="9" class="el-col-title">
          <el-input type="Number" oninput="if(value.length>6)value= value.slice(0,6)" v-model="smsCode" placeholder="请输入验证码" @blur="smsCodeInput"></el-input>
        </el-col>
        <el-col :span="9" class="yan">
          <el-button v-bind:class="{'el-btn-disable1':!flag1, 'el-btn1':flag1}" :disabled="!flag1" @click="getSmsCode">{{btntxt}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="confirmPhone" v-bind:class="{'el-btn-disable': flag, 'el-btn':!flag}" :disabled="flag">{{$t('btn_sure')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'NewTieCardM2',
  data () {
    return {
      isStockUser: this.$route.params.isStockUser,
      flag: true,
      flag1: false,
      flag2: true,
      phoneNoFlag: false,
      checkNoFlag: false,
      btntxt: '获取验证码',
      phoneNo: '',
      smsCode: ''
    }
  },
  watch: {
    phoneNo: {
      handler: function (val, oldVal) {
        if (this.phoneNo !== '' && this.phoneNo != null) {
          this.phoneNoFlag = true
        } else {
          this.phoneNoFlag = false
        }
        if (this.phoneNoFlag) {
          this.flag1 = true
        } else {
          this.flag1 = false
        }
        if (this.phoneNoFlag && this.checkNoFlag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    },
    smsCode: {
      handler: function (val, oldVal) {
        if (this.smsCode !== '' && this.smsCode != null) {
          this.checkNoFlag = true
        } else {
          this.checkNoFlag = false
        }
        if (this.phoneNoFlag && this.checkNoFlag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    }
  },
  methods: {
    confirmPhone () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_qrkt')
      let vm = this
      vm.$http.post('/salary/h5/sms_code_verify_tx', { mobile_number: this.phoneNo, verify_code: this.smsCode }).then(
        function (result) {
          vm.$router.push({ path: '/tieCardSuccessM2' })
        }
      )
    },
    Oninput (value) {
      if (value.length > 23) {
        value = value.slice(0, 23)
      }
    },
    phoneNoInput () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_srsjhm')
    },
    smsCodeInput () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_sryzm')
    },
    getSmsCode () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_hqyzm')
      let vm = this
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(vm.phoneNo)) {
        this.time = 0
        this.btntxt = '获取验证码'
        this.$message({
          message: '手机号格式不正确',
          type: 'error'
        })
      } else {
        this.time = 60
        this.timer()
        this.flag2 = false
        vm.$http.post('/salary/h5/send_sms_code_tx', { mobile_number: this.phoneNo }).then(
          function (result) {
            console.log(result.data)
          }
        )
      }
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's'
        setTimeout(this.timer, 1000)
        this.flag1 = false
      } else {
        this.time = 0
        this.btntxt = '重新获取'
        this.flag1 = true
      }
    }
  }
}
</script>
<style>
</style>
<style scoped>
.el-col-10 {
  text-align: left;
  line-height: 5vw;
  font-size: 3.5vw;
  font-family: PingFang-SC-Medium;
  color: #999999;
  padding: 4vw;
}
</style>
