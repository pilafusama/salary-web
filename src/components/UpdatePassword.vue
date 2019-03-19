<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <password v-model="showPwd" v-bind:pwdState="signPasswordState" v-on:postSignPassword="updateSignPassword"></password>
    </el-form>
  </el-container>
</template>

<script>
import Password from '@/components/Password2'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      showPwd: true,
      signPasswordState: '2'
    }
  },
  components: {
    Password
  },
  methods: {
    back () {
      history.back()
    },
    updateSignPassword (sPassword) {
      let vm = this
      vm.$http.post('/salary/h5/update_gesture_password', { gesture_password: sPassword }).then(
        function (result) {
          console.log(result.data)
          if (result.data.stateFlag === '0') {
            vm.$router.push({ path: '/setting' })
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
