<template>
  <el-container>
    <el-form :model="bankFlowForm" :rules="rules" ref="bankFlowForm" label-width="120px" class="bank-flow-form" size="small" label-position="right" style="height: 96.5vh !important;">
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;text-align:left;">配置直联网银</el-col>
      </el-row>
      <el-row class="el-row-88bg el-row-bline" style="margin-right: 2.3vw;margin-bottom:2vw;">
        <el-col :span="24"></el-col>
      </el-row>
      <div class="content">
        <el-row>
          <el-col :span="12" style="text-align:left">
            <img src="../assets/image/zsyh_logo.png">
          </el-col>
        </el-row>
        <!-- <el-form-item label="" prop="bankType" ref="bankTypeItem">
        <el-row class="bankList">
          <div id="1150" :class="{'bank-selected': bankFlowForm.bankType == '1150'}" @click="bankSelect($event)" v-if="urlBankType === '1150'">
            <img style="width:20px;height:20px;" src="../assets/image/zsyh_logo.png">
      </div>
      </el-row>
      </el-form-item> -->
        <el-row class="form-item-title">
          <span>
            <span>1</span>
          </span>
          企业名称
        </el-row>
        <el-form-item label="" prop="corpName">
          <el-input v-model="bankFlowForm.corpName" placeholder="请与公司在招商银行开户的企业名称保持一致"></el-input>
        </el-form-item>
        <el-row class="form-item-title">
          <span>
            <span>2</span>
          </span>
          请完成管理员身份验证
        </el-row>
        <el-form-item label="手机银行管理员" prop="opUserName">
          <el-input v-model="bankFlowForm.opUserName" placeholder="请填写公司招商银行企业手机银行管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="certId">
          <el-input v-model="bankFlowForm.certId" placeholder="请与管理员在招行申请企业手机银行时提交的证件保持一致"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="opUserPhone">
          <el-input v-model="bankFlowForm.opUserPhone" placeholder="请填写手机银行管理员在招商银行预留的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" class="verify-code">
          <el-input v-model="bankFlowForm.verifyCode" placeholder="请输入短信验证码"></el-input>
          <el-button type="primary" @click="getVerifyCode" :disabled="getCodeBtnDisabled">{{ getCodeBtnText }}</el-button>
        </el-form-item>
        <el-form-item class="submit-item">
          <el-button type="primary" @click="dosubmit">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="step-3" v-if="step === 3">
      <div tabindex="0" class="bind-flow-box add" @click="toStep(1)">
        <i class="el-icon-plus"></i>
        <div>配置新的审批流程</div>
        <div>绑定银行付款</div>
      </div>
    </div> -->
    <!-- <app-footer class="footer"></app-footer>
    <el-dialog title="" :visible.sync="guideDialogVisible" class="guide-dialog">
      <div class="guide-content">
        <div>1. 进入企业微信管理后台，在“企业应用“→“基础应用”，点击“审批”应用。</div>
        <div class="guide-step1"><img src="" /></div>
        <div>2. 点开“API”小按钮，即可看到审批流秘钥。</div>
        <div class="guide-step2"><img src="" /></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="guideDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog> -->
  </el-container>
