<template>
  <el-container>
    <el-form class="codeList">
      <el-row class="addRow">
        <el-col>
          <el-button class="addButton " @click="add">
            <span class="addText addImg">创建推广二维码</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row class="rowHeader">
        <el-col :span="11">推广二维码</el-col>
        <el-col :span="11">所属银行</el-col>
        <!-- <el-col :span="8">启用/安装服务</el-col> -->
        <el-col :span="2"></el-col>
      </el-row>
      <el-row v-for="(item,index) in qRcodeList" :key="index" class="rowMain">
        <el-col :title="item.qrcode_name" :span="11" class="textSlice">
          <span @click="toDetail(item)">{{item.qrcode_name}}</span>
        </el-col>
        <el-col :title=" item.bank_name " :span="11 " class="textSlice ">{{item.bank_name}}</el-col>
        <!-- <el-col :span="8 " class="textSlice ">
          <span :title="item.appList ">
            {{item.appList}}
          </span>
        </el-col> -->
        <el-col :span="2 " style="text-align:center ">
          <div class="editImg " @click.prevent="edit(item) "></div>
        </el-col>
      </el-row>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      qRcodeList: [],
      dialogVisibe: false
    }
  },
  methods: {
    add () {
      let vm = this
      vm.$router.push({ path: '/CodeCreate' })
    },
    edit (item) {
      let vm = this
      // vm.$router.push({ path: '/CodeDetail', query: { qrcode_id: item.qrcode_id, qrcode_url: item.qrcode_url, qrcode_src: item.qrcode_src, codeParams: item } })
      vm.$router.push({ path: '/CodeCreate', query: { promotion_qrcode_id: item.promotion_qrcode_id, flag: 'update' } })
    },
    toDetail (item) {
      let vm = this
      vm.$router.push({ path: '/CodeDetail', query: { promotion_qrcode_id: item.promotion_qrcode_id } })
    },
    showText (obj, e) {
      var showDiv = document.getElementById('showDiv')
      showDiv.innerText = obj.innerText
    }
  },
  created () {
    let vm = this
    vm.$http.post('/salary/bank_admin/list_promotion_qrcodes').then((res) => {
      if (res.data.retcode === '0') {
        this.qRcodeList = res.data.qRcodeList
        // this.qRcodeList.forEach((element, index) => {
        //   element.appList = ''
        //   element.app_list.forEach((element2, index2) => {
        //     if (index2 < element.app_list.length - 1) {
        //       element.appList = element.appList + element2.appName + '、'
        //     } else {
        //       element.appList = element.appList + element2.appName
        //     }
        //   })
        // })
        console.log(this.qRcodeList)
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
  }
}
</script>
<style>
</style>
<style scoped>
.codeList {
  width: 80%;
  margin: 0;
}
.addRow {
  margin-bottom: 2vw;
}
.el-row {
  font-size: 1.3vw;
  text-align: left;
}
.el-col {
  color: black;
  line-height: 5vw;
  height: 5vw;
}
.el-col:hover {
  cursor: pointer;
}
.rowHeader .el-col {
  height: 5vw;
  line-height: 5vw;
  /* background: #f8f9fb; */
  background: #f3f3f3;
  font-size: 1.8vw;
}
.rowMain:nth-child(even) {
  /* background: #f8f8f8; */
  background: #ffffff;
}
.addImg {
  display: inline-block;
  background: url('../assets/image/add_default.png') no-repeat left;
  background-size: 14px 14px;
}
.addImg:hover {
  opacity: 0.8;
}
.editImg {
  text-align: right;
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url('../assets/image/edit.png') no-repeat;
}
.editImg:hover {
  background: url('../assets/image/edit_hover.png') no-repeat;
}
.addText {
  padding: 0 0 0 20px;
}
.addButton {
  border-radius: 4px;
}
.codeImg {
  width: 3vw;
  height: 3vw;
  vertical-align: middle;
  margin: 0 1vw;
}
.textSlice {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
}
</style>
