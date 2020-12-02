<template>
	<div>
		<div class="search-content">
			<div class="search-title">一站式招投标信息搜索</div>
			<div class="searchClassContext">
				<div
					class="searchClass"
					:class="{ active: active }"
					@click="toggle"
				>
					查项目
				</div>
				<div
					class="searchClass"
					:class="{ active: !active }"
					@click="toggle"
				>
					查商品
				</div>
			</div>
			<el-tabs stretch v-model="searchPane">
				<el-tab-pane name="xm">
					<div class="input-box">
						<el-input
							placeholder="请输入项目名称等关键词"
							v-model="keyword"
							@keyup.enter.native="onList()"
							clearable
						>
						<el-button
								slot="append"
								icon="el-icon-search"
								@click="onList()"
							></el-button>
						</el-input>
					</div>

					<div class="hot-key-content">
						大家都在搜:
						<span class="hot-key" @click="onList('兴豫电子')"
							>兴豫电子</span
						>
						<span class="hot-key" @click="onList('矿石')"
							>矿石</span
						>
						<span class="hot-key" @click="onList('城发')"
							>城发</span
						>
						<span class="hot-key" @click="onList('能源')"
							>能源</span
						>
						<span class="hot-key" @click="onList('信产投')"
							>信产投</span
						>
					</div>
				</el-tab-pane>
				<el-tab-pane name="sp">
					<div class="input-box">
						<el-autocomplete
							popper-class="my-autocomplete"
							style="width:100%;"
							class="inline-input"
							v-model="keyword2"
							:fetch-suggestions="remoteMethod"
							placeholder="请选择商品后在此处搜索技术参数"
							
							@select="selectJscs2"
						>
						<i class="el-icon-search el-input__icon"
							slot="suffix"
							@click="selectSp">
						</i>
						<template slot-scope="{ item }">
							<div class="name">参数：{{ item.value }}</div>
							<span class="addr">名称：{{ item.spmc }}</span>
						</template>
						</el-autocomplete>
						<!-- <el-input
							placeholder="请输入商品名称等关键词"
							v-model="keyword"
							@keyup.enter.native="onList()"
							clearable
						> -->
							<!-- <el-button
								slot="append"
								icon="el-icon-search"
								@click="onList()"
							></el-button>
						</el-input> -->
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="main-content" style="margin-top: -80px">
			<!-- 条件 -->
			<el-card class="condition-content" shadow="never">
				<el-tabs stretch v-model="searchPane" ref="tabs">
					<el-tab-pane name="xm">
						<myfilter
							:roles="roles"
							:all-list="filterList"
							@get-sel-data="getFilterSelData"
						>
							<!-- 以下两个自定义条件multi-select-flex 减少margin-bottom10px ，multi-select-tab增高10px -->
							<div
								class="multi-select-flex"
								style="margin-bottom: 6px; height: 40px"
							>
								<span class="multi-select-title"
									>中标金额：</span
								>
								<div class="multi-select-content">
									<div
										class="multi-select-tab"
										style="height: 40px"
									>
										<el-input
											placeholder="最低金额"
											v-model="jgys1"
											size="mini"
											clearable
											@change="checkInput1"
										>
											<i
												slot="prefix"
												class="el-input__icon el-icon-zchuobi"
											></i>
										</el-input>
										<span class="nohover">——</span>
										<el-input
											placeholder="最高金额"
											v-model="jgys2"
											size="mini"
											clearable
											@change="checkInput2"
										>
											<i
												slot="prefix"
												class="el-input__icon el-icon-zchuobi"
											></i>
										</el-input>
									</div>
								</div>
							</div>
							<div
								class="multi-select-flex"
								style="margin-bottom: 6px; height: 40px"
							>
								<span class="multi-select-title"
									>开标时间：</span
								>
								<div class="multi-select-content">
									<div
										class="multi-select-tab"
										style="height: 40px"
									>
										<el-date-picker
											v-model="startTime"
											type="datetime"
											placeholder="开始时间"
											align="right"
											size="mini"
										></el-date-picker>
										<span class="nohover">——</span>
										<el-date-picker
											v-model="endTime"
											type="datetime"
											placeholder="截至时间"
											align="right"
											size="mini"
										></el-date-picker>
									</div>
								</div>
							</div>
						</myfilter>
					</el-tab-pane>
					<el-tab-pane name="sp">
						<!-- 商品一级分类 -->
						<el-tabs
							stretch
							v-model="spflPane.first"
							@tab-click="firstHandleClick"
						>
							<el-tab-pane
								v-for="(item, key) in spfl"
								:key="key"
								:label="key"
								:name="key"
							>
								<!-- 商品二级分类 -->
								<el-tabs
									v-model="spflPane.second"
									tab-position="left"
									style="height: 300px"
								>
									<el-tab-pane
										style="height: 300px"
										v-for="(seItem, seKey) in item"
										:key="seKey"
										:label="seKey"
										:name="seKey"
									>
									<el-scrollbar style="height: 100%;">
										<span
											v-for="thItem in seItem"
											:key="thItem.name"
											:class="{
												'spfl-th-item': true,
												'spfl-th-item-is-active':
													thItem.active,
											}"
											@click="selectSpfl(thItem)"
										>
											{{ thItem.name }}
										</span>
									</el-scrollbar>
										
									</el-tab-pane>
								</el-tabs>
							</el-tab-pane>
						</el-tabs>
						<!-- <el-row type="flex" align="">
							<el-col :span="2" style="padding: 5px 0 0 14px"
								>技术参数</el-col
							>
							<el-col :span="22">
								<div>
									<template v-if="jscs.length > 0">
										<span
											v-for="item in jscs"
											:key="item.jscs"
											:class="{
												'multi-selected': true,
												'multi-selected-active':
													item.active,
											}"
											:title="item.jscs"
											@click="selectJscs(item)"
										>
											{{ item.jscs }}
										</span>
									</template>
									<template v-else>
										<div class="multi-selected">
											暂无分类
										</div>
									</template>
								</div>
							</el-col>
						</el-row> -->
						<!-- 商品分类结束 -->
					</el-tab-pane>
				</el-tabs>
			</el-card>
			<!-- 结果 -->
			<el-tabs stretch v-model="searchPane" class="result-content" v-loading="xmLoading">
				<el-tab-pane name="xm">
					<el-card>
						<div slot="header" class="clearfix">
							<div class="info-bar">
								共检索到<span style="color: #4e95ff">{{
									total
								}}</span
								>条信息
							</div>
							<!-- <span>卡片名称</span> -->
							<el-select
								size="medium"
								v-model="sort"
								placeholder="排序"
								style="float: right"
								@change="onList()"
							>
								<el-option
									v-for="item in sortOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>

						<div
							v-for="item in searchResult"
							:key="item.id + item.wjlb"
						>
							<div>
								<div class="result-title">
									<!--  如果是招标文件或投标文件 标题展示为项目名称 原因是文件名字用户大多填写不正确 -->
									<template
										
									>
										<router-link
											class="zc-hover"
											:to="{
												path: '/zbss/doc-detail',
												query: item,
											}"
											tag="a"
											v-html="item.xmmc"
											target="_blank"
											>{{ item.xmmc }}</router-link
										>
									</template>
									<!--  否则展示为文件名称 -->
									<!-- <template v-else-if="isNotEmpty(item.wjmc)">
										<router-link
											class="zc-hover"
											:to="{
												path: '/zbss/doc-detail',
												query: item,
											}"
											tag="a"
											v-html="item.wjmc"
											target="_blank"
											>{{ item.wjmc }}</router-link
										>
									</template> -->
								</div>

								<div class="tags-group">
									<el-tag
										v-if="isNotEmpty(item.wjlb)"
										size="medium"
										>{{ item.wjlb | filterWjlb }}</el-tag
									>
									<el-tag
										v-if="isNotEmpty(item.scsj)"
										size="medium"
										>上传时间：{{
											formatTime(item.scsj, '{y}-{m}-{d}')
										}}</el-tag
									>
									<el-tag
										v-if="isNotEmpty(item.cgfs)"
										size="medium"
										type="warning"
										>{{ item.cgfs }}</el-tag
									>
									<el-tag
										v-if="isNotEmpty(item.ywbk)"
										size="medium"
										type="success"
										>{{ item.ywbk }}</el-tag
									>
									<el-tag
										v-for="(lb, index) in strToArr(
											item.hylb,
											','
										)"
										size="medium"
										:key="index"
										>{{ lb }}</el-tag
									>
								</div>
							</div>
							<el-row v-if="isNotEmpty(item.zbbh)">
								<template v-if="isNotEmpty(item.zbbh)">
									<span class="field">项目编号</span>
									<span class="view-text">{{
										item.zbbh
									}}</span>
								</template>
							</el-row>

							<el-row
								:gutter="20"
								v-if="
									isNotEmpty(item.dwmc) ||
									isNotEmpty(item.dljgmc)
								"
							>
								<el-col :md="10">
									<div v-if="isNotEmpty(item.dwmc)">
										<span class="field">采购单位</span>
										<span
											class="view-text"
											v-html="item.dwmc"
											>{{ item.dwmc }}</span
										>
									</div>
								</el-col>
								<el-col :md="10">
									<div v-if="isNotEmpty(item.dljgmc)">
										<span class="field">代理机构</span>
										<span
											class="view-text"
											v-html="item.dljgmc"
											>{{ item.dljgmc }}</span
										>
									</div>
								</el-col>
							</el-row>

							<el-row
								:gutter="20"
								v-if="
									isNotEmpty(item.zbdw) ||
									isNotEmpty(item.zbje)
								"
							>
								<el-col :md="10">
									<div v-if="isNotEmpty(item.zbje)">
										<span class="field">中标金额</span>
										<span class="view-text"
											>{{ item.zbje }} 元</span
										>
									</div>
								</el-col>
								<el-col :md="10">
									<div v-if="isNotEmpty(item.zbdw)">
										<span class="field">中标单位</span>
										<span
											class="view-text"
											v-html="item.zbdw"
											>{{ item.zbdw }}</span
										>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<span class="field">公告内容</span>
								<router-link
									class="view-text zc-hover"
									:to="{
										path: '/zbss/doc-detail',
										query: item,
									}"
									target="_blank"
									tag="a"
									v-html="summaryFormat(item.first_paragraph)"
								></router-link>
							</el-row>
							<el-divider></el-divider>
						</div>
						<pagination
							style="padding: 10px"
							v-show="total > 0"
							:total="total"
							:page.sync="pageNo"
							:limit.sync="pageSize"
							@pagination="onList()"
						/>
					</el-card>
				</el-tab-pane>
				<el-tab-pane name="sp">
					<el-row :gutter="24" style="margin:0;padding:10px 0;background-color: rgba(255,255,255,0);display: flex;
						justify-content: space-between;
						align-items: stretch;">
						<el-col :span="16" style="padding-left:0px;">
							<el-card>
								<div style="display: flex">商品明细
									<span v-if="selectedSpfl && selectedSpfl.name" >&nbsp;&nbsp;&nbsp;【{{selectedSpfl.name}}】&nbsp;&nbsp;&nbsp;</span>
									<span v-if="selectedJscs && selectedJscs.jscs" style="display: inline-block;width:300px;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">【{{selectedJscs.jscs}}】</span>
								</div>
								 <el-divider></el-divider>
								 <el-table
									v-loading="spLoading"
									:data="spmxList"
									:header-cell-style="{color:'#333',fontWeight:'normal',border:'none'}"
									:cell-style="{border:'none'}"
									fit
									:stripe="true"
									highlight-current-row
									style="width: 100%"
								>
								<el-table-column align="left" min-width="160" label="所属项目">
									<template slot-scope="scope">
									<span>{{ scope.row.ssxm | isNull}}</span>
									</template>
								</el-table-column>
								<el-table-column align="center" min-width="60" label="采购数量">
									<template slot-scope="scope">
									<span>{{ scope.row.cgsl | isNull}}</span>
									</template>
								</el-table-column>
								<el-table-column align="center" min-width="60" label="定价">
									<template slot-scope="scope">
									<span>{{ scope.row.dj | isNull}} 元</span>
									</template>
								</el-table-column>
								<el-table-column align="center" min-width="60" label="单位">
									<template slot-scope="scope">
									<span>{{ scope.row.dw | isNull}} </span>
									</template>
								</el-table-column>
								<el-table-column  align="center" min-width="60" label="添加日期">
									<template slot-scope ="scope">
									<span>{{ scope.row.zbsj | parseTime('{y}-{m}-{d}')}}</span>
									</template>
								</el-table-column>
							</el-table>
							<pagination
								style="padding: 10px"
								v-show="spmxTotal > 0"
								:total="spmxTotal"
								:page.sync="spmxPage"
								:limit.sync="spmxLimit"
								@pagination="getSpmx"
							/>
							</el-card>
						</el-col>
						<el-col :span="8" style="padding-right:0px;">
							<el-card>
								<div>价格趋势</div>
								 <el-divider></el-divider>
								 <Cur ref="cur" id="cur" :option="curOption" :width="curWidth"></Cur>
							</el-card>
							</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import Cur from '@/components/Echarts/Cur'
