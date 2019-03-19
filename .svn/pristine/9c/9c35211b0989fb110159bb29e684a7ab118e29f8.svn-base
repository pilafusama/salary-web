<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="el-top-steps">
      <el-row class="el-top-steps-row">
        <el-steps :active="0" align-center finish-status="success">
          <el-step>
            <template slot="description">{{$t('checkIdentity')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('bindPayCard')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('setSuccess')}}</template>
          </el-step>
        </el-steps>
      </el-row>
    </el-form>
    <el-row class="el-row-1" style="background-color:inherit;height:20vw">
      <el-col :span="24" class="el-col-10" style="margin-top:2.5vw;margin-left:1vw;line-height:8vw;">{{$t('msgSelectAcc')}}</el-col>
    </el-row>
    <el-form>
      <!-- <el-row class="splitBgn">
        <el-table :data="tableData" :show-header="false" :cell-class-name="cellClass" ref="multipleTable" @row-click="handleCurrentChange" @selection-change="handleSelectionChange">
          <el-table-column inline-template>
            <el-button-group>{{DbCrd_CardNo | formatAccId}}</el-button-group>
          </el-table-column>
          <el-table-column prop="DbCrd_CardNo" style="font-size: 5vw;">
            <template slot-scope="scope">{{scope.row.DbCrd_CardNo | formatAccId}}</template>
          </el-table-column>
          <el-table-column type="selection" width="50"></el-table-column>
        </el-table>
      </el-row> -->
      <el-row class="splitBgn" style="color:black;">
        <el-table :data="tableData" :show-header="false" :cell-class-name="cellClass" ref="multipleTable" @row-click="handleCurrentChange" @selection-change="handleSelectionChange">
          <el-table-column prop="bank_name" width="100"></el-table-column>
          <el-table-column prop="Rltv_AccNo" style="font-size: 5vw;">
            <template slot-scope="scope">{{scope.row.Rltv_AccNo | formatAccId}}</template>
          </el-table-column>
          <el-table-column type="selection" width="50"></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="24" style="height:3vh;background-color:#E9EEF1">
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-button @click="next" class="el-btn" :disabled="showFlag">使用本卡</el-button>
      <el-button @click="openNew" class="el-btn" :disabled="!showFlag">提交新卡</el-button>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: 'SelectExitAcc',
  data () {
    return {
      /* eslint-disable */
      tableData: JSON.parse(sessionStorage.getItem('ea02_group')),
      showFlag: true
    }
  },
  methods: {
    cellClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'td-left'
      }
    },
    openNew () {
      let failIcon = require('../assets/image/fail_1.png')
      this.$confirm('<div class="fail-icon-col"><img src=' + failIcon + ' /></div><span>即将进行人脸识别，请确认你自愿开通绑定账户，所提交资料真实有效，随后录制视频并朗读指定数字</span>', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'confirm-msg-box2',
        center: true
      }).then(() => {
        this.$router.push({ path: '/liveDetection' })
      }).catch(() => {
      })
    },
    next () {
      let vm = this
      const dataB = JSON.parse(sessionStorage.getItem('ea02_group'));
      sessionStorage.setItem('ea02_bean', JSON.stringify(this.sels));
      vm.$router.push({ path: '/chackPhoneNo' })
    },
    handleCurrentChange (row, event, column) {
      let vm = this
      vm.$refs.multipleTable.toggleRowSelection(row)
    },
    handleSelectionChange (val) {
      let vm = this
      vm.sels = val
      vm.falseSels = val.slice(0, -1)
      vm.falseSels.forEach(row => {
        vm.$refs.multipleTable.toggleRowSelection(row, false)
      })
      if (vm.sels != '') {
        vm.showFlag = false
      } else {
        vm.showFlag = true
      }
    }
  }
}
</script>
<style>
.el-table .td-left {
  font-size: 5vw;
  text-align: center;
  font-family: PingFangHK-Regular;
  color: #333333;
}
.el-table__empty-text {
  font-size: 4.5vw;
}
.confirm-msg-box2 {
  width: 88vw !important;
  padding-bottom: 0;
  font-size: 3vh;
  font-family: PingFangHK-Regular;
  border-radius: 10px;
  /* vertical-align: inherit; */
}
.confirm-msg-box2 .el-message-box__header {
  padding: 0;
}
.confirm-msg-box2 .el-message-box__content {
  padding: 2vh 7vw 3vh 7vw;
  font-size: 4.2vw;
  color: #333333;
  letter-spacing: 1px;
  text-align: left;
}
.confirm-msg-box2 .el-message-box__btns button:first-child {
  width: 50%;
  color: #333333;
  background-color: #fff;
  border: 0;
  font-size: 4.5vw;
  margin-left: 0;
  padding: 2vh 8vw;
  border-radius: 0;
  border-top: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
}
.confirm-msg-box2 .el-message-box__btns button:last-child {
  width: 50%;
  color: #3080ce;
  background-color: #fff;
  border: 0;
  font-size: 4.5vw;
  margin-left: 0;
  padding: 2vh 8vw;
  border-radius: 0;
  border-top: 1px solid #f1f1f1;
  border-left: 1px solid #f1f1f1;
}
.confirm-msg-box2 .fail-icon-col {
  text-align: center;
  padding: 2vh 5vw;
}
.confirm-msg-box2 .fail-icon-col img {
  width: 10vh;
}
</style>
<style scoped>
.el-col-10 {
  text-align: left;
  line-height: 5vw;
  font-size: 4.5vw;
  font-family: PingFangHK-Regular;
  color: #999999;
}
.openNewAcc {
  color: #4289d1;
  text-align: center;
  font-size: 5vw;
  width: 100%;
}
.splitBgn {
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.buttonLine {
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  padding: 1.5vh 2vw;
}
.el-btn {
  width: 44vw;
  margin-top: 8vw;
}
</style>
