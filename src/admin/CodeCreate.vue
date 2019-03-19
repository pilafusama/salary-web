<template>
  <el-container>
    <el-form class="codeCreate" ref="gridValidateForm" label-width="100px">
      <el-row style="border:none;background:#f3f3f3;color:#000000">
        <el-col style="text-align:center" class="headerBack">
          <i class="el-icon-arrow-left back" @click="back">返回</i>创建推广二维码
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">二维码名称</el-col>
        <el-col :span="13">
          <el-input v-model="form.qrcode_name"></el-input>
        </el-col>
        <el-col :span="1">
          <span style="color:red">*</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">推广银行</el-col>
        <el-col :span="13">
          <el-select v-model="form.bank_sname" class="selectBank" @change="setBank(form.bank_sname)">
            <el-option v-for="(item,index) in this.bankList" :key="index" :label="item.bank_name" :value="item.bank_sname"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <span style="color:red">*</span>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" justify="center" v-if="false">
        <el-col :span="5">安装的应用</el-col>
        <el-col :span="13">
          <span @click="add" class="add">添加</span>
          <span v-for=" (item,index) in form.app_list " :key="index " @click="add">
            <a class="appName">{{item.appName}}</a>
            <a class="appName" v-if="index<form.app_list.length-1 ">、</a>
          </span>
        </el-col>
        <el-col :span="1">
          <span style="color:red">*</span>
        </el-col>
      </el-row> -->
      <el-row type="flex" justify="center">
        <el-col :span="5">上传logo</el-col>
        <el-col :span="13">
          <el-upload class="uploadImg" :show-file-list="false" :before-upload="beforeupload" accept="image/*" action="" list-type="picture-card">
            <img v-if="form.qrcode_logo" :src="form.qrcode_logo" alt="" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-col>
        <el-col :span="1">
          <span style="color:red">*</span>
        </el-col>
      </el-row>
      <el-row style="border:none;margin:20px">
        <el-col style="text-align:center">
          <el-button class="button" @click="codeCreate">生成二维码</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-dialog class="dialog" title="启用/安装的应用" :visible.sync="dialogVisibe">
      <el-form>
        <el-row v-for="(item,index) in appList" :key="index">
          <el-col :span="6">{{item.appName}}</el-col>
          <el-col :span="16">{{item.name}}</el-col>
          <el-col :span="2">
            <el-checkbox v-model="item.checked"></el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="checkApp">确 定</el-button>
      </div>
    </el-dialog> -->
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      form: {
        promotion_qrcode_id: '',
        bank_sname: '',
        bank_name: '',
        qrcode_logo: '',
        qrcode_name: ''
      },
      bankList: [
        // {
        //   bank_name: '招商',
        //   bank_sname: 'CMB'
        // },
        // {
        //   bank_name: '建行',
        //   bank_sname: 'CCB'
        // }
      ],
      dialogVisibe: false,
      checkedList: []
    }
  },
  methods: {
    back () {
      history.back()
    },
    add () {
      this.dialogVisibe = true
    },
    beforeupload (file) {
      let imgSize = file.size / 1024 < 48 // 暂定
      if (!imgSize) {
        this.$message.error('上传图片大小不能超过 48kb!')
        return false
      }
      let vm = this
      // 创建一个reader
      let reader = new FileReader()
      // 将图片将转成 base64 格式
      reader.readAsDataURL(file)
      // 读取成功后的回调
      reader.onloadend = function () {
        vm.$set(vm.form, 'qrcode_logo', this.result)
      }
    },
    setBank (name) {
      let obj = {}
      obj = this.bankList.find((item) => {
        return item.bank_sname === name
      })
      this.form.bank_name = obj.bank_name
    },
    codeCreate () {
      let vm = this
      let param = {
        promotion_qrcode_id: this.$route.query.promotion_qrcode_id,
        qrcode_name: this.form.qrcode_name,
        bank_sname: this.form.bank_sname,
        bank_name: this.form.bank_name,
        // app_list: this.form.app_list,
        // app_list: [{
        //   appName: 'iphone',
        //   appId: '001'
        // },
        // {
        //   appName: 'android',
        //   appId: '002'
        // }],
        qrcode_logo: this.form.qrcode_logo
      }
      if (this.form.qrcode_name === '' || this.form.qrcode_name === undefined || this.form.bank_name === '' || this.form.bank_name === undefined || this.form.qrcode_logo === '' || this.form.qrcode_logo === undefined) {
        this.$message.error('二维码名称、推广银行、logo不能为空！')
      } else if (this.form.qrcode_name.length > 15) {
        this.$message.error('二维码名称长度不能超过15！')
      } else {
        if (this.$route.query.flag === 'update') {
          vm.$http.post('/salary/bank_admin/update_promotion_qrcode', param).then((res) => {
            if (res.data.retcode === '0') {
              vm.$router.push({ path: '/CodeDetail', query: { promotion_qrcode_id: this.$route.query.promotion_qrcode_id } })
              // this.$message.success('成功')
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
        } else {
          vm.$http.post('/salary/bank_admin/create_promotion_qrcode', param).then((res) => {
            if (res.data.retcode === '0') {
              vm.$router.push({ path: '/CodeDetail', query: { promotion_qrcode_id: res.data.promotion_qrcode_id } })
              // this.$message.success('成功')
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
        }
      }
    },
    close () {
      this.dialogVisibe = false
    },
    checkApp () {
      // this.form.app_list = []
      // this.appList.forEach(element => {
      //   if (element.checked) {
      //     let appList = {}
      //     appList.appId = element.appId
      //     appList.appName = element.appName
      //     //this.form.app_list.push(appList)
      //   }
      // })
      this.dialogVisibe = false
    }
  },
  created () {
    let vm = this
    vm.$http.post('/salary/bank_admin/query_bank_list', {}).then((res) => {
      if (res.data.retcode === '0') {
        this.bankList = res.data.bank_list
      } else {
        this.$message.error(res.data.errmsg)
      }
    })
    if (this.$route.query.promotion_qrcode_id !== undefined) {
      vm.$http.post('/salary/bank_admin/get_promotion_qrcode', { promotion_qrcode_id: this.$route.query.promotion_qrcode_id }).then((res) => {
        if (res.data.retcode === '0') {
          this.form.promotion_qrcode_id = res.data.qRcodeConfigParam.promotion_qrcode_id
          this.form.qrcode_logo = res.data.qRcodeConfigParam.qrcode_logo
          this.form.bank_sname = res.data.qRcodeConfigParam.bank_sname
          this.form.bank_name = res.data.qRcodeConfigParam.bank_name
          this.form.qrcode_name = res.data.qRcodeConfigParam.qrcode_name
        } else {
          this.$message.error(res.data.errmsg)
        }
      })
    }
  }
}
</script>
<style>
.codeCreate input.el-input__inner {
  height: 4vw;
  line-height: 4vw;
  border: 1px solid #ccc;
  margin-top: 0.5vw;
  width: 90%;
  font-size: 1.8vw;
}
.el-upload--picture-card {
  width: 5vw;
  height: 5vw;
  line-height: 5vw;
}
.dialog .el-dialog__header {
  background: #0099ff;
  text-align: left;
}
.dialog .el-dialog__title {
  color: #ffffff;
}
.el-select input.el-input__inner {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
<style scoped>
.back {
  font-size: 1.5vw;
  margin: 0;
  height: 5vw;
  line-height: 5vw;
}
.back:hover {
  cursor: pointer;
  background: none;
  opacity: 0.8;
}
.codeCreate {
  width: 80%;
}
.el-row {
  color: black;
  font-size: 1.8vw;
  border-bottom: 1px solid #ccc;
}
.el-col {
  line-height: 5vw;
  margin: 10px 0;
  text-align: left;
}
.button {
  background: #4a77ab;
  color: #ffffff;
}
.add {
  color: #0099ff;
}
.appName {
  color: black;
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
.selectBank {
  width: 90%;
  border: 1px solid #ccc;
  height: 4vw;
  line-height: 4vw;
}
</style>
