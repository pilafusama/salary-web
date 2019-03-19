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
          <el-menu active-text-color="#f8f9fb" :default-active="onRoutes" class="list-group-item" router>
            <el-submenu index="1">
              <template slot="title">
                <img src="../assets/image/nav_detail_new.png" style="width:20px;height:20px;">
                <span class="item-name-one">&nbsp;工资明细管理</span>
              </template>
              <!-- <el-menu-item index="/uploadPage" class="list-group-item" :class="{'isActive': !active}">工资明细管理</el-menu-item> -->
              <el-menu-item index="/uploadPageOne" class="list-group-item" style="padding-left: 50px;">上传工资明细
              </el-menu-item>
              <el-menu-item index="/downPage" class="list-group-item" style="padding-left: 50px;">银行代发
              </el-menu-item>
              <el-menu-item index="/bussesChart" class="list-group-item" style="padding-left: 50px;">业务报表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <img src="../assets/image/setting_new.png" style="width:20px;height:20px;">
                <span class="item-name-one">&nbsp;设置</span>
              </template>
              <!-- <el-menu-item index="/uploadPage" class="list-group-item" :class="{'isActive': !active}">工资明细管理</el-menu-item> -->
              <el-menu-item index="/salaryTemplet" class="list-group-item" style="padding-left: 50px;">配置发薪表模板
              </el-menu-item>
              <el-menu-item v-if="isShowFlag" index="/payCardManage" class="list-group-item" style="padding-left: 50px;">工资卡信息维护
              </el-menu-item>
              <el-menu-item v-if="isShowFlag" index="/directBanking" class="list-group-item" style="padding-left: 50px;">配置直联网银
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <!-- 右侧主内容区 -->
    <div id="main-container" style="margin-left: 19vw;">
      <div class="mainbox" style="padding: 10px;padding-right: 15px;">
        <div class="panel-body">
          <div style="background: #ffffff;margin-top: 10px;margin-left:400px"></div>
        </div>
      </div>
      <router-view class="view right"></router-view>
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
    return {
      firstVisit: false,
      isShowFlag: false
    }
  },
  mounted: function () {
    let vm = this
    // 菜单的默认值改变
    // 获取企业是否配置了发薪模板，YES代表配置了，NO代表未配置
    vm.$http.post('/salary/admin/select_is_config_template', {}).then(
      function (result) {
        if (result.data.retcode === '0') {
          if (result.data.isConfigTemplate === 'YES') {
            // 跳转到上传工资明细页面
            vm.$router.push({ path: '/uploadPageOne' })
          } else {
            // 跳转到配置发薪模板页面
            vm.$router.push({ path: '/firstVisit' })
          }
        } else {
          vm.$message.error(result.data.errmsg)
        }
      }
    )
    // 获取企业所对应的银行
    vm.$http.post('/salary/admin/get_corp_to_Bank', {}).then(
      function (result) {
        sessionStorage.setItem('authenBankName', JSON.stringify(result.data.bankName))
        if (result.data.bankName === 'CMB') {
          vm.isShowFlag = true
        }
      }
    )
  },
  computed: {
    onRoutes () {
      if (this.$route.path === '/uploadPage') {
        return '/uploadPageOne'
      } else if (this.$route.path === '/uploadPageSure') {
        return '/uploadPageOne'
      } else if (this.$route.path === '/importDatas') {
        return '/payCardManage'
      } else {
        return this.$route.path
      }
    }
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
  position: fixed;
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
