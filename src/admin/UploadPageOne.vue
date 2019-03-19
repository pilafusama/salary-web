<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: center;color:black;margin-right:1vw;height: 96.5vh !important;">
      <el-row class="backImg">
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">
          请选择发薪月份
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24 ">
          <el-date-picker format="yyyy 年 MM 月" value-format="yyyyMM" v-model="selDate" type="month" placeholder="选择月份">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-top:2vw;">
          <el-button style="text-align:center;margin: 1vw 0;font-size:1.2vw;line-height:2vw;width:8vw;padding:0" class="el-btn" @click="next()">下一步</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      selDate: ''
    }
  },
  methods: {
    next () {
      let vm = this
      if (vm.selDate === '') {
        vm.$message.warning('请选择日期！')
        return false
      } else {
        sessionStorage.setItem('selDate', JSON.stringify(vm.selDate))
        vm.$router.push({ path: '/uploadPage' })
      }
    }
  }
}
</script>
<style scoped>
div >>> .el-input__inner {
  padding-left: 50px;
  border: 0;
  text-align: left !important;
  font-size: 1.1vw;
  line-height: 2.6vw;
  height: 2.6vw;
  border: 1px solid #dcdfe6;
}
div >>> .el-input__icon {
  height: 100%;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 2.6vw;
  font-size: 2vw;
}
div >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 18vw;
}
.backImg {
  margin-top: 35vh;
}
</style>
