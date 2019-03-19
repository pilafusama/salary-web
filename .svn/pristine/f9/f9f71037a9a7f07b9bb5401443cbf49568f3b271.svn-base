<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="editPayCard">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;margin-left:-5vw;">修改</el-col>
      </el-row>
      <el-form-item label="姓名">
        <el-input ref="notNull " type="text" :disabled="true" v-model="params.name " class="addInput "></el-input>
      </el-form-item>
      <el-form-item label="部门ID">
        <el-input ref="notNull " type="text" :disabled="true" v-model="params.departmentId " class="addInput "></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input ref="notNull " type="text" :disabled="true" v-model="params.departmentName " class="addInput "></el-input>
      </el-form-item>
      <el-form-item label="工资卡号">
        <el-input ref="notNull " type="tel" v-model="params.bindCardNumber " maxlength="23" @focus="formatNum" @blur="vaildateNum" @change="vaildateNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57" class="addInput "></el-input>
      </el-form-item>
      <el-form-item label="发卡银行">
        <el-input ref="notNull " type="text" :disabled="true" v-model="params.bindCardBankSname " class="addInput "></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submit" class="el-btn">{{$t('btn_submit')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      params: JSON.parse(sessionStorage.getItem('row')),
      tempAccId: ''
    }
  },
  mounted: function () {
    this.vaildateNum()
  },
  methods: {
    submit () {
      let vm = this
      vm.formatNum()
      vm.$http.post('/salary/admin/update_salary_card_info_maintain', {
        corpid: vm.params.corpid,
        userid: vm.params.userid,
        bindCardNumber: vm.params.bindCardNumber,
        bindCardBankSname: vm.params.bindCardBankSname }
      ).then(
        function (result) {
          if (result.data.retcode === '0') {
            vm.$message.success('修改成功！')
            vm.$router.push({ path: '/payCardManage' })
          } else {
            this.$message.error(result.data.errmsg)
          }
        }
      )
    },
    back () {
      history.back()
    },
    vaildateNum () {
      let vm = this
      vm.formatNum()
      vm.tempAccId = JSON.stringify(vm.params.bindCardNumber)
      vm.$http.post('/salary/h5/cardnum_for_bankname', { rltv_accno: JSON.parse(vm.tempAccId) }).then(
        function (result) {
          vm.params.bankName = result.data.bank_name
        })
      vm.params.bindCardNumber = vm.params.bindCardNumber.replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
    },
    formatNum () {
      this.params.bindCardNumber = this.params.bindCardNumber.replace(/\s*/g, '')
    }
  }
}
</script>
<style>
.el-collapse-item__header {
  font-family: PingFangHK-Regular;
  font-size: 4.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: left;
}
.editPayCard input.el-input__inner {
  font-size: 1.2vw;
  border: 1px solid #ccc;
  height: 2.5vw;
  text-align: left;
  padding-left: 1vw;
  /* width: 30vw; */
}
.editPayCard .el-form-item__label {
  font-size: 1.2vw;
  line-height: 2.5vw;
  text-align: right;
  width: 20%;
}
</style>
<style scoped>
.el-btn {
  background-color: #1388bd;
  color: #ffffff;
  font-size: 1.2vw;
  font-family: PingFang-SC-Bold;
  border-radius: 10px;
  width: 6vw;
  height: 3vw;
  padding: 0px 0px;
  margin-left: 30vw;
  line-height: 2.5vw;
}
.editPayCard {
  width: 60vw;
  text-align: center;
  margin-top: 3vw;
}
.el-col-10 {
  font-family: PingFangHK-Regular;
  font-size: 1.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: left;
}
.el-col-left {
  font-family: PingFangHK-Regular;
  font-size: 1.5vw;
  color: #888888;
  letter-spacing: 0;
  text-align: right !important;
}
.addInput {
  font-size: 1.2vw;
  padding: 0;
  margin: 0;
  float: left;
  width: 70%;
  height: 2.5vw;
  line-height: 2.5vw;
  text-align: left;
}
</style>
