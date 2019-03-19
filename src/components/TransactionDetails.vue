<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row style="margin-top: 1vh;">
        <el-col :span="12" class="el-col-dropdown1" style="line-height:6vh">
          <el-select v-model="smyCd" placeholder="请选择" @change="changeType">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="el-col-dropdown2" style="line-height:6vh">
          <el-select v-model="year" placeholder="请选择" @change="changeTime">
            <el-option v-for="item in totalYears" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div v-if="showTip">
        <el-row v-for="item in years" :key="item" style="color:#888888;font-size:4vw;text-align:left;line-height:6vh;background-color:#d9d9d9;padding:1vh 0 0 1vw">{{item}}
          <div v-for="son in thisYear" :key="son.value" v-if="son.year == item">
            <el-row style="color:black;padding:1vh 3vw 0 2vw;border-bottom: 1px solid rgb(217, 217, 217);border-top: 1px solid rgb(217, 217, 217);background-color:white;line-height:5vh;">
              <el-col :span="8" style="text-align:left">
                <el-row>{{son.smyCntnt}}</el-row>
                <el-row style="color:#888888;">{{son.time}}</el-row>
              </el-col>
              <el-col :span="16" style="text-align:right">{{son.depTxnAmt | formatMoneyAdd('Yes')}}</el-col>
            </el-row>
          </div>
        </el-row>
      </div>
      <div v-else>
        <el-row class="el-row-1">
          <el-col :span="24" style="float: center;text-align:center;color: #999999;">
            {{$t('msgTransaction')}}
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
      activeName: '1',
      params: JSON.parse(sessionStorage.getItem('params')),
      flag: JSON.parse(sessionStorage.getItem('flag')),
      /* eslint-disable */
      showTip: false,
      thisYear: [],
      totalYear: [],
      allSymYear: [],
      totalRecords: [],
      years: [],
      totalYears: [{
        value: 'all',
        label: '全部时间'
      }],
      options1: [
        { value: '0001', label: '备用金' },
        { value: '0002', label: '工资/奖金' },
        { value: '0003', label: '退休金' },
        { value: '0004', label: '养老金' },
        { value: '0005', label: '公积金' },
        { value: '0006', label: '津贴' },
        { value: '0250', label: '冲正' },
        { value: '0544', label: '跨行转出' },
        { value: '0457', label: '充值' },
        { value: '0240', label: '转账支取' },
        { value: '0251', label: '扣收年费' },
        { value: '0252', label: '调息' },
        { value: '0253', label: '没收' },
        { value: '0254', label: '过户' },
        { value: '0255', label: '预存' },
        { value: '0256', label: '补存' },
        { value: '0257', label: '电话转账' },
        { value: '0258', label: '代发工资' },
        { value: '0065', label: '自定义' }],
      smyCd: '',
      year: '',
      pageNum: 1
    }
  },
  mounted: function () {
    let vm = this
    //获取当年年份，及近三年年份
    var date = new Date()
    var thisYear = date.getFullYear()
    var lastYear = thisYear - 1
    var preThird = thisYear - 2
    this.totalYears.push({ value: thisYear, label: thisYear + '年' })
    this.totalYears.push({ value: lastYear, label: lastYear + '年' })
    this.totalYears.push({ value: preThird, label: preThird + '年' })
    //判断是否为薪资列表
    if (vm.flag == 'GZ') {
      vm.smyCd = '0258';
    }
    vm.reqDetail('')
    //监听滚动条是否到达最底端
    window.onscroll = function () {
      //滚动条距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      //滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        vm.pageNum = vm.pageNum + 1
        //查询记录
        var selYear = vm.year
        if (vm.year == "all") {
          selYear = ""
        }
        vm.reqDetail(selYear)

      }
    }

  },
  methods: {
    //发送明细请求到后台
    reqDetail (selYear) {
      //reqDetail (pageNum) {
      let vm = this
      this.$http.post('/salary/h5/query_account_transaction_detail', {        nbPageStart: vm.pageNum, smy_Cd: vm.smyCd, selYear: selYear,
        hstCrd_AfCrd_Ind: '0', seq_Fld_Ind: '1', ccyCd: '01', cshEx_Cd: '1', crd_Innr_Acc_CgyCd: '0101'      }).then(
        function (result) {
          if (result.data.primAccAcgDtl.length > 0) {
            vm.totalRecords = vm.totalRecords.concat(result.data.primAccAcgDtl)

            vm.totalRecords.forEach(element => {
              if (!vm.years.includes(element.year)) {
                vm.years.push(element.year);
              }
              element.time = element.txnMonth + '-' + element.txnDay + ' ' + element.txnTm;
              if (parseInt(element.depTxnAmt) > 0) {
                element.depTxnAmt = '+' + element.depTxnAmt;
              } else {
                element.depTxnAmt = element.depTxnAmt;
              }
            })
            if (vm.smyCd != '') {
              vm.thisYear = vm.totalRecords.filter(y => y.smyCd == vm.smyCd)
            } else {
              vm.thisYear = vm.totalRecords
            }
          }

          if (vm.thisYear.length > 0) {
            vm.showTip = true;
          } else {
            vm.showTip = false;
          }
        })
    },
    changeTime () {
      this.pageNum = 1
      this.totalRecords = []
      this.thisYear = []
      var selYear = this.year
      if (this.year == "all") {
        selYear = ""
      }
      this.reqDetail(selYear)
    },
    back () {
      history.back()
    },
    changeType () {
      this.pageNum = 1
      this.totalRecords = []
      this.thisYear = []
      var selYear = this.year
      if (this.year == "all") {
        selYear = ""
      }
      this.reqDetail(selYear)
    }
  }
}
</script>
<style>
.el-select-dropdown__item {
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  font-size: 4.5vw;
  color: #353535;
  letter-spacing: 0;
  text-align: left;
}
</style>
<style scoped>
div >>> .el-input__inner {
  font-family: PingFangSC-Regular;
  font-size: 4.5vw;
  color: #353535;
  letter-spacing: 0;
  text-align: center !important;
  border: none !important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  color: black;
}
.el-select:hover .el-input__inner {
  border-color: #c0c4cc;
  text-align: center;
}
.line {
  display: inline-block;
  width: 1px;
  height: 5vh;
  background: #ffffff;
}
</style>
