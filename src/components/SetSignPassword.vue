<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="background-color: #F5F5F5;">
      <el-row>
        <el-col :span="24">
          <img class="msg-icon" src="../assets/image/setPassword.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-msg">{{$t('toSetSignPasswordMsg')}}</el-col>
      </el-row>
    </el-form>
    <el-button @click="toSetSignPassword" class="el-btn" style="margin-top: 60vw;">{{$t('setSignPassword')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SetSignPassword',
  data () {
    return {
      updatePwdFlag: this.$route.params.updatePwdFlag
    }
  },
  methods: {
    toSetSignPassword () {
      this.$router.push({ path: '/signPassword' })
    }
  }
}
</script>
<style scoped>
.el-col-msg {
  font-family: PingFangSC-Medium;
  font-size: 4vw;
  color: #545454;
  text-align: center;
  margin: 5vh 0 0 0;
  letter-spacing: 0;
}
.msg-icon {
  width: 18vw;
  margin: 20vw 0 0 0;
}
</style>
