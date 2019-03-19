<template>
  <el-container>
    <el-header>
      <el-col :span="24" class="title">{{$t('projName')}}</el-col>
    </el-header>
    <el-form>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-left">{{$t('corpId')}}</el-col>
        <el-col :span="18" style="padding-left: 2vw;">
          <el-input v-model="corpId" placeholder="请输入企业ID"></el-input>
        </el-col>
      </el-row>
      <div class="splitBgn"><hr class="splitLine1" /></div>
      <el-row class="el-row-1">
        <el-col :span="6" class="el-col-left">{{$t('userId')}}</el-col>
        <el-col :span="18" style="padding-left: 2vw;">
          <el-input v-model="userId" placeholder="请输入用户ID"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="getAccountInfo" :loading="false" class="el-btn">{{$t('loginProj')}}</el-button>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      corpId: '',
      userId: '',
      passwordState: '',
      salt: '',
      isAccountOpen: false,
      isStockUser: false
    }
  },
  methods: {
    getAccountInfo () {
      let vm = this
      vm.$http.get('/salary/test/user-login', { params: { corpid: this.corpId, userid: this.userId } }).then(
        function (result) {
          console.log(result.data)
          vm.$http.post('/salary/h5/get_user_info').then(
            function (result) {
              console.log(result.data)
              sessionStorage.setItem('is_open_account_allowed', JSON.stringify(result.data.is_open_account_allowed))
              sessionStorage.setItem('open_account_start_time', JSON.stringify(result.data.open_account_start_time))
              sessionStorage.setItem('open_account_end_time', JSON.stringify(result.data.open_account_end_time))
              if (result.data.is_account_open && result.data.is_gesture_password_set) {
                vm.passwordState = '2'
                vm.isAccountOpen = result.data.is_account_open
                // vm.isStockUser = result.data.is_stock_user
                sessionStorage.setItem('signPasswordState', JSON.stringify(vm.passwordState))
                sessionStorage.setItem('salt', 'xxxx')
                sessionStorage.setItem('isAccountOpen', JSON.stringify(vm.isAccountOpen))
                sessionStorage.setItem('isStockUser', JSON.stringify(vm.isStockUser))
                vm.$router.push({
                  path: '/signPassword',
                  name: 'SignPassword',
                  params: { signPasswordState: vm.passwordState, salt: vm.salt, isAccountOpen: vm.isAccountOpen, isStockUser: vm.isStockUser }
                })
              } else if (result.data.is_account_open && !result.data.is_gesture_password_set) {
                vm.passwordState = '0'
                vm.isAccountOpen = result.data.is_account_open
                // vm.isStockUser = result.data.is_stock_user
                sessionStorage.setItem('signPasswordState', JSON.stringify(vm.passwordState))
                sessionStorage.setItem('salt', 'xxxx')
                sessionStorage.setItem('isAccountOpen', JSON.stringify(vm.isAccountOpen))
                sessionStorage.setItem('isStockUser', JSON.stringify(vm.isStockUser))
                vm.$router.push({
                  path: '/setSignPassword',
                  name: 'SetSignPassword',
                  params: { signPasswordState: vm.passwordState, salt: vm.salt, isAccountOpen: vm.isAccountOpen, isStockUser: vm.isStockUser }
                })
              } else {
                vm.passwordState = '0'
                vm.isAccountOpen = result.data.is_account_open
                // vm.isStockUser = result.data.is_stock_user
                sessionStorage.setItem('signPasswordState', JSON.stringify(vm.passwordState))
                sessionStorage.setItem('salt', 'xxxx')
                sessionStorage.setItem('isAccountOpen', JSON.stringify(vm.isAccountOpen))
                sessionStorage.setItem('isStockUser', JSON.stringify(vm.isStockUser))

                vm.$http.post('/salary/h5/get_open_account_mode').then(
                  function (result) {
                    console.log(result.data)
                    sessionStorage.setItem('open_account_mode', JSON.stringify(result.data.open_account_mode))
                    sessionStorage.setItem('open_account_entry', JSON.stringify(result.data.open_account_entry))
                    let routePath = result.data.open_account_entry
                    vm.$router.push({ path: routePath })
                  }
                )
              }
            }
          )
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
