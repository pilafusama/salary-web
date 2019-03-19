<template>
  <el-container>
    <el-form style="font-size: 1.5vw;text-align: center;color:black;margin-right:1vw;">
      <el-row>
        <el-col :span="24 ">
          <img class="backImg" src="../assets/image/firstVisit.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;">
          发薪列表为空，请先配置模板
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24 " style="font-size: 1.2vw;font-family: PingFangHK-Medium;color: #666666;margin-bottom:2vw;">
          <el-button style="text-align:center;margin: 1vw 0;font-size:1.2vw;line-height:2vw;width:8vw;padding:0" class="el-btn" @click="goToConfigure()">去配置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goToConfigure (pageNum, pageSize) {
      let vm = this
      vm.$router.push({ path: '/salaryTemplet' })
    }
  }
}
</script>
<style scoped>
.backImg {
  width: 6vw;
  height: 6vw;
  margin-top: 35vh;
}
</style>
