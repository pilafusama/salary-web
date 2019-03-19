<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <el-col :span="20" class="el-col-left">{{$t('signPasswordTitle1')}}</el-col>
        <el-col :span="4" class="el-col-left">
          <!-- <el-switch v-model="value1" active-color="#2F7DCD" inactive-color="#afb2b4"></el-switch> -->
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <a @click="changePassword">
          <el-col :span="22" class="el-col-left">{{$t('updateSignPassword')}}</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <!-- <el-row class="el-row-88bg el-row-bline" style="border-top: 1px solid #d9d9d9;">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row class="el-row-1">
        <a @click="changeCard">
          <el-col :span="22" class="el-col-left">{{$t('changeBindCard')}}</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <a @click="changePhoneNo">
          <el-col :span="22" class="el-col-left">{{$t('changePhoneNo')}}</el-col>
          <el-col :span="2" class="el-col-right">
            <div><img class="enterIcon" src="../assets/image/into.png"></div>
          </el-col>
        </a>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="22" class="el-col-left">{{$t('setFingerprintPassword')}}</el-col>
        <el-col :span="2" class="el-col-right">
        </el-col>
      </el-row> -->
    </el-form>
  </el-container>
</template>
<script>
export default {
  name: 'Setting',
  data () {
    return {
      value1: true,
      userName: '',
      idNo: ''
    }
  },
  methods: {
    changeCard () {
      // let vm = this
      // vm.$router.push({ path: '/changeCard' })
      this.$message('正在研发中,敬请期待...')
    },
    changePhoneNo () {
      this.$message('正在研发中,敬请期待...')
    },
    changePassword () {
      this.$router.push({ path: '/updatePassword' })
    },
    back () {
      let vm = this
      vm.$router.push({ path: '/homePage' })
    }
  }
}
</script>
<style scoped>
</style>
