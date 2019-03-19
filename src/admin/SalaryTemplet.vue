<template>
  <el-container>
    <el-form size="small" class="salaryTemplet" style="height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;text-align:left;">配置发薪表模板</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style="margin-right: 2.3vw;margin-bottom:2vw;">
        <el-col :span="24"></el-col>
      </el-row>
      <el-row style="font-size: 1vw;padding-bottom: 3vw;">
        <el-col style="width: 25vw;height: 100%;text-align:center;">
          <div class="sibian circle">
            <el-table :data="shouldList ">
              <el-table-column label="应发项 " style="width:6vw; ">
                <template slot-scope="scope ">
                  <div style="" @mouseenter="enter(scope.$index,shouldList)" @mouseleave="leave()">
                    <el-input ref="notNull " :disabled="(scope.$index!=current2||isList2!='shouldList')&&scope.row.salary!=''" type="text " minlength="1 " maxlength="18 " size="mini " v-model="scope.row.salary " class="addInput "></el-input>
                    <i class="el-icon-edit" @click="edit(scope.$index, 'shouldList') " v-if="showFlag&&scope.$index==current&&isList==shouldList"></i>
                    <i v-else></i>
                    <el-checkbox style="position:absolute;right:10px;" v-model="scope.row.isSelect" true-label="YES" false-label="NO"></el-checkbox>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="addButton " type="primary " @click="addRow(shouldList,'shouldList') ">
              <div class="addImg ">
                <span class="addText ">添加应发项</span>
              </div>
            </el-button>
          </div>
        </el-col>
        <el-col style="width: 25vw;height: 100%;padding-left: 1.3vw;text-align:center;">
          <div class="sibian circle">
            <el-table :data="deductList ">
              <el-table-column label="扣减项 " style="width:6vw; ">
                <template slot-scope="scope ">
                  <div @mouseenter="enter(scope.$index,deductList)" @mouseleave="leave()">
                    <el-input :disabled="(scope.$index!=current2||isList2!='deductList')&&scope.row.deduction!=''" size="mini " type="text " minlength="1 " v-model="scope.row.deduction " class="addInput" maxlength="18 "></el-input>
                    <i class="el-icon-edit" @click="edit(scope.$index, 'deductList')" v-if="showFlag&&scope.$index==current&&isList==deductList"></i>
                    <i v-else></i>
                    <el-checkbox style="position:absolute;right:10px;" v-model="scope.row.isSelect" true-label="YES" false-label="NO"></el-checkbox>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="addButton " type="primary " @click="addRow(deductList,'deductList') ">
              <div class="addImg ">
                <span class="addText ">添加扣减项</span>
              </div>
            </el-button>
          </div>
        </el-col>
        <el-col style="width: 25vw;padding-left: 2.6vw;text-align:center;">
          <div class="sibian">
            <el-table :data="areaList ">
              <el-table-column label="文字说明 " style="width:6vw; ">
                <template slot-scope="scope ">
                  <el-row type="flex " justify="space-between " class="circle">
                    <el-col style="text-align:left;font-size:1.5vw;" :span="16">工资明细确认说明</el-col>
                    <el-col :span="6" style="text-align:right">
                      <i class="el-icon-edit" @click="edit2() "></i>
                      <el-checkbox v-model="scope.row.remark_valid" true-label="YES" false-label="NO"></el-checkbox>
                    </el-col>
                  </el-row>
                  <el-row type="flex " justify="space-between ">
                    <el-col :span="22 ">
                      <!-- <el-input type="textarea " rows="5 " class=" addArea " @keyup="wordStatic(); " v-model="scope.row.areaProp ">
                    </el-input> -->
                      <textarea :disabled="disabledFlag2" class="addArea " rows="8" @keyup="wordStatic(); " v-model="scope.row.areaProp " maxlength="128 ">
                      </textarea>
                    </el-col>
                    <!-- <el-col :span="3 ">
                    <div @click="edit " class="editImg "></div>
                  </el-col> -->
                  </el-row>
                  <el-row>
                    <el-col :span="22 " style="text-align:right ">
                      还可以输入{{content}}个字符
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-button type="submit " class="submit " @click="submit ">提交</el-button>
    </el-form>
    <el-dialog class="salaryDialog" title="发薪表模板预览" :visible.sync="dialogVisibe">
      <el-form>
        <div class="sibian2">
          <el-row>
            <el-col :span="8">
              <el-row style="background:#4A77AB;height:2.5vw;line-height:2.5vw;">应发项</el-row>
              <el-row style="color:black;line-height:2.5vw;" v-for="(item,index) in shouldList" :key="index" v-if="item.isSelect=='YES'">
                <el-col>{{item.salary}}</el-col>
              </el-row>
            </el-col>
            <el-col :span=" 8 ">
              <el-row style="background:#4A77AB;height:2.5vw;line-height:2.5vw;">扣减项</el-row>
              <el-row style="color:black;line-height:2.5vw; " v-for="(item,index) in deductList " :key="index " v-if="item.isSelect=='YES'">
                <el-col>{{item.deduction}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8 ">
              <el-row style="background:#4A77AB;height:2.5vw;line-height:2.5vw;">文字说明</el-row>
              <el-row style="color:black; " v-if="this.areaList[0].remark_valid=='YES'">
                <el-col style="text-align:left;">{{this.areaList[0].areaProp}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="dialog-footer ">
        <el-button @click="close ">返回</el-button>
        <el-button style="background:#1A94FF;color:#ffffff " type="primary " @click="sure ">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="sucessDialog " :visible.sync="dialogVisibe2 " style="width:50%;margin:auto; ">
      <el-form>
        <el-row>
          <el-col :span="24 ">
            <img style="width:3vw;height:3vw" class="success-icon " src="../assets/image/success_1.png">
          </el-col>
        </el-row>
        <el-row style="margin-bottom:10px ">
          <el-col :span="24 " style=" font-size:1vw;color:#000000; ">
            发薪表模板配置成功
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24 " style="font-size:0.8vw;color:#ccc; ">
            即将回到首页
          </el-col>
        </el-row>
      </el-form>
      <el-button style="background:#4a77ab;color:#ffffff " type="primary " @click="sucess ">确 定</el-button>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  name: 'SalaryTemplet',
  data () {
    return {
      shouldList: [],
      deductList: [],
      returnData: [],
      allList: [],
      showFlag: false,
      current: 0,
      current2: -1,
      disabledFlag: true,
      disabledFlag2: true,
      isList: '',
      isList2: '',
      dialogVisibe: false,
      dialogVisibe2: false,
      areaList: [{ areaProp: '', remark_valid: 'NO' }],
      content: 128,
      delImg: '../assets/image/delete.png'
    }
  },
  methods: {
    enter (index, list) {
      this.showFlag = true
      this.current = index
      this.isList = list
    },
    leave (index) {
      this.showFlag = false
      this.current = null
    },
    edit (index, list) {
      this.disabledFlag = false
      this.current2 = index
      this.isList2 = list
    },
    edit2 () {
      this.disabledFlag2 = false
    },
    deleteRow (index, rows) { // 删除该行
      rows.splice(index, 1)
    },
    addRow (tableData, flag, event) {
      if (tableData.length < 25) {
        if (flag === 'shouldList') {
          tableData.push({ salary: '', isSelect: 'NO' })
          this.edit(tableData.length - 1, 'shouldList')
        } else if (flag === 'deductList') {
          tableData.push({ deduction: '', isSelect: 'NO' })
          this.edit(tableData.length - 1, 'deductList')
        }
      } else {
        this.$message.warning('最多只能添加25项')
      }
    },
    wordStatic () {
      this.content = 128 - this.areaList[0].areaProp.length
    },
    submit () {
      let isNull = false
      let hasChecked1 = false
      let hasChecked2 = false
      this.shouldList.forEach(element => {
        if (element.isSelect === 'YES') {
          hasChecked1 = true
        }
        if (element.salary === undefined || element.salary === '') {
          isNull = true
        }
      })
      this.deductList.forEach(element => {
        if (element.isSelect === 'YES') {
          hasChecked2 = true
        }
        if (element.deduction === undefined || element.deduction === '') {
          isNull = true
        }
      })
      if (isNull) {
        this.$message.warning('不能为空')
      } else {
        // let vm = this
        if (hasChecked1 === false) {
          this.$message.warning('应发项不能为空')
        } else if (hasChecked2 === false) {
          this.$message.warning('扣减项不能为空')
        } else {
          this.dialogVisibe = true
        }
      }
    },
    sure () {
      let vm = this
      vm.$http.post('/salary/admin/salary_fields', { shouldList: this.shouldList, remark: this.areaList[0].areaProp, remark_valid: this.areaList[0].remark_valid, deductList: this.deductList }).then((res) => {
        if (res.data.retcode === '0') {
          vm.dialogVisibe = false
          vm.dialogVisibe2 = true
        } else {
          this.$message.error(res.data.errmsg)
        }
      })
    },
    sucess () {
      this.dialogVisibe2 = false
      this.$router.push({ path: '/uploadPageOne' })
    },
    close () {
      this.dialogVisibe = false
    }
  },
  created () {
    let vm = this
    vm.$http.post('/salary/admin/select_salary_fields').then((res) => {
      if (res.data.retcode === '0') {
        if (res.data.isSubmit === 'YES') {
          this.deductList = res.data.deductList
          this.shouldList = res.data.shouldList
          this.areaList[0].areaProp = res.data.remark
          this.areaList[0].remark_valid = res.data.remark_valid
        } else {
          this.deductList = [{ 'deduction': '养老保险', 'isSelect': 'NO' }, { 'deduction': '医疗保险', 'isSelect': 'NO' }, { 'deduction': '失业保险', 'isSelect': 'NO' }, { 'deduction': '工商保险', 'isSelect': 'NO' }, { 'deduction': '生育保险', 'isSelect': 'NO' }, { 'deduction': '住房公积金', 'isSelect': 'NO' }]
          this.shouldList = [{ 'salary': '基本工资', 'isSelect': 'NO' }, { 'salary': '绩效工资', 'isSelect': 'NO' }, { 'salary': '岗位补贴', 'isSelect': 'NO' }, { 'salary': '住房补贴', 'isSelect': 'NO' }, { 'salary': '通讯补贴', 'isSelect': 'NO' }, { 'salary': '加班费', 'isSelect': 'NO' }]
          this.areaList[0].areaProp = '1、您的工资明细属于公司敏感信息，请勿以任何形式向外泄露 2、如果您的工资明细信息有误，请在发薪日起10个工作日内联系部门处理，否则将默认为信息无误'
          this.areaList[0].remark_valid = 'NO'
        }
        this.content = 128 - this.areaList[0].areaProp.length
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
  }
}
</script>
<style>
.salaryTemplet input.el-input__inner {
  text-align: center !important;
}
.salaryTemplet .el-table th.is-leaf {
  background: #0d7dc8 !important;
  height: 3vw;
}
.salaryTemplet .el-table th > .cell {
  text-align: center;
  color: #ffffff;
  font-size: 1.2vw;
  font-family: PingFang-SC-Bold;
}
.salaryTemplet .el-table td > .cell {
  font-family: PingFang-SC-Bold;
  margin: 0 0 0 20px;
  padding: 0;
  line-height: 2.5vw;
}
.salaryTemplet .el-table td {
  /* border: none; */
  border-bottom: 1px dashed #f3f3f3;
}
/* .salaryTemplet .el-table tr:nth-child(2n) {
  background: #f8f8f8;
} */
.salaryTemplet .el-form-item__label {
  font-size: 1.5vw;
  color: black;
}
.el-message-box__message p {
  font-size: 14px;
}
.circle .el-checkbox__inner {
  border-radius: 50% !important;
}
.circle .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #50cf3d;
  border-color: #50cf3d;
}
.salaryDialog .el-dialog__header {
  text-align: left;
}
.salaryDialog .el-dialog__body {
  padding-top: 0;
}
.salaryDialog .el-table th {
  background: #4a77ab !important;
  color: #ffffff;
}
textarea:disabled {
  background-color: rgb(235, 235, 228, 0.2) !important;
}
.salaryTemplet .el-input {
  text-align: center !important;
}
.salaryTemplet .el-input.is-disabled .el-input__inner {
  background: inherit !important;
  border: none !important;
}
.salaryTemplet .el-input .el-input__inner {
  background: inherit !important;
  border: 1px solid #ccc;
  font-size: 1.2vw;
  height: 2.5vw;
}
</style>
<style scoped>
.tableCol {
  background: red;
}
.el-button {
  background: #ffffff;
  margin: 30px auto;
}
.el-button--primary {
  color: #4a77ab;
}
.el-button--primary img {
  padding-right: 10px;
  width: 14px;
  height: 14px;
}
.delImg {
  display: inline-block;
  width: 2vw;
  height: 2vw;
  margin: 0;
  padding: 0;
  background: url('../assets/image/delete_new.png') no-repeat;
  background-size: 2vw;
}
.delImg:hover {
  background: url('../assets/image/delete_hover_new.png') no-repeat;
  background-size: 2vw;
}
.editImg {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0;
  padding-right: 30px;
  background: url('../assets/image/edit.png') no-repeat;
}
.editImg:hover {
  background: url('../assets/image/edit_hover.png') no-repeat;
}
.addImg {
  display: inline-block;
  background: url('../assets/image/add_new.png') no-repeat left;
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
  padding: 0;
  margin: 0;
  /* float: left; */
  width: 70%;
  height: 2.5vw;
  line-height: 2.5vw;
  /* border: 1px solid #ccc; */
}
.addArea {
  float: left;
  width: 100%;
  line-height: 2vw;
  font-size: 1.2vw;
}
.submit {
  background: #4a77ab;
  border-radius: 2px;
  color: #ffffff;
  font-size: 1.5vw;
  width: 10vw;
  height: 2.5vw;
  line-height: 2.5vw;
  padding: 0;
}
.submit:hover {
  background: #0d7dc8;
  color: #ffffff;
}
.addButton {
  border: 0px solid #dcdfe6;
}
.sibian {
  width: 25vw;
  height: 100%;
  border: 1px solid #4a77ab;
  border-radius: 2px;
  min-height: 22vw;
}
.sibian2 {
  margin: 1vw 0vw;
  padding-bottom: 2vw;
  font-size: 1vw;
  border: 1px solid #e7e7e7;
}
.circle i {
  display: inline-block !important;
  width: 14px;
  height: 14px;
  margin-right: 8px;
}
.dialog-footer {
  text-align: right;
}
.el-icon-edit:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
