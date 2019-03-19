<template>
  <el-container>
    <el-form class="codeDetail" ref="gridValidateForm" label-width="100px">
      <el-row style="border:none;background:#f3f3f3;color:#000000">
        <el-col style="text-align:center;margin: 10px 0;">
          <i class="el-icon-arrow-left back" @click="back">返回</i>推广二维码详细</el-col>
      </el-row>
      <div>
        <el-row class="style5">
          <el-col style="margin-top:2vw">
            <span class="style1">推广二维码</span>
            <span class="style2">可嵌入H5或Web页面，方便扫码注册企业微信和安装相关应用</span>
          </el-col>
        </el-row>
        <el-row class="style5 imgRow">
          <el-col><img :src="qRcodeConfigParam.promotion_qrcode" class="img">
            <span class="style6 style7" @click="upload">下载二维码</span>
          </el-col>
        </el-row>
        <el-row class="style5">
          <el-col>
            <span class="style2">URL:</span>
            <span class="style6">
              <a :href="qRcodeConfigParam.qrcode_url" style="text-decoration:none">{{qRcodeConfigParam.qrcode_url}}</a>
            </span>
          </el-col>
        </el-row>
        <el-row class="style4">
          <el-col>
            <hr>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="style2" :span="7">
            推广包名称
          </el-col>
          <el-col :span="17">
            <span class="style3">{{qRcodeConfigParam.qrcode_name}}</span>
            <!-- <span class="update">修改</span> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col class="style2" :span="7">
            推广包ID
          </el-col>
          <el-col class="style3" :span="17">
            <span class="style3">{{qRcodeConfigParam.template_id}}</span>
          </el-col>
        </el-row>
        <el-row class="style4">
          <el-col>
            <hr>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col class="style2" :span="7">
            安装的第三方应用
          </el-col>
          <el-col class="style3" :span="17">
            <span v-for=" (item,index) in $route.query.codeParams.app_list " :key="index ">
              <a class="appName">{{item.appName}}</a>
              <a class="appName" v-if="index< $route.query.codeParams.app_list.length-1 ">、</a>
            </span>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col class="style2" :span="7">
            推广银行
          </el-col>
          <el-col class="style3" :span="17">
            {{qRcodeConfigParam.bank_name}}
          </el-col>
        </el-row>
        <el-row class="style4">
          <el-col>
            <hr>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-dialog class="dialog" title="更多尺寸" :visible.sync="dialogVisibe">
      <el-form>
        <el-row>
          <el-col :span="20">
            <span>小尺寸:适用于屏幕类、宣传册等</span>
            <br/>
            <span class="style2">边长约8cm，最佳扫描距离0.5m</span>
          </el-col>
          <el-col :span="4">
            <a class="el-icon-download" @click="sureUpload('S')"></a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <span>中尺寸:适用于海报、展架等</span>
            <br/>
            <span class="style2">边长约15cm，最佳扫描距离1m</span>
          </el-col>
          <el-col :span="4">
            <a class="el-icon-download" @click="sureUpload('M')"></a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <span>大尺寸:适用于幕布、大型广告等</span>
            <br/>
            <span class="style2">边长约50cm，最佳扫描距离2.5m</span>
          </el-col>
          <el-col :span="4">
            <a class="el-icon-download" @click="sureUpload('L')"></a>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // grid_icon_src: '',
      dialogVisibe: false,
      qRcodeConfigParam: []
    }
  },
  methods: {
    back () {
      history.back()
    },
    upload () {
      this.dialogVisibe = true
    },
    sureUpload (size) {
      let vm = this
      vm.$http.post('/salary/bank_admin/download_promotion_qrcode', { promotion_qrcode_id: this.$route.query.promotion_qrcode_id, qrcode_size: size }).then((res) => {
        if (res.data.retcode === '0') {
          const imgUrl = res.data.promotion_qrcode
          // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
          if (window.navigator.msSaveOrOpenBlob) {
            var bstr = atob(imgUrl.split(',')[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            var blob = new Blob([u8arr])
            window.navigator.msSaveOrOpenBlob(blob, res.data.qrcode_name + '.' + 'png')
          } else {
            // 这里就按照chrome等新版浏览器来处理
            const a = document.createElement('a')
            a.href = imgUrl
            console.log(a.href)
            a.setAttribute('download', res.data.qrcode_name + '.' + 'png')
            a.click()
          }
          // this.$message.success('成功')
        } else {
          this.$message.error(res.data.errmsg)
        }
      })
    }
    // beforeupload (file) {
    //   let imgSize = file.size / 1024 < 48 // 暂定
    //   if (!imgSize) {
    //     this.$message.error('上传图片大小不能超过 48kb!')
    //     return false
    //   }
    //   let vm = this
    //   // 创建一个reader
    //   let reader = new FileReader()
    //   // 将图片将转成 base64 格式
    //   reader.readAsDataURL(file)
    //   // 读取成功后的回调
    //   reader.onloadend = function () {
    //     vm.$set('grid_icon_src', this.result)
    //   }
    // }
  },
  created () {
    let vm = this
    console.log(this.$route.query.promotion_qrcode_id)
    vm.$http.post('/salary/bank_admin/get_promotion_qrcode', { promotion_qrcode_id: this.$route.query.promotion_qrcode_id }).then((res) => {
      if (res.data.retcode === '0') {
        this.qRcodeConfigParam = res.data.qRcodeConfigParam
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
  }
}
</script>
<style>
.codeDetail input.el-input__inner {
  height: 4vw;
  line-height: 4vw;
  border: 1px solid #ccc;
  margin-top: 0.5vw;
  width: 90%;
}
.el-upload--picture-card {
  width: 5vw;
  height: 5vw;
  line-height: 5vw;
}
.dialog .el-dialog__header {
  background: #f3f3f3;
  text-align: left;
}
.dialog .el-dialog__title {
  color: #000000;
}
</style>
<style scoped>
.back {
  font-size: 1.5vw;
  margin: 0;
  height: 4vw;
  line-height: 4vw;
  margin-left: -4vw;
}
.back:hover {
  cursor: pointer;
  background: none;
  opacity: 0.8;
}
.codeDetail {
  width: 90%;
}
.codeDetail div {
  padding: 0 2vw;
}
.el-row {
  color: black;
  font-size: 1.8vw;
}
.el-col {
  line-height: 4vw;
  text-align: left;
}
.button {
  background: #0099ff;
  color: #ffffff;
}
.style1 {
  font-size: 1.8vw;
}
.style2 {
  font-size: 1.5vw;
  color: #ccc;
}
.style3 {
  font-size: 1.5vw;
}
.imgRow .el-col {
  height: 6vw;
  line-height: 6vw;
}
.img {
  width: 6vw;
  height: 6vw;
}
hr {
  padding: 0;
  margin: 0;
}
.style4 .el-col {
  margin: 2vw 0;
  height: 1px;
}
.style5 {
  margin: 1vw 0;
}
.style6 {
  color: blue;
  font-size: 1.5vw;
}
.style6:hover {
  opacity: 0.7;
  cursor: pointer;
}
.style7 {
  padding: 1vw;
}
.update {
  color: blue;
  font-size: 1.5vw;
}
.update:hover {
  opacity: 0.7;
  cursor: pointer;
}
.dialog .el-col {
  height: 3vw;
  line-height: 3vw;
}
.dialog .el-row {
  height: 10vw;
  border: 1px solid #ccc;
  margin-bottom: 1vw;
  border-radius: 5px;
  padding: 2vw;
}
.dialog a {
  font-size: 2.5vw;
  width: 3vw;
  height: 3vw;
  line-height: 3vw;
  text-align: center;
  border: 1px solid #4a77ab;
  background: #4a77ab;
  border-radius: 50px;
  color: #ffffff;
  margin-top: 1vw;
}
.dialog i:hover {
  opacity: 0.8;
}
/* div >>> .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
} */
</style>
