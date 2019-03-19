<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="height: 100vh !important;">
      <el-row>
        <el-col :span="24">
          <img class="success-icon" src="../assets/image/success_1.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-success">{{$t('passwordUpdateSuccess')}}</el-col>
      </el-row>
      <el-button @click="complete" class="el-btn">{{$t('btn_complete')}}</el-button>
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'PasswordUpdateSuccess',
  data () {
    return {
      updatePwdFlag: this.$route.params.updatePwdFlag
    }
  },
  methods: {
    complete () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_szwcy_wc_click')
      if (this.updatePwdFlag) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/homeAllItem' })
      }
    }
  }
}
</script>
<style scoped>
.el-col-success {
  font-family: PingFangSC-Medium;
  font-size: 4.8vw;
  color: #1a1c1e;
  text-align: center;
  margin: 5vh 0 16vh 0;
}
.success-icon {
  width: 21vw;
  margin: 18vh 0 0 0;
}
</style>
