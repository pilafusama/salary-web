<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="background-color: #F5F5F5;">
      <el-row class="bgImg">
        <el-row>
          <el-col :span="10" class="el-col-name">{{bankName}}</el-col>
          <el-col :span="14" class="el-col-note">借记卡</el-col>
        </el-row>
        <el-row class="el-row-accno">
          <el-col :span="24">{{result.bind_card_number | formatAccIdHide}}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24" style="font-size: 5vw;text-align: left; padding-left:3vw;margin-top:5vw;">{{$t('payPlanCard')}}</el-col>
        </el-row>
        <el-row style="font-size: 4vw;text-align: left; margin-top:3vw;color:#cccccc">
          <el-col :span="9" style="padding-left:5vw;">{{bankNameTwo}}</el-col>
          <el-col :span="15">{{result.salary_card_number | formatAccId}}</el-col>
        </el-row> -->
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-88bg">
        <el-col :span="24" style="height: 4vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <a @click="toFindMyCount">
          <el-col :span="22" class="el-col-left">工资明细查询</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
    </el-form>
    <!-- <el-button @click="toSearchRecord" class="el-btn">{{$t('btnSearchRecord')}}</el-button> -->
  </el-container>
</template>
<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      result: {},
      bankName: '',
      bankNameTwo: '',
      dateBegin: '',
      dateEnd: ''
    }
  },
  created () {
    this.dateBegin = new Date()
  },
  mounted: function () {
    let vm = this
    vm.$http.post('/salary/h5/get_user_info').then(
      function (result) {
        vm.result = result.data.open_account_info
        vm.bankName = result.data.bank_name
        vm.bankNameTwo = result.data.bank_name_two
      }
    )
  },
  methods: {
    toSearchRecord () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzk_jycx_click')
      let vm = this
      sessionStorage.setItem('params', JSON.stringify(this.result))
      sessionStorage.setItem('flag', JSON.stringify('datail'))
      vm.$router.push({ path: '/transactionDetails' })
    },
    formatDate (dateNum) {
      if (dateNum < 10) {
        dateNum = '0' + dateNum
      }
      return dateNum
    },
    // 理财账户交易明细查询
    toFindMyCount () {
      let vm = this
      vm.$router.push({ path: '/payDetail' })
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
    MtaH5.clickStat('xgjym_fwsc', { 'myaccount': onlineTime })
  }
}
</script>
<style scoped>
.el-row-1 {
  margin: 2.5vw 2vw 2.5vw 5vw;
}
.bgImg {
  background-image: url(../assets/image/card_bg.png);
  background-size: 100% 100%;
  background-color: #ffffff;
  color: #ffffff;
  border-radius: 5px;
  margin: 5vh auto;
  width: 85vw;
  height: 16vh;
}
.el-col-name {
  font-size: 4.5vw;
  font-family: PingFangSC-Regular;
  text-align: left;
  padding-left: 15vw;
  margin-top: 5vw;
  color: #ffffff;
}
.el-col-note {
  font-size: 4vw;
  font-family: PingFangSC-Regular;
  text-align: left;
  padding-left: 6vw;
  margin-top: 5.5vw;
  color: #ffffff;
}
.el-row-accno {
  font-size: 5vw;
  font-family: Farrington-7B-Qiqi-;
  text-align: left;
  margin-top: 2.5vh;
  padding-left: 15vw;
}
</style>