// 页脚
import indexFooter from '@/components/Footer/index'
// 标签选择组件
import myfilter from '@/components/MultiSelect/myfilter'
// 招采通用样式
import '@/styles/zc.css'
// 第三方图标引入(alibaba图标库) 如果需要新增图标需要整体更新
import '@/assets/icon/iconfont.css'
// 分页插件
import Pagination from '@/components/Pagination'
// 工具方法
import { isNotEmpty, formatTime, parseTime, filterWjlb } from '@/utils/index'
// api
import { getList, getGbfl, getSpjscs,getSpjscs2,getSpdjzs,getSpmx } from '@/api/zc'

//引入菜单数据
import formatData from '@/assets/data/format.json'
// vuex
import store from '@/store'
// 字典信息
const searchDict = [
	{
		title: '集团板块',
		value: 'ywbk',
		childer: [
			{ title: '集团本部', value: '集团本部', active: false },
			{ title: '豫能控股', value: '豫能控股', active: false },
			{ title: '科技投资', value: '科技投资', active: false },
			{ title: '大河纸业', value: '大河纸业', active: false },
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
		],
	},
	{
		title: '信息类型',
		value: 'wjlb',
		childer: [
			{ title: '采购公告', value: 1, active: false },
			{ title: '澄清公告', value: 4, active: false },
			{ title: '评审公示(预中标公告)', value: 8, active: false },
			{ title: '结果公告', value: 2, active: false },
			{ title: '招标文件', value: 5, active: false,roles:['admin'] },
			{ title: '投标文件', value: 6, active: false,roles:['admin'] },
		],
	},
]

