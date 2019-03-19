<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;">
        <el-row>
          <el-col :span="24 " style="font-size: 2.5vw;padding-left:9vw;margin-top:3vw;">{{$t('downPayExcel')}}</el-col>
        </el-row>
        <el-row class="el-row-88bg" style=" border-top: 1px solid #d9d9d9;">
          <el-col :span="24"></el-col>
        </el-row>
      <el-row>
        <el-col :span="24 " style="padding-left:10vw;padding-top:3vw;">{{$t('modelType')}}</el-col>
      </el-row>
      <el-row style="padding-bottom: 3vw;">
        <el-col :span="6" style="padding-left: 18%;"><img class="back" src="../assets/image/excel.png"></el-col>
        <el-col :span="3" style="margin-top: 4vw;">{{$t('excelType')}}</el-col>
        <el-col :span="6" style="padding-left: 18%;"><img class="back" src="../assets/image/txt.png"></el-col>
        <el-col :span="3" style="margin-top: 4vw;">{{$t('txtType')}}</el-col>
      </el-row>
      <el-row style="padding-top:0;padding-bottom: 3vw;">
        <el-col :span="6" style="padding-left: 18%;">
          <el-button style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn" @click="exportExcel03()">{{$t('btn_down')}}</el-button>
        </el-col>
        <el-col :span="6" style="padding-left: 30%;">
          <el-button style="margin: 0vw 2vw;font-size:1.5vw;line-height:2vw;" class="el-btn"  @click="exportCsv()">{{$t('btn_down')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
</style>
