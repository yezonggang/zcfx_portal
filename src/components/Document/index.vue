<template>
	<!-- 此处展示kkfile 地址 -->
	<iframe :src="this.src" class="iframe"></iframe>
</template>
<script>
import { isExternal } from '@/utils'

export default {
	props: {
		src: {
			type: String,
			default: 'http:www.baidu.com',
		},
	},
	data() {
		return {}
	},
	methods: {
		isExternalLink(routePath) {
			return isExternal(routePath)
		}
	}
}
</script>

<style lang="css" scoped>
.iframe {
/* frameborder:0;  */
width:100%;
border-width:0;
min-height:930px;

}
</style>