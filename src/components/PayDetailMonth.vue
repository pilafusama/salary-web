<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row>
        <el-col :span="24">
          <el-collapse>
            <el-collapse-item name="1">
              <template slot="title">
                <el-row style="width:100%;">
                  <!-- <el-col :span="2">
                    <img style="float: right;width:6vw;margin-top: 3vw;" src="../assets/image/salary.png" /></el-col> -->
                  <el-col :span="12" class="el-col-header-left">{{$t('PM_shouldSum')}}</el-col>
                  <el-col :span="9" class="el-col-header-right">{{params.total_pre_tax_wages | formatMoneyPoint}}元</el-col>
                </el-row>
              </template>
              <hr class="hr">
              <el-row v-for="item in salaryList" :key="item.salary_detail_id" style="padding:1.6vw 4vw 0 4vw;">
                <el-col :span="10" class="el-col-10" style="text-align: left;font-size: 3.2vw;">{{item.detail_name}}</el-col>
                <el-col :span="14" class="el-col-10">{{item.detail_amount | formatMoneyPoint}}元</el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="height:5.4vw;background:#F5F5F5"></el-collapse>
          <el-collapse>
            <el-collapse-item name="1">
              <template slot="title">
                <el-row style="width:100%;">
                  <!-- <el-col :span="2">
                    <img style="float: right;width:6vw;margin-top: 10vw;" src="../assets/image/insurance.png" /></el-col> -->
                  <el-col :span="12" class="el-col-header-left">应扣金额</el-col>
                  <el-col :span="9" class="el-col-header-right">{{params.total_pre_tax_wages-params.actual_amount | formatMoneyPoint}}元</el-col>
                </el-row>
              </template>
              <hr class="hr">
              <el-row v-for="item in deductionList" :key="item.salary_detail_id" style="padding:1.6vw 4vw 0 4vw;">
                <el-col :span="10" class="el-col-10" style="text-align: left;font-size: 3.2vw;">{{item.detail_name}}</el-col>
                <el-col :span="14" class="el-col-10">{{item.detail_amount | formatMoneyPoint}}元</el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="height:5.4vw;background:#F5F5F5"></el-collapse>
          <el-row>
            <!-- <el-col :span="2">
              <img style="float: right;width:6vw;margin-top: 4.5vw;" src="../assets/image/sum.png" /></el-col> -->
            <el-col :span="12" style="text-align: left;line-height:14vw;padding-left: 4vw;;color:#333333;">{{$t('PM_factual_amount')}}</el-col>
            <el-col :span="10" class="el-row-col-right">
              {{params.actual_amount | formatMoneyPoint}}元
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div class="el-msg">
      <div>说明：</div>
      <div>1. 实发工资=当月出勤工资+当月绩效工资-医疗保险(个人)-养老保险(个人)-失业保险(个人)-住房公积金(个人)-个人所得税</div>
      <div style="padding-top: 2vw;">2. 薪资金额如有争议，请您在收到信息15个工作日内提交
        <a style="color: #0101fd;">争议处理</a>，HR同事将会主动与您联系
      </div>
    </div>
    <el-button :disabled="disabledFlag" @click="backPayDetail" class="el-btn" style="margin-top:8vw">{{$t('btn_sure')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      disabledFlag: false,
      params: JSON.parse(sessionStorage.getItem('params')),
      deductionList: [],
      salaryList: []
    }
  },
  mounted: function () {
    let vm = this
    vm.$http.post('/salary/h5/query_user_salary_detail', { month: vm.params.month, batch_no: vm.params.batch_no }).then(
      function (result) {
        vm.deductionList = result.data.deductionlist
        vm.salaryList = result.data.salarylist
        if (result.data.is_read === 'YES') {
          vm.disabledFlag = true
        }
      }
    )
  },
  methods: {
    backPayDetail () {
      let vm = this
      vm.$http.post('/salary/h5/update_user_salary_detail_state', { month: vm.params.month, batch_no: vm.params.batch_no }).then(
        function (result) {
          vm.$router.push({ path: '/payDetail' })
        }
      )
    },
    back () {
      history.back()
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
  height: 14vw;
  line-height: 14vw;
}
div >>> .el-icon-arrow-right {
  height: 14vw;
  line-height: 14vw;
  /* padding-left: 4vw; */
  padding-right: 4vw;
  vertical-align: middle;
  margin: 0;
}
</style>
<style scoped>
.el-col-10 {
  font-family: PingFangHK-Regular;
  font-size: 3.2vw;
  color: #888888;
  letter-spacing: 0;
  text-align: right;
  margin: 0;
  padding: 0;
}
.el-msg {
  text-align: left;
  line-height: 5vw;
  font-size: 3.5vw;
  font-family: PingFang-SC-Medium;
  color: #717171;
  padding: 5.4vw 4vw;
}
.el-col-header-left {
  text-align: left;
  padding-left: 4vw;
  font-size: 4.3vw;
  color: #000000;
}
.el-col-header-right {
  text-align: right;
  font-size: 4.8vw;
  margin: 0;
  color: #f9a827;
}
.hr {
  border-color: #e5e5e5;
  margin: 0 0 0 4vw;
}
.el-row-col-right {
  font-size: 4.8vw;
  font-family: PingFangHK-Regular;
  height: 14vw;
  line-height: 14vw;
  color: #f9a827;
  text-align: right;
}
</style>
