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
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 6vh;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left" style="padding-left: 5vw;">{{$t('userName')}}</el-col>
        <el-col :span="16" class="el-col-text">{{userName}}</el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="8" class="el-col-left" style="padding-left: 5vw;">{{$t('idNo')}}</el-col>
        <el-col :span="16" class="el-col-text">{{idCardNo}}</el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
    </el-form>
    <el-row>
      <el-button @click="toPreviousStep" class="el-btn el-btn-left">{{$t('previous')}}</el-button>
      <el-button @click="next" class="el-btn btn">{{$t('btn_confirm')}}</el-button>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: 'IdCardCheckSuccess',
  data () {
    return {
      userName: this.$route.params.userName,
      idCardNo: this.$route.params.cardId,
      isOpenAccountAllowed: JSON.parse(sessionStorage.getItem('is_open_account_allowed')),
      openAccountStartTime: JSON.parse(sessionStorage.getItem('open_account_start_time')),
      openAccountEndTime: JSON.parse(sessionStorage.getItem('open_account_end_time'))
    }
  },
  methods: {
    next () {
      let vm = this
      vm.$http.post('/salary/h5/query_exist_category2_accounts').then(
        function (result) {
          if (result.data.retcode === '0') {
            if (result.data.Vld_Rcrd_Cnt === '0') {
              if (vm.isOpenAccountAllowed) {
                vm.openMsgBox()
              } else {
                vm.$message({
                  message: '目前不在开户时间段内，请在' + vm.openAccountStartTime + '至' + vm.openAccountEndTime + '之内进行开户操作！',
                  type: 'warning'
                })
              }
            } else {
              sessionStorage.setItem('ea02_group', JSON.stringify(result.data.ea02_group))
              vm.$router.push({ path: '/selectExitAcc' })
            }
          }
        }
      )
    },
    openMsgBox () {
      let failIcon = require('../assets/image/fail_1.png')
      this.$confirm('<div class="fail-icon-col"><img src=' + failIcon + ' /></div><span>即将进行人脸识别，请确认你自愿开通绑定账户，所提交资料真实有效，随后录制视频并朗读指定数字</span>', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'confirm-msg-box',
        center: true
      }).then(() => {
        this.$router.push({ path: '/liveDetection' })
      }).catch(() => {
      })
    },
    toPreviousStep () {
      let vm = this
      vm.$router.push({ path: '/openPayRollOne' })
    }
  }
}
</script>
<style>
.confirm-msg-box {
  width: 88vw !important;
  padding-bottom: 0;
  font-size: 3vh;
  font-family: PingFangHK-Regular;
  border-radius: 10px;
  /* vertical-align: inherit; */
}
.confirm-msg-box .el-message-box__header {
  padding: 0;
}
.confirm-msg-box .el-message-box__content {
  padding: 2vh 7vw 3vh 7vw;
  font-size: 4.2vw;
  color: #333333;
  letter-spacing: 1px;
  text-align: left;
}
.confirm-msg-box .el-message-box__btns button:first-child {
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
.confirm-msg-box .el-message-box__btns button:last-child {
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
.confirm-msg-box .fail-icon-col {
  text-align: center;
  padding: 2vh 5vw;
}
.confirm-msg-box .fail-icon-col img {
  width: 10vh;
}
</style>
<style scoped>
.el-col-text {
  font-size: 4.5vw;
  padding-left: 2vw;
  color: #999999;
  text-align: left;
  line-height: 10vw;
}
.el-btn {
  width: 44vw;
  margin-top: 8vw;
}
.el-btn-left {
  background: #ffffff;
  color: #000000;
  margin-right: 4vw;
}
</style>
