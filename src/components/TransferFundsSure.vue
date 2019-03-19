<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="transForm">
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left">{{$t('trans_sure_name')}}</el-col>
        <el-col :span="16" class="el-col-10">
          {{params.cre_name}}
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left">{{$t('trans_sure_bank')}}</el-col>
        <el-col :span="16" class="el-col-10">
          {{params.bankName}}
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left">{{$t('trans_sure_acc')}}</el-col>
        <el-col :span="16" class="el-col-10">
          {{params.bind_card_number | formatAccId}}
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left">{{$t('trans_sure_money')}}</el-col>
        <el-col :span="16" class="el-col-10">
          <span class="money">{{params.Fetch_amount}}元</span>
        </el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline el-row-bline-top">
        <el-col :span="24" class="el-row-88bg-text" style="font-size:4vw">{{$t('checkPhoneNumSendTo')}} {{params.mobile_number}}</el-col>
      </el-row>
      <el-row class="el-row-1 yanzheng">
        <el-col :span="6" class="el-col-right" style="font-size:4.6vw;">
          {{$t('sure_number')}}
        </el-col>
        <el-col :span="10" class="el-col-title">
          <el-input class="tranInput" type="Number" oninput="if(value.length>6)value= value.slice(0,6)" v-model="smsCode" placeholder="请输入验证码" @blur="smsCodeInput"></el-input>
        </el-col>
        <el-col :span="8" class="yan">
          <el-button v-bind:class="{'el-btn-disable1':!flag1, 'el-btn1':flag1}" :disabled="!flag1" @click="getNo">{{btntxt}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="submit" class="el-btn" :disabled="disabledFlag">{{$t('btn_submit')}}</el-button>
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
    this.getNo()
  },
  methods: {
    submit () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzlc_zjzc_tj_click')
      let vm = this
      vm.$http.post('/salary/h5/fetch', {
        ZZ_amt: vm.params.tempMoney,
        SMS: vm.smsCode,
        AcBa: vm.params.totalBal,
        card_banks_relation: vm.params.card_banks_relation,
        RPPDBnk_BrNo: vm.params.bind_card_bank_number,
        Cst_AccNo: vm.params.salary_card_number,
        ZZ_ass_acct_no: vm.params.bind_card_number,
        CrdHldr_Crdt_No: vm.params.cre_id,
        CrdHldr_Nm: vm.params.cre_name
      }
      ).then(
        function (result) {
          if (result.data.retcode === '0') {
            vm.$router.push({ path: '/transferFundSuccess' })
          } else {
            this.$message.error(result.data.errmsg)
          }
        }
      )
    },
    back () {
      history.back()
    },
    getNo () {
      let vm = this
      this.time = 60
      this.timer()
      vm.$http.post('/salary/h5/send_sms_code', {
        mobile_number: vm.params.mobile_number,
        SIGNDATA: vm.params.salary_card_number,
        scene: 'FETCH'
      }).then(
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
    },
    smsCodeInput () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzlc_zjzc_sryzm_click')
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
.transForm input.el-input__inner {
  height: 5vw;
  line-height: 5vw;
  font-size: 4.6vw;
}
</style>
<style scoped>
.el-col-10 {
  font-family: PingFangHK-Regular;
  font-size: 4.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: right;
}
.el-form .el-row-1 {
  margin: 4vw 4vw;
}
.el-form .el-col {
  height: 6vw;
  line-height: 6vw;
}
.yanzheng {
  margin: 0 4vw !important;
}
.yanzheng .el-col {
  height: 13vw;
  line-height: 13vw;
}
.money {
  color: #faa928;
}
.el-row-88bg-text {
  margin: 5.4vw 0 2vw 4vw;
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
