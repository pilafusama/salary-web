<template>
  <el-container>
    <el-header>
    </el-header>
    <!-- <el-form style="color: rgb(255, 255, 255);background:#5077AA;">
      <el-row style="margin: 2vw 0 2vw 0;font-size: 5vw;">
        <el-col :span="10">
          <img style="float: right;width:10vw" src="../assets/image/statistics.png" />
        </el-col>
        <el-col :span="11" style="line-height: 12vw;margin-left: 10vw;text-align: left;">{{$t('pay_statis')}}</el-col>
      </el-row>
    </el-form> -->
    <el-form style="background: #e9eef1;">
      <div v-if="showTip">
        <el-row v-for="item in list" :key="item.month" @click.native="payMonthDetail(item)" class="el-row-list">
          <!-- <el-col :span="3" v-bind:class="{'bordercolorSign':(index%2)==0, 'bordercolorDob':(index%2)==1}"></el-col> -->
          <!-- <el-col :span="9" class="el-col-left" style="text-align: center;line-height: 20vw;">{{item.month | formatMonth}}</el-col> -->
          <el-col :span="10" class="el-col-left" style="padding-left:3vw;text-align: center;">
            <span class="year">{{item.month | formatYear}}</span><br/>
            <span class="month">{{item.month | formatMonth}}</span>
            <span style="font-size:3.3vw;vertical-align: top;line-height:8vw;">月</span>
          </el-col>
          <el-col :span="7" style="font-size:3.3vw;text-align: center;line-height: 10vw;">
            <span>{{$t('beforeLow')}}</span><br>
            <span style="color:#000000;vertical-align: top;line-height: 8vw;">{{$t('afterLow')}}</span>
          </el-col>
          <el-col :span="7" style="font-size:3.3vw;text-align: right;padding-right:3.4vw;line-height: 10vw;">{{item.total_pre_tax_wages | formatMoneyPoint}}<br>
            <span style="color:#000000;font-size:4.8vw;vertical-align: top;line-height: 8vw;">{{item.actual_amount | formatMoneyPoint}}</span>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="24" style="float: center;text-align:center;color: #999999;line-height:20vw">
            {{$t('noPayRecords')}}
          </el-col>
        </el-row>
      </div>
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      list: [],
      showTip: true,
      dateBegin: '',
      dateEnd: ''
    }
  },
  created () {
    this.dateBegin = new Date()
  },
  mounted: function () {
    let vm = this
    vm.$http.post('/salary/h5/query_user_salary_count').then(
      function (result) {
        vm.list = result.data.list
        if (vm.list.length <= 0) {
          vm.showTip = false
        }
      }
    )
  },
  methods: {
    payMonthDetail (params) {
      let vm = this
      sessionStorage.setItem('params', JSON.stringify(params))
      vm.$router.push({ path: '/payDetailMonth' })
    },
    back () {
      history.back()
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
    MtaH5.clickStat('xgjym_fwsc', { 'paydetail': onlineTime })
  }
}
</script>
<style scoped>
.bordercolorSign {
  width: 2.5vw;
  border-top-color: rgb(50, 161, 200);
  border-top-style: solid;
  border-top-width: 20vw;
  margin-left: 1.5vw;
}
.bordercolorDob {
  width: 2.5vw;
  border-top-color: rgb(110, 215, 43);
  border-top-style: solid;
  border-top-width: 20vw;
  margin-left: 1.5vw;
}
.el-row-list {
  border: 1px solid #d9d9d9;
  border-left: 3vw solid #5077aa;
  height: 20vw;
  border-radius: 10px;
  background: #ffffff;
  margin: 5.4vw 5vw 2vw 3.5vw;
  color: #7e7c7c;
}
.year {
  color: #888888;
  font-size: 3.3vw;
  padding-top: 4vw;
}
.month {
  margin: 0;
  font-size: 6.4vw;
  vertical-align: top;
  line-height: 6vw;
}
</style>
