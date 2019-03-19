<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">批量导入</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style="margin-right: 3vw;margin-bottom: 3vw;">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row style="font-size: 1vw;padding-bottom: 3vw;">
        <el-col style="width: 25vw;height: 35vw;text-align:center;">
          <div class="titlesize">
            <span style="color:#0099FF;margin-right:5px;">①</span>下载模板</div>
          <div class="sibian"><img @click="downLoadTemp()" class="backImg" src="../assets/image/excel_new.png"><br>
            <el-button style="margin: 1vw 2vw;font-size:1.5vw;line-height:2vw;width:8vw;" class="el-btn" @click="downLoadTemp()">下载</el-button>
          </div>
        </el-col>
        <el-col style="width: 25vw;height: 35vw;padding-left: 1.3vw;text-align:center;">
          <div class="titlesize">
            <span style="color:#0099FF;font-size:1.3vw;margin-right:5px;">②</span>文件上传</div>
          <div class="sibian">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" class="upload-demo" ref="upload" :limit="1" :auto-upload="false" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :file-list="fileList">
              <img class="backImg" src="../assets/image/excel_new.png"><br>
            </el-upload>
            <el-button style="margin: 1vw 2vw;font-size:1.5vw;line-height:2vw;width:8vw;" class="el-btn" @click="submitUpload()" :disabled="uploadFlag">上传</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      uploadFlag: false,
      disabledFlag: false,
      flag: true,
      counter: 0,
      month: '',
      salaryAll: 0,
      selDate: '',
      files: '',
      fileName: '',
      fileList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.files = file.raw
      const extension = file.name.split('.')[1] === 'xlsx'
      if (!extension) {
        const h = this.$createElement
        this.$msgbox({
          title: '',
          message: h('p', null, [
            h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '文件格式有误'),
            h('br'),
            h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '请检查附件是否与模板一致')
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
      this.fileName = file.name
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submitUpload () {
      let vm = this
      if (vm.fileName === '') {
        vm.$message.warning('请选择上传文件！')
        return false
      }
      let fileFormData = new FormData()
      fileFormData.append('file', vm.files, vm.fileName)
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      vm.$http.post('/salary/admin/import_salary_account_cmb_excel', fileFormData, requestConfig).then((res) => {
        if (res.data.retcode === '0') {
          vm.uploadFlag = true
          const h = vm.$createElement
          vm.$msgbox({
            title: '',
            message: h('p', null, [
              h('span', { style: 'font-family: PingFangHK-Regular;font-size: 1vw;color: #000000;' }, '信息导入成功'),
              h('br'),
              h('span', { style: 'font-family: PingFangHK-Regular;font-size: 0.9vw;color: #666666;' }, '附件上传成功')
            ]),
            center: true,
            type: 'success',
            customClass: 'message-box-warning',
            confirmButtonText: '确定',
            beforeClose: (action, instance, done) => {
              done()
            }
          })
        } else {
          vm.$message.error(res.data.errmsg)
        }
      })
    },
    downLoadTemp () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=tempCmb', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, '工资卡信息表.xlsx')
        } else {
          let objectUrl = URL.createObjectURL(blob)
          let fileName = '工资卡信息表.xlsx'
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
  padding: 5px 10px;
  background: #4a77ab;
  border-radius: 2px;
  color: #ffffff;
  border: 1px solid #4a77ab;
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
  height: 6vw;
  margin-top: 8vw;
  margin-bottom: 1vw;
}
.sibian {
  width: 25vw;
  height: 25vw;
  border: 1px solid #4a77ab;
  border-radius: 2px;
}
.titlesize {
  margin-bottom: 1vw;
  text-align: left;
  font-size: 1.2vw;
  color: #666666;
}
</style>
