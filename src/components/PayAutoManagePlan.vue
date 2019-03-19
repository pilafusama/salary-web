<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-1" style="margin:5.4vw 4vw 1.6vw;">
        <el-col :span="24" class="el-col-text" style="text-align: left;font-size:4vw;">{{$t('placeSetMoney')}}</el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="4" class="el-col-left" style="margin-top:0.5vh;padding-left:1.6vw;margin-bottom:5vw;font-size: 8.6vw;">￥</el-col>
        <el-col :span="20" class="el-col-title">
          <el-input type="Number" v-model="show_tran_amt" v-on:blur="formatAmunt" maxlength="10" @focus="getOldAmount" onkeypress="return (event.keyCode>=48&&event.keyCode<=57) || event.keyCode==190 || event.keyCode==46"></el-input>
        </el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5.4vw;"></el-col>
      </el-row>
      <el-row class="el-row-1" style="height:16vw">
        <el-col :span="6" class="el-col-text" style="line-height:8vw">{{$t('turnOnPro')}}</el-col>
        <el-col :span="14" class="el-col-text" style="text-align:left;margin-left:5vw;line-height:8vw">
          <span style="font-size:4.6vw;color:#000000">嘉实基金宝</span><br>
          <span style="font-size:3.8vw;">近7日年化3.9180%</span>
        </el-col>
        <el-col :span="2" class="el-col-text" style="text-align:right;line-height:8vw"><img class="enterIcon" src="../assets/image/into.png"></el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1" @click.native="showFlag=true">
        <el-col :span="6" class="el-col-text" style="line-height:10vw">{{$t('turnOnDate')}}</el-col>
        <el-col :span="14" class="el-col-text" style="text-align:left;margin-left:5vw;color:#000000;line-height:10vw">
          <span v-if="ftran_cycle=='01'">每月{{ftran_date}}号</span>
          <span v-else-if="ftran_cycle=='02'">每季{{ftran_date}}号</span>
          <span v-else-if="ftran_cycle=='03'">每年{{ftran_date}}号</span>
        </el-col>
        <el-col :span="2" class="el-col-text" style="text-align:right;line-height:10vw"><img class="enterIcon" src="../assets/image/into.png"></el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-dialog title="请选择自动转入周期" :visible.sync="showFlag" width="100%">
        <div v-for="son in options1" :key="son.value">
          <el-row class="el-row-radio">
            <el-col :span="24" class="el-col-radio">
              <el-radio v-model="intoPeriod" :label="son.value">{{son.label}}</el-radio>
            </el-col>
          </el-row>
        </div><br>
        <el-row>
          <el-col :span="24">
            <el-button @click="selectCircle" class="el-btn-confirm">{{$t('btn_confirm')}}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-row class="el-row-88bg">
        <el-col :span="24" style="height: 5.4vw;"></el-col>
      </el-row>
      <el-row class="el-row-88bg" style="height:8vw">
        <el-col :span="2" class="el-col-text" style="text-align:right;margin-right:3vw;">
          <el-checkbox v-model="checked"></el-checkbox>
        </el-col>
        <el-col :span="18" class="el-col-text" style="text-align:left;font-size:3.5vw;line-height:8vw;">
          {{$t('IMAgree')}}
          <a href="/" class="a">{{$t('seviceRule')}}</a>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="submit" style="margin-top: 8vw;width:92%" class="el-btn" :disabled="!checked || (tran_amt == '')">{{$t('btn_submit')}}</el-button>
  </el-container>