// 排序规则
const searchSort = [
	{ value: 'asc', label: '发布时间从早到晚' },
	{ value: 'desc', label: '发布时间从晚到早' },
]

const defaultOption = {
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  name: "lntjfb",
  symbolSize: 5,
  lineStyle: {
    normal: {
      label: {
        show: true,
      },
      width: 5,
      color: "#fe4857",
    },
  },
  series: [
    {
      itemStyle: { normal: { label: { show: true } } },
      data: [],
      type: "line",
    //   smooth: true,
    },
  ],
}
export default {
	name: 'zbss',
	components: {
		myfilter,
		Pagination,
		indexFooter,
		Cur
	},
	data() {
		return {
			roles:store.getters.roles,
			// 搜索关键词
			keyword: '河南兴豫电子',
			keyword2: '',
			// 搜索条件-排序规则选中
			sort: '',
			// 搜索条件-金额限制
			jgys1: null,
			jgys2: null,
			// 搜索条件-时间限制
			startTime: null,
			endTime: null,
			// 搜索分页数据-总页数、当前页、页大小 每次结果返回后刷新
			total: 0,
			pageNo: 1,
			pageSize: 10,
			// 搜索组件选中的数据
			filterSelData: {},
			// 搜索按钮样式 用于激活 项目/商品 搜索切换
			active: true,
			// 搜索面板名称 用于激活 项目/商品 搜索面板
			searchPane: 'xm',
			// 搜索 结果数据
			searchResult: [],
			// 初始化数据-排序规则
			sortOptions: searchSort,
			// 初始化数据-搜索组件初始化数据
			filterList: searchDict,
			// 搜索商品分类面板名称 用于默认选中
			spflPane: {
				first: '',
				second: '',
			},
			//商品分类数据
			spfl: formatData,
			//选中的商品分类数据
			//selectedSpfl:[]
			selectedSpfl: { },
			// 待选技术参数
			jscs: [],
			jscsOptions:[],
			//选中根据商品名称查出的技术参数 将作为参数提交
			selectedJscs: {},
			//选中根据关键词查出的技术参数 将作为参数提交
			// selectedJscs2: {},
			curOption:defaultOption,
			curWidth:'100%',
			// 技术参数、商品、项目搜索loading
			jscsLoading:false,
			spLoading:false,
			xmLoading:false,
			spmxList:[],
			spmxTotal:0,
			spmxPage:1,
			spmxLimit:10
		}
	},
	filters: {
		// 过滤展示文件类别
		filterWjlb(number) {
			return filterWjlb(number)
		},
		// 格式化时间
		parseTime (x,y){
			return parseTime(x,y)
		},
		isNull (x){
			if(x==null || x==undefined){
				return '未知'
			}
			return x
		}
	},
	methods: {
		// 项目搜索
		onList: function (word) {
			// console.log('word', word)
			if (isNotEmpty(word)) this.keyword = word
			for (var key in this.filterSelData) {
				// console.log(key + ':' + this.filterSelData[key])
				if (
					Array.isArray(this.filterSelData[key]) &&
					this.filterSelData[key].length > 0
				)
					this.filterSelData[key] = this.filterSelData[key].join(',')
			}
			this.filterSelData.sort = this.sort
			this.filterSelData.jgys1 = this.jgys1
			this.filterSelData.jgys2 = this.jgys2
			this.filterSelData.keyword = this.keyword
			this.filterSelData.pageNo =
				this.pageNo > 0 ? this.pageNo - 1 : this.pageNo
			this.filterSelData.pageSize = this.pageSize
			if (this.startTime) {
				// console.log('开始时间', this.startTime)
				this.filterSelData.startTime = parseTime(
					this.startTime.getTime(),
					'{y}{m}{d}{h}{i}'
				)
			} else {
				this.filterSelData.startTime = null
			}
			if (this.endTime) {
				// console.log('截至时间', this.endTime)
				this.filterSelData.endTime = parseTime(
					this.endTime.getTime(),
					'{y}{m}{d}{h}{i}'
				)
			} else {
				this.filterSelData.endTime = null
			}
			// console.log('发送的数据', this.filterSelData)
			getList(this.filterSelData).then((res) => {
				//console.log(res);
				if (res && typeof res == 'string') {
					let data = JSON.parse(res)
					// console.log('响应的数据', data)
					// 分页信息回执
					// console.log('响应的数据分页', data.pageable.pageNumber,data.pageable.pageNumber+1)
					this.pageNo =
						(data.pageable.pageNumber
							? data.pageable.pageNumber + 1
							: 0) || 0
					this.pageSize = data.pageable.pageSize || 10
					this.total = data.totalElements || 0
					this.total = this.total > 1000 ? 1000 : this.total
					//内容
					this.searchResult = data.content
				} else {
					this.pageNo = 0
					this.total = 0
					//内容
					this.searchResult = []
					this.$message({
						message: '未搜索到符合条件的数据',
						type: 'warning',
					})
				}
			})
		},

		// 切换展示 项目/商品 的关键词输入框、条件、展示结果
		toggle() {
			//按钮样式切换
			this.active = !this.active
			if (this.searchPane == 'sp') {
				this.searchPane = 'xm'
			} else {
				this.searchPane = 'sp'
			}
		},

		// 获取条件选择组件选中的数组值
		getFilterSelData(data) {
			// console.log('接受到数据', data)
			this.filterSelData = data
		},

		// 判断对象是否为空
		isNotEmpty(obj) {
			return isNotEmpty(obj)
		},

		// 根据指定格式格式化时间字符串
		// eg: 201904101015
		formatTime(time, option) {
			if (time) {
				time = time + ''
				let year = time.substring(0, 4)
				let mouth = time.substring(4, 6)
				let day = time.substring(6, 8)
				let dd = time.substring(8, 10)
				let mm = time.substring(10, 12)
				return year + '-' + mouth + '-' + day
				// return formatTime(date.getTime(),option)
			}

			return '未知时间'
		},
		// 将字符串或数字按照指定字符分割成数组 无效数据返回空数组
		strToArr(s, spl) {
			if (s) {
				return (s + '').split(spl)
			}
			return []
		},
		// 时间输入框手段校验
		checkInput1(value) {
			let reg = /^[1-9]\d*$/
			if (value) {
				if (new RegExp(reg).test(value) == false) {
					this.jgys1 = null
					this.$message({
						message: '金额只能是数字',
						type: 'warning',
					})
				} else {
					if (this.isNotEmpty(this.jgys2)) {
						if (Number(this.jgys1) > Number(this.jgys2)) {
							this.jgys1 = null
							this.$message({
								message: '最低金额只能小于最高金额',
								type: 'warning',
							})
						}
					}
				}
			}
		},
		checkInput2(value) {
			let reg = /^[1-9]\d*$/
			if (value) {
				if (new RegExp(reg).test(value) == false) {
					this.jgys2 = null
					this.$message({
						message: '金额只能是数字',
						type: 'warning',
					})
				} else {
					if (this.isNotEmpty(this.jgys1)) {
						if (Number(this.jgys1) > Number(this.jgys2)) {
							this.jgys2 = null
							this.$message({
								message: '最高金额只能大于最低金额',
								type: 'warning',
							})
						}
					}
				}
			}
		},
		getGbfl() {
			getGbfl().then((data) => {
				// 将返回的 active 属性‘false’ 变更为 false
				for (let i in data) {
					data[i].active = false
				}
				searchDict.push({
					title: '行业分类',
					value: 'hylb',
					childer: data,
				})
				this.filterList = searchDict
			})
		},
		getSpjscs(param) {
			getSpjscs(param).then((respone) => {
				if (respone && respone.length > 0) {
					respone.map((item) => {
						item.active = false
					})
					this.jscs = respone
				} else {
					// console.log('获取的商品分类',respone)
					this.jscs = []
				}
			})
		},
		//隐藏页面切换的tab头
		hideTabs() {
			this.$refs.tabs.$children[0].$el.style.display = 'none'
		},
		//获取商品分类
		getSpfl() {
			//添加默认选中 默认为第一个大类和其下第一个二级类
			for (const key in this.spfl) {
				this.spflPane.first = key
				for (const subKey in this.spfl[key]) {
					this.spflPane.second = subKey
					return
				}
			}
		},
		//切换一级tab页时触发
		firstHandleClick(tab, event) {
			//获取tab页标头内容
			let selected = event.target.outerText
			//二级分类默认为选中一级的第一个
			for (const key in this.spfl[selected]) {
				this.spflPane.second = key
				return
			}
		},
		//选中商品
		selectSpfl(item) {
			// console.log('选中商品分类',item)
			// 如果选中和上次一样则什么也不做
			if (item == this.selectedSpfl) return
			// 上一次选中设为不选中
			this.selectedSpfl.active = false
			// 当前选中项设为选中
			item.active = true
			// 标记
			this.selectedSpfl = item

			// 清空已选技术参数
			this.keyword2 = null
			this.selectedJscs.jscs = null
			// 技术参数不为空
			// if(this.selectedJscs.jscs){
			// 	this.selectSp();
			// }else{
			// 	this.$message({
			// 		message: '请先输入有效技术参数',
			// 		type: 'warning',
			// 	})
			// }

			// 发起请求
			// this.getSpjscs({ spmc: item.name })
		},
		// 选中根据商品标签带出的技术参数
		// selectJscs(item) {
		// 	console.log('选中商品技术参数',item)
		// 	// 如果选中和上次一样则什么也不做
		// 	if (item == this.selectedJscs) return
		// 	// console.log('选中技术参数', item)
		// 	// 上一次选中设为不选中
		// 	this.selectedJscs.active = false
		// 	// 当前选中项设为选中
		// 	item.active = true
		// 	// 标记
		// 	this.selectedJscs = item
		// 	// 请求商品的价格走势
		// 	this.getSpdjzs({spmc:this.selectedSpfl.name,jscs:this.selectedJscs.jscs})
		// 	// 请求商品明细
		// 	this.getSpmx({spmc:this.selectedSpfl.name,page:this.spmxPage,limit:this.spmxLimit,jscs:this.selectedJscs.jscs})
		// },
		// 选中根据关键词带出的技术参数
		selectJscs2(item) {
			// console.log('选中技术参数',item)
			// 标记
			this.selectedJscs.jscs = item.value
			this.selectSp();
		},
		selectSp(){
			if(!this.selectedSpfl.name){
				this.$message({
					message: '请选择商品',
					type: 'warning',
				})
				return
			}
			if(!this.selectedJscs.jscs){
				this.$message({
					message: '请输入技术参数',
					type: 'warning',
				})
				return
			}
			// 请求商品的价格走势
			this.getSpdjzs({spmc:this.selectedSpfl.name,jscs:this.selectedJscs.jscs})
			// 请求商品明细
			this.getSpmx({spmc:this.selectedSpfl.name,page:this.spmxPage,limit:this.spmxLimit,jscs:this.selectedJscs.jscs})
		},
		// 根据商品名称，技术参数 获取商品的价格走势
		getSpdjzs(param) {
			getSpdjzs(param).then(response=>{
				// console.log('价格走势', response)
					let idArray =[]
					let valueArray = []
					response.map((item)=>{
						idArray.push(parseTime(item.id,'{y}-{m}-{d}'))
						valueArray.push(item.value)
					})
					this.curOption.xAxis.data = idArray
					this.curOption.series[0].data = valueArray
					this.$refs.cur.resizeChart()
			})
		},
		// 根据商品名称和技术参数查询商品明细
		getSpmx(param){	
			getSpmx(param).then(response=>{
				
				this.spLoading = true;
				if (response.data) {
					// console.log('价格明细', response)
					if (!Array.isArray(response.data)) response.data = [response.data];
					this.spmxList = response.data;
					this.spmxTotal = response.pageInfo.totalCount;
				} else {
					this.$message({
						message: '未搜索到符合条件的数据',
						type: 'warning',
					})
				}
				this.spLoading = false;
			}).catch(e=>{
				this.$message({
					message: '系统开小差了~',
					type: 'warning',
				})
				this.spLoading = false;
			})
		},
		remoteMethod(query,cb){
			if(!this.selectedSpfl.name){
				//商品未选择需要输入两个字符以上才能开始查询技术参数
				if (query !== '' && query.length>=2) {
					this.getSpjscs2(query,cb)
				}else{
					this.jscsOptions = []
					cb(this.jscsOptions)
				}
			}else{
				// console.log(query)
				this.getSpjscs2(query,cb)
			}
			
		},getSpjscs2(query,cb){
			this.loading = true;
			getSpjscs2({spmc:this.selectedSpfl.name,jscs:query}).then(response=>{
				if(response && response.length>0){
					this.jscsOptions = response
				}else{
					this.jscsOptions = []
				}
				cb(this.jscsOptions)
				this.loading = false;
			}).catch(e=>{
				this.$message({
					message: '系统开小差了~',
					type: 'warning',
				})
				this.jscsOptions = []
				cb(this.jscsOptions)
				this.loading = false;
			})
		},
		summaryFormat(text){
			if(text&&text.length>150){
				return text.substring(0,150)+'...'
			}else{
				return '暂无数据'
			}
		}
	},
	mounted() {
		this.hideTabs()
		// 初始化条件
		for (const key in formatData) {
			if (formatData.hasOwnProperty(key)) {
				const element = formatData[key];
				for (const key2 in element) {
				if (element.hasOwnProperty(key2)) {
					const element2 = element[key2];
					for (const key3 in element2) {
					if (element2.hasOwnProperty(key3)) {
						const element3 = element2[key3];
						element3.active=false
					}
					}
				}
				}
			}
		}
	},
	created() {
		// console.log('搜索页面', this.$route.params.searchText)
		if (this.$route.params.searchText) {
			this.keyword = this.$route.params.searchText
		}
		// 请求数据
		this.onList()
		// 查询商品分类
		this.getSpjscs(this.selectedSpfl)

		// 为了避免重复添加行业分类
		if (
			searchDict.filter((data) => {
				return data.title == '行业分类'
			}).length <= 0
		) {
			this.getGbfl()
		}

		// 初始化 被选中数据
		searchDict.map((itme) => {
			itme.childer.map((i) => {
				i.active = false
			})
		})

		// 变更背景色
		const background = {
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			backgroundPosition: 'center',
		}
		this.$store.commit('background/update_background', background)
		this.$store.commit('zc/CHANGE_NV_BG_COLOR', '#fff')
		this.$store.commit('zc/CHANGE_NAV_TEXT_COLOR', '#000')
		this.getSpfl()
	}
}
</script>

