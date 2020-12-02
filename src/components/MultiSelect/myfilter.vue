<template>
	<div class="multi-select">
		<div class="multi-select-warp">
			<!-- 选择区 -->
			<div class="multi-select-flex" v-for="(v, k) in all" :key="k">
				<!-- 小类标题 -->
				<span class="multi-select-title">{{ v.title }}：</span>
				<!-- 小类内容 -->
				<div class="multi-select-content">
					<!-- isShow控制是否展开-->
					<div :class="['multi-select-tab', isShow[k]]">
						<span
							v-if="showSelectAll"
							@click="clearRow(v, k)"
							:class="isAll[k]"
							>全部</span
						>
						<template v-for="(val, key) in v.childer">
							<!-- 如果有权限控制则额外控制显示与否 -->
							<template v-if="val.roles">
								<template
									v-if="isContained(roles,val.roles)"
								>
									<span
										:key="key"
										:class="{
											'multi-select-active': val.active,
										}"
										@click="tabClick(val, key, k)"
										:style="{ color: textColor }"
									>
										{{ val.title }}</span
									>
								</template>
							</template>
							<!-- 如果没有权限控制则正常显示 -->
							<span
								v-else
								:key="key"
								:class="{ 'multi-select-active': val.active }"
								@click="tabClick(val, key, k)"
								:style="{ color: textColor }"
							>
								{{ val.title }}</span
							>
						</template>
					</div>
				</div>
				<div
					class="multi-select-more"
					@click="toggleShow(k,$event)"
					v-if="v.childer.length >= showMoreNumber"
				> 更多 </div>
			</div>

			<slot></slot>
			<!-- 结果区 -->
			<div class="multi-select-flex">
				<span class="multi-select-title">已选：</span>
				<div class="multi-select-content">
					<div class="multi-select-result">
						<div class="multi-selected" v-for="(val, key) in selected" :key="key">
							<span>{{ val.title }}</span>
							<i class="el-icon-close" @click="clearClick(val, key)"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 是否隐藏多余一行内容
			isShow: [],
			// 是否选中全部
			isAll: [],
			selectData: [],
		}
	},
	props: {
		// 初始化数据
		allList: {
			type: Array,
			default: () => [],
		},
		// 一类超过多少个项展示更多按钮
		showMoreNumber: {
			type: Number,
			default: 13,
		},
		// 某一类选中全部时，是否返回该类数据（组件默认每个类都是全选）
		isReturnSelectData: {
			type: Boolean,
			default: true,
		},
		//是否显示全选按钮
		showSelectAll: {
			type: Boolean,
			default: true,
		},
		//最大可选数量
		maxSelected: {
			type: Number,
			default: 0,
		},
		textColor: {
			type: String,
			default: null,
		},
		roles: {
			type: Array,
			default: () => [],
		},
	},
	watch: {
		allList: {
			handler: function (val, oldval) {
				//console.log('监听isShow', val, oldval)
				this.freshen()
				this.initIsShow()
			},
			//immediate: true,
    		//deep: true
		},
		isShow: {
			handler: function (val, oldval) {
				//console.log('监听isShow', val, oldval)
			},
		},
		isAll: {
			handler: function (val, oldval) {
				//console.log('监听isAll', val, oldval)
			},
		},
	},
	computed: {
		// 用于同步选择结果视图
		selected: function () {
			return this.selectData
		},
		// 用于同步选择条件视图
		all: function () {
			return this.allList
		},
	},
	methods: {
		// 某项是否展开
		toggleShow(i,e) {
			
			// 如果展开
			if (this.isShow[i] == 'multi-select-expand') {
				e.target.innerHTML = ' 更多 '
				this.isShow.splice(i, 1, '')
				return
			}

			if (this.isShow[i] == '') {
				this.isShow.splice(i, 1, 'multi-select-expand')
				e.target.innerHTML = ' 收起 '
				return
			}
		},
		// 某项是否全选
		toggleAll(k, isActive) {
			//isActive有参数 以isActive为主
			if (isActive && isActive != undefined) {
				this.isAll.splice(k, 1, 'multi-select-active')
				return
			}
			if (!isActive && isActive != undefined) {
				this.isAll.splice(k, 1, '')
				return
			}
			// isActive无参数 则每次切换
			if (this.isAll[k] == 'multi-select-active') {
				this.isAll.splice(k, 1, '')
				return
			}
			if (this.isAll[k] == '' || isActive) {
				this.isAll.splice(k, 1, 'multi-select-active')
				return
			}
		},
		// 从选择区选中一个标签
		tabClick(data, key, k) {
			if (this.clickCheck()) {
				// 添加 active ==> true 显示 `active样式`
				this.allList[k].childer[key].active = true

				//刷新
				this.freshen()
			}
		},
		// 点击选中检查是否
		clickCheck() {
			//console.log("选中行")
			if (
				this.maxSelected != 0 &&
				this.selectData.length >= this.maxSelected
			) {
				this.$message({
					message: '最多只能选择' + this.maxSelected + '个标签',
					type: 'warning',
				})
				return false
			}
			return true
		},
		// 点击全部清除当前行
		clearRow(v, k, event) {
			// 当前行所有项
			for (let j = 0; j < this.allList[k].childer.length; j++) {
				for (let i = this.selectData.length - 1; i >= 0; i--) {
					if (
						this.selectData[i].title ==
						this.allList[k].childer[j].title
					) {
						this.selectData.splice(i, 1)
						this.allList[k].childer[j].active = false
					}
				}
			}
			//刷新
			this.freshen()
		},
		// 从结果区取消选中一个标签
		clearClick(item, key) {
			// 修改选择区域数据
			this.allList.map((data) => {
				data.childer.map((item2) => {
					if (item2.title == item.title) {
						item2.active = false
					}
				})
			})
			// 清除被选中区域数据
			let i = this.selectData.length
			while (i--) {
				if (this.selectData[i].title == item.title) {
					this.selectData.splice(i, 1)
				}
			}
			//刷新
			this.freshen()
		},
		//刷新
		freshen() {
			// 1. 根据被选中数据 刷新选择结果
			this.allList.map((data) => {
				data.childer.map((item) => {
					if ( item.active == true && !this.selectData.includes(item)) {
						this.selectData.push(item)
					}
				})
			})

			// 2.根据被选中数据 刷新选择条件中的是否全选
			for (let k = 0; k < this.allList.length; k++) {
				let isSelectAll = true
				for (let j = 0; j < this.allList[k].childer.length; j++) {
					// 仍然存在选中部分数据
					if (this.allList[k].childer[j].active) {
						// 选中全部不成立
						isSelectAll = false
						break
					}
				}
				// 刷新是否全选样式
				this.toggleAll(k, isSelectAll)
			}
			//2. 向父组件刷新被选中数据
			this.$emit('get-sel-data', this.filterResult(this.selectData))
		},
		// 初始化每一项展开状态
		initIsShow() {
			this.isShow = new Array(this.allList.length).fill('')
		},
		// 初始化每一项全选状态
		initIsAll() {
			this.isAll = new Array(this.allList.length).fill(
				'multi-select-active'
			)
		},
		// 将选中的无类别数据转化为有类别的数据
		filterResult(preResult) {
			let jsonObj = {}
			for (let k = 0; k < this.allList.length; k++) {
				// 不能盲目初始化属性 因为存在变态需求 要求本来是某一类数据要按拆成两行(类)展示
				// 因此此处需要判断是否已经存在特殊数据 如果有就不需要初始化属性，否则之前选的数据可能会丢失
				if (!jsonObj[this.allList[k].value])
					jsonObj[this.allList[k].value] = []
				for (let j = 0; j < this.allList[k].childer.length; j++) {
					for (let i = this.selectData.length - 1; i >= 0; i--) {
						if (
							// 按照title比较 因为可能每类的代码值都是 1,2,3 或者都是 a,b,c
							this.selectData[i].title ==
							this.allList[k].childer[j].title
						) {
							jsonObj[this.allList[k].value].push(
								this.selectData[i].value
							)
						}
					}
				}
			}
			return jsonObj
		},
		isContained(a, b) {
			if (!(a instanceof Array) || !(b instanceof Array)) return false
			if (a.length < b.length) return false
			var aStr = a.toString()
			for (var i = 0, len = b.length; i < len; i++) {
				if (aStr.indexOf(b[i]) == -1) return false
			}
			return true
		},
	},
	created() {
		// 初始化展开状态
		this.initIsShow()
	}
}
</script>

