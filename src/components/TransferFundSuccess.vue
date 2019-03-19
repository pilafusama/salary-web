<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="background-color: #F5F5F5;">
      <el-row>
        <el-col :span="24">
          <img class="success-icon" src="../assets/image/success_1.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-success">{{$t('trans_success')}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="color: #888888;font-size: 4vw;margin-bottom: 40vw;">{{$t('trans_tip')}}</el-col>
      </el-row>
    </el-form>
    <el-button @click="ok" class="el-btn">{{$t('btn_complete')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {
      value1: true,
      userName: '',
      idNo: ''
    }
  },
  methods: {
    ok () {
      // eslint-disable-next-line
      MtaH5.clickStat('zym_xzlc_zjzc_wc_click')
      this.$router.push({ path: '/homePage' })
    },
    back () {
      this.$router.push({ path: '/homePage' })
    }
  }
}
</script>
<style scoped>
.el-col-success {
  font-family: PingFangSC-Medium;
  font-size: 5vw;
  color: #1a1c1e;
  text-align: center;
  margin: 7vw 0 3.5vw 0;
}
.success-icon {
  width: 22vw;
  margin: 14vw 0 0 0;
}
.el-btn {
  width: 80%;
  height: 12vw;
  line-height: 12vw;
  margin: 0 auto;
  padding: 0;
}
</style>