<style lang="css" scoped>
/* 隐藏 tabs header 整体横线*/
.search-content >>> .el-tabs__header {
	display: none;
}
/*  搜索条件输入区域 */
.search-content {
	height: 500px;
	background-image: url(../../assets/zbss/search-content.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
	text-align: center;
	padding: 60px 0 10px;
}
/* 标题 */
.search-content .search-title {
	font-size: 36px;
	color: rgb(255, 255, 255);
}

/* 去除搜索条件(输入框)tabs 标签下划线 */
.search-content >>> .el-tabs__nav-wrap::after {
	position: static !important;
}

.searchClassContext {
	padding: 20px 0;
}
.searchClass {
	font-size: 18px;
	color: rgb(255, 255, 255);
	cursor: pointer;
	margin: 0 20px;
	height: 40px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 40px;
	display: inline-block;
	list-style: none;
	font-weight: 500;
	position: relative;
}
.searchClass.active {
	border-bottom: 2px;
	border-bottom-style: solid;
}


/* input输入框 */
.input-box {
	width: 800px;
	margin: 0 auto;
}
.input-box >>> input {
	border: none;
	background-color: #ffffff;
	opacity: 1;
	outline: none;
	height: 60px;
	text-transform: none;
	border-radius: 10px;
	font-size: 20px;
}
#pane-xm .input-box >>> input {
border-radius: 10px 0 0 10px;
}
#pane-sp .input-box >>> input {
border-radius: 10px;
}
.input-box >>> input::-webkit-input-placeholder {
	color: #808080;
	font-size: 20px;
}
.input-box >>> input::-moz-placeholder {
	color: #808080;
	font-size: 20px;
}
/* input输入框追加元素 */
#pane-xm .input-box >>> .el-input-group__append {
	border: none;
	border-radius: 0px 10px 10px 0px;
	opacity: 1;
	background-color: #ffffff;
}
#pane-xm .input-box >>> .el-input-group__append{
	font-size: 24px;
}
#pane-sp .input-box >>> .el-input__suffix  {
	color: #909399;
	right: 0px;
	padding: 10px 20px;
}
#pane-sp .input-box >>> .el-input__suffix i {
	font-size: 24px;
}
/* 热词 */
.search-content .hot-key-content {
	width: 800px;
	margin: 40px auto;
	color: rgb(255, 255, 255);
	text-align: left;
}
/*热词标签 */
.search-content .hot-key {
	margin-left: 10px;
	cursor: pointer;
}

