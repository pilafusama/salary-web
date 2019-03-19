<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg">
        <el-col :span="24" class="el-row-88bg-text" style="font-size:4vw;">{{$t('placeSetCheckNumToSure')}}</el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1 yanzheng">
        <el-col :span="6" class="el-col-right">{{$t('phoneNo')}}</el-col>
        <el-col :span="18" style="vertical-align: middle;color:#333333;text-align:left;font-size:4.5vw;">151245211552</el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1 yanzheng">
        <el-col :span="6" class="el-col-right">
          {{$t('checkNum')}}
        </el-col>
        <el-col :span="10" class="el-col-title">
          <el-input type="Number" oninput="if(value.length>6)value= value.slice(0,6)" v-model="smsCode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="8" class="yan">
          <el-button v-bind:class="{'el-btn-disable1':!flag1, 'el-btn1':flag1}" :disabled="!flag1" @click="getNo">{{btntxt}}</el-button>
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
    </el-form>
    <el-button @click="submit" class="el-btn" :disabled="disabledFlag">{{$t('btn_sure')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      params: JSON.parse(sessionStorage.getItem('params')),
      smsCode: '',
      result: {},
      flag1: true,
      btntxt: '获取验证码',
      disabledFlag: true
    }
  },
  mounted: function () {
    // this.getNo()
  },
  methods: {
    submit () {
      let vm = this
      if (vm.params.financial_plan_id !== '') {
        // 修改工资理财计划
        vm.$http.post('/salary/h5/update_financial_plan', vm.params).then(
          function (result) {
            if (result.data.retcode === '0') {
              vm.$router.push({ path: '/payAutoManagePlanSuccess' })
            } else {
              this.$message.error(result.data.errmsg)
            }
          }
        )
      } else {
        // 新增工资理财计划
        vm.$http.post('/salary/h5/financial_plan', vm.params).then(
          function (result) {
            if (result.data.retcode === '0') {
              vm.$router.push({ path: '/payAutoManagePlanSuccess' })
            } else {
              this.$message.error(result.data.errmsg)
            }
          }
        )
      }
    },
    back () {
      history.back()
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
.el-collapse-item__header {
  font-family: PingFangHK-Regular;
  font-size: 4.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: left;
}
</style>
<style scoped>
.el-row-88bg-text {
  margin: 5.4vw 0 2vw 4vw;
}
.yanzheng {
  margin: 0 4vw !important;
}
.yanzheng .el-col {
  height: 13vw;
  line-height: 13vw;
}
.splitLine1 {
  margin: 0;
}
.yan {
  border-left: 1px solid #e5e5e5;
  text-align: center;
}
.el-btn-disable1 {
  background: none !important;
  color: #b2b2b2 !important;
  border: none;
}
.el-btn1 {
  background: none;
  color: #409eff;
  border: none;
}
</style>
