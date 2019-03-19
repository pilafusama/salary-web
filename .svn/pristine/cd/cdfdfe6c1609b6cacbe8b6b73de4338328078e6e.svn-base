<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;margin-right:1vw;height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">业务报表</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Regular;;color: #666666;margin-top:2vw;">明细反馈汇总表</el-col>
      </el-row>
      <el-row style="font-size: 0.5vw;padding-top:2vw;padding-bottom:2vw;">
        <el-col :span="24 ">
          <el-date-picker :picker-options="pickerOptions0" format="yyyy 年 MM 月" value-format="yyyyMM" @blur="changeMonth" v-model="selDateSure" type="month" placeholder="选择月份">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-table :row-class-name="tableRowClassName" :data="returnData" :header-row-class-name="headerStyle" style="width: 100%;margin:3vw 0vw;font-size:1vw !important;border-bottom: 0px solid #f3f3f3;">
        <el-table-column align="center" type="index" width="80px" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="username" label="姓名">
        </el-table-column>
        <el-table-column align="center" prop="userid" label="企业微信ID">
        </el-table-column>
        <el-table-column align="center" prop="batch_no" label="发薪批次">
        </el-table-column>
        <el-table-column align="center" prop="sure_state" label="是否确认">
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange" style="text-align: right;">
      </el-pagination>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 1,
      btnFlag: false,
      selDateSure: '',
      returnData: [],
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
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
    this.selDateSure = currentdate
    this.findByMonth(this.pageNum, this.pageSize)
  },
  methods: {
    handleCurrentChange (val) {
      this.findByMonth(val, this.pageSize)
    },
    changeMonth (selDateSure) {
      this.findByMonth(this.pageNum, this.pageSize)
    },
    findByMonth (pageNum, pageSize) {
      if (this.selDateSure !== '' && this.selDateSure !== null) {
        let vm = this
        vm.$http.post('/salary/admin/query_user_salary_confirm_state?month=' + vm.selDateSure, { pageNum: pageNum, pageSize: pageSize }).then((res) => {
          vm.returnData = res.data.pageInfo.list
          vm.total = res.data.pageInfo.total
        })
      }
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
    headerStyle ({ row, rowIndex }) {
      return 'header-style'
    }
  }
}
</script>
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #4a77ab;
  color: #fff;
}
.el-table th {
  background-color: #f3f3f3 !important;
  font-weight: normal;
  font-family: PingFangHK-Regular;
  font-size: 1.3vw;
  color: #000000;
  height: 3vw;
}
.el-table .warning-row {
  background: #fadcd9;
  font-family: PingFangHK-Regular;
  font-size: 1vw;
  color: #fa5a4b;
}
</style>
<style scoped>
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
.header-style {
  background: #0099ff;
}
</style>
