<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-1">
        <el-col :span="24">
          <img src="../assets/image/success_1.png">
        </el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="24" class="el-col-10">恭喜！您的手机号码修改成功！</el-col>
      </el-row>
    </el-form>
    <el-button @click="begin " class="el-btn ">完成</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'SettingBasicInfo',
  data () {
    return {

    }
  },
  methods: {
    begin () {
      let vm = this
      vm.$router.push({ path: '/setting' })
    },
    back () {
      history.back()
    }
  }
}
</script>
<style scoped>
.el-col-10 {
  font-family: PingFangSC-Regular;
  font-size: 5vw;
  color: #000000;
  text-align: center;
}
.yan {
  text-align: right;
  line-height: 5vw;
  font-size: 3vw;
  font-family: PingFang-SC-Medium;
  color: #2f7dcd;
}
.bgImg {
  background-image: url(../assets/image/card_bg.png);
  background-size: 100% 100%;
  background-color: #ffffff;
  color: #ffffff;
  border-radius: 3px;
  margin: 1vh auto;
  width: 94vw;
  height: 33vh;
}
.el-col-title {
  text-align: right;
  line-height: 5vw;
  font-size: 5vw;
  font-family: PingFang-SC-Medium;
  color: #999999;
}
.el-row-tip {
  font-size: 5vw;
  font-family: PingFang-SC-Bold;
  color: #333333;
  margin-bottom: 2vh;
}
.el-btn-in {
  background-color: #1388bd;
  color: #ffffff;
  line-height: 4vh;
  font-size: 6vw;
  font-family: PingFang-SC-Bold;
  border-radius: 10px;
  width: 40vw;
}
.el-btn-up {
  background-color: #ffffff;
  color: #000000;
  line-height: 4vh;
  font-size: 6vw;
  font-family: PingFang-SC-Bold;
  border-radius: 10px;
  width: 40vw;
}
.el-header {
  height: 100% !important;
  text-align: center;
  font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
  font-size: 4vh;
  color: #ffffff;
  background: #5077aa;
  letter-spacing: 1px;
  overflow: hidden;
}
.img {
  width: 20vh;
  height: 12vh;
  margin-left: 3vh;
  float: left;
}
.bgImg_row {
  margin: 3vh;
}
.bgImg_row .el-col {
  color: #ffffff;
}
.bgImg_row img {
  width: 6vw;
  height: 6vw;
}
</style>
