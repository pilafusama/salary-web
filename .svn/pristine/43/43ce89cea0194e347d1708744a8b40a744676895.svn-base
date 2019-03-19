<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" class="el-row-88bg-text" style="font-size:4.5vw">{{$t('turnOutTo')}}</el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-left">{{bankName}}</el-col>
        <el-col :span="16" class="el-col-left" style="color: #888888; margin-left: 5vw;">
          {{result.bind_card_number | formatAccId}}
        </el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style=" border-top: 1px solid #E9E9E9;">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="24" class="el-col-right">
          <div style="float: left;">{{$t('todayCanTurnTo')}}</div>
          <div class="el-col-amt">{{params.totalBal|formatMoney('Yes')}}元</div>
          <!-- 后续需要
            <el-collapse>
            <el-collapse-item title="今日可转出金额 11,000元" name="1">
              <el-row class="el-row-1">
                <el-col :span="10" class="el-col-10" style="text-align: left;">活期账户</el-col>
                <el-col :span="14" class="el-col-10">
                  {{params.totalMoney}}元可转出
                </el-col>
              </el-row>
               <el-row class="el-row-1">
                <el-col :span="10" class="el-col-10" style="text-align: left;">嘉实基金宝账户</el-col>
                <el-col :span="14" class="el-col-10">
                  10,000.00元可转出
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse> -->
        </el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style=" border-top: 1px solid #E9E9E9;">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="24" class="el-col-10" style="text-align: left;">转出金额</el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="4" class="el-col-left" style="margin-top:0.5vh;font-size: 8vw;">￥</el-col>
        <el-col :span="20" class="el-col-title">
          <el-input type="Number" v-model="Fetch_amount" maxlength="10" @focus="getOldAmount" v-on:blur="formatAmunt" onkeypress="return (event.keyCode>=48&&event.keyCode<=57) || event.keyCode==190 || event.keyCode==46"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="submit" class="el-btn" :disabled="!submitFlag">{{$t('btn_nest')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      params: JSON.parse(sessionStorage.getItem('params')),
      userName: '',
      idNo: '',
      ebnk_Sign_Accno: '',
      rltv_AccNo: '',
      mblPh_No: '',
      result: {},
      tempMoney: '',
      submitFlag: false,
      Fetch_amount: '',
      oldAmount: '',
      bankName: ''
    }
  },
  mounted: function () {
    let vm = this
    vm.$http.post('/salary/h5/get_user_info', {}).then(
      function (result) {
        vm.result = result.data.open_account_info
        vm.bankName = result.data.bank_name
        vm.result.bankName = result.data.bank_name
      }
    )
  },
  methods: {
    submit () {
      if (this.Fetch_amount !== '' && this.submitFlag) {
        // eslint-disable-next-line
        MtaH5.clickStat('zym_xzlc_zczj_xyb_click')
        let vm = this
        vm.result.Fetch_amount = vm.Fetch_amount
        vm.result.tempMoney = JSON.parse(vm.tempMoney)
        vm.result.totalBal = vm.params.totalBal
        sessionStorage.setItem('params', JSON.stringify(vm.result))
        vm.$router.push({ path: '/transferFundsSure' })
      }
    },
    back () {
      history.back()
    },
    getOldAmount () {
      this.Fetch_amount = this.oldAmount
    },
    formatMoneyTemp (val) {
      /* eslint-disable */
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
    },
    formatAmunt () {
      if (this.Fetch_amount == '') {
        this.submitFlag = false
        this.oldAmount = ''
      } else {
        if (Number(this.Fetch_amount) > 0) {
          this.oldAmount = Math.round(Number(this.Fetch_amount) * 100) / 100
          if (Number(this.Fetch_amount) > Number(this.params.totalBal)) {
            this.$message({
              message: '转出金额大于余额，请查证后重新输入！',
              type: 'error'
            })
            this.submitFlag = false
          } else if (this.result.card_banks_relation === 'DIFF_BANK') {
            if (Number(this.Fetch_amount) > 50000) {
              this.$message({
                message: '单笔转出金额不得大于5万，请重新输入！',
                type: 'error'
              })
              this.submitFlag = false
            } else {
              this.tempMoney = JSON.stringify(this.Fetch_amount)
              this.Fetch_amount = this.formatMoneyTemp(this.Fetch_amount)
              this.submitFlag = true
            }
          } else {
            this.tempMoney = JSON.stringify(this.Fetch_amount)
            this.Fetch_amount = this.formatMoneyTemp(this.Fetch_amount)
            this.submitFlag = true
          }
        } else {
          this.$message({
            message: '请输入正确的转账金额！',
            type: 'error'
          })
          this.Fetch_amount = ''
          this.oldAmount = ''
          this.submitFlag = false
        }
      }
    }
  },
  watch: {
    Fetch_amount: {
      handler: function (val) {
        if (val) {
          this.submitFlag = true
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
.el-col-10 {
  font-family: PingFangHK-Regular;
  font-size: 4.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: right;
}
.el-col-amt {
  float: right;
  color: #faa928;
  font-size: 5vw;
  font-weight: bold;
  letter-spacing: 1px;
  padding-right: 5vw;
}
</style>
