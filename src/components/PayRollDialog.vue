<template>
  <el-dialog title="身份证照片样例" :visible.sync="showDialog" @close="closeDialog" width="90%">
    <el-form>
      <el-row class="rowOne">
        <el-col :span="4">
          <span class="colSpan">{{$t('front')}}</span>
        </el-col>
        <el-col :span="20"><img class="colImg" src="../assets/image/1.jpg"></el-col>
      </el-row>
      <el-row class="rowTwo">
        <el-col :span="4">
          <span class="colSpan">{{$t('other')}}</span>
        </el-col>
        <el-col :span="20"><img class="colImg" src="../assets/image/2.jpg"></el-col>
      </el-row>
      <el-row class="rowThree" type="flex" justify="space-around">
        <el-col :span="22">
          <span>{{$t('msgPayRollDialog')}}</span>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'PayRollDialog',
  props: { value: {
    type: Boolean,
    default: false
  } },
  data () {
    return {
      showDialog: false
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.showDialog = val
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style>
</style>
<style scoped>
.colSpan {
  height: 30vw;
  line-height: 30vw;
  font-size: 5vw;
  color: black;
}
.colImg {
  width: 50vw;
  height: 30vw;
}
.rowThree {
  padding-top: 3vh;
}
.rowTwo {
  margin-top: 1.5vh;
}
.rowThree {
  padding-bottom: 2vh;
}
.rowThree span {
  display: inline-block;
  text-align: left;
  font-size: 5vw;
  color: black;
}
div >>> .el-dialog {
  background-color: inherit;
  border-radius: 6px;
}
div >>> .el-dialog__header {
  background-color: #5077aa;
  padding: 2vh 0;
  border-radius: 6px 6px 0 0;
}
div >>> .el-dialog__headerbtn {
  top: 2vh;
  line-height: 24px;
}
div >>> .el-dialog__body {
  background-color: #ffffff;
  padding: 3vh;
  border-radius: 0 0 6px 6px;
}
div >>> .el-dialog__title {
  color: #ffffff;
  font-size: 6vw;
  font-family: PingFang-SC-Medium;
  line-height: 6vw;
  height: 6vw;
}
div >>> .el-dialog__close:before {
  color: #ffffff;
  font-size: 6vw;
}
</style>
