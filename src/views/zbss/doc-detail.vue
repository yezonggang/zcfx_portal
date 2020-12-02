<template>
	<div class="main-content">
		<el-card shadow="never">
			<!--  如果是招标文件或投标文件 标题展示为项目名称 原因是文件名字用户大多填写不正确 -->
			<template
				v-if="isNotEmpty(this.$route.query.wjlb) && (this.$route.query.wjlb==5 || this.$route.query.wjlb==6)"
			>
				<div class="title">{{this.rmHtmlTag(this.$route.query.xmmc)}}</div>
			</template>
			<!--  否则展示为文件名称 -->
			<template v-else-if="isNotEmpty(this.$route.query.wjmc)">
				<div class="title">{{this.rmHtmlTag(this.$route.query.wjmc)}}</div>
			</template>
			<div class="tags-group">
				<el-tag
					v-if="isNotEmpty(this.$route.query.wjlb)"
					size="mini"
				>{{ filterWjlb(this.$route.query.wjlb) }}</el-tag>
				<el-tag
					v-if="isNotEmpty(this.$route.query.scsj)"
					size="mini"
				>{{ formatTime(this.$route.query.scsj,'{y}-{m}-{d}') }}</el-tag>
				<el-tag
					v-if="isNotEmpty(this.$route.query.cgfs)"
					size="mini"
					type="warning"
				>{{ this.$route.query.cgfs }}</el-tag>
				<el-tag
					v-if="isNotEmpty(this.$route.query.ywbk)"
					size="mini"
					type="success"
				>{{ this.$route.query.ywbk }}</el-tag>
			</div>
			<el-row :gutter="20" v-if="isNotEmpty(this.$route.query.zbbh)">
				<el-col :md="20">
					<div v-if="isNotEmpty(this.$route.query.zbbh)">
						<span class="field">项目编号</span>
						<span class="view-text">{{this.$route.query.zbbh}}</span>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" v-if="isNotEmpty(this.$route.query.dwmc)|| isNotEmpty(this.$route.query.dljgmc)">
				<el-col :md="10">
					<div v-if="isNotEmpty(this.$route.query.dwmc)">
						<span class="field">采购单位</span>
						<span class="view-text">{{this.rmHtmlTag(this.$route.query.dwmc)}}</span>
					</div>
				</el-col>
				<el-col :md="10">
					<div v-if="isNotEmpty(this.$route.query.dljgmc)">
						<span class="field">代理机构</span>
						<span class="view-text">{{this.rmHtmlTag(this.$route.query.dljgmc)}}</span>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" v-if="isNotEmpty(this.$route.query.zbdw)||  isNotEmpty(this.$route.query.zbje)">
				<el-col :md="10">
					<div v-if="isNotEmpty(this.$route.query.zbdw)">
						<span class="field">中标单位</span>
						<span class="view-text">{{this.rmHtmlTag(this.$route.query.zbdw)}}</span>
					</div>
				</el-col>
				<el-col :md="10">
					<div v-if="isNotEmpty(this.$route.query.zbje)">
						<span class="field">中标金额</span>
						<span class="view-text">{{this.$route.query.zbje}} 元</span>
					</div>
				</el-col>

			</el-row>
		</el-card>
		<el-card style="margin-top:20px">
			<document :src="this.encodeURI()"></document>
		</el-card>
	</div>
</template>

<script>
import '@/styles/zc.css'
import {
	isNotEmpty,
	formatTime,
	parseTime,
	filterWjlb,
	rmHtmlTag,
} from '@/utils/index'
import Document from '@/components/Document/index'
import { parse } from 'path-to-regexp'
export default {
	name: 'doc-detail',
	components: {
		Document
	},
	data() {
		return {
			// src: null,
			items: [
				{ type: '', label: '标签一' },
				{ type: 'success', label: '标签二' },
				{ type: 'info', label: '标签三' },
				{ type: 'danger', label: '标签四' },
				{ type: 'warning', label: '标签五' },
			],
		}
	},
	methods: {
		encodeURI() {
			let scsj = this.$route.query.scsj + ''
			let path = this.$route.query.path
			let realname = this.$route.query.realname
			let wjlb = this.$route.query.wjlb
			if (wjlb != 6&Number(scsj.substring(0, 4)) < 2017) {
				path = '/zyzbwebsite/webfile/' + path
				if (path.substring(path.length - 1, path.length) != '/') {
					path = path + '/'
				}
			} else if(wjlb != 6&Number(scsj.substring(0, 4)) >= 2017) {
				path = '/zybtpfile/qycg_file/webfile/' + path
				if (path.substring(path.length - 1, path.length) != '/') {
					path = path + '/'
				}
			}
			return (
				process.env.VUE_APP_KK_FILE_URL +
				encodeURIComponent(
					process.env.VUE_APP_REAL_FILE_URL + path + realname
				)
			)
		},
		isNotEmpty(obj) {
			return isNotEmpty(obj)
		},
		formatTime(time, option) {
			if (time) {
				time = time + ''

				//eg: 201904101015
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
		filterWjlb(number) {
			return filterWjlb(number)
		},
		rmHtmlTag(str) {
			return rmHtmlTag(str)
		},
	},
	created() {
		const background = {
			backgroundImage: null,
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			backgroundPosition: 'center',
		}
		this.$store.commit('background/update_background', background)

		this.$store.commit('zc/CHANGE_NV_BG_COLOR', '#fff')
		this.$store.commit('zc/CHANGE_NAV_TEXT_COLOR', '#000')
	},
}
</script>

<style lang="css">
</style>