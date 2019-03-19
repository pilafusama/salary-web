<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="form-blue">
      <el-row type="flex" justify="end" style="margin-bottom: 4vh;">
        <!-- <el-col :span="4" class="el-col-card">
          <img class="cardImg" @click="myAcc" src="../assets/image/payroll.png">
        </el-col> -->
      </el-row>
      <el-row>
        <!-- <el-col :span="4">
          <img style="width：5vh;height:3vh;float: right;" @click="myAcc" src="../assets/image/payroll.png">
        </el-col> -->
        <el-col :span="4">
          <img style="width：5vh;height:3vh;float: right;">
        </el-col>
        <el-col v-if="flag" :span="16" class="text-fff">
          <span>{{$t('totalMoney')}}</span>
          <img @click="hideShow" src="../assets/image/visible.png">
        </el-col>
        <el-col v-else :span="16" class="text-fff">{{$t('totalMoney')}}
          <img @click="hideShow" src="../assets/image/invisible.png">
        </el-col>
        <el-col :span="4" class="el-col-card">
          <img style="width: 5.4vw;" @click="setting" src="../assets/image/setting.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="big-text">￥ {{totalMoney | formatMoney(flagNo)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="littel-text" style="margin:0 0 8vw 0">
          {{$t('yestodayMoney')}}{{yesMoney | formatMoney(flagNo)}}&nbsp;&nbsp;&nbsp;{{$t('sumMoney')}}{{sum | formatMoney(flagNo)}}</el-col>
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" class="el-row-88bg-text" style="font-size:3.5vw">{{$t('home_myAssets')}}</el-col>
      </el-row>
      <!-- 后续需要加上
      <el-row>
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <el-row style="margin:1vw 0 1vw 5vw;font-size:4vw;color:#888888;">
                <el-col :span="12" style="text-align: left;">嘉实基金宝</el-col>
                <el-col :span="10" style="text-align: right;">--元</el-col>
              </el-row>
            </template>
              {{190000 | formatMoney('Yes')}}
              <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">活期账户</el-col>
              <el-col :span="14" class="el-col-10">
                11111元可转出
              </el-col>
            </el-row>
            <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">嘉实基金宝账户</el-col>
              <el-col :span="14" class="el-col-10">
                10,000.00元可转出
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row>-->
      <el-row class="row-new-plan">
        <el-col :span="12" class="row-new-plan-text" style="text-align: left;">建行活期存款</el-col>
        <el-col :span="12" class="row-new-plan-text" style="padding-right:4vw;text-align: right;color:#FAA928"> {{totalMoney | formatMoney(flagNo)}}元</el-col>
      </el-row>
      <!-- 后续需要加上
      <el-row>
        <el-collapse>
          <el-collapse-item name="2">
            <template slot="title">
              <el-row style="margin:1vw 0 1vw 5vw;font-size:4vw;color:#888888;">
                <el-col :span="12" style="text-align: left;">建行活期存款</el-col>
                <el-col :span="10" style="text-align: right;"> {{totalMoney | formatMoney(flagNo)}}元</el-col>
              </el-row>
            </template>
              <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">活期账户</el-col>
              <el-col :span="14" class="el-col-10">
                222222元可转出
              </el-col>
            </el-row>
            <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">嘉实基金宝账户</el-col>
              <el-col :span="14" class="el-col-10">
                10,000.00元可转出
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row> -->
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" class="el-row-88bg-text" style="font-size:3.5vw">{{$t('home_autoManage')}}</el-col>
      </el-row>
      <!-- <div v-for="plan in planList" :key="plan.value">
        <el-row>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <el-row @click.native="changePlan(plan)" style="margin:1vw 0 1vw 5vw;font-size:4vw;color:#888888;">
                  <el-col :span="20" style="text-align: left;">
                    <span v-if="plan.ftran_cycle=='01'">每月{{plan.ftran_date}}日转入{{plan.ftran_amt}}元至{{plan.ftran_prod}}</span>
                    <span v-if="plan.ftran_cycle=='02'">每季{{plan.ftran_date}}日转入{{plan.ftran_amt}}元至{{plan.ftran_prod}}</span>
                    <span v-if="plan.ftran_cycle=='03'">每年{{plan.ftran_date}}日转入{{plan.ftran_amt}}元至{{plan.ftran_prod}}</span>
                  </el-col>
                </el-row>
              </template> -->
      <!-- 后续需要加上
              {{190000 | formatMoney('Yes')}}
              <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">活期账户</el-col>
              <el-col :span="14" class="el-col-10">
                11111元可转出
              </el-col>
            </el-row>
            <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">嘉实基金宝账户</el-col>
              <el-col :span="14" class="el-col-10">
                10,000.00元可转出
              </el-col>
            </el-row> -->

      <!-- <div v-for="plan in planList" :key="plan.value">
        <el-row @click.native="changePlan(plan)" class="row-plan">
          <el-col :span="21" style="text-align: left;">
            <el-row>
              <el-col :span="24">
                <span v-if="plan.ftran_cycle=='01'">每月{{plan.ftran_date}}日转入{{plan.ftran_amt | formatMoney('Yes')}}元至{{plan.ftran_prod}}</span>
                <span v-if="plan.ftran_cycle=='02'">每季{{plan.ftran_date}}日转入{{plan.ftran_amt | formatMoney('Yes')}}元至{{plan.ftran_prod}}</span>
                <span v-if="plan.ftran_cycle=='03'">每年{{plan.ftran_date}}日转入{{plan.ftran_amt | formatMoney('Yes')}}元至{{plan.ftran_prod}}</span>
              </el-col>
            </el-row>
            <el-row v-if="plan.execTime !== ''" style="margin-top:3px;">
              <el-col :span="1">
                <div class="exec-circle"></div>
              </el-col>
              <el-col :span="20" class="is-exec">{{plan.execTime.substr(5,2)}}月{{plan.execTime.substr(8,2)}}日执行成功</el-col>
            </el-row>
            <el-row v-else style="margin-top:3px;">
              <el-col :span="1">
                <div class="unexec-circle"></div>
              </el-col>
              <el-col :span="20" class="is-exec">未执行</el-col>
            </el-row>
          </el-col>
          <el-col :span="3"><img class="enterIcon" src="../assets/image/into.png"></el-col>
        </el-row>
      </div> -->

      <!-- 后续需要加上
              <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">活期账户</el-col>
              <el-col :span="14" class="el-col-10">
                222222元可转出
              </el-col>
            </el-row>
            <el-row class="el-row-1">
              <el-col :span="10" class="el-col-10" style="text-align: left;">嘉实基金宝账户</el-col>
              <el-col :span="14" class="el-col-10">
                10,000.00元可转出
              </el-col>
            </el-row> -->

      <el-row @click.native="changePlan('','N')" class="row-new-plan">
        <el-col :span="21" style="font-size:4.3vw;" class="row-new-plan-text">{{$t('home_newPlan')}}</el-col>
        <el-col :span="3" style="margin-top:1vh"><img class="enterIcon" src="../assets/image/into.png"></el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
    </el-form>
    <el-row>
      <el-button @click="sendOut" class="el-btn el-btn-left">{{$t('bnt_transFer')}}</el-button>
      <el-button @click="changePlan('','B')" class="el-btn">{{$t('btn_buyPro')}}</el-button>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: 'HomePage',
  data () {
    return {
      /* eslint-disable */
      planList: [],
      flagNo: 'No',
      totalMoney: '--',
      yesMoney: '--',
      sum: '--',
      terminal: '--',
      current: '--',
      funds: '--',
      flag: true,
      result: {},
      dateBegin: '',
      dateEnd: ''
    }
  },
  created () {
    this.dateBegin = new Date()
  },
  mounted: function () {
    let vm = this
    vm.$http.post('/salary/h5/query_account_balance', { ccyCd: '156', cshEx_Cd: '1' }).then(
      function (result) {
        vm.flagNo = 'Yes'
        vm.result = result.data;
        vm.totalMoney = result.data.totalBal;
        vm.result.year = result.data.fcreateTime.substring(0, 4)
        vm.result.month = result.data.fcreateTime.substring(5, 7)
        vm.result.fcreateTime = vm.result.month + '/' + vm.result.year;
        vm.planList = result.data.financialPlans
      }
    )
  },
  methods: {
    cellClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'td-left'
      }
      else {
        return 'td-right'
      }
    },
    more () {
      let vm = this
      sessionStorage.setItem('params', JSON.stringify(this.result))
      sessionStorage.setItem('flag', JSON.stringify('GZ'))
      vm.$router.push({ path: '/transactionDetails' })
    },
    setting () {
      let vm = this
      vm.$router.push({ path: '/setting' })
    },
    back () {
      history.back()
    },
    sendOut () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzlc_zczj_click')
      let vm = this
      sessionStorage.setItem('params', JSON.stringify(this.result))
      vm.$router.push({ path: '/transferFunds' })
    },
    changePlan (plan, clickType) {
      // let vm = this
      // sessionStorage.setItem('plan', JSON.stringify(plan))
      // vm.$router.push({ path: '/payAutoManagePlan' })
      this.$message({
        showClose: true,
        message: '正在研发中,敬请期待...'
      });
      if (clickType === 'B') {
        // eslint-disable-next-line
        MtaH5.clickStat('zym_xzlc_gmlc_click')
      } else {
        // eslint-disable-next-line
        MtaH5.clickStat('zym_xzlc_cjxjh_click')
      }
    },
    hideShow () {
      this.$forceUpdate();
      if (this.flag) {
        this.flagNo = 'No';
        this.totalMoney = '****';
        this.yesMoney = '****';
        this.sum = '****';
        this.flag = false;
      } else {
        this.totalMoney = this.result.totalBal;
        this.flagNo = 'Yes';
        this.yesMoney = '--';
        this.sum = '--';
        this.flag = true;
      }
    },
    myAcc () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzlc_tzxzk_click')
      let vm = this
      sessionStorage.setItem('params', JSON.stringify(this.result))
      vm.$router.push({ path: '/myAccount' })
    },
    formatDate (dateNum) {
      if (dateNum < 10) {
        dateNum = '0' + dateNum
      }
      return dateNum
    }
  },
  destroyed: function () {
    this.dateEnd = new Date()
    let dateDiff = this.dateEnd.getTime() - this.dateBegin.getTime() // 时间差的毫秒数
    let hours = Math.floor(dateDiff / (3600 * 1000)) // 计算出小时数
    let remain = dateDiff % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(remain / (60 * 1000)) // 计算相差的分钟数
    let remain2 = remain % (60 * 1000) // 计算分钟数后剩余的毫秒数
    let seconds = Math.floor(remain2 / 1000)
    let onlineTime = this.formatDate(hours) + ':' + this.formatDate(minutes) + ':' + this.formatDate(seconds)
    // eslint-disable-next-line
    MtaH5.clickStat('xgjym_fwsc', { 'homepage': onlineTime })
  }
}
</script>
<style>
.row-new-plan {
  margin: 3vw 0 2vw 4vw;
  font-size: 4.3vw;
  color: #000000;
}
.row-new-plan-text {
  text-align: left;
  height: 5vh;
  line-height: 5vh;
}
.totalFont {
  color: #a3b8d2;
  font-size: 3.5vw;
  float: right;
  padding-right: 1vw;
}
.setImg {
  width: 5vw;
  height: 5vw;
  float: right;
}
.instForm1 {
  text-align: right;
  margin: 0 0 4vh 0;
  padding-right: 3vw;
}
.instForm2 {
  text-align: left;
  margin: 0 0 4vh 0;
  padding-left: 3vw;
}
.instLabel {
  color: #a3b8d2;
  font-size: 3.5vw;
  padding-right: 1vw;
}
.rowStyle {
  margin: 1vh 0 0 4.2vw;
  font-size: 4vw;
  color: black;
  height: 10vw;
  line-height: 8vw;
}
.exec-circle {
  width: 2vh;
  height: 2vh;
  background-color: #00ff00;
  border-radius: 50%;
  margin-top: 1vw;
}
.unexec-circle {
  width: 2vh;
  height: 2vh;
  background-color: #ff0000;
  border-radius: 50%;
  margin-top: 1vw;
}
.is-exec {
  color: #888888;
  padding-left: 3px;
}
</style>
<style scoped>
.el-col-card {
  text-align: right;
  padding-right: 5vw;
  margin-top: 1vw;
}
.cardImg {
  width: 5.4vw;
  height: 4.3vw;
}
.form-blue {
  color: rgb(255, 255, 255);
  background: #5077aa;
}
.text-fff {
  text-align: center;
  font-size: 4vw;
  color: #ffffff;
  height: 7vw;
  line-height: 7vw;
}
.text-fff img {
  vertical-align: middle;
  padding-left: 1vw;
  width: 5.4vw;
  height: 5.4vw;
}
.big-text {
  text-align: center;
  font-size: 8.5vw;
  color: #ffffff;
  font-family: PingFangHK-Semibold;
  margin: 1.5vw 0;
}
.littel-text {
  text-align: center;
  font-size: 3.8vw;
  color: #ffffff;
  font-family: PingFangHK-Semibold;
}
.line {
  display: inline-block;
  width: 1px;
  height: 5vh;
  background: #748fb3;
}
.splitLine1 {
  background-color: #e9e9e9;
  margin: 0;
}
.el-btn {
  width: 44vw;
  margin-top: 8vw;
}
/* div >>> .el-btn:focus,
.el-btn:hover {
  background-color: #2f7dcd;
  color: #ffffff;
} */
.el-btn-left {
  background: #ffffff;
  color: #000000;
  margin-right: 4vw;
}
.el-row-88bg-text {
  margin: 5.4vw 0 1.6vw 4vw;
}
</style>
