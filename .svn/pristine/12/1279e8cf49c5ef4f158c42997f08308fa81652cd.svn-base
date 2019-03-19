<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <password v-model="showPwd" v-bind:pwdState="signPasswordState" v-bind:pwdSlat="salt" v-bind:accountOpenFlag="isAccountOpen" v-bind:isUpdatePwd="updatePwdFlag" v-on:postSignPassword="saveSignPassword" v-on:checkPassSuccess="checkPswSuccess"></password>
    </el-form>
  </el-container>
</template>

<script>
import Password from '@/components/Password'
export default {
  name: 'SignPassword',
  data () {
    return {
      showPwd: true,
      signPasswordState: this.$route.params.signPasswordState,
      salt: 'xxxx',
      isAccountOpen: this.$route.params.isAccountOpen,
      isStockUser: this.$route.params.isStockUser,
      updatePwdFlag: false
    }
  },
  components: {
    Password
  },
  created () {
    if (!this.signPasswordState) {
      this.signPasswordState = JSON.parse(sessionStorage.getItem('signPasswordState'))
    }
    if (!this.salt) {
      this.salt = JSON.parse(sessionStorage.getItem('salt'))
    }
    if (!this.isAccountOpen) {
      this.isAccountOpen = JSON.parse(sessionStorage.getItem('isAccountOpen'))
    }
    if (!this.isStockUser) {
      this.isStockUser = JSON.parse(sessionStorage.getItem('isStockUser'))
    }
    if (this.$route.params.updatePwdFlag) {
      this.updatePwdFlag = this.$route.params.updatePwdFlag
    }
  },
  methods: {
    back () {
      let vm = this
      if (vm.signPasswordState === '0') {
        vm.$router.push({
          path: '/leadingPage',
          name: 'LeadingPage',
          params: { signPasswordState: vm.signPasswordState, salt: vm.salt, isAccountOpen: vm.isAccountOpen, isStockUser: this.isStockUser }
        })
      } else {
        vm.$router.push({ path: '/' })
      }
    },
    checkPswSuccess () {
      if (this.isStockUser) {
        this.$router.push({ path: '/homeAllItem' })
      } else {
        if (this.isAccountOpen) {
          this.$router.push({ path: '/homeAllItem' })
        } else {
          this.$router.push({ path: '/openPayRollOne' })
        }
      }
    },
    saveSignPassword (sPassword, updatePwdFlag) {
      let vm = this
      if (updatePwdFlag) {
        // 忘记手势密码流程
        vm.$http.post('/salary/h5/update_gesture_password', { gesture_password: sPassword }).then(
          function (result) {
            console.log(result.data)
            if (result.data.stateFlag === '0') {
              vm.$router.push({
                path: '/passwordUpdateSuccess',
                name: 'PasswordUpdateSuccess',
                params: { updatePwdFlag: updatePwdFlag }
              })
            }
          }
        )
      } else {
        // 新设置手势密码流程
        vm.$http.post('/salary/h5/set_gesture_password', { gesture_password: sPassword }).then(
          function (result) {
            console.log(result.data)
            if (result.data.stateFlag === '0') {
              vm.$router.push({
                path: '/passwordUpdateSuccess',
                name: 'PasswordUpdateSuccess',
                params: { updatePwdFlag: updatePwdFlag }
              })
            }
          }
        )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
