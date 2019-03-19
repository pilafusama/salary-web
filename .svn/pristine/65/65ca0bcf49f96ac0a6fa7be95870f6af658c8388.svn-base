<template>
  <div class="loading-box" v-show="loadingFlag">
    <!-- <img class="loading-img" src="../assets/image/loading.png"> -->
    <div style="margin: 30vh 0 5vh 0;">
      <span class="loading-msg">资料提交中</span>
    </div>
    <div style="width: 86vw;margin: auto;">
      <el-progress :percentage="70" :show-text="false" :stroke-width="8" color="#5077AA"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubmitCheck',
  props: {
    loadingFlag: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
<style scoped>
.loading-box {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
.loading-img {
  margin-top: 10vh;
}
.loading-msg {
  /* color: #fff; */
  font-size: 5vw;
}
</style>
