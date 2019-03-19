<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: left;color:black;margin-right:1vw;height: 96.5vh !important;">
      <el-row>
        <el-col :span="12 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">工资卡信息维护</el-col>
        <el-col :span="12 " style="text-align:right;">
          <el-button class="addButton " type="primary " @click="importDatas">
            <div class="addImg ">
              <span class="addText ">批量导入</span>
            </div>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row>
        <el-col :span="16 " style="margin-top: 2vw;color: #666666;font-size:1.1vw;">筛选
          <el-select v-model="departmentId" @change="findByName">
            <el-option v-for="item in departmentNameList" :key="item.salary" :label="item.deduction" :value="item.salary">
            </el-option>
          </el-select>
          <el-select v-model="bankSname" @change="findByName">
            <el-option v-for="item in bankSnameList" :key="item.salary" :label="item.deduction" :value="item.salary">
            </el-option>
          </el-select>
          <el-select v-model="stateCh" @change="findByName">
            <el-option v-for="item in options" :key="item.salary" :label="item.deduction" :value="item.salary">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" style="text-align:right;">
          <el-input ref="notNull " type="text" v-model="userName " @blur="findByName" placeholder="请输入名称" class="addInput"></el-input>
        </el-col>
      </el-row>
      <el-table :row-class-name="tableRowClassName" :data="returnData" :header-row-class-name="headerStyle" style="width: 100%;margin:3vw 0vw;font-size:1vw !important;border-bottom: 0px solid #f3f3f3;">
        <el-table-column align="center" type="index" width="80px" label="序号">
        </el-table-column>
        <el-table-column align="center" prop="departmentName" label="部门名称">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名">
        </el-table-column>
        <el-table-column align="center" prop="userid" label="企业微信ID">
        </el-table-column>
        <el-table-column align="center" prop="bindCardNumber" width="280px" label="工资卡号">
        </el-table-column>
        <el-table-column align="center" prop="bindCardBankSname_ch" label="发卡银行">
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注">
        </el-table-column>
        <el-table-column align="center" prop="state_ch" label="薪管家">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a style="color: #1A94FF;cursor: pointer;" @click="handleEdit(scope.$index, scope.row)">修改</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange" style="text-align: right;">
      </el-pagination>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" placement="right" width="30vw" height="55vw" trigger="click">
      <el-form class="editPayCard">
        <el-row>
          <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #333333;margin-bottom:2vw;text-align: left;">工资卡信息维护</el-col>
        </el-row>
        <el-form-item label="部门名称">
          <el-input ref="notNull " type="text" :disabled="true" v-model="departmentName " class="editInput "></el-input>
        </el-form-item>
        <el-form-item label="姓名" width="5vw">
          <el-input ref="notNull " type="text" :disabled="true" v-model="name " class="editInput "></el-input>
        </el-form-item>
        <el-form-item label="企业微信ID">
          <el-input ref="notNull " type="text" :disabled="true" v-model="userid " class="editInput "></el-input>
        </el-form-item>
        <el-form-item label="工资卡号">
          <el-input ref="notNull " type="tel" v-model="bindCardNumbers " maxlength="23" @focus="formatNum" @blur="vaildateNum" @change="vaildateNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57" class="editInput "></el-input>
        </el-form-item>
        <el-form-item label="发卡银行">
          <el-input ref="notNull " type="text" :disabled="true" v-model="bindCardBankSname_chs " class="editInput "></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input ref="notNull " type="textarea" @keyup.native="wordStatic " maxlength="128 " v-model="remarks " class="editInput " style="height:4vw;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="22 " style="text-align:right;color:#666666 ">
            还可以输入{{contents}}个字符
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      contents: 128,
      dialogVisible: false,
      dialogFormVisible: false,
      departmentId: '',
      bankSname: '',
      stateCh: '',
      departmentNameList: [{
        salary: '',
        deduction: '全部'
      }],
      bankSnameList: [{
        salary: '',
        deduction: '全部'
      }],
      options: [{
        salary: '',
        deduction: '全部'
      }, {
        salary: '201',
        deduction: '已开通'
      }, {
        salary: '0',
        deduction: '未开通'
      }],
      userName: '',
      pageSize: 10,
      pageNum: 1,
      total: 1,
      btnFlag: false,
      selDateSure: '',
      returnData: [],
      departmentName: '',
      name: '',
      userid: '',
      corpid: '',
      bindCardNumbers: '',
      bindCardBankSname_chs: '',
      remarks: ''
    }
  },
  mounted: function () {
    let vm = this
    // 获取下拉框的值
    // 查询员工部门列表
    vm.$http.post('/salary/admin/select_department_name_by_corpId', {}).then(
      function (result) {
        if (result.data.retcode === '0') {
          vm.departmentNameList = vm.departmentNameList.concat(result.data.nameList)
        }
      })
    // 查询员工发卡银行列表
    vm.$http.post('/salary/admin/select_bank_sname_by_corpId', {}).then(
      function (result) {
        if (result.data.retcode === '0') {
          vm.bankSnameList = vm.bankSnameList.concat(result.data.nameList)
        }
      })
    this.init(this.pageNum, this.pageSize, this.userName, this.departmentId, this.bankSname, this.stateCh)
  },
  methods: {
    handleCurrentChange (val) {
      this.init(val, this.pageSize, this.userName, this.departmentId, this.bankSname, this.stateCh)
    },
    findByName () {
      this.init(this.pageNum, this.pageSize, this.userName, this.departmentId, this.bankSname, this.stateCh)
    },
    wordStatic () {
      this.contents = 128 - this.remarks.length
    },
    init (pageNum, pageSize, userName, departmentId, bankSname, stateCh) {
      let vm = this
      vm.$http.post('/salary/admin/select_salary_card_info_maintain', { pageNum: pageNum, pageSize: pageSize, name: userName, department_id: departmentId, bank_sname: bankSname, state_ch: stateCh }).then(
        function (result) {
          if (result.data.retcode === '0') {
            vm.total = result.data.salaryCardInfoList.total
            vm.returnData = result.data.salaryCardInfoList.list
            for (var i = 0; i < vm.returnData.length; i++) {
              vm.returnData[i].bindCardNumber = vm.returnData[i].bindCardNumber.replace(/\s/g, '')
                .replace(/[^\d]/g, '')
                .replace(/(\d{4})(?=\d)/g, '$1 ')
            }
          } else {
            vm.$message.error(result.data.errmsg)
          }
        }
      )
    },
    submit () {
      let vm = this
      vm.dialogFormVisible = false
      vm.formatNum()
      if (!vm.bindCardNumbers) {
        vm.$message.warning('银行不能为空！')
        return false
      }
      vm.$http.post('/salary/admin/update_salary_card_info_maintain', {
        corpid: vm.corpid,
        userid: vm.userid,
        bindCardNumber: vm.bindCardNumbers,
        bindCardBankSname: vm.bindCardBankSname_chs,
        remark: vm.remarks
      }).then(
        function (result) {
          if (result.data.retcode === '0') {
            vm.$message.success('修改成功！')
            vm.dialogVisible = false
            vm.init(vm.pageNum, vm.pageSize, vm.userName, vm.departmentId, vm.bankSname, vm.stateCh)
          } else {
            this.$message.error(result.data.errmsg)
          }
        }
      )
    },
    vaildateNum () {
      let vm = this
      vm.formatNum()
      vm.tempAccId = JSON.stringify(vm.bindCardNumbers)
      vm.$http.post('/salary/h5/cardnum_for_bankname', { rltv_accno: JSON.parse(vm.tempAccId) }).then(
        function (result) {
          vm.bankName = result.data.bank_name
        })
      vm.bindCardNumbers = vm.bindCardNumbers.replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
    },
    formatNum () {
      this.bindCardNumbers = this.bindCardNumbers.replace(/\s*/g, '')
    },
    handleEdit (index, row) {
      let vm = this
      vm.dialogVisible = true
      vm.departmentName = row.departmentName
      vm.name = row.name
      vm.userid = row.userid
      vm.corpid = row.corpid
      vm.bindCardNumbers = row.bindCardNumber
      vm.bindCardBankSname_chs = row.bindCardBankSname_ch
      vm.remarks = row.remark
      vm.contents = 128 - vm.remarks.length
    },
    importDatas () {
      let vm = this
      vm.$router.push({ path: '/importDatas' })
    },
    importOne () {
      let vm = this
      vm.$router.push({ path: '/importOne' })
    },
    findByMonth () {
      if (this.selDateSure !== '' && this.selDateSure !== null) {
        let vm = this
        vm.$http.post('/salary/admin/query_user_salary_confirm_state?month=' + vm.selDateSure).then((res) => {
          vm.returnData = res.data.list
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
  font-size: 1.5vw;
  color: #fa5a4b;
}
</style>
<style scoped>
div >>> .el-form-item__label {
  width: 25%;
  font-size: 1.1vw;
}
div >>> .content .el-form-item {
  margin-bottom: 15px;
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
  padding-left: 20px;
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
.addButton {
  border: 1px solid #4a77ab;
  border-radius: 6px;
  color: #ffffff;
  background-color: #4a77ab;
  margin-bottom: 1vw;
  margin-right: 2vw;
}
.addImg {
  display: inline-block;
  background: url('../assets/image/Group.png') no-repeat left;
  background-size: 1.1vw;
}
.addImg:hover {
  opacity: 0.7;
}
.addText {
  padding: 0 0 0 2vw;
  font-size: 1.2vw;
}
.addInput {
  font-size: 1.2vw;
  padding: 0;
  float: left;
  width: 75%;
  height: 2.5vw;
  line-height: 2.5vw;
  text-align: left;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: 10vw;
}
.editInput {
  font-size: 1.2vw;
  padding: 0;
  float: left;
  width: 70%;
  height: 2.5vw;
  line-height: 2.5vw;
  text-align: left;
}
</style>
