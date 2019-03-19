<template>
  <el-tabs :tab-position="tabPosition" style="height: 100vh;">
    <el-tab-pane label="薪资明细">
      <template>
        <el-container>
          <el-form style="font-size: 1.5vw;text-align: left;color:black;">
            <el-row>
              <el-col :span="24 " style="font-size: 2.5vw;padding-left:5vw;margin-top:3vw;">上传发薪明细表</el-col>
            </el-row>
            <el-row class="el-row-88bg" style=" border-top: 1px solid #d9d9d9;">
              <el-col :span="24"></el-col>
            </el-row>
            <el-row style="font-size: 0.5vw;padding-left:9vw;padding-top:3vw;">
              <el-col :span="24 ">
                <el-date-picker format="yyyy 年 MM 月" value-format="yyyyMM" v-model="selDate" type="month" placeholder="选择月份">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="padding-bottom: 3vw;">
              <el-col :span="6" style="padding-left: 10%;">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" ref="upload" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
                  <div class="el-upload__text">将文件拖到此处</div>
                  <img class="imgTxt" src="../assets/image/excel_2.png">
                </el-upload>
              </el-col>
            </el-row>
            <el-row style="padding-top:0;padding-bottom: 3vw;">
              <el-col :span="6" style="padding-left: 5%;">
                <el-button style="width:15vw;margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="downLoadTemp()">下载模板</el-button>
              </el-col>
              <el-col :span="6">
                <el-button :disabled="disabledFlag" style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="submitUpload()">上传发薪明细表</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-container>
      </template>
    </el-tab-pane>
    <el-tab-pane label="发薪表管理" style="font-size: 2.5vw;">
      <template>
        <el-container>
          <el-form style="font-size: 1.5vw;text-align: left;color:black;">
            <el-row>
              <el-col :span="24 " style="font-size: 2.5vw;padding-left:5vw;margin-top:3vw;">下载发薪明细表</el-col>
            </el-row>
            <el-row class="el-row-88bg" style=" border-top: 1px solid #d9d9d9;">
              <el-col :span="24"></el-col>
            </el-row>
            <el-row>
              <el-col :span="24 " style="padding-left:7vw;padding-top:3vw;">模板类型</el-col>
            </el-row>
            <el-row style="padding-bottom: 3vw;">
              <el-col :span="6" style="padding-left: 18%;"><img class="back" src="../assets/image/excel.png"></el-col>
              <el-col :span="3" style="margin-top: 4vw;margin-left:3vw;">excel格式，适用于企业网银发薪</el-col>
              <el-col :span="6" style="padding-left: 18%;"><img class="back" src="../assets/image/txt.png"></el-col>
              <el-col :span="3" style="margin-top: 4vw;margin-left:3vw;">txt格式，适用于企业网银发薪</el-col>
            </el-row>
            <el-row style="padding-top:0;padding-bottom: 3vw;">
              <el-col :span="12" style="padding-left: 18%;">
                <el-button style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;width:10vw;" class="el-btn" @click="exportExcel03()">下载</el-button>
              </el-col>
              <el-col :span="12" style="padding-left: 10%;">
                <el-button v-bind:class="{'el-btn-blue':btnFlag}" style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="exportCsv()">下载模板</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-container>
      </template>
    </el-tab-pane>
    <el-tab-pane label="业务报表">
      <template>
        <el-container>
          <el-form style="font-size: 1.5vw;text-align: left;color:black;">
            <el-row>
              <el-col :span="24 " style="font-size: 2.5vw;padding-left:5vw;margin-top:3vw;">明细反馈汇总表</el-col>
            </el-row>
            <el-row class="el-row-88bg" style=" border-top: 1px solid #d9d9d9;">
              <el-col :span="24"></el-col>
            </el-row>
            <el-row style="font-size: 0.5vw;padding-left:5vw;padding-top:3vw;">
              <el-col :span="24 ">
                <el-date-picker format="yyyy 年 MM 月" value-format="yyyyMM" @change="findByMonth" v-model="selDateSure" type="month" placeholder="选择月份">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-table :row-class-name="tableRowClassName" :data="returnData" border style="width: 80%;margin:5vw 5vw;">
              <el-table-column align="center" type="index" width="60px" label="序号">
              </el-table-column>
              <el-table-column align="center" prop="username" label="姓名">
              </el-table-column>
              <el-table-column align="center" prop="userid" label="企业微信ID">
              </el-table-column>
              <el-table-column align="center" prop="sure_state" label="是否确认">
              </el-table-column>
            </el-table>
          </el-form>
        </el-container>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      btnFlag: false,
      disabledFlag: true,
      tabPosition: 'left',
      selDate: '',
      selDateSure: '',
      files: '',
      fileName: '',
      fileList: [],
      returnData: []
    }
  },
  methods: {
    findByMonth () {
      let vm = this
      vm.$http.post('/salary/admin/query_salary_confirm_state?month=' + vm.selDateSure).then((res) => {
        vm.returnData = res.data.list
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.sure_state === 'NO') {
        row.sure_state = '否'
      } else if (row.sure_state === 'YES') {
        row.sure_state = '是'
      }
      if (row.sure_state === '否') {
        return 'warning-row'
      }
      return ''
    },
    beforeUpload (file) {
      this.files = file
      const extension = file.name.split('.')[1] === 'xlsx'
      if (!extension) {
        this.$message.warning('上传模板只能是 xlsx格式!')
        return false
      }
      this.disabledFlag = false
      this.fileName = file.name
      return false // 返回false不会自动上传
    },
    submitUpload () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择月份！')
        return false
      }
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
      vm.$http.post('/salary/admin/import_salary_chart?month=' + vm.selDate, fileFormData, requestConfig).then((res) => {
        vm.btnFlag = true
        if (res.data.retcode === '0') {
          vm.$message.success('上传成功！')
        } else {
          vm.$message.error(res.data.errmsg)
        }
      })
    },
    downLoadTemp () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=temp', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
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
        vm.btnFlag = true
      })
    },
    exportExcel03 () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=xls', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
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
        vm.btnFlag = true
      })
    },
    exportCsv () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=vbsv', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'text/csv;chartset=UTF-8' })
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
        vm.btnFlag = true
      })
    }
  }
}
</script>
<style scoped>
div >>> .el-table .warning-row {
  color: red;
}
div >>> .el-btn:focus,
.el-btn:hover {
  background-color: #2f7dcd;
  color: #ffffff;
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
  font-size: 2vw;
  line-height: 4vw;
  height: 4vw;
  border: 1px solid #dcdfe6;
}
div >>> .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 4vw;
  font-size: 2.5vw;
}
div >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 30vw;
}
div >>> .el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 15vw;
  height: 15vw;
  line-height: 146px;
  vertical-align: top;
}
.imgTxt {
  width: 3vw;
  height: 3vw;
  margin-left: 6vw;
  float: left;
  margin-top: -10vw;
}
.el-upload__text {
  font-size: 1vw;
  font-family: PingFang-SC-Bold;
  color: #999999;
  margin-top: 4vw;
}
div >>> .el-tabs__active-bar {
  background-color: #e4e7ed;
}
</style>
