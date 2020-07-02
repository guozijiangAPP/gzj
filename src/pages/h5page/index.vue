<template>
	<web-view :src="pageUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				pageUrl: "",
				userId:""
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			option.para = option.para.replace(/:/g, "=")
			option.para = option.para.replace(/,/g, "&")
			this.pageUrl = option.url + "?" + option.para;
			console.log(this.pageUrl)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