</template>
<script>
var phoneValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入' + this.bankName + '手机银行管理员的用户帐号'))
  }
  setTimeout(() => {
    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) === null) {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  }, 500)
}
var idCodeValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入' + this.bankName + '手机银行管理员的身份证号'))
  }
  setTimeout(() => {
    if (value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) === null) {
      callback(new Error('请输入正确格式的身份证号码'))
    } else {
      callback()
    }
  })
}
export default {
  name: 'DirectBanking',
  data () {
    return {
      defaultTime: 60,
      time: 0,
      getCodeBtnText: '获取验证码',
      secondCodeBtnText: '重新获取验证码',
      getCodeBtnDisabled: false,
      bankFlowForm: {
        appid: '900002',
        // bankType: '1150',
        bankUin: 'random',
        corpId: '',
        corpName: '',
        opUserName: '',
        certId: '',
        opUserId: '',
        opUserPhone: '',
        status: 'OPEN',
        verifyCode: '',
        secret: 'random',
        logSsid: '93cd4d4f-c68f-4454-8b60-214e2e6ecf89',
        timeStamp: 33555,
        nonce: 'random',
        sign: '93cd4d4f-c68f-4454-8b60-214e2e6ecf89'
      }
    }
  },
  methods: {
    dosubmit () {
      let vm = this
      this.$refs['bankFlowForm'].validate((valid) => {
        if (valid) {
          if (vm.bankFlowForm.verifyCode === '') {
            vm.$message({
              type: 'error',
              message: '请输入短信验证码'
            })
          } else {
            vm.$http.post('/salary/admin/corp_bind_confirm', this.bankFlowForm).then((res) => {
              if (res.data.stateFlag === '0') {
                this.open()
              } else {
                vm.$message.error(res.data.errmsg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getVerifyCode () {
      let vm = this
      this.$refs['bankFlowForm'].validate((valid) => {
        if (valid) {
          // 进行60s倒计时
          vm.getCodeBtnDisabled = true
          vm.time = vm.defaultTime
          vm.getCodeBtnText = '重新获取(' + vm.time + ' s)'
          setTimeout(vm.timer, 1000)
          vm.$http.post('/salary/admin/corp_bind_authen', this.bankFlowForm).then(
            function (result) {
              if (result.data.stateFlag === '0') {
                vm.$message({
                  type: 'info',
                  message: '验证码已发送'
                })
              } else {
                vm.$message({
                  type: 'error',
                  message: result.data.errmsg
                })
              }
            })
        } else {
          return false
        }
      })
    },
    timer: function () {
      if (this.time > 0) {
        this.time--
        this.getCodeBtnText = '重新获取(' + this.time + ' s)'
        setTimeout(this.timer, 1000)
      } else {
        this.getCodeBtnDisabled = false
        this.getCodeBtnText = this.secondCodeBtnText
      }
    },
    open () {
      let text = '薪管家对接招商银行'
      this.$alert('<div class="scs-msg"><img src="./static/img/bind-ok.png" /><div>您已完成企业微信薪管家对接银行的设置:' + text + '</div></div>', '', {
        confirmButtonText: '完成',
        center: true,
        dangerouslyUseHTMLString: true
      })
    }
  },
  computed: {
    rules () {
      return {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { max: 128, message: '长度在128个字符以内', trigger: 'blur' }
        ],
        opUserName: [
          { required: true, message: '请输入手机银行管理员姓名', trigger: 'blur' },
          { max: 32, message: '长度在128个字符以内', trigger: 'blur' }
        ],
        certId: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { max: 18, message: '长度在18个字符以内', trigger: 'blur' },
          { validator: idCodeValidate, trigger: 'blur' }
        ],
        opUserPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: phoneValidate, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style>
.content input.el-input__inner {
  font-size: 1vw !important;
}
.content .form-item-title {
  margin-top: 6vw;
  margin-bottom: 36px;
  color: #333333;
  font-size: 16px;
  text-align: left;
}

.content .form-item-title span {
  text-align: center;
  display: inline-block;
  margin-right: 8px;
  border-radius: 50%;
  background-size: 100% 100%;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.content .form-item-title span span {
  color: #ffffff;
  background: #0d7dc8;
  margin-left: 3px;
}
.content .el-form-item {
  margin-left: 2vw;
  width: 90%;
}
.content .el-form-item__label {
  text-align: left;
}
.content .el-input {
  margin-left: 20px;
  border: 1px solid #ccc;
}
.content .el-form-item.is-required .el-form-item__label:before {
  content: '' !important;
  margin-right: 0px;
}
.content .el-form-item__error {
  text-align: left;
  padding-left: 20px;
}
</style>
<style scoped>
.verify-code {
  text-align: left;
}
.verify-code .el-input {
  width: 30%;
}
.verify-code .el-button {
  margin-left: 10px;
  display: inline-flex;
  background-color: #0d7dc8;
  border-color: #0d7dc8;
  border-radius: 2px;
}
.verify-code button span {
  margin: auto;
  font-size: 14px;
}
.content {
  margin-left: 8vw;
}
.content .form-item-title:nth-of-type(2) {
  margin-top: 1vw;
  margin-bottom: 1vw;
}
.submit-item .el-button {
  background-color: #0d7dc8;
}
</style>
