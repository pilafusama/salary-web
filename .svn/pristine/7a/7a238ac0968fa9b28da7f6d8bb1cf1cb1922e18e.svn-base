<template>
  <el-container :style="{background:'url(' + require('../assets/image/' + bgImg) + ') no-repeat center center',backgroundSize:'100% 100%'}">
    <div>
      <el-button class="button el-btn" @click="auth">授权</el-button>
      <el-button class="button el-btn" @click="reg">注册</el-button>
    </div>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // url: 'http://wxwork.tenpay.com/****/?bankID=BCCB&applyID=00221&applyID=00222',
      register_url: '',
      auth_url: '',
      bgImg: 'home_bg.png'
    }
  },
  created () {
    console.info(this.$route.query.qrcodeId)
    let vm = this
    vm.$http.post('/salary/admin/get_install_url', { promotion_qrcode_id: this.$route.query.qrcodeId }).then((res) => {
      if (res.data.retcode === '0') {
        this.register_url = res.data.register_url
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
    vm.$http.post('/salary/admin/get_install_page', { promotion_qrcode_id: this.$route.query.qrcodeId }).then((res) => {
      if (res.data.retcode === '0') {
        this.auth_url = res.data.register_url
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
  },
  methods: {
    reg () {
      console.info(this.register_url)
      window.location.href = this.register_url
      // var url = location.search
      // var url = this.url // 获取url中"?"符后的字串
      // var theRequest = 'http://wxwork.tenpay.com/'
      // if (url.indexOf('?') !== -1) {
      //   theRequest = theRequest + url.substring(url.indexOf('?') + 1)
      // }
      // console.log(theRequest)
    },
    auth () {
      console.info(this.auth_url)
      window.location.href = this.auth_url
    }
  }
}
</script>
<style scoped>
.el-container {
  width: 100vw;
  height: 100vh;
}
.button {
  width: 42vw;
  background: #0099ff;
  border: none;
}
div {
  margin: auto;
}
</style>
