<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row>
        <div><img class="img" src="../assets/image/home_bg.png"></div>
      </el-row>
      <el-row class="row-prompt">
        <el-col :span="24">
          <div class="row-msg1">
            <ul style="padding-left: 4vw;">
              <li>{{$t('msgLeadingPageCMB1')}}</li>
              <li>{{$t('msgLeadingPageCMB2')}}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-button @click="openAccount" class="el-btn btn">{{$t('btnOpen2')}}</el-button>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'BindOnlyMode',
  data () {
    return {
    }
  },
  methods: {
    openAccount () {
      // eslint-disable-next-line
      MtaH5.clickStat('open_zhmsktlc_ktxgjsy')
      let vm = this
      vm.$http.post('/salary/h5/get_user_salary_card').then(
        function (result) {
          if (result.data.bind_card_number !== '' && result.data.bind_card_number != null) {
            vm.$router.push({ path: '/salaryCardConfirmM2' })
          } else {
            vm.$router.push({ path: '/noSalaryCard' })
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.el-form {
  margin: 0 auto;
  height: 100vh !important;
}
.img {
  width: 100%;
}
.btn {
  width: 92vw;
  margin: 8vw 4vw 8vw 4vw;
}
.row-prompt {
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 3.4vw;
  margin: 1vh 4vw;
  color: #9b9b9b;
  letter-spacing: 0;
}
.row-msg1 {
  margin: 0;
}
.row-msg1 ul li {
  margin: 3vw 0;
}
</style>
