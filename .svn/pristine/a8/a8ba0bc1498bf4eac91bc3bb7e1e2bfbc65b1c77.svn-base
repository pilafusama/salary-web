<script>
export default {
  name: 'Home',
  data () {
    return {
      passwordState: '',
      salt: '',
      isAccountOpen: false,
      isStockUser: false // 是否存量员工
    }
  },
  mounted: function () {
    let vm = this
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
