<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">银行代发</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style="margin-right: 3vw;">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row style="font-size: 0.5vw;padding-top:2vw;padding-bottom:2vw;">
        <el-col :span="8 " class="datestyle">
          <el-date-picker format="yyyy 年 MM 月" value-format="yyyyMM" v-model="selDate" @blur="changeMonth" type="month" placeholder="选择月份">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row style="font-size: 1vw;padding-bottom: 3vw;width:75vw;height:70vh;text-align:center;">
        <el-row style="font-size: 0.5vw;background:#DEF0FF;height: 3.5vw;">
          <el-col :span="24" style="height:2vw;text-align:left;">
            <div class="warnImg">请选择所需的发薪文件下载后，通过合作银行提供的支付工具提交薪资代发指令</div>
          </el-col>
        </el-row>
        <el-row style="font-size: 0.5vw;">
          <el-table :data="returnData" style="margin-bottom:3vw;width: 100%;font-size:1vw !important;border-bottom: 0px dashed #f3f3f3;">
            <el-table-column align="center" type="index" width="80px" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="month" label="日期">
            </el-table-column>
            <el-table-column align="center" prop="create_time" label="生成时间">
            </el-table-column>
            <el-table-column align="center" prop="counter" label="发薪人数">
            </el-table-column>
            <el-table-column align="center" prop="salaryAll" label="实发金额">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a v-if="zsFlag" style="color: #1A94FF;cursor: pointer;" @click="downFile(scope.row,selDate)">下载文件</a>
                <a v-else style="color: #1A94FF;cursor: pointer;" @click="commitPay(scope.row,selDate) ">提交网银付款</a>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>
      <el-dialog :visible.sync="dialogVisible1" placement="right" width="50vw" height="50vw" trigger="click">
        <el-row style="font-size: 1vw;padding: 5vw 0;">
          <el-col :span="9" style="margin-left:3vw;text-align:center;">
            <div class="sibian"><img @click="exportExcel03()" class="backImg" src="../assets/image/excel_new.png"><br>适用于网银发薪</div>
          </el-col>
          <el-col :span="9" style="margin-left:4vw;text-align:center;">
            <div class="sibian"><img @click="exportCsv()" class="backImg" src="../assets/image/text_new.png"><br> 适用于银企直联发薪</div>
          </el-col>
        </el-row>
      </el-dialog>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // returnData: [{
      //   username: '2018-12',
      //   userid: '2018-12-02',
      //   batch_no: '600',
      //   sure_state: 6000000
      // }],
      returnData: [],
      dialogVisible1: false,
      zsFlag: true,
      batch_no: '',
      dispearFlag: false,
      uploadFlag: false,
      disabledFlag: false,
      flag: true,
      counter: 0,
      month: '',
      salaryAll: 0,
      selDate: '',
      batchNo: '',
      payDate: ''
    }
  },
  mounted: function () {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    var currentdate = year + '' + month
    this.selDate = currentdate
    // 查询银行代发记录
    let vm = this
    // 如果是招商行显示提交网银付款
    if (JSON.parse(sessionStorage.getItem('authenBankName')) === 'CMB') {
      vm.zsFlag = false
      // 查询是否已经配置网银
    }
    this.init(vm.selDate)
  },
  methods: {
    changeMonth () {
      this.init(this.selDate)
    },
    init () {
      let vm = this
      vm.$http.post('/salary/admin/salary_overe_view_list', { month: vm.selDate }).then(
        function (result) {
          vm.returnData = result.data.viewSalaryAllDetails
        }
      )
    },
    downFile (row, selDate) {
      let vm = this
      vm.dialogVisible1 = true
      vm.batchNo = row.batch_no
      vm.payDate = selDate
    },
    commitPay (row, selDate) {
      let vm = this
      vm.$http.post('/salary/admin/query_auth_status', {}).then(
        function (result2) {
          if (result2.data.stateFlag !== '0') {
            vm.$router.push({ path: '/DirectBanking' })
          } else {
            vm.$http.post('/salary/admin/send_salaryinfo_to_bank', { month: selDate, batch_no: row.batch_no }).then(
              function (result) {
                // 暂不做处理
                const h = vm.$createElement
                vm.$msgbox({
                  title: '',
                  message: h('p', null, [
                    h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '提交成功'),
                    h('br'),
                    h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '网银付款提交成功')
                  ]),
                  center: true,
                  type: 'success',
                  customClass: 'message-box-warning',
                  confirmButtonText: '确定',
                  beforeClose: (action, instance, done) => {
                    done()
                  }
                })
              }
            )
          }
        }
      )
    },
    exportExcel03 () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      }
      vm.$http.post('/salary/admin/export_salary_chart?format=xls', { month: vm.payDate, batch_no: vm.batchNo }, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, '银企直连代发工资.xls')
        } else {
          let objectUrl = URL.createObjectURL(blob)
          let fileName = '银企直连代发工资.xls'
          let a = document.createElement('a')
          a.setAttribute('style', 'display:none')
          a.setAttribute('href', objectUrl)
          a.setAttribute('download', fileName)
          document.body.appendChild(a)
          a.click()
          URL.revokeObjectURL(objectUrl)
          a.remove()
        }
      })
    },
    exportCsv () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      }
      vm.$http.post('/salary/admin/export_salary_chart?format=vbsv', { month: vm.payDate, batch_no: vm.batchNo }, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'text/csv;chartset=UTF-8' })
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, '银企直连代发工资.txt')
        } else {
          let objectUrl = URL.createObjectURL(blob)
          let fileName = '银企直连代发工资.txt'
          let a = document.createElement('a')
          a.setAttribute('style', 'display:none')
          a.setAttribute('href', objectUrl)
          a.setAttribute('download', fileName)
          document.body.appendChild(a)
          a.click()
          URL.revokeObjectURL(objectUrl)
          a.remove()
        }
      })
    }
  }
}
</script>
<style>
.el-message-box__message p {
  font-size: 14px;
}
.message-box-warning .el-message-box__status {
  font-size: 2.5vw !important;
}
.message-box-warning .el-button--small,
.el-button--small.is-round {
  width: 6vw;
  height: 2vw;
  line-height: 2vw;
  font-size: 0.9vw;
  padding: 0 0;
}
</style>
<style scoped>
div >>> .el-button {
  background: #ffffff;
  font-family: PingFangHK-Regular;
  font-size: 0.9vw;
  color: #1a94ff;
  padding: 5px 10px;
  border: 0;
}
div >>> .el-btn:focus,
.el-btn:hover {
  background-color: #2f7dcd;
  color: #ffffff;
  line-height: 7vw;
  font-size: 5.5vw;
  font-family: PingFang-SC-Bold;
  margin: 6vw 5vw;
  border-radius: 2px;
}
div >>> .el-btn:disabled {
  background-color: white !important;
  color: #0099ff;
  line-height: 7vw;
  font-size: 5.5vw;
  font-family: PingFang-SC-Bold;
  margin: 6vw 5vw;
  border-radius: 8px;
}
.el-btn-blue {
  color: #ffffff;
  border-color: #2f7dcd;
  background-color: #2f7dcd;
}
div >>> .el-tabs__item.is-left {
  text-align: right;
  font-size: 1.5vw;
  margin-top: 2.5vw;
}
div >>> .el-input__inner {
  padding-left: 50px;
  border: 0;
  text-align: left !important;
  font-size: 1.1vw;
  line-height: 2.6vw;
  height: 2.6vw;
  border: 1px solid #dcdfe6;
}
div >>> .el-input__icon {
  height: 100%;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 2.6vw;
  font-size: 2vw;
}
div >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 18vw;
}
div >>> .el-upload--picture-card {
  background-color: #ffffff;
  border: 0px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 25vw;
  height: 25vw;
  line-height: 146px;
  vertical-align: top;
}
div >>> .el-upload-list__item {
  font-size: 1.2vw;
}
div >>> .el-table th {
  background-color: #f8f9fb !important;
  font-weight: normal;
  font-family: PingFangHK-Regular;
  font-size: 1.1vw;
  color: #000000;
  height: 3vw;
}
.imgTxt {
  width: 5vw;
  height: 5vw;
  margin-left: 10vw;
  float: left;
}
.backImg {
  width: 6vw;
  height: 6vw;
  margin-top: 6vw;
  margin-bottom: 1vw;
}
.warnImg {
  background: url('../assets/image/warn_icon.png') no-repeat;
  background-size: 1.5vw;
  height: 2vw;
  margin: 1vw 0 0 1vw;
  font-family: PingFangSC-Regular;
  font-size: 1.2vw;
  color: #1a94ff;
  letter-spacing: 0;
  padding-left: 2vw;
}
.tipStyle {
  font-size: 1.1vw;
  color: #666666;
  background-size: 1.5vw;
  height: 2.5vw;
  margin: 0 0 1vw 1vw;
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
  padding-left: 2vw;
}
.uoloadTip {
  font-size: 1.2vw;
  background-size: 1.5vw;
  height: 2.5vw;
  letter-spacing: 0;
  font-family: PingFangHK-Regular;
  color: #000000;
}
.xlsTip {
  font-size: 1.1vw;
  color: #666666;
  background-size: 1.5vw;
  height: 2.5vw;
  font-family: PingFangHK-Regular;
  letter-spacing: 0;
}
.sibian {
  width: 20vw;
  height: 20vw;
  border-radius: 2px;
  background: #ffffff;
  border: 1px solid #4a77ab;
}
.info-style {
  font-size: 1.1vw;
  height: 2.5vw;
  line-height: 2.5vw;
  font-family: PingFangHK-Regular;
  color: #666666;
  text-align: left;
  padding-left: 2vw;
}
.num-style {
  font-size: 1.1vw;
  height: 2.5vw;
  line-height: 2.5vw;
  text-align: left;
  font-family: PingFangHK-Regular;
  color: #4a77ab;
}
.titlesize {
  margin-bottom: 1vw;
  text-align: left;
  font-size: 1.2vw;
  color: #666666;
}
</style>