<style lang="css" scoped>
/* 过滤列表:start */
.multi-select {
	/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); */
	margin-bottom: 15px;
	min-height: 140px;
	height: auto !important;
	height: 140px;
}

.multi-select-warp {
	display: flex;
	max-width: 1200px;
	margin: auto;
	height: 100%;
	flex-direction: column;
	/* padding: 15px 0; */
}

.multi-select-flex {
	display: flex;
	margin-bottom: 16px;
}

.multi-select-flex:last-of-type {
	margin-bottom: 0;
}

.multi-select-title {
	/* flex-basis: 70px; */
	padding-bottom: 5px;
	padding-top: 5px;
	width: 10%;
	color: #808080;
}

.multi-select-content {
	display: flex;
	flex: 1;
}
.multi-select-result {
	flex: 1;
	margin-right: 15px;
	overflow: hidden;
}
.multi-select-tab {
	flex: 1;
	/* margin-right: 15px; */
	height: 30px;
	overflow: hidden;
}


.multi-select-tab span:not(.nohover) {
	display: inline-block;
	cursor: pointer;
	padding: 5px 30px 10px 0;
	color: #999999;
}
.nohover{
	padding-left: 10px;
	padding-right: 10px;
}
.multi-select-more {
	margin-top: 5px;
	cursor: pointer;
}

.multi-select-active {
	color: #4e95ff !important;
}

.multi-select-tab span:hover:not(.multi-select-active):not(.nohover) {
	/* background-color: rgb(160, 207, 255); */
	color: #4e95ff !important;
	border-radius: 3px;
}
/* 高度自适应 当高度超过时会展开 */
.multi-select-expand {
	min-height: 34px;
	height: auto !important;
}
/* 选中后结果区样式 */
.multi-selected{
	height: 30px;
	margin: 0 10px 0;
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: solid 1px #b2b2b2;
	color: #808080;
}
.multi-selected>span{
	padding: 0 14px;
}
.multi-selected>i{
	display: inline-block;
	padding-right: 8px;
	padding-left: 8px;
	border-radius: 0 5px 5px 0;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	color: #333;
}

.multi-selected:hover{
	border: solid 1px #4e95ff;
	color: #4e95ff;
	cursor: default;
}
.multi-selected:hover>i{
	background-color: #4e95ff;
	color: #fff;
	cursor: pointer;
}
/* 过滤列表:end */
</style>