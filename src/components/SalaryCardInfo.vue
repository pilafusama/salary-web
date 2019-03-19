<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg">
        <el-col :span="24" style="height: 4vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <a @click="toMySalaryCard">
          <el-col :span="9" class="el-col-left">工资卡</el-col>
          <el-col :span="13" class="el-col-msg">工资发放至此卡</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <a @click="toMyFinanceAccount">
          <el-col :span="9" class="el-col-left">工资理财账户</el-col>
          <el-col :span="13" class="el-col-msg">薪资理财专属账户</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <el-row class="el-row-88bg">
        <el-col :span="24" style="height: 3vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <a @click="toCardPackage">
          <el-col :span="22" class="el-col-left">卡包</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <el-row class="el-row-88bg">
        <el-col :span="24" style="height: 2vw;"></el-col>
      </el-row>
      <!-- <el-row class="el-row-1">
        <a @click="toSetting">
          <el-col :span="22" class="el-col-left">设置</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row> -->
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'SalaryCardInfo',
  data () {
    return {
    }
  },
  methods: {
    toMySalaryCard () {
      this.$router.push({ path: '/myAccount' })
    },
    toMyFinanceAccount () {
      this.$router.push({ path: '/payAccount' })
    },
    toCardPackage () {
      this.$message('正在研发中,敬请期待...')
    },
    toSetting () {
      this.$router.push({ path: '/setting' })
    }
  }
}
</script>
<style scoped>
.el-row-1 {
  margin: 2.5vw 2vw 2.5vw 5vw;
}
.el-col-msg {
  font-family: PingFangHK-Regular;
  font-size: 4.2vw;
  line-height: 10vw;
  color: #b9b9b9;
  letter-spacing: 0;
  text-align: left !important;
}
</style>
