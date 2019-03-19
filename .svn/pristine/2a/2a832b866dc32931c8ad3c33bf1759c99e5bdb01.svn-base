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
        <el-col :span="11" class="el-row-88bg-text" style="margin: 4vw 0 3.5vw 4vw;">{{$t('uploadIdCard')}}</el-col>
        <el-col :span="11" style="margin:4vw 4vw 3.5vw 0;text-align: right;color: #5077AA;">
          <span @click="openDialog">{{$t('viewDemo')}}</span>
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="12" class="el-col-photo">
          <photo-view ref="photoViewChild1" v-on:postImgData="postImageData1" v-on:startTakingPhoto="beginPhotograph('1')" v-bind:bgImageURL="backgroundImage1" v-bind:imageShowFlag="imgShowFlag"></photo-view>
        </el-col>
      </el-row>
      <el-row>
        <a @click="beginPhotograph('1')">
          <div class="photo-msg">
            <img class="photo-icon" src="../assets/image/photograph2.png">
            <span style="vertical-align: top;">拍摄人像面</span>
          </div>
        </a>
      </el-row>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="12" class="el-col-photo">
          <photo-view ref="photoViewChild2" v-on:postImgData="postImageData2" v-on:startTakingPhoto="beginPhotograph('2')" v-bind:bgImageURL="backgroundImage2" v-bind:imageShowFlag="imgShowFlag"></photo-view>
        </el-col>
      </el-row>
      <el-row>
        <a @click="beginPhotograph('2')">
          <div class="photo-msg">
            <img class="photo-icon" src="../assets/image/photograph2.png">
            <span style="vertical-align: top;">拍摄国徽面</span>
          </div>
        </a>
      </el-row>
      <!-- <el-row class="el-row-icondes el-row-bline">
        <el-col :span="12">{{$t('idCardFront')}}</el-col>
        <el-col :span="12">{{$t('idCardOther')}}</el-col>
      </el-row> -->
      <!-- <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="margin:4vw 0 4vw 4vw;text-align: left;">{{$t('autoWrite')}}</el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-left">{{$t('userName')}}</el-col>
        <el-col :span="18" v-bind:class="{'color888':!flag1, 'black':flag1}">{{user.userName}}
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-left">{{$t('idNo')}}</el-col>
        <el-col :span="18" v-bind:class="{'color888':!flag1, 'black':flag1}">{{user.cardId}}
        </el-col>
      </el-row> -->
    </el-form>
    <!-- <el-button @click="next" v-bind:class="{'el-btn-disable': flag, 'el-btn':!flag}" :disabled="flag">{{$t('next')}}</el-button> -->
    <div v-if="frontUploadSuccessFlag & backUploadSuccessFlag">
      <el-button @click="next" class="el-btn btn">{{$t('next')}}</el-button>
    </div>
    <payroll-dialog v-show="showDialog" v-model="showDialog" @closeDialog="closeDialog">
    </payroll-dialog>
  </el-container>
</template>
<script>
import payrollDialog from './PayRollDialog'
import PhotoView from '@/components/PhotoView'

