<template>
	<div class="content">
		<div class="main-content">
			<div class="title">招投信息，一触即达</div>
			<div class="search">
				<div class="search-box">
					<el-input
						type="text"
						name="text"
						id="text"
						placeholder="请输入您感兴趣的招标信息"
						autocomplete="off"
						v-model="text"
						@keyup.enter="onSearch()"
					>
					<el-button slot="append"  type="primary" icon="el-icon-search" @click="onSearch()"></el-button>
					</el-input>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import indexFooter from '@/components/Footer/index'
import store from '@/store'
export default {
	name: 'index',
	components: {
		indexFooter,
	},
	data() {
		return {
			text: '河南兴豫电子',
		}
	},
	created() {
	},
	methods: {
		onSearch: function () {
			// 什么也不输入 刷新页面
			this.$store.commit("zc/CHANGE_NAV_ACTIVE","/zbss")
			this.$router.push({
				name: 'zbss',
				params: { searchText: this.text },
			})
		},
	},
}
</script>

<style lang="css" scoped>
/* 背景div */
.content {
	margin-top: 0;
	width: 100%;
	background-image: url(../../assets/index/index-background.png);
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
	min-width: 1200px;
	width: 80%;
	min-height: 100vh;
	text-align: center;
	
}
/* 标题设置 */
.title {
	padding-top: 15%;
	padding-bottom: 5%;
	color: #fff;
	font-size: 32px;
}
/* 搜索样式设置 */
.search {
	margin: 0 auto;
	width: 52%;
	height: 80px;
	display: flex;
}
/* 搜索框,div做边框 */
.search-box {
	opacity: 0.8;
	width: 100%;
	height: 100%;
	font-size: 22px;

}
/* input输入框 */
.search-box >>> input {
	border: none;
	background-color: #ffffff;
	opacity: 1;
	outline: none;
	width: 100%;
	height: 80px;
	text-transform: none;
	border-radius: 10px 0 0 10px;
	font-size:22px;
}
.search-box >>> input::-webkit-input-placeholder {
	color: #808080;
	font-size:22px;
}
.search-box >>> input::-moz-placeholder {
	color: #808080;
	font-size:22px;
}
/* input输入框追加元素 */
.search-box >>> .el-input-group__append {
	border: none;
	border-radius: 0px 10px 10px 0px;
	opacity: 1;
	background-color: #ffffff;
}

.search-box >>> .el-input-group__append button {
	font-size: 30px;
}
/* 搜索按钮设置 */
/* .search-button {
	border: rgba(242, 242, 242, 0.6) 1px solid;
	border-left: none;
	border-radius: 0 10px 10px 0;
	width: 16%;
	height: 100%;
	color: #f2f2f2;
	line-height: 80px;
	font-size: 28px;
	cursor: pointer;
	background-color: #ffffff;
	opacity: 0.8;
} */
/* .search-button .qianjin{
	width: 50%;
	height: 80%;
    margin-left: 50px;
    margin-top: 9px;
background: url(../../assets/index/qianjin.png);
} */

/* 尾部布局 */
.footer {
	position: absolute;
	bottom: 20px;
}
</style>