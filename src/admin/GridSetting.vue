<template>
  <el-container>
    <el-form class="gridForm">
      <el-row style="border:none;background:#f3f3f3;color:#000000">
        <el-col style="font-size: 1.8vw;">配置宫格</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">宫格序号</el-col>
        <el-col :span="10">名称</el-col>
        <el-col :span="4">图片</el-col>
        <el-col :span="6">操作</el-col>
      </el-row>
      <el-row v-for="(item,index) in gridList" :key="index">
        <el-col :span="4">{{item.grid_num}}</el-col>
        <el-col :span="10">{{item.grid_title}}</el-col>
        <el-col :span="4"><img v-if="item.grid_icon" :src="item.grid_icon"></el-col>
        <el-col :span="3" class="del">
          <div class="delImg " @click.prevent="del(item.grid_id)"></div>
        </el-col>
        <el-col :span="3" class="edit">
          <div class="editImg " @click.prevent="edit(item)"></div>
        </el-col>
      </el-row>
      <el-row style=" border:none;margin:20px;">
        <el-col>
          <el-button class="addButton " @click="add">
            增加
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :title="func" :visible.sync="dialogForm" @close="close" class="dialog">
      <el-form :v-model="form">
        <!-- <el-form-item label="银行号" prop="bank_id" :label-width="formLabelWidth">
          <el-input v-model="form.bank_id"></el-input>
        </el-form-item> -->
        <el-form-item label="宫格序号" :label-width="formLabelWidth">
          <el-select v-model="form.grid_num" class="select">
            <el-option v-for="(item,index) in this.gridNumObj" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宫格名称" :label-width="formLabelWidth">
          <el-input v-model="form.grid_title" required></el-input>
        </el-form-item>
        <el-form-item label="宫格链接" :label-width="formLabelWidth">
          <el-input type="url" v-model="form.grid_entry"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload class="uploadImg" ref="upload" :show-file-list="false" :before-upload="beforeupload" accept="image/*" action="''" list-type="picture-card">
            <img v-if="form.grid_icon" :src="form.grid_icon" alt="" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button style="background:#4a77ab" type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      gridList: [],
      form: {
        grid_id: '',
        grid_num: '',
        grid_title: '',
        grid_entry: '',
        grid_icon: '',
        grid_entry_type: 'h5'
      },
      dialogForm: false,
      formLabelWidth: '100px',
      func: '',
      gridNumObj: []
    }
  },
  methods: {
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
        vm.$set(vm.form, 'grid_icon', this.result)
        vm.$forceUpdate()
      }
      // this.$refs.upload.clearFiles()
      // 创建临时的路径来展示图片
      // var windowURL = window.URL || window.webkitURL
      // this.src = windowURL.createObjectURL(file)
      // this.src = windowURL.createObjectURL(file)
      // console.log(this.src)
    },
    del (item) {
      let vm = this
      vm.$http.post('/salary/admin/delete_grid', { grid_id: item }).then((res) => {
        if (res.data.retcode === '0') {
          this.$message.success('成功')
          this.query()
        } else {
          this.$message.error(res.data.errmsg)
        }
      })
    },
    add () {
      // this.$refs.upload.clearFiles()
      this.gridNumObj = []
      this.dialogForm = true
      this.func = '新增'
      for (let i = 1; i <= this.gridList.length + 1; i++) {
        this.gridNumObj.push({ value: i, label: i })
      }
    },
    sure () {
      let vm = this
      if (this.form.grid_num === '' || this.form.grid_num === undefined || this.form.grid_title === '' || this.form.grid_title === 'undefined') {
        this.$message.error('宫格序号和宫格名称不能为空')
      } else if (this.form.grid_title.length > 10) {
        this.$message.error('宫格名称不能大于10位')
      } else {
        vm.dialogForm = false
        if (this.func === '新增') {
          let params = {
            grid_num: this.form.grid_num,
            grid_title: this.form.grid_title,
            grid_entry: this.form.grid_entry,
            grid_entry_type: 'h5',
            grid_icon: this.form.grid_icon
          }
          vm.$http.post('/salary/admin/insert_grid', params).then((res) => {
            if (res.data.retcode === '0') {
              this.$message.success('成功')
              this.form = []
              this.query()
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
        } else if (this.func === '编辑') {
          let params2 = {
            grid_id: this.form.grid_id,
            grid_num: this.form.grid_num,
            grid_title: this.form.grid_title,
            grid_entry: this.form.grid_entry,
            grid_entry_type: 'h5',
            grid_icon: this.form.grid_icon
          }
          vm.$http.post('/salary/admin/update_grid', params2).then((res) => {
            if (res.data.retcode === '0') {
              this.$message.success('成功')
              this.form = []
              this.query()
            } else {
              this.$message.error(res.data.errmsg)
            }
          })
        }
      }
    },
    close () {
      this.dialogForm = false
      this.form = []
    },
    edit (item) {
      this.gridNumObj = []
      this.dialogForm = true
      this.func = '编辑'
      this.form.grid_id = item.grid_id
      this.form.grid_title = item.grid_title
      this.form.grid_entry = item.grid_entry
      this.form.grid_entry_type = 'h5'
      this.form.grid_icon = item.grid_icon
      // this.form.grid_num = item.grid_num
      this.$set(this.form, 'grid_num', item.grid_num)
      for (let i = 1; i <= this.gridList.length; i++) {
        this.gridNumObj.push({ value: i, label: i })
      }
    },
    query () {
      let vm = this
      vm.$http.post('/salary/admin/list_grids').then((res) => {
        this.gridList = res.data.gridList
      })
    }
  },
  created () {
    this.query()
  }
}
</script>
<style>
.dialog .el-input__inner {
  height: 3vw;
  font-size: 2vw;
}
.el-upload-list--picture {
  margin-left: 5%;
  width: 80%;
}
.el-upload--picture {
  display: block;
  width: 40%;
}
.dialog .el-dialog__header {
  background: #f3f3f3;
}
.dialog .el-dialog__title {
  color: #000000;
}
</style>
<style scoped>
.gridForm {
  color: black;
  font-size: 15vw;
  width: 80%;
}
.gridForm .el-row {
  border-bottom: 1px solid #ccc;
}
.gridForm .el-col {
  font-size: 2vw;
  height: 5vw;
  line-height: 5vw;
  text-align: center;
}
.gridForm img {
  width: 4vw;
  height: 4vw;
  margin-top: 0.5vw;
}
.gridForm .del {
  font-size: 1.5vw;
}
.gridForm .edit {
  font-size: 1.5vw;
}
.dialog .el-input {
  width: 90%;
  border: 1px solid #ccc;
  height: 3vw;
  line-height: 3vw;
}
.title {
  font-size: 2vw;
  color: black;
  background: red;
}
.addButton {
  background: #4a77ab;
  color: #ffffff;
}
.select {
  width: 90%;
  border: 1px solid #ccc;
  height: 3vw;
  line-height: 3vw;
}
.uploadImg {
  width: 90%;
  position: relative;
  overflow: hidden;
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
.delImg {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0;
  padding: 0;
  background: url('../assets/image/delete.png') no-repeat;
}
.delImg:hover {
  background: url('../assets/image/delete_hover.png') no-repeat;
}
.editImg {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0;
  padding-right: 30px;
  background: url('../assets/image/edit.png') no-repeat;
}
.editImg:hover {
  background: url('../assets/image/edit_hover.png') no-repeat;
}
</style>
