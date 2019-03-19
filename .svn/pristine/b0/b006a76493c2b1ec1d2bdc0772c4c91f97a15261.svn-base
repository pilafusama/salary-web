<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form class="form-blue">
      <el-row>
        <el-col :span="4">
          <img style="width：5vh;height:3vh;float: right;" @click="myAcc" src="../assets/image/payroll.png">
        </el-col>
        <el-col v-if="flag" :span="16" class="text-fff">资产总额
          <img style="width：5vh;height:3vh;" @click="hideShow" src="../assets/image/visible.png">
        </el-col>
        <el-col v-else :span="16" class="text-fff">资产总额
          <img style="width：5vh;height:3vh;" @click="hideShow" src="../assets/image/invisible.png">
        </el-col>
        <el-col :span="4">
          <img style="width：5vh;height:3vh;float: left;margin-left: 2vw;" @click="setting" src="../assets/image/setting.png">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="big-text">￥ {{totalMoney | formatMoney(flagNo)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="littel-text" style="margin:0 0 2vh 0">
          昨日{{yesMoney | formatMoney(flagNo)}} 累计{{sum | formatMoney(flagNo)}}</el-col>
      </el-row>
    </el-form>
    <el-form>
      <el-row class="el-row-88bg el-row-bline">
        <el-col :span="24" style="height: 5vw;"></el-col>
      </el-row>
      <el-row>
        <el-col>
          <div id="myChart" :style="{width: '100vw', height: '80vw'}"></div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-button @click="ransomProd('')" class="el-btn">赎回</el-button>
      <el-button @click="buyProd('')" class="el-btn">购入</el-button>
    </el-row>
    <el-button id="entry">调试</el-button>
  </el-container>
</template>
<script>
let echarts = require('echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
export default {
  name: 'ProductHome',
  data () {
    return {
      /* eslint-disable */
      planList: [],
      flagNo: 'No',
      totalMoney: '--',
      yesMoney: '--',
      sum: '--',
      terminal: '--',
      current: '--',
      funds: '--',
      flag: true,
      result: {}
    }
  },
  mounted: function () {
    this.drawLine();
  },
  methods: {
    setting () {
    },
    back () {
      history.back()
    },
    ransomProd () {

    },
    buyProd () {

    },
    hideShow () {
      this.$forceUpdate();
      if (this.flag) {
        this.flagNo = 'No';
        this.totalMoney = '****';
        this.yesMoney = '****';
        this.sum = '****';
        this.flag = false;
      } else {
        this.totalMoney = this.result.totalBal;
        this.flagNo = 'Yes';
        this.yesMoney = '--';
        this.sum = '--';
        this.flag = true;
      }
    },
    myAcc () {
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.showLoading({
        text: '正在努力读取数据中...'
      })
      let option = {
        title: {
          left: 'center',
          text: '基金产品年化收益',
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          showDelay: 0,
          hideDelay: 0,
          transitionDuration: 0,
          backgroundColor: '#F4743E',
          borderColor: '#F4743E',
          borderRadius: 5,
          borderWidth: 1,
          padding: 5,
          position: function (p) {
            // 位置回调
            return [p[0] + 10, p[1] - 10];
          },
          textStyle: {
            color: '#ffffff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 10,
            fontWeight: '400'
          },
          formatter: function (params) {
            var res = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              res += '<br/>' + params[i].value;
            }
            return res;
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // X轴背景表格
          splitLine: {
            show: true
          },
          // 坐标轴颜色
          axisLine: {
            lineStyle: {
              color: 'red'
            }
          },
          // X轴文字旋转
          axisLabel: {
            rotate: 30,
            interval: 0
          },
          data: ['9.8', '9.9', '9.10', '9.11', '9.12', '9.13', '9.14']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'red'
            }
          }
        },
        series: [{
          data: ['0.789', '0.795', '0.826', '0.834', '0.869', '0.897', '0.923'],
          type: 'line',
          areaStyle: {},
          symbol: 'circle',
          symbolSize: 6,
          smooth: true,
          // 坐标圆点颜色
          itemStyle: {
            normal: {
              color: '#FFA970',
              borderColor: '#F4743E'  // 拐点边框颜色
            }
          },
          // 线条颜色及宽度
          lineStyle: {
            normal: {
              width: 3,
              color: '#F4743E'
            }
          },
          // 线条上的数字提示信息
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          }
        }]
      }
      // option.xAxis.data = ['9.8', '9.9', '9.10', '9.11', '9.12', '9.13', '9.14']
      // option.series.data = ['0.789', '0.795', '0.826', '0.834', '0.869', '0.897', '0.923']
      myChart.hideLoading()
      myChart.setOption(option)
    }
  }
}
</script>
<style>
.row-plan {
  margin: 3vw 0 4vw 4vw;
  font-size: 4vw;
  color: #000000;
}
.row-new-plan {
  margin: 3vw 0 2vw 4vw;
  font-size: 4vw;
  color: #000000;
}
.row-new-plan-text {
  text-align: left;
  height: 5vh;
  line-height: 5vh;
}
.exec-circle {
  width: 2vh;
  height: 2vh;
  background-color: #00ff00;
  border-radius: 50%;
  margin-top: 1vw;
}
.unexec-circle {
  width: 2vh;
  height: 2vh;
  background-color: #ff0000;
  border-radius: 50%;
  margin-top: 1vw;
}
.is-exec {
  color: #888888;
  padding-left: 3px;
}
.forwardImg {
  height: 5vh;
  width: 6vw;
  margin-left: 2vw;
}
.el-table .td-left {
  font-size: 5vw;
  text-align: left;
  font-family: PingFangHK-Regular;
  color: #888888;
}
.el-table .td-right {
  font-size: 5vw;
  text-align: right;
  font-family: PingFangHK-Regular;
  color: #000000;
}
</style>
<style scoped>
.form-blue {
  color: rgb(255, 255, 255);
  background: #5077aa;
  padding-top: 5vw;
}
.text-fff {
  text-align: center;
  font-size: 4vw;
  color: #ffffff;
}
.big-text {
  text-align: center;
  font-size: 8vw;
  color: #ffffff;
  font-family: PingFangHK-Semibold;
  margin: 0;
  margin: 2vh 0;
}
.littel-text {
  text-align: center;
  font-size: 4vw;
  color: #ffffff;
  font-family: PingFangHK-Semibold;
}
.line {
  display: inline-block;
  width: 1px;
  height: 5vh;
  background: #748fb3;
}
</style>
