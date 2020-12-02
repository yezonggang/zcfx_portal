<template>
  <div class="content">
    <div class="main-content">
      <div class="title">一键订阅，让项目来找您</div>
      <div class="title subtitle">支持按需订阅，精准推送，随时获取您最需要的项目信息</div>
      <div class="multiselect">
        <myfilter ref="myfilter" textColor="#333" :showSelectAll="false" :maxSelected="9" :selectData="originalSelectedData" :all-list="filterList" @get-sel-data="getFilterSelData" :showMoreNumber="10"></myfilter>
        <div class="submit">
          <el-button type="primary" @click="list()" style="padding:16px 36px;font-size:18px">一键订阅</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
const searchDict = [
	{
		title: '集团板块',
		value: 'ywbk',
		childer: [
			{ title: '集团本部', value: '集团本部', active: false },
			{ title: '豫能控股', value: '豫能控股', active: false },
			{ title: '科技投资', value: '科技投资', active: false },
			{ title: '大河纸业', value: '大河纸业', active: false },
			// { title: '郑煤', value: '郑煤', active: false },
			{ title: '产业管理部', value: '产业管理部', active: false },
			{ title: '城市发展', value: '城市发展', active: false },
			{ title: '颐城控股', value: '颐城控股', active: false },
			{ title: '信息产业', value: '信息产业', active: false },
			{ title: '基金管理部', value: '基金管理部', active: false },
		],
	},
	{
		title: '郑煤板块',
		value: 'ywbk',
		childer: [{ title: '郑煤集团', value: '郑煤集团', active: false }],
	},
	{
		title: '采购类别',
		value: 'cgfs',
		childer: [
			{ title: '公开招标', value: '公开招标', active: false },
			{ title: '邀请招标', value: '邀请招标', active: false },
			{ title: '询比采购(询价采购)', value: '询价采购', active: false },
			{
				title: '谈判采购(竞争性谈判)',
				value: '竞争性谈判',
				active: false,
			},
			{
				title: '直接采购(单一来源)',
				value: '单一来源采购',
				active: false,
			},
			// { title: '竞争性磋商(已废弃)', value: '竞争性磋商', active: false },
		],
	},
]

import { saveSubscription,getSubscription,getGbfl } from '@/api/zc'
import myfilter from "@/components/MultiSelect/myfilter";
import { Handler } from 'mockjs';
export default {
  name: "zbdy",
  components: {
    myfilter,
  },
  data() {
    return {
      text: null,
      //所有的条件
			filterList: searchDict,
			//选中的搜索条件
      filterSelData: {},
      originalSelectedData:[],
    };
  },
  methods: {
    getData: function () {

      getSubscription(this.$store.getters.userId).then((response) => {
              this.originalSelectedData.splice(0, this.originalSelectedData.length);
        //循环结果数据
        for (const key in response) {
          //如果包含此属性
          if (response.hasOwnProperty(key)) {
            //获得此属性对应的对象
            const element = response[key];
            //如果对象是数组开始转换
            if(Array.isArray(element)&&element.length>0){
              for (const one of this.filterList) {
                if(one.value == key)
                  for (const min of one.childer) {
                    if(element.includes(min.value)){
                      min.active=true
                      this.originalSelectedData.push(min)
                    }
                  }
              }
            }
          }
        }
        //获取子组件对象,更新选中值
        this.$refs.myfilter.selectData=this.originalSelectedData
      })
      
    },
    list: function () {
      this.filterSelData['userId']=this.$store.getters.userId
      saveSubscription(this.filterSelData).then((res) => {
				if (res) {
					this.$message({
						message: res,
						type: 'success',
					})
				} else {
          this.$message.error('更新订阅失败')
				}
			})
		},
    // 获取筛选组件选中的值
		getFilterSelData(data) {
			this.filterSelData = data
    },
    getGbfl(){
			getGbfl().then((data)=>{
				//为了避免重复添加行业分类
				for (const one of searchDict) {
					if(one.title=='行业分类'&&one.childer&&one.childer.length>0){
						//在切换页面后将上次激活的行业分类取消激活
						for(let i  in one.childer){
							one.childer[i].active = false
						}
						return
					}
				}
				for(let i  in data){
					data[i].active = false
				}
				//console.log("行业分类",data)
				searchDict.push({title: '行业分类',value: 'hylb',childer: data})
        this.filterList= searchDict
        this.getData()
			})
		},
		
  },
  created() {
    //获取订阅数据
    this.getGbfl()
    this.getData()
  },
};
</script>

<style lang="css" scoped>
/* 背景div */
.content {
  margin-top: 0;
  width: 100%;
  min-height: 100vh;
  background-image: url(../../assets/zbdy/background.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
/* 主要内容设置 */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  min-width: 1200px;
  min-height: 100vh;
}
/* 标题设置 */
.title {
  padding-top: 9%;
  padding-bottom: 4%;
  height: 33px;
  color: #fff;
  width: 100%;
  text-align: center;
  line-height: 21px;
  font-family: "Source SansSC Bold";
  font-size: 32px;
}
.subtitle {
  padding-top: 0;
  font-family: "Source SansSC";
  font-size: 22px;
  font-weight: normal;
}
/* 多选样式设置 */
.multiselect {
  box-shadow: 0px 0px 20px 0px 
		rgba(78, 149, 255, 0.4);
	border-radius: 10px;
  box-sizing: border-box;
  margin: 3% auto 0;
  padding: 40px 30px;
  background-color: rgba(255, 255, 255, .8);
  width: 80%;
}
.submit {
  padding-top: 1rem;
  text-align: center;
}

</style>