<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">上传发薪明细表</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style="margin-right: 3vw;">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row style="font-size: 0.5vw;padding-top:2vw;padding-bottom:2vw;">
        <el-col :span="8 " class="datestyle">
          <el-date-picker format="yyyy 年 MM 月" value-format="yyyyMM" v-model="selDate" type="month" placeholder="选择月份">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row style="font-size: 1vw;padding-bottom: 3vw;width:75vw;height:70vh;background:#f8f9fb;text-align:center;">
        <el-row style="font-size: 0.5vw;background:#DEF0FF;height: 5vw;">
          <el-col :span="18" style="height:2vw;text-align:left;">
            <div class="warnImg">企业微信通讯录员工变动信息已同步至发薪表，点击下载文件可更新发薪表</div>
            <div v-if="userChangeFlag" class="tipStyle">人员变动摘要: {{recordDate}}离职{{resultData.userLeave}}人, 入职{{resultData.userComein}}人</div>
          </el-col>
          <el-col :span="6">
            <el-button style="text-align:center;height:2vw;font-size:1vw;width:7vw;margin-top: 1.5vw;" class="down-btn" @click="downLoadTemp()">下载文件</el-button>
          </el-col>
        </el-row>
        <el-row style="font-size: 0.5vw;height: 8vw;margin:3vw 0;">
          <div class="showImg">
            <div style="line-height: 3vw;text-align:left;">{{fileName}}</div>
            <div style="line-height: 1vw;text-align:left;font-size:1.1vw;color: #666666;">已上传
              <a @click="deleteFile()" style="color: #1A94FF;cursor: pointer;">删除</a>
            </div>
          </div>
        </el-row>
        <el-row style="font-size: 0.9vw;">
          <div class="sibian">
            <el-row class="info-style" style="text-align:center;padding-left:0;">摘要信息</el-row>
            <el-row class="el-row-88bg el-row-bline"></el-row>
            <el-row>
              <el-col :span="15" class="info-style">
                发薪总条数
              </el-col>
              <el-col :span="9" class="num-style">
                {{counter}}条
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15" class="info-style">
                应发总金额
              </el-col>
              <el-col :span="9" class="num-style">
                {{salarySum | formatMoneyPoint}}元
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15" class="info-style">
                实发总金额
              </el-col>
              <el-col :span="9" class="num-style">
                {{salaryAll | formatMoneyPoint}}元
              </el-col>
            </el-row>
            <el-row style="margin-top: 3vw;">
              <el-col :span=" 12 ">
                <el-button style="font-size:1.3vw;line-height:1.5vw;width:14vw;margin:2vw 0; " class="el-btn " @click="uploadAgain() " :disabled="disabledFlag ">重新上传</el-button>
              </el-col>
              <el-col :span="12 ">
                <el-button style="font-size:1.3vw;line-height:1.5vw;width:14vw;margin:2vw 0; " class="el-btn " @click="suresend() " :disabled="disabledFlag ">确认发送</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      dispearFlag: false,
      uploadFlag: false,
      disabledFlag: false,
      flag: true,
      counter: 0,
      salarySum: 0,
      salaryAll: 0,
      resultData: '',
      userChangeFlag: '',
      recordDate: '',
      selDate: '',
      batch_no: '',
      fileName: ''
    }
  },
  mounted: function () {
    let vm = this
    vm.resultData = JSON.parse(sessionStorage.getItem('resultData'))
    vm.userChangeFlag = JSON.parse(sessionStorage.getItem('resultData')).isChange
    vm.recordDate = JSON.parse(sessionStorage.getItem('recordDate'))
    vm.selDate = JSON.parse(sessionStorage.getItem('selDate2'))
    vm.batch_no = JSON.parse(sessionStorage.getItem('batch_no'))
    vm.fileName = JSON.parse(sessionStorage.getItem('fileName'))
    // 查询当月工资发放情况
    if (vm.selDate === '') {
      vm.$message.warning('请选择日期！')
      return false
    }
    vm.$http.post('/salary/admin/view_salary_all_detail', { month: vm.selDate, batch_no: vm.batch_no }).then(
      function (result) {
        vm.flag = false
        vm.counter = result.data.counter
        vm.salaryAll = result.data.salaryAll
        vm.salarySum = result.data.salarySum
      }
    )
  },
  methods: {
    deleteFile () {
      // 删除文件
      let vm = this
      vm.$http.post('/salary/admin/update_salary_over_view_for_batchno', { month: vm.selDate, batch_no: vm.batch_no }).then(
        function (result) {
          const h = vm.$createElement
          vm.$msgbox({
            title: '',
            message: h('p', null, [
              h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '删除成功')
            ]),
            center: true,
            // type: 'success',
            customClass: 'message-box-warning',
            confirmButtonText: '确定',
            beforeClose: (action, instance, done) => {
              done()
              vm.$router.push({ path: '/uploadPage' })
            }
          })
        }
      )
    },
    uploadAgain () {
      let vm = this
      sessionStorage.setItem('batch_no', JSON.stringify(vm.batch_no))
      sessionStorage.setItem('upload_again', JSON.stringify('true'))
      this.$router.push({ path: '/uploadPage' })
    },
    suresend () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      }
      vm.$http.post('/salary/admin/send_msg_to_notice_user', { month: vm.selDate, batch_no: vm.batch_no }).then(
        function (result) {
          if (result.data.retcode === '0') {
            vm.disabledFlag = true
            const h = vm.$createElement
            vm.$msgbox({
              title: '',
              message: h('p', null, [
                h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '薪资明细信息已发送给员工'),
                h('br'),
                h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '请前往“银行代发”提交付款申请')
              ]),
              center: true,
              type: 'success',
              customClass: 'message-box-warning',
              confirmButtonText: '确定',
              beforeClose: (action, instance, done) => {
                done()
                vm.$router.push({ path: '/downPage' })
              }
            })
          } else {
            vm.$message.error(result.data.errmsg)
          }
        }
      )
    },
    submitUpload () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      }
      if (vm.fileName === '') {
        vm.$message.warning('请选择上传文件！')
        return false
      }
      let fileFormData = new FormData()
      fileFormData.append('file', vm.files, vm.fileName)
      fileFormData.append('batch_no', vm.batch_no)
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      vm.$http.post('/salary/admin/import_defined_salary_detail_excel?month=' + vm.selDate, fileFormData, requestConfig).then((res) => {
        if (res.data.retcode === '0') {
          vm.uploadFlag = true
          vm.$message.success('上传成功！')
        } else {
          vm.$message.error(res.data.errmsg)
        }
      })
    },
    downLoadTemp () {
      let vm = this
      // this.$confirm('请确认是否已配置发薪表模板！').then(_ => {
      vm.$http.post('/salary/admin/export_salary_chart?format=tempDefinedDetail', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, '工资明细模板.xlsx')
        } else {
          let objectUrl = URL.createObjectURL(blob)
          let fileName = '工资明细模板.xlsx'
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
      // })
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
  box-shadow: 1px 2px 3px 0px #b9b9b96e;
  font-family: PingFangHK-Regular;
  font-size: 0.9vw;
  color: #000000;
  padding: 5px 10px;
  border-radius: 2px;
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
.imgTxt {
  width: 5vw;
  height: 5vw;
  margin-left: 10vw;
  float: left;
}
.backImg {
  width: 6vw;
  margin-top: 8vw;
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
.showImg {
  background: url('../assets/image/showExecl.png') no-repeat;
  background-size: 4vw;
  font-family: PingFangSC-Regular;
  font-size: 1.2vw;
  color: #000000;
  letter-spacing: 0;
  padding-left: 6vw;
  text-align: center;
  line-height: 8vw;
  height: 10vw;
  margin: 1vw 28vw;
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
  width: 30vw;
  height: 11vw;
  border-radius: 2px;
  background: #ffffff;
  margin-left: 22vw;
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
