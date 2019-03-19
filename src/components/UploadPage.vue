<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;">
      <el-row>
        <el-col :span="24 " style="font-size: 2.5vw;padding-left:5vw;margin-top:3vw;">{{$t('uploadPayDetail')}}</el-col>
      </el-row>
      <el-row class="el-row-88bg" style=" border-top: 1px solid #d9d9d9;">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row style="font-size: 1vw;padding-left:10vw;padding-top:3vw;">
        <el-col :span="24 ">
          <el-date-picker
            format="yyyy 年 MM 月"
            value-format="yyyyMM"
            v-model="selDate"
            type="month"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row style="padding-bottom: 3vw;">
        <el-col :span="6" style="padding-left: 10%;">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            ref="upload"
            :limit="1"
            :file-list="fileList"
            :before-upload="beforeUpload">
            <img class="imgTxt" src="../assets/image/excel_2.png">
            </el-upload>
        </el-col>
      </el-row>
      <el-row style="padding-top:0;padding-bottom: 3vw;">
        <el-col :span="6" style="padding-left: 5%;">
          <el-button style="width:15vw;margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="downLoadTemp()">{{$t('btn_downModel')}}</el-button>
        </el-col>
        <el-col :span="6">
          <el-button style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="submitUpload()">{{$t('uploadPayDetail')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      selDate: '',
      files: '',
      fileName: '',
      fileList: []
    }
  },
  methods: {
    beforeUpload (file) {
      this.files = file
      const extension = file.name.split('.')[1] === 'xlsx'
      if (!extension) {
        this.$message.warning('上传模板只能是 xlsx格式!')
        return
      }
      this.fileName = file.name
      return false // 返回false不会自动上传
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
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      vm.$http.post('/salary/admin/import_salary_chart?month=' + vm.selDate, fileFormData, requestConfig).then((res) => {
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
      })
    }
  }
}
</script>
<style scoped>
div >>> .el-input__inner {
    padding-left: 50px;
    border: 0;
    text-align: left !important;
    font-size: 2.5vw;
    line-height: 4vw;
    height: 4vw;
    border: 1px solid #dcdfe6;
}
div >>> .el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 40px;
    font-size: 3vw;
}
div >>> .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 30vw;
}
div >>> .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 30vw;
    height: 30vw;
    line-height: 146px;
    vertical-align: top;
}
.imgTxt {
  width: 5vw;
  height: 5vw;
  margin-left: 12vw;
  float: left;
  margin-top: 12vw;
}
</style>
