<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-1">
        <el-col :span="24" class="el-col-msg">{{$t('salaryCardInfoMsgM2')}}</el-col>
      </el-row>
      <el-row class="bgImg">
        <el-row>
          <el-col :span="17" class="el-col-name">{{bankCName}}</el-col>
          <el-col :span="7">
            <div class="el-col-cardmsg">{{$t('payCard')}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="el-col-accno">{{bankCardNo | formatAccId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="el-col-username">{{userCName}}</el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-confirmMsg">{{$t('salaryCardInfoRemarkM2')}}</el-col>
      </el-row>
      <el-row class="row-prompt">
        <el-col :span="2" style="line-height: 1.1;">
          <el-checkbox v-model="checked"></el-checkbox>
        </el-col>
        <el-col :span="22">
          <span class="msg-span">{{$t('msgLeadingPage5')}}</span>
          <span @click="showDialog1=true" class="msg-a">{{$t('msgLeadingPageProtocal1')}}</span>
          <span>{{$t('msgLeadingPageCMB3')}}</span>
          <span @click="showDialog2=true" class="msg-a">{{$t('msgLeadingPageProtocal2')}}</span>
        </el-col>
      </el-row>
    </el-form>
    <el-button :disabled="!checked" @click="confirmAndOpen" class="el-btn btn">{{$t('confirmAndOpen')}}</el-button>
    <protocol-product-dialog v-show="showDialog1" v-model="showDialog1" @closeDialog1="closeDialog1">
    </protocol-product-dialog>
    <protocol-information-dialog v-show="showDialog2" v-model="showDialog2" @closeDialog2="closeDialog2">
    </protocol-information-dialog>
  </el-container>
</template>
<script>
import protocolProductDialog from './ProtocolProductDialog'
import protocolInformationDialog from './ProtocolInformationDialog'
export default {
  name: 'SalaryCardConfirmM2',
  data () {
    return {
      checked: false,
      bankCName: '',
      bankCardNo: '',
      userCName: '',
      showDialog1: false,
      showDialog2: false
    }
  },
  mounted: function () {
    // 获取工资卡信息
    let vm = this
    vm.$http.post('/salary/h5/get_user_salary_card').then(
      function (result) {
        console.log(result.data)
        vm.bankCName = result.data.bind_card_bank_chname
        vm.bankCardNo = result.data.bind_card_number
        vm.userCName = result.data.cre_name
      }
    )
  },
  methods: {
    confirmAndOpen () {
      this.$router.push({ path: '/newTieCardM2' })
    },
    back () {
      history.back()
    },
    closeDialog1 () {
      this.showDialog1 = false
    },
    closeDialog2 () {
      this.showDialog2 = false
    }
  },
  components: {
    protocolProductDialog,
    protocolInformationDialog
  }
}
</script>
<style scoped>
.el-col-msg {
  font-family: PingFangSC-Regular;
  font-size: 4.6vw;
  color: #000000;
  text-align: center;
  margin: 10vw 0;
}
.bgImg {
  background-image: url(../assets/image/card_bg.png);
  background-size: 100% 100%;
  background-color: #ffffff;
  color: #ffffff;
  border-radius: 8px;
  margin: 1vh auto 2vh auto;
  width: 84vw;
}
.bgImg_row {
  margin: 3vh;
}
.bgImg_row .el-col {
  color: #ffffff;
}
.bgImg_row img {
  width: 6vw;
  height: 6vw;
}
.el-col-name {
  font-size: 4.8vw;
  font-family: PingFangSC-Regular;
  text-align: left;
  padding-left: 8vw;
  margin-top: 5vw;
  color: #ffffff;
  letter-spacing: 0;
}
.el-col-cardmsg {
  font-size: 3.5vw;
  font-family: PingFangSC-Semibold;
  color: #ffffff;
  letter-spacing: 0;
  text-align: right;
  padding: 0.8vw 4vw;
  background-color: #6ca6e2;
  border-radius: 21.5px;
  margin-top: 5vw;
}
.el-col-accno {
  font-size: 4vw;
  font-family: Farrington-7B-Qiqi-;
  text-align: left;
  margin-top: 7vw;
  padding-left: 8vw;
  color: #ffffff;
  letter-spacing: 0.6vw;
}
.el-col-username {
  font-size: 4.8vw;
  font-family: PingFangHK-Medium;
  text-align: left;
  padding-left: 8vw;
  margin: 7vw 0 5vw 0;
  color: #ffffff;
  letter-spacing: 0;
}
.el-col-confirmMsg {
  font-size: 3.6vw;
  font-family: PingFangSC-Regular;
  color: #2f7dcd;
  text-align: center;
  padding: 2vh 0 4vh 0;
  letter-spacing: 0;
  border-bottom: 1px solid #d9d9d9;
}
.row-prompt {
  text-align: left;
  font-family: PingFangSC-Regular;
  color: #9b9b9b;
  background-color: #f5f5f5;
  letter-spacing: 0;
  padding: 3vw 6vw 0 6vw;
}
.msg-span {
  font-size: 4vw;
}
.msg-a {
  color: #2f7dcd;
  text-decoration: none;
}
div >>> .el-checkbox__input {
  vertical-align: sub;
}
div >>> .el-checkbox__inner {
  width: 3.2vw;
  height: 3.2vw;
  border-color: #9b9b9b;
}
div >>> .el-checkbox__inner:hover {
  border-color: #9b9b9b;
}
div >>> .el-checkbox__input.is-checked .el-checkbox__inner,
div >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ffffff;
  border-color: #9b9b9b;
}
div >>> .el-checkbox__inner::after {
  width: 0.8vw;
  height: 1.8vw;
  left: 1vw;
  top: 0;
  border: 2px solid #9b9b9b;
  border-left: 0;
  border-top: 0;
}
</style>
