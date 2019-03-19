<template>
  <el-dialog :lock-scroll="false" title="腾讯薪管家个人信息授权协议" :visible.sync="showDialog2" @close="closeDialog" width="100%" style="overflow: hidden;">
    <div class="dialog-body-box">
      <p>
        《个人信息授权协议》（以下简称“本协议”）由你与深圳市腾讯计算机系统有限公司（以下简称“腾讯”或“我们”）签订，为了充分保护你的合法权益，我们在此与你就你开通、使用腾讯薪管家服务（以下亦可简称“本服务”）过程中有关采集、使用、处理你个人信息的相关事项进行约定。
      </p>
      <p class="p-font-bold" style="text-decoration: underline;">
        我们特别提示你，你在前述页面点击“已阅读并同意《个人信息授权协议》”或点击按钮“同意”的行为视为你已经充分阅读并理解、同意本协议的内容并作出相关授权。
      </p>
      <p class="p-font-bold" style="text-decoration: underline;">
        一、为了在你开通、使用腾讯薪管家服务时识别你的身份，你同意并授权腾讯可以获取你绑定的企业微信手机号码、企业微信头像、邮箱。同时，你同意并授权腾讯可通过其合作的依法运营数据库的主体比对你的手机号码。如你不同意提供该信息，将无法使用本服务。
      </p>
      <p class="p-font-bold" style="text-decoration: underline;">
        二、为了你使用薪管家服务之目的，你同意并授权腾讯可以采集、存储并处理你的姓名、公民身份证号码、银行卡信息，并同意腾讯可以将你的上述信息提供给你所在的企业。如你不同意提供该信息，将无法使用本服务。
      </p>
      <p class="p-font-bold" style="text-decoration: underline;">
        三、为了你使用银行提供的账户服务之目的，银行通过我们收集你的信息，包括你的姓名、公民身份证号码、银行卡信息、人脸照片、手机号码等可以识别你身份的个人信息，你同意腾讯可以将你的上述信息提供给银行。如你不同意提供该信息，可能无法使用本服务。
      </p>
      <p class="p-font-bold" style="text-decoration: underline;">
        四、我们在此特别提示你，如果你在薪管家平台使用合作方的产品或业务中，需要合作方向腾讯采集或委托腾讯收集、处理你的个人信息，合作方须取得你的相应授权。
      </p>
      <p>
        五、我们收集你的个人信息仅在你使用腾讯薪管家服务以及银行或其他第三方通过薪管家提供的服务范围内使用，未经你的明确同意，我们不会用于其他用途。
      </p>
      <p>
        六、保护用户个人信息是腾讯的一项基本原则，腾讯将会采取合理的措施保护用户的个人信息。除法律法规规定以及你在此明确授权的情形外，未经用户同意，腾讯不会向第三方公开、透露用户个人信息。腾讯对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。
      </p>
      <p>
        七、腾讯将运用各种安全技术和程序建立完善的管理制度来保护你的个人信息，对你的个人信息进行严格保密，以免遭受未经授权的访问、使用或披露。
      </p>
      <p>
        八、本协议作为《腾讯薪管家服务协议》不可分割的有效组成部分，具有同等法律效力。
      </p>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ProtocolInformationDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog2: false
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.showDialog2 = val
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog2')
    }
  }
}
</script>
<style>
</style>
<style scoped>
.dialog-body-box p {
  margin: 0 0;
  padding: 1vw 0 0 0;
}
.p-font-bold {
  font-weight: bold;
  color: black;
}
div >>> .el-dialog {
  background-color: inherit;
  border-radius: 6px;
  margin-top: 10vh !important;
}
div >>> .el-dialog__header {
  background-color: #ffffff;
  padding: 2vh 0;
  border-radius: 6px 6px 0 0;
  border-bottom: solid 1px #bbbbbb;
}
div >>> .el-dialog__headerbtn {
  top: 2vh;
  line-height: 26px;
}
div >>> .el-dialog__body {
  font-size: 3.2vw;
  text-align: left;
  line-height: 1.6;
  letter-spacing: 1.2px;
  padding: 2vh 4vw 3vh 4vw;
  border-radius: 0 0 6px 6px;
  background-color: #ffffff;
  overflow: scroll;
  height: 65vh;
}
div >>> .el-dialog__title {
  color: #000000;
  font-size: 4vw;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  height: 6vw;
}
div >>> .el-dialog__close:before {
  color: #000;
  font-size: 5vw;
}
</style>
