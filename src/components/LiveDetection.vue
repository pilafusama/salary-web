<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <div v-if="videoPostFlag=='0'">
        <el-row class="row-text-1">{{$t('msgLiveDetection1')}}</el-row>
      </div>
      <div v-else-if="videoPostFlag=='1'">
        <el-row class="row-text-1">{{$t('msgLiveDetectionOk1')}}</el-row>
      </div>
      <div v-else-if="videoPostFlag=='2'">
        <el-row class="row-text-1" style="height: 4vh;"></el-row>
      </div>
      <el-row>
        <div class="video-box">
          <video-view ref="videoChild" v-on:postVideoData="postVideo" v-bind:bgImageURL="backgroundImage"></video-view>
        </div>
      </el-row>
      <div v-if="videoPostFlag=='0'">
        <el-row class="row-text-2">{{$t('msgLiveDetection2')}}</el-row>
        <el-row class="row-number">
          <el-col class="col-number" v-for="item in liveDecNumArr" :key="item.index">{{item}}</el-col>
        </el-row>
      </div>
      <div v-else-if="videoPostFlag=='1'">
        <el-row class="row-text-2"></el-row>
        <el-row class="row-number"></el-row>
      </div>
      <div v-else-if="videoPostFlag=='2'">
        <el-row class="row-text-fail">{{$t('msgLiveDetectionFail')}}</el-row>
      </div>
      <div v-if="videoPostFlag=='0'">
        <el-button @click="beginPhoto" class="el-btn btn">{{$t('btn_beginPhoto')}}</el-button>
      </div>
      <div v-else-if="videoPostFlag=='1' & !updatePwdFlag">
        <el-button @click="savePictureTobank" class="el-btn btn">{{$t('btn_submit')}}</el-button>
      </div>
      <div v-else-if="videoPostFlag=='1' & updatePwdFlag">
      </div>
      <div v-else-if="videoPostFlag=='2'">
        <el-button @click="uploadAgain" class="el-btn btn">{{$t('btn_sure')}}</el-button>
      </div>
    </el-form>
    <submit-check v-bind:loadingFlag="showLoadingFlag"></submit-check>
  </el-container>
</template>

<script>
import VideoView from '@/components/VideoView'
import SubmitCheck from '@/components/SubmitCheck'

export default {
  name: 'LiveDetection',
  data () {
    return {
      backgroundImage: 'headPhoto.png',
      liveDecNum: '',
      videoPostFlag: '0', // 0：初始状态  1：识别成功  2：识别失败
      liveDecNumArr: [],
      videoDatas: '',
      updatePwdFlag: false,
      compressFlag: false,
      showLoadingFlag: false
    }
  },
  components: {
    VideoView,
    SubmitCheck
  },
  created () {
    if (this.$route.params.updatePwdFlag) {
      this.updatePwdFlag = this.$route.params.updatePwdFlag
    }
  },
  mounted () {
    this.getVerificationCode()
  },
  methods: {
    back () {
      history.back()
    },
    // 获取数字
    getVerificationCode () {
      let vm = this
      vm.$http.post('/salary/h5/get_liveness_detection_number').then(
        function (result) {
          vm.liveDecNum = result.data.number
          vm.liveDecNumArr = vm.liveDecNum.split('')
        }
      )
    },
    postVideo (videoData) {
      this.videoDatas = videoData
      let ua = navigator.userAgent // 获取userAgent信息
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        this.compressFlag = false // 不压缩
      } else {
        this.compressFlag = true // 压缩
      }
      this.showLoadingFlag = true
      let vm = this
      this.$http.post('/salary/h5/upload_liveness_detection_video', { number: this.liveDecNum, video: this.videoDatas, type: vm.updatePwdFlag, compress_flag: vm.compressFlag }).then(
        function (result) {
          vm.showLoadingFlag = false
          // 正确进入下一步，错误重新验证
          if (result.data.stateFlag === '0') {
            vm.$refs.videoChild.headerImage = 'data:image/png;base64,' + result.data.picture
            vm.videoPostFlag = '1'
            if (vm.updatePwdFlag) {
              vm.$router.push({
                path: '/signPassword',
                name: 'SignPassword',
                params: { signPasswordState: '0', updatePwdFlag: vm.updatePwdFlag }
              })
            }
          } else {
            // 如果不通过，跳转到openpayrollone
            vm.videoPostFlag = '2'
            // vm.$alert(result.data.errmsg, '提示', {
            //   confirmButtonText: '确定',
            //   type: 'warning',
            //   showClose: false,
            //   customClass: 'message-box-live',
            //   center: true
            // }).then(() => {
            //   location.reload()
            //   vm.videoPostFlag = false
            // })
          }
        }
      )
    },
    beginPhoto () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_rlsb_ksps_click')
      this.$refs.videoChild.startPhoto()
    },
    savePictureTobank () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_rlsb_wc_click')
      // 提交
      let vm = this
      this.$http.post('/salary/h5/verify_user').then(
        function (result) {
          // 正确进入下一步，错误重新验证
          if (result.data.stateFlag === '0') {
            vm.$router.push({ path: '/newTieCard' })
          } else {
            // 如果不通过，跳转到openpayrollone
            vm.$alert(result.data.errmsg, '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              showClose: false,
              customClass: 'message-box-live',
              center: true
            }).then(() => {
              vm.$router.push({ path: '/openPayRollOne' })
            })
          }
        }
      )
    },
    uploadAgain () {
      location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.message-box-live {
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
.message-box-live .el-message-box__message {
  font-size: 5.5vw;
}
</style>
<style scoped>
div >>> .el-btn:focus,
.el-btn:hover {
  background-color: #2f7dcd;
  color: #ffffff;
  line-height: 7vw;
  font-family: PingFang-SC-Bold;
  margin: 5vh 5vw;
  border-radius: 8px;
}
.el-form {
  margin: 0 auto;
  background-color: #34353a;
  height: 100vh !important;
}
div >>> .show {
  width: 100%;
  height: 60vw;
  overflow: hidden;
  position: relative;
  /* border: 1px solid #d5d5d5; */
  border-radius: 50%;
  background-color: #5d7076;
}
.row-text-1 {
  font-family: PingFangHK-Regular;
  font-size: 3vh;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin: 9.3vh 23.3vw 7.2vh 23.3vw;
}
.row-text-2 {
  font-family: PingFangHK-Regular;
  font-size: 2.1vh;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin: 7.2vh 2vw 2.4vh 2vw;
}
.row-text-fail {
  font-family: PingFangHK-Regular;
  font-size: 3vh;
  color: #f1a423;
  letter-spacing: 0;
  text-align: center;
  margin: 9vh 2vw 8vh 2vw;
}
.row-number :first-child {
  margin: 0vh 4vw 0vh 12vw;
}
.row-number :last-child {
  margin: 0vh 12vw 0vh 0vw;
}
.col-number {
  width: 16vw;
  height: 9vh;
  border: 2px solid #888888;
  border-radius: 10px;
  font-family: PingFangHK-Regular;
  font-size: 7vh;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin: 0vh 4vw 0vh 0vw;
}
.video-box {
  width: 60vw;
  height: 60vw;
  margin: auto;
}
.btn {
  width: 90vw;
  margin: 5vh 5vw;
}
</style>
