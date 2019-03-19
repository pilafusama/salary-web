<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">上传工资明细</el-col>
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
            <div v-if="userChangeFlag" class="tipStyle">人员变动摘要: {{recordDate}}离职{{userLeave}}人, 入职{{userComein}}人</div>
          </el-col>
          <el-col :span="6">
            <el-button style="text-align:center;height:2vw;font-size:1vw;width:7vw;margin-top: 1.5vw;" class="down-btn" @click="downLoadTemp()">下载文件</el-button>
          </el-col>
        </el-row>
        <el-row style="font-size: 0.5vw;">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" class="upload-demo" ref="upload" :show-file-list="false" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
            <img class="backImg" src="../assets/image/uoload_icon.png">
          </el-upload>
          <div class="uoloadTip">点击选择文件上传</div>
          <div class="xlsTip">支持扩展名: .xlsx格式</div>
        </el-row>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      userChangeFlag: false,
      userComein: 0,
      userLeave: 0,
      batch_no: '',
      uploadFlag: false,
      disabledFlag: false,
      month: '',
      recordDate: '',
      selDate: JSON.parse(sessionStorage.getItem('selDate')),
      files: '',
      fileName: '',
      upload_again: 'false',
      fileList: []
    }
  },
  mounted: function () {
    let vm = this
    vm.upload_again = JSON.parse(sessionStorage.getItem('upload_again'))
    if (vm.upload_again === 'true') {
      vm.batch_no = JSON.parse(sessionStorage.getItem('batch_no'))
      sessionStorage.setItem('upload_again', JSON.stringify('false'))
    }
    // 查询当月人员变动
    vm.$http.post('/salary/admin/get_user_change', { month: vm.selDate }).then(
      function (result) {
        sessionStorage.setItem('resultData', JSON.stringify(result.data))
        sessionStorage.setItem('recordDate', JSON.stringify(vm.recordDate))
        if (result.data.change === 'true') {
          vm.userChangeFlag = true
          vm.userComein = result.data.userComein
          vm.userLeave = result.data.userLeave
          var tempdate = JSON.parse(sessionStorage.getItem('selDate'))
          vm.recordDate = tempdate.toString().substring(0, 4) + '年' + tempdate.toString().substring(4, 6) + '月'
        }
      }
    )
  },
  methods: {
    beforeUpload (file) {
      let vm = this
      vm.fileName = file.name
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      }
      if (vm.fileName === '') {
        vm.$message.warning('请选择上传文件！')
        return false
      }
      vm.files = file
      const extension = file.name.split('.')[1] === 'xlsx'
      if (!extension) {
        const h = this.$createElement
        this.$msgbox({
          title: '',
          message: h('p', null, [
            h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '文件格式与公司发薪模板不符'),
            h('br'),
            h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '上传文件必须为Excel格式(*.xlsx)')
          ]),
          center: true,
          type: 'warning',
          customClass: 'message-box-warning',
          confirmButtonText: '确定',
          beforeClose: (action, instance, done) => {
            done()
          }
        })
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
          sessionStorage.setItem('selDate2', JSON.stringify(vm.selDate))
          sessionStorage.setItem('fileName', JSON.stringify(vm.fileName))
          sessionStorage.setItem('batch_no', JSON.stringify(res.data.batch_no))
          vm.$router.push({ path: '/uploadPageSure' })
        } else {
          const h = this.$createElement
          this.$msgbox({
            title: '',
            message: h('p', null, [
              h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '文件格式与公司发薪模板不符'),
              h('br'),
              h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '请按照下载的模板进行制表或核对所选附件是否正确')
            ]),
            center: true,
            type: 'warning',
            customClass: 'message-box-warning',
            confirmButtonText: '确定',
            beforeClose: (action, instance, done) => {
              done()
            }
          })
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
.backImg {
  width: 6vw;
  height: 6vw;
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
</style>
