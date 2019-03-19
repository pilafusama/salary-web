<template>
  <el-container>
    <el-header>
    </el-header>
    <el-form>
      <el-row class="el-row-leadMsg">
        <el-col :span="24" class="el-col-leadMsg">{{$t('msgLeadingPage1')}}</el-col>
      </el-row>
      <el-row class="row-img">
        <div><img class="img" src="../assets/image/home_icon.png"></div>
      </el-row>
      <el-row class="row-prompt">
        <el-col :span="24">
          <div class="row-msg1">
            <ul style="padding-left: 40px;">
              <li>{{$t('msgLeadingPage2')}}</li>
              <li>{{$t('msgLeadingPage3')}}</li>
            </ul>
          </div>
          <el-row class="row-msg2">
            <el-col :span="2">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-col>
            <el-col :span="22" @click.native="showFlag=true" class="a">{{$t('msgLeadingPage4')}}</el-col>
          </el-row>
          <el-dialog :lock-scroll="false" title="中国建设银行股份有限公司互联网银行开户须知" :visible.sync="showFlag" width="100%" style="overflow: hidden;">
            <div style="font-size:3vw;letter-spacing: 1.5px;line-height: 5vw;">
              <p class="pStyle">
                为明确双方的权利和义务，规范双方业务行为，客户（简称“您”或“本人”）、中国建设银行股份有限公司（以下简称“建设银行”）本着平等互利的原则，就建设银行在互联网银行开立的龙卡通II类账户（以下简称“e账户”）制定本须知。
              </p>
              <p class="pStyle">
                一、产品定义
              </p>
              <p class="pStyle">
                e账户是通过互联网银行等电子渠道实现开户与销户，无物理介质，主要依托互联网银行进行投资理财、资金出入、个人融资、缴费支付等业务处理的个人II类账户，必须本人实名开立。
              </p>
              <p class="pStyle">
                该账户开户时需绑定客户本人的手机号码，在客户办理业务的过程中，建设银行将在必要时向该手机号码发送验证码，或主动致电该号码核实客户身份。
              </p>
              <p class="pStyle">
                二、申请办理
              </p>
              <p class="pStyle">
                1．客户（年满18周岁且持有中华人民共和国二代居民身份证的中国居民）登录互联网银行；
              </p>
              <p class="pStyle">
                2．客户阅读并同意本须知和业务相关规定；
              </p>
              <p class="pStyle">
                3．客户选择指定绑定账户，指定或填写包括个人信息、绑定账户信息、绑定手机号码在内的相关信息；
              </p>
              <p class="pStyle">
                绑定账户：是指客户在申请开立建设银行e账户时指定的，户名为客户本人、以实名制开立且合法获得且真实持有的符合建设银行规定的借记卡。e账户可向绑定账户转出资金，或在额度内向非绑定账户转出资金；e账户可从绑定账户转入资金，或在额度内从非绑定账户获得资金。（开通时间以建设银行推出时间为准）
              </p>
              <p class="pStyle">
                绑定手机号码：是指客户在申请开立e账户时指定的、由客户合法获得且真实有效、并处于本人有效掌控下手机号码，用于接收各种授权码、交易验证码、账户变动等短信，必要时建设银行可用于联络客户以便核实身份。每个e账户，仅有一个绑定手机号码。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                因客户自行变更绑定手机号码、遗失绑定账户，或将绑定手机号码、绑定账户、电子邮箱转借、转租他人使用，或因客户原因造成的资料及交易信息等泄漏所产生的风险及损失。由客户自行承担。建设银行向客户绑定手机发送信息即视为通知送达。
              </p>
              <p class="pStyle">
                4．客户应根据建设银行规定，通过以下两种方式之一进行开户（相关方式开通时间以建设银行推出时间为准）：
              </p>
              <p class="pStyle">
                （1）通过已在建设银行开立的账户来验证身份：允许建行手机银行签约客户通过登录互联网银行，选择签约账户作为绑定账户并校验安全工具后开立e账户。e账户基本信息与手机银行等渠道信息一致。
              </p>
              <p class="pStyle">
                （2）通过提供身份信息来验证身份：允许客户通过互联网银行，输入本人的建行或他行账户作为绑定账户开立e账户。客户需按照建设银行要求的方式提交身份核验资料（包括身份证或者其他影音资料），并完成相关核验流程（具体要求与流程见建设银行电子渠道的提示）。建设银行核验完成后将开户结果通知客户。
              </p>
              <p class="pStyle">
                5．客户使用e账户过程中，为保证账户安全，客户应按照建设银行要求，通过电话或者前往建设银行营业网点等方式进行身份核验。
              </p>
              <p class="pStyle">
                三、双方的权利和义务
              </p>
              <p class="pStyle">
                1．客户必须是具有完全民事行为能力的自然人，客户自愿申请开立e账户，并承诺申请e账户时具有完全民事行为能力。
              </p>
              <p class="pStyle">
                2．客户自愿申请开立e账户，在接受建设银行提供的e账户服务及通过e账户办理建设银行相关业务时，同意遵守国家有关金融法律法规、政策、本须知以及建设银行不定期通过网点、网站或电子银行等渠道公布的相关业务规则等要求，并按建设银行的有关规定支付各种结算和服务费用。
              </p>
              <p class="pStyle">
                3．申请开通e账户服务后，客户有权依本须知享受建设银行提供的e账户服务，有权在本须知有效期间根据建设银行相关业务规则对e账户服务提出变更或终止申请。
              </p>
              <p class="pStyle">
                4．客户保证向建设银行提供的所有申请资料真实、有效、合法。客户保证e账户开户为客户本人实名办理，不得由他人代办。如客户提供的资料不符合要求或存在代办，冒充他人申请等情形，建设银行有权拒绝客户申请，对于已经开立了e账户的，建设银行有权提前单方终止e账户服务。客户开户资料发生变更时，应及时办理变更手续。因客户提供不真实、不完整、不准确的开户信息而导致e账户或电子银行服务被暂停或终止、发生资金损失等风险和责任由客户自行承担。
              </p>
              <p class="pStyle">
                5．客户申请开立e账户所设定的绑定账户、绑定手机号码必须是客户本人实名合法所有，并处于客户有效掌控下。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                6．若建设银行发现客户在非安全、存在欺诈风险的情况下操作账户，建设银行有权增加核实客户身份的措施，以保障客户权益，增加措施包括但不限于：要求客户进行生物识别验证、输入动态密码、补充相关个人信息或提供个人身份证明信息等。若客户存在可疑交易且无法解释交易的合理性时，建设银行有权对该笔交易采取限制措施。
              </p>
              <p class="pStyle" style="text-decoration:underline;">
                若建设银行怀疑或认为任何账户的收支款项是恐怖分子/恐怖组织的财产或资金、或是毒品交易、恐怖活动或任何犯罪的收入、或者该等汇款或支付可能另行受到任何司法管辖区的制裁，建设银行可以根据法律、法规和该司法辖区的政府和监管机关的要求，全权决定并采取建设银行认为适当的任何行动。该等行为包括但不限于：拦截和调查任何付款指令以及通过建行银行的系统发往客户或由客户发出或代表发出的其他信息或通讯；就可能涉及被制裁的任何个人是否确为该受制裁的个人进一步查询；在一段合理的时间内推迟处理该等资金划转或支付以进行建设银行认为必需的调查和查询；拒绝进行该等资金划转或支付或拒绝接受该等交易指令。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                7．客户应妥善保管个人银行账户的交易密码，动态密码，个人有效身份证件、绑定账户、绑定手机号码及手机设备等，如因本人原因造成上述信息或设备出现遗失、泄露或被他人盗用的情况，已发生的损失由客户自行承担
              </p>
              <p class="pStyle">
                8．客户应按规定进行操作，客户未按规定使用支付电子工具、违规使用个人银行账户或者未支付结算服务费用的，建行银行有权停止直至撤销e账户。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                9．客户不得出租，出借e账户，不得利用e账户套取银行信用。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                10．客户不得利用e账户进行偷逃税款、逃废债务、套取现金、洗钱或其他违法犯罪活动。如客户存在洗钱、出卖银行账户等违法行为时，建设银行有权限制或终止服务。
              </p>
              <p class="pStyle">
                11．建设银行应依法保障客户的资金安全，并依法为客户的个人银行账户信息保密，除法律法规另有规定外，有权拒绝任何单位或个人对客户个人银行账户进行查询、冻结、扣划。
              </p>
              <p class="pStyle">
                12．客户申请开立e账户后可通过建设银行互联网银行办理封闭转账（或额度内非封闭转账）、缴费支付、基金、贵金属、理财产品、个人融资及销户等业务，各项业务的具体开通时间以建设银行推出时间为准。
              </p>
              <p class="pStyle">
                13．在e账户服务过程中，客户向建设银行提供的建设银行不能从公共渠道取得的客户信息，均构成客户的保密信息，除根据法律法规及相关规定必须进行披露或双方另有约定的情形外，建设银行不得向任何第三方披露或许可使用该保密信息。
              </p>
              <p class="pStyle">
                14．客户授权建设银行，除法律法规另有规定之外，将客户提供给建设银行的信息、享受建设银行服务产生的信息（包括本授权条款签署之前提供和产生的信息）等，用于建设银行及因服务必要而开展合作或委托的合作伙伴，为客户提供服务、推荐产品、开展市场调查及信息数据分析等。建设银行承诺自行并要求合作伙伴对上述信息严格保密，采取措施保护信息安全。
              </p>
              <p class="pStyle">
                15．客户信息修改：客户可以申请修改绑定账户等信息。客户通过建设银行个人网上银行提交变更申请后，需由建设银行进行审核，审核通过后方能修改成功。客户只能将绑定账户修改为建设银行实体账户。
              </p>
              <p class="pStyle">
                16．e账户销户：e账户名下没有基金、账户贵金属、债券、理财产品及账户资金余额时，方可办理e账户销户。销户的具体流程按建设银行现有流程办理。
              </p>
              <p class="pStyle">
                四、其他约定事项
              </p>
              <p class="pStyle">
                1．建设银行不介入客户与第三方之间的交易纠纷，但可协助客户查明交易情况。
              </p>
              <p class="pStyle">
                2．除有相反证据证明外，e账户服务中产生的电子凭证和银行交易记录是确定交易真实有效和交易具体内容的依据。
              </p>
              <p class="pStyle">
                3．因不可抗力（包括但不限于建设银行不能预见、不能避免并不能克服的战争、暴动、严重火灾、水灾、台风、地震、政府行为、禁令、或供电、通讯、黑客攻击等客观情况）导致建设银行不能按约定履约的，建设银行将视情况给予客户必要的帮助。根据不可抗力的影响，建设银行部分或全部免除责任。对于在交易过程中，因暂时的网络通讯故障或其他原因造成的账务问题，建设银行有权根据实际交易情况进行账务处理。
              </p>
              <p class="pStyle">
                4．客户授权建设银行在发生以下情形时，建设银行有权对该e账户采取限制措施，包括但不限于止付、止收、将账户状态改为未激活、解除绑定账户直至强行销户，相关责任由此产生的损失均由客户承担：
              </p>
              <p class="pStyle">
                （1）建设银行有证据证明该e账户非客户本人开立的；
              </p>
              <p class="pStyle">
                （2）客户否认e账户由本人开立；
              </p>
              <p class="pStyle">
                （3）绑定账户非客户本人账户；
              </p>
              <p class="pStyle">
                （4）长期不动户、零余额账户；
              </p>
              <p class="pStyle">
                （5）客户未按规定使用支付电子工具、违规使用e账户或者未支付电子或服务费用的，建设银行有权停用直至撤销其e账户；
              </p>
              <p class="pStyle">
                （6）客户违反本须知约定开立或使用本人银行账户；
              </p>
              <p class="pStyle">
                （7）其他建设银行认为可能对账户安全性产生影响的情形。
              </p>
              <p class="pStyle">
                5．本须知未尽事宜均依据中华人民共和国法律、行政法规、人民银行及银行业监督机关的有关规章、政策规定及金融业的行业惯例办理。
              </p>
              <p class="pStyle">
                6．本须知由建设银行负责制定、解释和修改，自页面显示开户完成且生成电子银行账号之日起生效，自销户之日起终止。
              </p>
              <p class="pStyle" style="font-weight:bold;color:black;">
                7．客户同意建设银行有权根据国家法律法规及业务需要对本须知约定内容及e账户使用规则进行调整，并同意该项调整将在建设银行正式渠道公告后按公告内容执行，无需另行通知客户。如客户在公告实施后继续使用e账户，视为客户接受上述变更，双方无须另行签订书面协议；如客户不愿接受建设银行公告内容的，应在公告后及时申请终止相关服务。
              </p>
              <p class="pStyle">
                8．客户开户后使用建设银行服务还需遵守《中国建设银行电子银行个人服务协议》的相关规定。《中国建设银行电子银行个人服务协议》作为本须知的附件，与本须知一同生效，具有同等法律效力。
              </p>
              <p class="pStyle">
                9．本须知适用中华人民共和国法律。
              </p>
              <p class="pStyle">
                10．客户与建设银行在履行协议时发生的争议，由双方协商处理；协商不成，由客户开户时选择的所在地的人民法院管辖。在诉讼期间，本须知不涉及争议部分的条款仍须履行。
              </p>
              <div>
                <p class="pStyle">
                  <a style="font-weight:bold;color:black;">客户声明：</a>
                  本人已认真阅读本须知，同意通过数据电文和电子签名方式签约，并已特别注意本须知中的加黑条款的内容，同时中国建设银行已应客户要求对上述条款予以详细说明。本人对以上条款的含义及相应的法律后果已全部通晓并充分理解，同意遵守以上全部条款，自愿承担可能出现的相关风险。
                </p>
              </div>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-button :disabled="!checked" @click="openAccount" class="el-btn btn">{{$t('btnOpen')}}</el-button>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'LeadingPage',
  data () {
    return {
      showFlag: false,
      checked: false
    }
  },
  methods: {
    openAccount () {
      this.$router.push({ path: '/openPayRollOne' })
    },
    back () {
      let vm = this
      vm.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
div >>> .el-dialog__header {
  background-color: inherit;
  padding: 2vh 0;
  border-bottom: solid 1px #bbbbbb;
  overflow: scroll;
  height: 6vw;
}
div >>> .el-dialog__title {
  color: #888888;
  font-size: 3.5vw;
  margin-left: 10vw;
}
div >>> .el-dialog__body {
  background-color: inherit;
  padding: 2vw 3vw;
  overflow: scroll;
  height: 60vh;
}
.pStyle {
  text-indent: 2em;
  margin: 0 0;
}
.el-form {
  margin: 0 auto;
  background-color: white;
  height: 92vh !important;
}
.el-row-leadMsg {
  margin: 12vw 2vw 2.5vw 2vw;
  padding: 2.5vw 2vw;
}
.el-col-leadMsg {
  font-size: 4vw;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  text-align: center;
  color: #6666ff;
  letter-spacing: 0;
}
.row-img {
  margin: 10vw 2vw;
}
.img {
  width: 94vw;
  height: 50vw;
}
.btn {
  width: 92vw;
  margin: 8vw 4vw 8vw 4vw;
}
.row-prompt {
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 3vw;
  margin: 0vh 4vw;
  color: #9b9b9b;
}
.row-msg1 {
  margin: 0 0 0 5vw;
}
.row-msg1 ul li {
  margin: 3vw 0;
}
.row-msg2 {
  margin: 0 0 0 11vw;
}
.a {
  color: #0101fd;
  text-decoration: none;
}
</style>
