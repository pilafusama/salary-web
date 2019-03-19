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
        <el-col :span="24" class="el-col-success">{{$t('pay_success')}}</el-col>
      </el-row>
    </el-form>
    <el-button @click="ok" class="el-btn" style="margin-top: 44vw;width:80%">{{$t('returnHome')}}</el-button>
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
  margin: 6vw 0;
}
.success-icon {
  width: 21vw;
  margin: 15vw 0 0 0;
}
</style>
