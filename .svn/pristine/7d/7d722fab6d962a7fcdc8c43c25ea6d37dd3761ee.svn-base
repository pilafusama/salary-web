<template>
  <div>
    <div class="show">
      <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
      <input ref="uploadPhoto" type="file" id="upload" name="upload" class="uploadInput" accept="video/*" capture="camcorder" @change="upload">
      <label for="upload"></label>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import EXIF from 'exif-js'
export default {
  name: 'VideoView',
  props: {
    bgImageURL: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headerImage: '',
      fileValue: ''
    }
  },
  mounted () {
    this.headerImage = require('../assets/image/' + this.bgImageURL)
  },
  methods: {
    startPhoto () {
      this.$refs.uploadPhoto.click()
    },
    upload (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.fileValue = files[0];
      this.videoPreview(this.fileValue);
    },
    videoPreview (file) {
      let self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^video/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将视频文件将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = result;
          let imgNum = img.split(";base64,");
          let imgBase = imgNum[1];
          // 判断视频文件是否小于30M,是就直接上传，反之重新拍摄
          if (this.result.length <= (30 * 1024 * 1024)) {
            self.postVideo(imgBase);
          } else {
            self.$message({
              showClose: true,
              message: '您拍摄的视频文件过大，请重新拍摄上传!',
              type: 'error'
            })
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: '您上传的文件格式不正确，请重新上传!',
          type: 'error'
        })
      }
    },
    // 接口(调用父组件 postVideoData 方法)
    postVideo (videoData) {
      this.$emit('postVideoData', videoData);
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.uploadInput {
  width: 0;
  height: 0;
}
</style>
<style scoped>
.picture {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>