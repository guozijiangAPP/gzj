<template>
    <view>
        <cu-main v-if="view==='Main'"></cu-main>
        <cu-about v-if="view==='About'"></cu-about>
        <view class="cu-bar tabbar bg-color3a shadow foot">
            <view class="action"
                  @click="navChange"
                  data-cur="Main">
                <view :class="view=='Main'?'cuIcon-homefill text-red':'cuIcon-home text-gray'"></view>
                <view class="text-df"
                      :class="view=='Main'?'text-red':'text-gray'">首页</view>
            </view>
            <view class="action"
                  @click="navChange"
                  data-cur="About">
                <view :class="view=='About'?'cuIcon-myfill text-red':'cuIcon-my text-gray'"></view>
                <view class="text-df"
                      :class="view=='About'?'text-red':'text-gray'">我的123</view>
            </view>
        </view>
    </view>
</template>

<script>
import Main from './main'
import About from './about'
export default {
    data() {
        return {
            view: 'Main'
        }
    },
    components: { 'cu-main': Main, 'cu-about': About },
    onLoad() {
        // ajax
        // uni.request({
        // 	url: 'http://localhost:8082/login/userLogin',
        // 	data: {
        // 		phone: '15910826618',
        // 		password: "553311",
        // 	},
        // 	method: "POST",
        // 	header: {
        // 		'content-type': 'application/x-www-form-urlencoded'
        // 	},
        // 	success: function(res){
        // 		if(res.data.success){
        //
        // 		}
        // 	}
        // });
    },
    methods: {
        navChange(e) {
            let toView = e.currentTarget.dataset.cur
            toView !== this.view ? (this.view = toView) : false
        }
    },
    onShareAppMessage() {
        return {
            title: '会跑分享标题'
        }
    },
    onReady() {

    }
}
</script>

<style>
.cu-bar .bar-img.xs {
    margin-left: 0;
}
</style>