</template>
<script>
import vFilter from '../common/js/common.js'
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      plan: JSON.parse(sessionStorage.getItem('plan')),
      showFlag: false,
      disabledFlag: false,
      submitFlag: false,
      financial_plan_id: '',
      tran_amt: '',
      show_tran_amt: '',
      checked: false,
      ftran_cycle: '',
      ftran_date: '',
      intoPeriod: '',
      options1: [
        // { value: '0001', label: '薪资到账后' },
        { value: '011', label: '每月1号' },
        { value: '015', label: '每月5号' },
        { value: '0110', label: '每月10号' },
        { value: '0115', label: '每月15号' },
        { value: '0120', label: '每月20号' },
        { value: '0125', label: '每月25号' },
        { value: '0130', label: '每月30号' }]
    }
  },
  mounted: function () {
    let vm = this
    // 修改工资计划
    if (vm.plan != null && vm.plan !== '') {
      vm.financial_plan_id = vm.plan.ffinancial_plan_id
      vm.tran_amt = vFilter.unformatMoney(vm.plan.ftran_amt)
      vm.show_tran_amt = vFilter.formatMoney(vm.plan.ftran_amt, 'Yes')
      vm.ftran_cycle = vm.plan.ftran_cycle
      vm.ftran_date = vm.plan.ftran_date
    } else {
      vm.financial_plan_id = ''
      vm.tran_amt = ''
      vm.show_tran_amt = ''
      vm.ftran_cycle = '01'
      vm.ftran_date = '15'
    }
  },
  methods: {
    submit () {
      let vm = this
      if (vm.submitFlag) {
        var params = { financial_plan_id: vm.financial_plan_id, tran_cycle: vm.ftran_cycle, tran_date: vm.ftran_date, tran_prod: '嘉实基金宝', tran_amt: vm.tran_amt }
        sessionStorage.setItem('params', JSON.stringify(params))
        vm.$router.push({ path: '/payAutoManagePlanSure' })
      }
    },
    back () {
      history.back()
    },
    getOldAmount () {
      this.show_tran_amt = this.tran_amt
    },
    formatAmunt () {
      if (this.show_tran_amt === '') {
        this.submitFlag = false
      } else {
        this.tran_amt = vFilter.unformatMoney(this.show_tran_amt)
        this.show_tran_amt = vFilter.formatMoney(this.tran_amt, 'Yes')
        if (Number(this.tran_amt) >= 0.01) {
          this.submitFlag = true
        } else {
          this.$message({
            message: '金额大于等于0.01！',
            type: 'error'
          })
          this.submitFlag = false
        }
      }
    },
    selectCircle () {
      if (this.intoPeriod !== '') {
        this.ftran_cycle = this.intoPeriod.substr(0, 2)
        this.ftran_date = this.intoPeriod.substr(2, 2)
      }
      this.showFlag = false
    }
  }
  // watch: {
  //   tran_amt: {
  //     handler: function (val) {
  //       if (val) {
  //         this.submitFlag = true
  //       }
  //     }
  //   }
  // }
}
</script>
<style>
.el-checkbox__inner {
  width: 3.2vw;
  height: 3.2vw;
}
</style>
<style scoped>
.el-col-text {
  font-family: PingFangHK-Regular;
  font-size: 4.6vw;
  color: #888888;
  letter-spacing: 0;
}
.a {
  color: #0101fd;
  text-decoration: none;
}
.el-btn-confirm {
  padding: 2vw 5vw;
  margin: 0;
  background-color: #2f7dcd;
  color: #ffffff;
  font-family: PingFang-SC-Bold;
  border-radius: 5px;
}
.el-row-confirm {
  padding: 4vw 0 4vw 10vw;
  border-top: 1px solid #e1dfda;
  border-bottom: 1px solid #e1dfda;
  font-size: 4vw;
  color: #888888;
}
.el-row-radio {
  padding: 4vw 0;
  margin: 0 5vw;
  border-bottom: 1px solid #bbbbbb;
}
.el-col-radio {
  text-align: left;
  font-size: 4vw;
}
div >>> .el-dialog__header {
  background-color: inherit;
  padding: 2vh 0;
  border-bottom: solid 1px #bbbbbb;
}
div >>> .el-dialog__title {
  color: #888888;
  font-size: 4vw;
}
div >>> .el-dialog__body {
  background-color: inherit;
  padding: 2vh 3vh;
}
div >>> .el-radio__inner {
  border: solid 1px #888888;
}
.splitLine1 {
  margin: 0;
}
</style>
