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
			this.userId = option.userId;
			this.pageUrl = option.url + "?userId=" + option.userId;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
