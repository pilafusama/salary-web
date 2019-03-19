<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="el-top-steps">
      <el-row class="el-top-steps-row">
        <el-steps :active="1" align-center finish-status="success">
          <el-step>
            <template slot="description">{{$t('checkIdentity')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('bindPayCard')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('setSuccess')}}</template>
          </el-step>
        </el-steps>
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-88bg el-row-bline" style=" border-top: 1px solid #d9d9d9;">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">{{$t('phoneNo')}}</el-col>
        <el-col :span="18" style="color:#333333;text-align:left;font-size:5vw;line-height:10vw;padding-left:2vw;">{{ea02_bean.MblPh_No}}</el-col>
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
    <el-button @click="next" class="el-btn" :disabled="disabledFlag">{{$t('activeUser')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      ea02_bean: JSON.parse(sessionStorage.getItem('ea02_bean'))[0],
      smsCode: '',
      btntxt: '获取验证码',
      flag1: true,
      disabledFlag: true
    }
  },
  methods: {
    back () {
      history.back()
    },
    next () {
      let vm = this
      vm.$http.post('/salary/h5/reuse_salary_account', {
        'SMS': this.smsCode,
        'func_code': '3',
        'chnl_cust_no': this.ea02_bean.Crdt_No,
        'Ebnk_Sign_Accno': this.ea02_bean.DbCrd_CardNo,
        'Pltfrm_Nm': 'xxxx',
        'Hdl_InsID': this.ea02_bean.Lv1_InsID,
        'Sign_Dt': this.ea02_bean.Sign_Dt,
        'MblPh_No': this.ea02_bean.MblPh_No,
        'Rsrv_TpCd': this.ea02_bean.Rsrv_TpCd
      }).then(
        function (result) {
          sessionStorage.setItem('params', JSON.stringify(result.data))
          vm.$router.push({ path: '/tieCardSuccess' })
        }
      )
    },
    getNo () {
      let vm = this
      this.time = 60
      this.timer()
      vm.$http.post('/salary/h5/send_sms_code', {
        mobile_number: this.ea02_bean.MblPh_No,
        SIGNDATA: this.ea02_bean.DbCrd_CardNo,
        scene: 'REUSE_ACCOUNT'
      }).then(
        function (result) {
          console.log(result.data)
        }
      )
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
  },
  watch: {
    smsCode: {
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
</style>
