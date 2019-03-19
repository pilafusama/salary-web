<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form style="height: 100vh !important;">
      <el-row>
        <el-col :span="24">
          <img class="msg-icon" src="../assets/image/fail_2.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-msg">{{$t('noSalaryCardMsg1')}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="el-col-msg">{{$t('noSalaryCardMsg2')}}</el-col>
      </el-row>
      <el-button @click="confirm" class="el-btn" style="margin-top: 25vh;">{{$t('btn_confirm')}}</el-button>
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'NoSalaryCard',
  methods: {
    confirm () {
      history.back()
    }
  }
}
</script>
<style scoped>
.el-col-msg {
  font-family: PingFangSC-Medium;
  font-size: 4.8vw;
  text-align: center;
  color: #1a1c1e;
}
.msg-icon {
  width: 22vw;
  margin: 17vh 0 4vh 0;
}
</style>
