<template>
	<!-- 顶部栏 -->
	<div class="topbar" :style="{ backgroundColor: backgroundColor }">
		<div class="realy-content">
			<!-- 1.左侧logo -->
			<div class="left-logo">
				<router-link to="/index" class="link-type">
					<img
						src="@/assets/logo.png"
						height="58px"
						alt="logo"
						:style="{ display: showLogo == 'subLogo' ? 'inline' : 'none' }"
					/>
					<img
						src="@/assets/sub-logo.png"
						height="58px"
						alt="sub-logo"
						:style="{ display: showLogo == 'logo' ? 'inline' : 'none' }"
					/>
				</router-link>
			</div>
			<!-- 2.中部菜单栏 -->
			<div class="middle-menu" style="margin-left:80px">
				<!-- element-ui菜单栏  -->
				<el-menu
					:default-active="active || '/index'"
					:text-color="textColor"
					active-text-color="#fff"
					mode="horizontal"
				>
					<!-- 循环所有路由(不为空) -->
					<template v-for="route in permission_routes">
						<!-- element-ui 菜单栏项 -->
						<el-menu-item
							v-if="!route.hidden"
							:key="route.path"
							:index="route.path"
							@click="skipUrl(route.path)"
						>
							<span style="padding:6px 20px">{{ route.meta.title }}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</div>
			<!-- 3.右侧登出按钮 -->
			<div v-if="isNotEmpty(userName)" class="right-logout">
					<!-- <div class="logout-left">
						<el-dropdown @command="logout">
							<img :src="isNotEmpty(userAvatar)? userAvatar: '@/assets/rabbit.gif'" class="user-avatar" alt="头像" />
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<i class="el-icon el-icon-warning-outline"></i>
									<span>退出登录</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div> -->
					<div class="logout-right">
						<el-button type="primary" plain round @click="logout"
							>退出</el-button
						>
					</div>
			</div>
			<div v-else class="right-logout">
				<div class="logout-right">
						<el-button
							type="primary"
							plain
							round
							@click="login"
							>登录</el-button
						>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
  import {mapGetters} from 'vuex'
import ItemLink from '../Sidebar/Link'
import path from 'path'
import { isExternal,isNotEmpty } from '@/utils'
import store from '@/store'


export default {
	components: { ItemLink },
	data() {
		return {
			style: '',
		}
	},
	watch: {
		$route() {
			console.log(this.$route);
			return this.$router.options.routes
		}
	},
	computed: {
		...mapGetters([
			'permission_routes'
		]),
		routes() {
			return this.$router.options.routes
		},
		backgroundColor() {
			return this.$store.getters.navBackgroundColor
		},
		textColor() {
			return this.$store.getters.navTextColor
		},
		showLogo() {
			let color = this.$store.getters.navTextColor
			let logo = color == '#000' ? 'subLogo' : 'logo'
			return logo
		},
		userName() {
			//console.log("用户名",this.$store.getters.name)
        		return this.$store.getters.name
		},
		userAvatar(){
			  //console.log("用户名",this.$store.getters.avatar)
			  return this.$store.getters.avatar
		},
		active(){
			return  this.$store.getters.navActive
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('user/logout').then(() => {
				location.reload() // 为了重新实例化vue-router对象 避免bug
			})
		},
		login(){
			this.$router.push('/login')
		},
		// 解析路径
		resolvePath(routePath) {
			// 外联URL
			if (this.isExternalLink(routePath)) {
				return routePath
			}
			// 内部组件
			this.$store.commit('zc/CHANGE_NAV_ACTIVE',routePath)
			return path.resolve(this.basePath, routePath)
		},
		isExternalLink(routePath) {
			return isExternal(routePath)
		},
		skipUrl(path) {
			this.$router.push(this.resolvePath(path))
		},
		isNotEmpty(x){
			return isNotEmpty(x)
		}
	},
}
</script>
<style lang="scss" scoped>
.el-menu {
	background-color: transparent;
}
.topbar {
	width: 100%;
	height: 100px;
	display: block;
	.realy-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
	}

	.left-logo {
		// width: 180px;
		font-size: 20px;
		display: flex;

		align-items: center;
	}

	.middle-menu {
		.el-menu {
			border-bottom: 0;
			display: flex;
			justify-content: flex-end;
			background-color: transparent;
		}
		.el-menu-item {
			color: #333;
			font-size: 20px;
			height: 100px;
			line-height: 94px;
			border-bottom: none;
			padding-left: 5px;
			padding-right: 5px;
		}
		.el-menu-item:not(.is-disabled):focus,
		.el-menu-item:not(.is-disabled):hover {
			background-color: transparent;
			border-bottom: none;
		}
		.el-menu-item.is-active {
			background-color: transparent;
			border-bottom: none;
		}
		.el-menu-item:hover>span{
			color: #fff !important;
			background-color: #5ea6ff;
			border-radius: 40px;
		}
		.el-menu-item.is-active>span{
			color: #fff !important;
			background-color: #4e95ff;
			border-radius: 40px;
		}
		flex: 1;
	}

	.right-logout {
		margin-left: 40px;
		display: flex;
		width: 130px;
		align-items: center;
		.logout-left {
			img {
				width: 40px;
				height: 40px;
				border-radius: 50px;
			}
		}
		.logout-right {
			margin-left: 6px;
			font-size: 20px;
		}
	}
}
</style>
