<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="el-top-steps">
      <el-row class="el-top-steps-row">
        <el-steps :active="1" align-center finish-status="success">
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
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" class="el-row-88bg-text">{{$t('msgNewTieCard')}}</el-col>
      </el-row>
      <div v-if="photoFlag">
        <el-row class="el-row-1">
          <el-col :span="6" class="el-col-right">{{$t('bankCardId')}}</el-col>
          <el-col :span="16">
            <el-input v-model="accId" type="tel" maxlength="23" @focus="formatNum" @blur="vaildateNum" @change="vaildateNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57" placeholder="请输入银行卡号"></el-input>
          </el-col>
          <el-col :span="2">
            <photo-view v-on:postImgData="postImageData" v-bind:bgImageURL="backgroundImage" v-bind:imageShowFlag="imgShowFlag"></photo-view>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row class="el-row-1">
          <el-col :span="6" class="el-col-right">{{$t('putCardBank')}}</el-col>
          <el-col :span="18" style="color:#333333;line-height:10vw;text-align:left;">{{accId | formatAccId}}</el-col>
        </el-row>
      </div>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">{{$t('putCardBank')}}</el-col>
        <el-col :span="18" style="color:#333333;line-height:10vw;text-align:left;">{{bankName}}</el-col>
      </el-row>
      <el-row class="el-row-88bg">
        <el-col :span="24" class="el-col-10">
          <span>{{$t('msgForChangeCard2')}}</span>
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">{{$t('phoneNo')}}</el-col>
        <el-col :span="18" class="el-col-title">
          <el-input v-model="phoneNo" oninput="if(value.length>11)value= value.slice(0,11)" placeholder="请输入预留手机号码" @blur="phoneNoInput"></el-input>
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-right">
          {{$t('checkNum')}}
        </el-col>
        <el-col :span="9" class="el-col-title">
          <el-input type="Number" oninput="if(value.length>6)value= value.slice(0,6)" v-model="smsCode" placeholder="请输入验证码" @blur="smsCodeInput"></el-input>
        </el-col>
        <el-col :span="9" class="yan">
          <el-button v-bind:class="{'el-btn-disable1':!flag1, 'el-btn1':flag1}" :disabled="!flag1" @click="getNo">{{btntxt}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="submitCard" v-bind:class="{'el-btn-disable': flag, 'el-btn':!flag}" :disabled="flag">{{$t('btn_submit')}}</el-button>
    <submit-check v-bind:loadingFlag="showLoadingFlag"></submit-check>
  </el-container>
</template>
<script>
import PhotoView from '@/components/PhotoView'
import SubmitCheck from '@/components/SubmitCheck'
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      isStockUser: this.$route.params.isStockUser,
      photoFlag: true,
      backgroundImage: 'photograph.png',
      imgShowFlag: 'N',
      flag: true,
      flag1: false,
      flag2: true,
      accIdFlag: false,
      phoneNoFlag: false,
      checkNoFlag: false,
      btntxt: '获取验证码',
      tempAccId: '',
      phoneNo: '',
      accId: '',
      smsCode: '',
      bankName: '',
      showLoadingFlag: false
    }
  },
  watch: {
    accId: {
      handler: function (val, oldVal) {
        if (this.accId !== '' && this.accId != null) {
          this.accIdFlag = true
        } else {
          this.accIdFlag = false
        }
        if (this.phoneNoFlag && this.accIdFlag) {
          this.flag1 = true
        } else {
          this.flag1 = false
        }
        if (this.phoneNoFlag && this.checkNoFlag && this.accIdFlag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    },
    phoneNo: {
      handler: function (val, oldVal) {
        if (this.phoneNo !== '' && this.phoneNo != null) {
          this.phoneNoFlag = true
        } else {
          this.phoneNoFlag = false
        }
        if (this.phoneNoFlag && this.accIdFlag) {
          this.flag1 = true
        } else {
          this.flag1 = false
        }
        if (this.phoneNoFlag && this.checkNoFlag && this.accIdFlag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    },
    smsCode: {
      handler: function (val, oldVal) {
        if (this.smsCode !== '' && this.smsCode != null) {
          this.checkNoFlag = true
        } else {
          this.checkNoFlag = false
        }
        if (this.phoneNoFlag && this.checkNoFlag && this.accIdFlag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    }
  },
  mounted: function () {
    // 获取存量用户卡号
    let vm = this
    if (vm.isStockUser) {
      vm.photoFlag = false
      this.$http.post('/salary/h5/get_stock_user_info').then(
        function (result) {
          vm.accId = result.data.bind_card_number
          vm.bankName = result.data.bank_name
        }
      )
    } else {
      vm.photoFlag = true
    }
  },
  methods: {
    postImageData (imageData) {
      let vm = this
      imageData = imageData.substring(imageData.indexOf(',') + 1)
      this.$http.post('/salary/h5/upload_bank_card_photo', { bank_card_image: imageData }).then(
        function (result) {
          if (result.data.stateFlag === '0') {
            vm.accId = result.data.card_number
            vm.vaildateNum()
          } else if (result.data.stateFlag === '1') {
            vm.$alert(result.data.bankName, '提示', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              type: 'warning',
              showClose: false,
              customClass: 'message-box-newCard',
              center: true
            }).then(() => {
              location.reload()
            })
          }
        }
      )
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_psyhkh_click')
    },
    back () {
      history.back()
    },
    submitCard () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_tj_click')
      this.showLoadingFlag = true
      let vm = this
      vm.$http.post('/salary/h5/open_salary_account', {
        mobileNumber: this.phoneNo,
        rltv_accno: JSON.parse(this.tempAccId),
        smsCode: this.smsCode
      }).then(
        function (result) {
          vm.showLoadingFlag = false
          if (result.data.stateFlag === '1') {
            vm.$alert('<div>银行卡验证未通过！</div><div>请核对银行卡号及该银行卡预留手机号后重新提交</div>', {
              dangerouslyUseHTMLString: true,
              cancelButtonText: '关闭',
              showClose: false,
              customClass: 'card-fail-msg-box',
              center: true
            }).then(() => {
            }).catch(() => {
            })
          } else {
            sessionStorage.setItem('params', JSON.stringify(result.data))
            vm.$router.push({ path: '/tieCardSuccess' })
          }
        }
      )
    },
    vaildateNum () {
      let vm = this
      this.tempAccId = JSON.stringify(this.accId)
      vm.$http.post('/salary/h5/cardnum_for_bankname', { rltv_accno: JSON.parse(this.tempAccId) }).then(
        function (result) {
          if (result.data.stateFlag === '1') {
            vm.$alert('<div>暂不支持您提交的银行卡，请提交工商银行、建设银行、农业银行、中国银行或交通银行的借记卡作为工资卡</div>', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '关闭',
              showClose: false,
              customClass: 'card-fail-msg-box',
              center: true
            })
          } else {
            vm.bankName = result.data.bank_name
          }
        }
      )
      this.accId = this.accId.replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_sryhkh_click')
    },
    formatNum () {
      this.accId = this.accId.replace(/\s*/g, '')
    },
    Oninput (value) {
      if (value.length > 23) {
        value = value.slice(0, 23)
      }
    },
    checkPhoneNo () {
      let vm = this
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/
      if (vm.phoneNo === '') {
        vm.flag1 = true
        this.time = 0
        this.btntxt = '获取验证码'
        this.$message({
          message: '请输入手机号码',
          type: 'warning'
        })
      } else if (!reg.test(vm.phoneNo)) {
        vm.flag1 = true
        this.time = 0
        this.btntxt = '获取验证码'
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        })
      } else {
        vm.flag1 = false
      }
    },
    phoneNoInput () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_srsjhm_click')
    },
    smsCodeInput () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_sryzm_click')
    },
    getNo () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdyhk_hqyzm_click')
      let vm = this
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(vm.phoneNo)) {
        this.time = 0
        this.btntxt = '获取验证码'
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        })
      } else {
        this.time = 60
        this.timer()
        this.flag2 = false
        vm.$http.post('/salary/h5/send_sms_code', {
          mobile_number: this.phoneNo,
          SIGNDATA: JSON.parse(this.tempAccId),
          scene: 'OPEN_ACCOUNT'
        }).then(
          function (result) {
            console.log(result.data)
          })
      }
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's'
        setTimeout(this.timer, 1000)
        this.flag1 = false
      } else {
        this.time = 0
        this.btntxt = '重新获取'
        this.flag1 = true
      }
    }
  },
  components: {
    PhotoView,
    SubmitCheck
  }
}
</script>
<style>
.message-box-newCard {
  display: inline-block;
  width: 90vw !important;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 3vh;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.message-box-newCard .el-message-box__message {
  font-size: 5.5vw;
}
.card-fail-msg-box {
  width: 70vw !important;
  padding-bottom: 0;
  font-size: 3vh;
  font-family: PingFangHK-Regular;
  border-radius: 10px;
  vertical-align: inherit;
}
.card-fail-msg-box .el-message-box__header {
  padding: 0;
}
.card-fail-msg-box .el-message-box__content {
  padding: 3vh 6vw 3vh 6vw;
  font-size: 4vw;
  color: #333333;
}
.card-fail-msg-box .el-message-box__btns button {
  color: #333333;
  background-color: #fff;
  border: 0;
  font-size: 4.5vw;
  margin-left: 0;
  padding: 2vh 22vw;
  border-radius: 0;
  border-top: 1px solid #f1f1f1;
}
</style>
<style scoped>
.el-col-10 {
  text-align: left;
  line-height: 5vw;
  font-size: 3.5vw;
  font-family: PingFang-SC-Medium;
  color: #999999;
  padding: 4vw;
}
div >>> .show {
  width: 8vw;
  height: 8vw;
  border: 0;
  overflow: hidden;
  position: relative;
  float: left;
}
</style>
