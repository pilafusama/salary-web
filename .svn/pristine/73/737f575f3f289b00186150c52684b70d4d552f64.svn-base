<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="bgImg" style="font-size: 5vw;">
        <el-col :span="8">
          <a @click="payDetail">
            <el-row class="homeIconRow"><img class="homeIcon" @click="payDetail" src="../assets/image/home_particulars.png"></el-row>
            <el-row class="el-row-tab">{{$t('payDetail')}}</el-row>
          </a>
        </el-col>
        <el-col :span="8">
          <a @click="payManage">
            <el-row class="homeIconRow"><img class="homeIcon" @click="payManage" src="../assets/image/home_account.png"></el-row>
            <el-row class="el-row-tab">{{$t('payManage')}}</el-row>
          </a>
        </el-col>
        <el-col :span="8">
          <a @click="payCard">
            <el-row class="homeIconRow"><img class="homeIcon" @click="payCard" src="../assets/image/home_card.png"></el-row>
            <el-row class="el-row-tab">{{$t('payCard')}}</el-row>
          </a>
        </el-col>
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-msg">
        <el-col :span="24">{{gridTopic}}</el-col>
      </el-row>
      <el-row style="font-size:3.5vw;">
        <!-- <el-col :span="8" class="el-col-grid" v-for="gridInfo in gridList" :key="gridInfo.grid_num">
          <a class="grid-a" target="_blank" :href="gridInfo.grid_entry" @click="gridClick(gridInfo.grid_num)">
            <el-row><img class="iconStyle" :src="gridInfo.grid_icon"></el-row>
            <el-row>{{gridInfo.grid_title}}</el-row>
          </a>
        </el-col> -->
        <el-col :span="8" class="el-col-grid">
          <a class="grid-a" target="_blank" href="https://www.jxfangguanjia.com/?tag=ccb_bank_wx?tag=ccb_bank_wx" @click="gridClick(1)">
            <el-row><img class="iconStyle" src="../assets/image/haveRoom.png"></el-row>
            <el-row> 存房(深圳)</el-row>
          </a>
        </el-col>
        <el-col :span="8" class="el-col-grid">
          <a class="grid-a" target="_blank" href="http://ccb.topoto.cn/spread/index.html?business_id=1460&code=270709" @click="gridClick(2)">
            <el-row><img class="iconStyle" src="../assets/image/creditCard.png"></el-row>
            <el-row>申请信用卡(深圳)</el-row>
          </a>
        </el-col>
        <el-col :span="8" v-for="count in blankGridNum" :key="count" class="el-col-grid"></el-col>
      </el-row>
    </el-form>
    <div style="margin: 3vh auto;" @click="toSetting">
      <img class="setting-icon" src="../assets/image/setting2.png">
      <span class="el-col-setting">设置</span>
    </div>
  </el-container>
</template>
<script>
export default {
  name: 'HomeAllItem',
  data () {
    return {
      isStockUser: JSON.parse(sessionStorage.getItem('isStockUser')),
      gridTopic: '',
      gridList: [],
      blankGridNum: 0,
      dateBegin: '',
      dateEnd: ''
    }
  },
  created () {
    this.dateBegin = new Date()
  },
  mounted: function () {
    // 获取主页入口
    // let vm = this
    // vm.$http.post('/salary/h5/get_homepage_entries').then(
    //   function (result) {
    //     console.log(result.data)
    //     vm.gridTopic = result.data.grid_topic
    //     vm.gridList = result.data.gridList
    //     if (vm.gridList.length < 9) {
    //       vm.blankGridNum = 9 - vm.gridList.length
    //     }
    //   }
    // )

    this.gridTopic = '建设银行服务'
    this.blankGridNum = 7
  },
  methods: {
    payDetail () {
      let vm = this
      vm.$router.push({ path: '/payDetail' })
    },
    payManage () {
      if (this.isStockUser) {
        let vm = this
        vm.$router.push({ path: '/promptPage' })
      } else {
        let vm = this
        vm.$router.push({ path: '/homePage' })
      }
    },
    payCard () {
      if (this.isStockUser) {
        let vm = this
        vm.$router.push({ path: '/promptPage' })
      } else {
        let vm = this
        vm.$router.push({ path: '/salaryCardInfo' })
      }
    },
    gridClick (gridNum) {
      let eventId = ''
      switch (gridNum) {
        case 1: eventId = 'zym_jgg_dyg_click'; break
        case 2: eventId = 'zym_jgg_deg_click'; break
        case 3: eventId = 'zym_jgg_dsag_click'; break
        case 4: eventId = 'zym_jgg_dsig_click'; break
        case 5: eventId = 'zym_jgg_dwg_click'; break
        case 6: eventId = 'zym_jgg_dlg_click'; break
        case 7: eventId = 'zym_jgg_dqg_click'; break
        case 8: eventId = 'zym_jgg_dbg_click'; break
        case 9: eventId = 'zym_jgg_djg_click'; break
      }
      // eslint-disable-next-line
      MtaH5.clickStat(eventId)
    },
    back () {
      let vm = this
      vm.$router.push({ path: '/' })
    },
    formatDate (dateNum) {
      if (dateNum < 10) {
        dateNum = '0' + dateNum
      }
      return dateNum
    },
    toSetting () {
      let vm = this
      vm.$router.push({ path: '/setting' })
    }
  },
  destroyed: function () {
    this.dateEnd = new Date()
    let dateDiff = this.dateEnd.getTime() - this.dateBegin.getTime() // 时间差的毫秒数
    let hours = Math.floor(dateDiff / (3600 * 1000)) // 计算出小时数
    let remain = dateDiff % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(remain / (60 * 1000)) // 计算相差的分钟数
    let remain2 = remain % (60 * 1000) // 计算分钟数后剩余的毫秒数
    let seconds = Math.floor(remain2 / 1000)
    let onlineTime = this.formatDate(hours) + ':' + this.formatDate(minutes) + ':' + this.formatDate(seconds)
    // eslint-disable-next-line
    MtaH5.clickStat('xgjym_fwsc', { 'homeallitem': onlineTime })
  }
}
</script>
<style scoped>
.homeIconRow {
  padding: 8vh 0 1vh 0;
}
.homeIcon {
  width: 8vw;
}
.el-row-tab {
  font-size: 4vw;
  letter-spacing: 0;
  font-family: PingFangSC-Medium;
}
.el-row-msg {
  text-align: left;
  border-bottom: 1px solid #ececec;
  padding: 4vw 0 4vw 4vw;
  font-family: PingFangHK-Regular;
  font-size: 3.8vw;
  color: #888888;
  letter-spacing: 0;
}
.el-col-grid {
  height: 28vw;
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}
.grid-a {
  text-decoration: none;
  color: #000000;
  font-size: 3.2vw;
  font-family: PingFangHK-Regular;
  letter-spacing: 0;
}
.iconStyle {
  width: 8vw;
  margin-top: 4vw;
  margin-bottom: 3vw;
}
.bgImg {
  background-image: url(../assets/image/bg.png);
  background-size: 100% 100%;
  background-color: #ffffff;
  color: #ffffff;
  height: 24vh;
}
.setting-icon {
  width: 8vw;
  vertical-align: middle;
  padding-right: 1vw;
}
.el-col-setting {
  float: none;
  font-family: PingFangSC-Regular;
  font-size: 5vw;
  color: #2f7dcd;
  text-align: center;
  vertical-align: middle;
}
</style>