export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      // flag1: false,
      // flag: true,
      user: {
        userName: '',
        cardId: ''
      },
      showDialog: false,
      // cardId: '',
      backgroundImage1: 'IDCard_front.png',
      backgroundImage2: 'IDCard_back.png',
      imgShowFlag: 'Y',
      idCardPhoto1: '',
      idCardPhoto2: '',
      // openAccountMode: JSON.parse(sessionStorage.getItem('open_account_mode')),
      frontUploadSuccessFlag: false,
      backUploadSuccessFlag: false
    }
  },
  methods: {
    beginPhotograph (paramValue) {
      let examPhotoUrl = require('../assets/image/photo_example.png')
      this.$alert('<div><img src=' + examPhotoUrl + ' /></div><span>边框完整展示、字迹清晰、亮度均匀</span>', '身份证拍摄范例', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '开始拍摄',
        showClose: false,
        customClass: 'photo-example-box',
        center: true
      }).then(() => {
        if (paramValue === '1') {
          this.$refs.photoViewChild1.startPhotoIdCard()
        } else {
          this.$refs.photoViewChild2.startPhotoIdCard()
        }
      })
    },
    postImageData1 (imageData) {
      this.idCardPhoto1 = imageData.substring(imageData.indexOf(',') + 1)
      if (this.idCardPhoto2 !== '' && this.backUploadSuccessFlag) {
        this.saveImageData()
      } else {
        this.saveImageData2(true, this.idCardPhoto1)
      }
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_sfjy_zm_click')
    },
    postImageData2 (imageData) {
      this.idCardPhoto2 = imageData.substring(imageData.indexOf(',') + 1)
      if (this.idCardPhoto1 !== '' && this.frontUploadSuccessFlag) {
        this.saveImageData()
      } else {
        this.saveImageData2(false, this.idCardPhoto2)
      }
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_sfjy_fm_click')
    },
    // 调用身份证上传接口（正反面一起校验）
    saveImageData () {
      let vm = this
      this.$http.post('/salary/h5/upload_id_card_photos', { id_card_front_photo: this.idCardPhoto1, id_card_back_photo: this.idCardPhoto2 }).then(
        function (result) {
          // 判断上传的照片是否正确
          if (result.data.stateFlag === '1') {
            vm.openFrontFailMsgBox()
            vm.frontUploadSuccessFlag = false
          } else if (result.data.stateFlag === '2') {
            vm.openBackFailMsgBox()
            vm.backUploadSuccessFlag = false
          } else {
            // vm.flag1 = true
            vm.frontUploadSuccessFlag = true
            vm.backUploadSuccessFlag = true
            vm.user.userName = result.data.id_card_name
            vm.user.cardId = result.data.id_card_number
          }
        }
      )
    },
    // 调用身份证上传接口（校验正面或反面）
    saveImageData2 (isFrontPhoto, idCardPhotoData) {
      let vm = this
      this.$http.post('/salary/h5/verify_id_card_photo', { is_front_photo: isFrontPhoto, id_card_photo: idCardPhotoData }).then(
        function (result) {
          // 上传的照片不正确
          if (result.data.stateFlag === '1') {
            if (isFrontPhoto) {
              vm.openFrontFailMsgBox()
            } else {
              vm.openBackFailMsgBox()
            }
          } else {
            if (isFrontPhoto) {
              vm.frontUploadSuccessFlag = true
            } else {
              vm.backUploadSuccessFlag = true
            }
          }
        }
      )
    },
    // 身份证正面识别失败提示框
    openFrontFailMsgBox () {
      let frontPhotoUrl = require('../assets/image/photo_example_front.png')
      this.$alert('<div class="upload-fail-msg">请确保身份证边框完整，重新拍摄</div><div><img src=' + frontPhotoUrl + ' /></div>', '身份证正面识别失败', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '我知道了',
        showClose: false,
        customClass: 'photo-example-box',
        center: true
      }).then(() => {
      })
    },
    // 身份证背面识别失败提示框
    openBackFailMsgBox () {
      let backPhotoUrl = require('../assets/image/photo_example_back.png')
      this.$alert('<div class="upload-fail-msg">身份证背面四条边框不完整，请确保身份证边框完整，重新拍摄</div><div><img src=' + backPhotoUrl + ' /></div>', '身份证背面识别失败', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '我知道了',
        showClose: false,
        customClass: 'photo-example-box',
        center: true
      }).then(() => {
      })
    },
    next () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_sfjy_xyb_click')
      let vm = this
      vm.$router.push({
        path: '/idCardCheckSuccess',
        name: 'IdCardCheckSuccess',
        params: { userName: vm.user.userName, cardId: vm.user.cardId }
      })
    },
    openDialog () {
      this.showDialog = true
    },
    back () {
      history.back()
    },
    closeDialog () {
      this.showDialog = false
    }
  },
  components: {
    payrollDialog,
    PhotoView
  }
}
</script>
<style>
.photo-example-box {
  width: 90vw !important;
  padding-bottom: 0;
  font-size: 3vh;
  font-family: PingFangHK-Regular;
}
.photo-example-box .el-message-box__header {
  padding-top: 20px;
}
.photo-example-box .el-message-box__header .el-message-box__title {
  color: #000;
  font-size: 4.8vw;
  letter-spacing: 1px;
}
.photo-example-box img {
  width: 90%;
}
.photo-example-box .el-message-box__message span {
  color: #000;
  font-size: 4.2vw;
}
.photo-example-box .el-message-box__content {
  padding: 1vh 4vw 4vh 4vw;
}
.photo-example-box .el-message-box__btns {
  padding: 1vh;
  border-top: 1px solid #e7e7e7;
}
.photo-example-box .el-message-box__btns button {
  color: #3080ce;
  background-color: #fff;
  border: 0;
  font-size: 5vw;
}
.upload-fail-msg {
  font-size: 4vw;
  color: #8c8c8c;
  padding: 0 8vw 4vh 8vw;
}
</style>
<style scoped>
.el-col-photo {
  width: 60%;
  margin: 0 auto;
  float: none;
}
.photo-msg {
  font-family: PingFang-SC-Bold;
  font-size: 4.8vw;
  color: #5077aa;
  padding: 3vw;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #eaeaea;
}
.photo-icon {
  width: 7vw;
  padding-right: 1vw;
}
.color888 {
  font-size: 4.5vw;
  padding-left: 2vw;
  color: #b2b2b2;
  text-align: left;
  line-height: 10vw;
}
.black {
  padding-left: 2vw;
  color: #000000;
  text-align: left;
  line-height: 10vw;
}
.img {
  width: 45vw;
  height: 25vw;
  float: left;
}
div >>> .is-disabled {
  background: #ffffff;
  opacity: 0.5;
}
div >>> .show {
  width: 100%;
  height: 36vw;
  overflow: hidden;
  position: relative;
  /* border: 1px solid #d5d5d5; */
  float: left;
}
.el-row-icondes {
  padding: 0 0 1vh 0;
  font-family: PingFangSC-Regular;
  font-size: 3.5vw;
  color: #b2b2b2;
  letter-spacing: 0;
}
</style>
