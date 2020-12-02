<template>
  <div class="footer-main"> 
    <table align="center" >
      <tr>
        <td>业务服务时间：</td>
        <td>
          冬春(10月1日-4月30日 周一至周五上午08:30-12:00，下午14:30-17:30)
          <br>
          夏秋(  5月1日-9月30日 周一至周五上午08:30-12:00，下午15:00-18:00)
        </td>
      </tr>
      <tr>
        <td>咨询服务电话：</td>
        <td>400-8371-211 业务咨询与办理请按"0"，平台监督与投诉请按"9"</td>
      </tr>
      <tr>
        <td colspan="2" class="">省综合评标专家库抽取终端： 0371-60105113</td>
      </tr>
    </table>
    <p style="text-align:center">版权所有：©2010-2020 &nbsp;&nbsp;河南兴豫电子商务有限公司&nbsp;&nbsp;地址：河南省郑州市农业路东段29号海特大厦5、6、7层&nbsp;&nbsp;邮编：450008</p>
    </div>
</template>
<script>
export default {
  name: "indexFooter",
  props:{
    textColor:{
      type: String,
      default: null
    }
  },
  data() {
    return {
    };
  },
  computed: {
		getTextColor() {
      if(this.textColor==null){
        return this.$store.getters.navTextColor
      }else{
        return this.textColor
      }
		},
	},
};
</script>
<style lang="css" scoped>
.footer-main {
  padding: 20px 0 20px;
  width: 100%;
  background: #333;
  font-size: 14px;
  line-height: 21px;
  color: #fafafa;
}

</style>