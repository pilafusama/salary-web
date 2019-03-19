<template>
  <el-upload class="upload-demo" ref="upload" action="doUpload" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button type="primary" @click="submitUpload()">上传工资明细</el-button>
    <el-button type="primary" @click="downLoadTemp()">下载工资明细模板</el-button>
    <el-button type="success" @click="exportCsv()">txt导出</el-button>
    <el-button type="success" @click="exportExcel07()">Excel07导出</el-button>
    <el-button type="success" @click="exportExcel03()">Excel03导出</el-button>
    <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>
    <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
  </el-upload>
</template>
<script>
export default {
  data () {
    return {
      files: '',
      fileName: '',
      fileList: []
    }
  },
  methods: {
    beforeUpload (file) {
      this.files = file
      const extension = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension) {
        this.$message.warning('上传模板只能是 xlsx格式!')
        return
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return
      }
      this.fileName = file.name
      return false // 返回false不会自动上传
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
      vm.$http.post('/salary/admin/import_salary_chart?month=8', fileFormData, requestConfig).then((res) => {
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
        let fileName = '工资明细模板'
        let a = document.createElement('a')
        a.setAttribute('style', 'display:none')
        a.setAttribute('href', objectUrl)
        a.setAttribute('download', fileName)
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(objectUrl)
        a.remove()
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
      })
    },
    exportExcel07 () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=xlsx', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let objectUrl = URL.createObjectURL(blob)
        let fileName = '银企直连代发工资'
        let a = document.createElement('a')
        a.setAttribute('style', 'display:none')
        a.setAttribute('href', objectUrl)
        a.setAttribute('download', fileName)
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(objectUrl)
        a.remove()
      })
    },
    exportExcel03 () {
      let vm = this
      vm.$http.post('/salary/admin/export_salary_chart?format=xls', {}, { responseType: 'arraybuffer' }).then((res) => {
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        let objectUrl = URL.createObjectURL(blob)
        let fileName = '银企直连代发工资'
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
</style>