/*  条件输入 */
.condition-content {
	margin: 0 auto 0;
	background-color: #ffffff;
	box-shadow: 0px 0px 20px 0px rgba(220, 220, 220, 0.2);
	border-radius: 10px;
}
.condition-content >>> .el-tabs__header {
	margin: 0;
}
/* 商品二级分类居中 */
.condition-content >>> .el-tabs--left .el-tabs__item.is-left {
	text-align: left;
	width: 124px;
	white-space: normal;
	word-break: break-all;
	height: auto;
	line-height: 20px;
	padding-top: 8px;
	padding-bottom: 8px;
}
/* 去除搜索条件(条件列表)tabs 标签下划线 */
.condition-content >>> .el-tabs__nav-wrap::after {
	position: static !important;
}

.multi-select-tab > .el-input {
	width: 180px;
	height: 30px;
}
/* 信息提示条 */
.info-bar {
	display: inline-block;
	font-size: 18px;
	line-height: 36px;
}

/* 搜索结果 */
.result-content {
	margin-top: 20px;
	box-shadow: 0px 0px 20px 0px rgba(220, 220, 220, 0.2);
	border-radius: 10px;

}

.result-content >>> .el-card__body {
	padding: 20px;
}
/* 隐藏 tabs header 整体横线*/
.result-content >>> .el-tabs__header {
	display: none;
}

