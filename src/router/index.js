import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/Home'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 手势密码
    {
      path: '/signPassword',
      name: 'SignPassword',
      component: resolve => require(['@/components/SignPassword'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 手势密码更新成功
    {
      path: '/passwordUpdateSuccess',
      name: 'PasswordUpdateSuccess',
      component: resolve =>
        require(['@/components/PasswordUpdateSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 设置手势密码提示页
    {
      path: '/setSignPassword',
      name: 'SetSignPassword',
      component: resolve => require(['@/components/SetSignPassword'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 工资条引导页-未开通
    {
      path: '/leadingPage',
      name: 'LeadingPage',
      component: resolve => require(['@/components/LeadingPage'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 提示存量员工开户
    {
      path: '/promptPage',
      name: 'PromptPage',
      component: resolve => require(['@/components/PromptPage'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 开通工资条步骤1
    {
      path: '/openPayRollOne',
      name: 'OpenPayRollOne',
      component: resolve => require(['@/components/OpenPayRollOne'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 身份证上传校验成功
    {
      path: '/idCardCheckSuccess',
      name: 'IdCardCheckSuccess',
      component: resolve =>
        require(['@/components/IdCardCheckSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 活体检测
    {
      path: '/liveDetection',
      name: 'LiveDetection',
      component: resolve => require(['@/components/LiveDetection'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 新增新卡绑定
    {
      path: '/newTieCard',
      name: 'NewTieCard',
      component: resolve => require(['@/components/NewTieCard'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 绑卡成功
    {
      path: '/tieCardSuccess',
      name: 'TieCardSuccess',
      component: resolve => require(['@/components/TieCardSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 选择已有账户
    {
      path: '/selectExitAcc',
      name: 'SelectExitAcc',
      component: resolve => require(['@/components/SelectExitAcc'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 验证手机号码
    {
      path: '/chackPhoneNo',
      name: 'ChackPhoneNo',
      component: resolve => require(['@/components/ChackPhoneNo'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪管家首页
    {
      path: '/homeAllItem',
      name: 'HomeAllItem',
      component: resolve => require(['@/components/HomeAllItem'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪资理财
    {
      path: '/homePage',
      name: 'HomePage',
      component: resolve => require(['@/components/HomePage'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 我的账户
    {
      path: '/myAccount',
      name: 'MyAccount',
      component: resolve => require(['@/components/MyAccount'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 我的理财账户
    {
      path: '/payAccount',
      name: 'payAccount',
      component: resolve => require(['@/components/PayAccount'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪资卡
    {
      path: '/salaryCardInfo',
      name: 'SalaryCardInfo',
      component: resolve => require(['@/components/SalaryCardInfo'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 交易明细
    {
      path: '/transactionDetails',
      name: 'TransactionDetails',
      component: resolve =>
        require(['@/components/TransactionDetails'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 设置
    {
      path: '/setting',
      name: 'Setting',
      component: resolve => require(['@/components/Setting'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 修改手势密码
    {
      path: '/updatePassword',
      name: 'UpdatePassword',
      component: resolve => require(['@/components/UpdatePassword'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 修改手机号码
    {
      path: '/changePhoneNo',
      name: 'ChangePhoneNo',
      component: resolve => require(['@/components/ChangePhoneNo'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 修改手机号码成功
    {
      path: '/changePhoneNoSuccess',
      name: 'ChangePhoneNoSuccess',
      component: resolve =>
        require(['@/components/ChangePhoneNoSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 修改绑定银行卡
    {
      path: '/changeCard',
      name: 'ChangeCard',
      component: resolve => require(['@/components/ChangeCard'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 转出资金
    {
      path: '/transferFunds',
      name: 'TransferFunds',
      component: resolve => require(['@/components/TransferFunds'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 转出资金确认
    {
      path: '/transferFundsSure',
      name: 'TransferFundsSure',
      component: resolve =>
        require(['@/components/TransferFundsSure'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 转出资金成功
    {
      path: '/transferFundSuccess',
      name: 'TransferFundSuccess',
      component: resolve =>
        require(['@/components/TransferFundSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 工资条弹框
    {
      path: '/payRollDialog',
      name: 'PayRollDialog',
      component: resolve => require(['@/components/PayRollDialog'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 工资明细
    {
      path: '/payDetail',
      name: 'PayDetail',
      component: resolve => require(['@/components/PayDetail'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 当月工资明细
    {
      path: '/payDetailMonth',
      name: 'PayDetailMonth',
      component: resolve => require(['@/components/PayDetailMonth'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪资自动理财
    {
      path: '/payAutoManagePlan',
      name: 'PayAutoManagePlan',
      component: resolve =>
        require(['@/components/PayAutoManagePlan'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪资自动理财确认
    {
      path: '/payAutoManagePlanSure',
      name: 'PayAutoManagePlanSure',
      component: resolve =>
        require(['@/components/PayAutoManagePlanSure'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 薪资自动理财完成
    {
      path: '/payAutoManagePlanSuccess',
      name: 'PayAutoManagePlanSuccess',
      component: resolve =>
        require(['@/components/PayAutoManagePlanSuccess'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 基金产品首页
    {
      path: '/productHome',
      name: 'ProductHome',
      component: resolve => require(['@/components/ProductHome'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 后台页面
    {
      path: '/admin/salaryDetail',
      name: 'SalaryDetail',
      component: resolve => require(['@/admin/SalaryDetail'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 用户未开通薪管家显示页面
    {
      path: '/noSalaryCard',
      name: 'NoSalaryCard',
      component: resolve => require(['@/components/NoSalaryCard'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 测试登录
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 文件上传、下载
    {
      path: '/admin/salaryDetail',
      name: 'SalaryDetail',
      component: resolve => require(['@/admin/SalaryDetail'], resolve),
      meta: { requiresAuth: false, keepAlive: false },
      children: [
        {
          path: '/downPage',
          name: 'DownPage',
          component: resolve => require(['@/admin/DownPage'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/bussesChart',
          name: 'BussesChart',
          component: resolve => require(['@/admin/BussesChart'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/salaryTemplet',
          name: 'SalaryTemplet',
          component: resolve => require(['@/admin/SalaryTemplet'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/directBanking',
          name: 'DirectBanking',
          component: resolve => require(['@/admin/DirectBanking'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/payCardManage',
          name: 'PayCardManage',
          component: resolve => require(['@/admin/PayCardManage'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/editPayCard',
          name: 'EditPayCard',
          component: resolve => require(['@/admin/EditPayCard'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/importDatas',
          name: 'ImportDatas',
          component: resolve => require(['@/admin/ImportDatas'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/importOne',
          name: 'ImportOne',
          component: resolve => require(['@/admin/ImportOne'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/firstVisit',
          name: 'FirstVisit',
          component: resolve => require(['@/admin/FirstVisit'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/uploadPageOne',
          name: 'UploadPageOne',
          component: resolve => require(['@/admin/UploadPageOne'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/uploadPage',
          name: 'UploadPage',
          component: resolve => require(['@/admin/UploadPage'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/uploadPageSure',
          name: 'UploadPageSure',
          component: resolve => require(['@/admin/UploadPageSure'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        }
      ]
    },
    //   九宫格与二维码
    {
      path: '/admin/applicationNav',
      name: 'ApplicationNav',
      component: resolve => require(['@/admin/ApplicationNav'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    {
      path: '/admin/applicationNav',
      name: 'ApplicationNav',
      component: resolve => require(['@/admin/ApplicationNav'], resolve),
      meta: { requiresAuth: false, keepAlive: false },
      children: [
        {
          path: '/gridSetting',
          name: 'GridSetting',
          component: resolve => require(['@/admin/GridSetting'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/codeCreate',
          name: 'CodeCreate',
          component: resolve => require(['@/admin/CodeCreate'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/codeDetail',
          name: 'CodeDetail',
          component: resolve => require(['@/admin/CodeDetail'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        },
        {
          path: '/codeList',
          name: 'CodeList',
          component: resolve => require(['@/admin/CodeList'], resolve),
          meta: { requiresAuth: false, keepAlive: false }
        }
      ]
    },
    {
      path: '/codePage',
      name: 'CodePage',
      component: resolve => require(['@/admin/CodePage'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 绑卡并开户模式入口
    {
      path: '/entry/bindAndOpenMode',
      name: 'BindAndOpenMode',
      component: resolve => require(['@/entry/BindAndOpenMode'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 仅绑卡模式入口
    {
      path: '/entry/bindOnlyMode',
      name: 'BindOnlyMode',
      component: resolve => require(['@/entry/BindOnlyMode'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 仅绑卡模式_新增新卡绑定
    {
      path: '/newTieCardM2',
      name: 'NewTieCardM2',
      component: resolve => require(['@/components/NewTieCardM2'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 仅绑卡模式_工资卡信息确认
    {
      path: '/salaryCardConfirmM2',
      name: 'SalaryCardConfirmM2',
      component: resolve =>
        require(['@/components/SalaryCardConfirmM2'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 仅绑卡模式_绑卡成功
    {
      path: '/tieCardSuccessM2',
      name: 'TieCardSuccessM2',
      component: resolve => require(['@/components/TieCardSuccessM2'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // 外部回调入口
    {
      path: '/entry/callback',
      name: 'Callback',
      component: resolve => require(['@/entry/Callback'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // SubmitCheck
    {
      path: '/submitCheck',
      name: 'SubmitCheck',
      component: resolve => require(['@/components/SubmitCheck'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    },
    // NotFound必须置于最后
    {
      path: '*',
      name: 'NotFound',
      component: resolve => require(['@/components/NotFound'], resolve),
      meta: { requiresAuth: false, keepAlive: false }
    }
  ]
})

router.afterEach((to, from, next) => {
  // eslint-disable-next-line
  var _mtac = {}
  var mta = document.createElement('script')
  mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4'
  mta.setAttribute('name', 'MTAH5')
  mta.setAttribute('sid', '500656399')
  mta.setAttribute('cid', '500657556')
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(mta, s)
  // next()
})

export default router
