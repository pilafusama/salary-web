<template>
  <div class="container" id="container-fluid">
    <!--顶部-->
    <!-- <div class="row head">
      <div class="header">
        <div class="logo"><img style="margin-left: 25px;max-height: inherit;" src="../assets/image/icon.png" alt="腾讯薪管家"></div>
      </div>
    </div> -->
    <!-- 左侧导航 -->
    <div class="lfmenu left">
      <div class="header">
        <div class="left-title">腾讯薪管家</div>
      </div>
      <div class="menu_content">
        <div class="list-group">
          <el-menu active-text-color="#f8f9fb" default-active="/codeList" class="list-group-item" router>
            <el-menu-item index="/codeList" class="list-group-item" style="padding-left: 50px;">推广二维码
            </el-menu-item>
            <el-menu-item index="/gridSetting" class="list-group-item " style="padding-left: 50px;">九宫格管理
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <!-- 右侧主内容区 -->
    <div id="main-container " style="margin-left: 19vw; ">
      <div class="mainbox " style="padding: 10px;padding-right: 15px; ">
        <div class="panel-body ">
          <div style="background: #ffffff;margin-top: 10px;margin-left:400px "></div>
        </div>
      </div>
      <router-view class="view right "></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
window.usermap_center = [111, 30.03]
window.usermap_zoom = 0
window.usermap_extend = [0, 0, 180, 90]
export default {
  name: 'afire',
  data: function () {
    return { active: true }
  },
  mounted: function () {
    let vm = this
    vm.$router.push({ path: '/codeList' })
  }
}
</script>
<style>
.container {
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
}
.left {
  height: 100%;
  overflow: hidden;
  background: #f8f9fb;
  word-break: break-all;
  padding-bottom: 9999px;
  margin-bottom: -9999px;
  float: left;
  width: 16vw;
}
.right {
  height: auto;
  word-break: break-all;
}
li.list-group-item.is-active {
  background-color: #4a77ab;
}
/*顶部样式*/
.header {
  width: 100%;
  height: 69px;
  display: list-item;
  /* line-height: 69px; */
  max-height: 69px;
  position: relative;
}
.left-title {
  background: url('../assets/image/icon_new.png') no-repeat;
  background-size: 40px;
  height: 40px;
  line-height: 40px !important;
  margin: 20px 0px 71px 30px;
  font-family: PingFangSC-Regular;
  font-size: 1.5vw;
  color: #000000;
  letter-spacing: 0;
}
.logo {
  margin-left: 30px;
  margin-right: 30px;
  font-family: MicrosoftYahei;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
}

.user {
  float: right;
  width: auto;
  height: 30px;
  margin-top: 25px;
  margin-right: 30px;
  line-height: 1em;
}

.user a {
  color: #000;
}

.menu_content {
  /*height: -webkit-fill-available;*/
  height: 100%;
  background: #f8f9fb;
}
.el-table__empty-text {
  font-size: 1.3vw !important;
}
.menu_content .list-group .list-group-item_text {
  display: block;
  padding: 15px;
  background: #f8f9fb;
}

.menu_content .list-group .list-group-item {
  text-align: left;
  font-family: MicrosoftYahei;
  font-size: 1.2vw;
  /* font-weight: bold; */
  color: #666666;
}

.item-name-one {
  text-align: left;
  font-family: MicrosoftYahei;
  font-size: 1.2vw;
  font-weight: bold;
  color: #000000;
}

.lfmenu {
  position: absolute;
  height: 100%;
  left: 0px;
  background: #f8f9fb;
}

.row {
  margin-top: -8px;
  margin-right: -15px;
  margin-left: -15px;
}

.el-menu {
  background-color: #f8f9fb !important;
  border: none !important;
}
.mainbox {
  width: auto;
  margin-left: 430px;
  height: 100%;
}

.el-submenu__title:hover {
  background-color: #70a7e6 !important;
}
.list-group-item:hover {
  color: #f8f9fb !important;
  background-color: #70a7e6;
}
</style>
<style scoped>
body {
  margin: 0 auto;
  background-color: #ffffff;
}
</style>