.result-title {
	font-size: 20px;
	padding: 0 5px 10px;
	font-weight: bold;
}
.zc-hover {
	line-height: 25px;
}
.zc-hover:hover {
	cursor: pointer;
	color: rgb(78, 110, 242);
}

/* 商品分类的样式 */
.spfl-th-item {
	display: inline-block;
	margin: 5px;
	cursor: pointer;
	padding: 10px;
	color: #999999;
	border: solid 1px #fff;
}
.spfl-th-item:hover {
	color: #4e95ff;
}
.spfl-th-item-is-active {
	color: #4e95ff !important;
	border: solid 1px #4e95ff;
}
/* 搜索结果分隔线 */
.result-content >>> .el-divider--horizontal {
	margin: 20px 0;
}

/* 选中后结果区样式 */
.multi-selected {
	margin: 5px 10px;
	display: inline-block;
	border: solid 1px #fff;
	color: #999999;
	padding: 5px;
	width: 150px;

	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
}

.multi-selected > i {
	display: inline-block;
	padding-right: 8px;
	padding-left: 8px;
	border-radius: 0 5px 5px 0;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	color: #333;
}

.multi-selected:hover {
	color: #4e95ff;
	cursor: pointer;
}
.multi-selected-active {
	color: #4e95ff;
	border: solid 1px #4e95ff;
}
.multi-selected:hover > i {
	background-color: #4e95ff;
	color: #fff;
	cursor: pointer;
}

.el-scrollbar >>> .el-scrollbar__wrap{
  overflow-x: hidden;
}

.my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }

 .my-autocomplete li .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
 .my-autocomplete li .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

.my-autocomplete li .highlighted .addr {
      color: #ddd;
    }
</style>