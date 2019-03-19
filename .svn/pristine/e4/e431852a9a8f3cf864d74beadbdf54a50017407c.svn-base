<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="el-top-steps">
      <el-row class="el-top-steps-row">
        <el-steps :active="2" align-center finish-status="success">
          <el-step>
            <template slot="description">{{$t('checkIdentity')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('bindPayCard')}}</template>
          </el-step>
          <el-step>
            <template slot="description">{{$t('setSuccess')}}</template>
          </el-step>
        </el-steps>
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-1" style="margin: 5vh auto;">
        <el-col :span="24" class="el-col-10">{{$t('msgTieCardSuccess')}}</el-col>
      </el-row>
      <el-row class="bgImg">
        <el-row>
          <el-col :span="24" class="el-col-name">{{$t('payCard')}}</el-col>
        </el-row>
        <el-row class="el-row-accno">
          <el-col :span="9" style="padding-left:8vw;">{{params.bank_name}}</el-col>
          <el-col :span="15">{{params.Rltv_AccNo | formatAccId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="el-col-name">{{$t('payPlanCard')}}</el-col>
        </el-row>
        <el-row class="el-row-accno">
          <el-col :span="9" style="padding-left:8vw;">{{params.bank_name_two}}</el-col>
          <el-col :span="15">{{params.DbCrd_CardNo | formatAccId}}</el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-button @click="setSignPassword" class="el-btn" style="margin-top: 10vh;">{{$t('setSignPassword')}}</el-button>
  </el-container>
</template>
<script>
export default {
  name: 'TieCardSuccess',
  data () {
    return {
      params: JSON.parse(sessionStorage.getItem('params'))
    }
  },
  methods: {
    setSignPassword () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_open_bdcgy_szssmm_click')
      this.$router.push({ path: '/signPassword' })
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
  font-size: 4.5vw;
  color: #000000;
  text-align: center;
}
.bgImg {
  background-image: url(../assets/image/card_bg.png);
  background-size: 100% 100%;
  background-color: #ffffff;
  color: #ffffff;
  border-radius: 3px;
  margin: 5vh auto;
  width: 85vw;
  height: 25vh;
}
.el-col-name {
  font-size: 4.8vw;
  font-family: PingFangSC-Regular;
  text-align: left;
  padding-left: 8vw;
  margin-top: 5vw;
  color: #ffffff;
}
.el-row-accno {
  font-size: 4vw;
  font-family: Farrington-7B-Qiqi-;
  text-align: left;
  margin-top: 2vh;
  color: #dcdcdc;
}
</style>
