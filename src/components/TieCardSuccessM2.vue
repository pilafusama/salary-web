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
        <el-col :span="24" class="el-col-success">{{$t('openSuccessMsgM2')}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-prompt">{{$t('openSuccesspPromptM2')}}</el-col>
      </el-row>
      <el-button @click="setSignPassword" class="el-btn ">{{$t('setSignPassword')}}</el-button>
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'TieCardSuccessM2',
  data () {
    return {
    }
  },
  methods: {
    setSignPassword () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_szssmm')
      this.$router.push({ path: '/signPassword' })
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
  margin: 3vh 0 2vh 0;
}
.success-icon {
  width: 21vw;
  margin: 14vh 0 0 0;
}
.el-col-prompt {
  font-family: PingFangSC-Regular;
  font-size: 4vw;
  color: #9b9b9b;
  text-align: center;
  padding: 1vh 5vw 14vh 5vw;
  line-height: 1.6;
}
</style>
