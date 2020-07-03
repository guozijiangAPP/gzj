<template>
    <view>
        <cu-custom bgcolor="bg-color30" :isback="true" :bgimage="false">
            <view slot="content">我的活动</view>
        </cu-custom>
        <view>
            
            <view class="content flex padding-sm" v-for="(item,index) in result.value" :key="index">
                <view class="cu-avatar xl margin-right-sm" 
                    style="width: 175rpx;height: 175rpx;"
                    :style="{'background-image':'url('+item.image +')'}"
                ></view>
               
                <view class="desc flex flex-direction justify-between width100 text-xs">
                    <view class="">
                        <view class="text-lg">{{item.title}}</view>
                        <view class="margin-top-xs text-color999">{{item.subtitle}}</view>
                        <view class="margin-top-xs solid padding-lr-xs hp-radius">组织活动</view>
                    </view>
                    <view>
                        <text class="margin-right-xs">￥0.00</text>
                        <text class="margin-lr-xs">|</text>
                        <text class="margin-lr-xs" v-if="item.action == 'RunActivity'">周跑</text>
                        <text class="margin-lr-xs" v-if="item.action == 'RaceOnlineOutside'">线上赛事</text>
                        <text class="margin-lr-xs" v-if="item.action == 'RecruitingActivity'">招募活动</text>
                        <text class="margin-lr-xs">|</text>
                        <text class="margin-left-xs text-color999">活动结束</text>
                    </view>
                </view>
            </view>
            <!-- <view class="content flex padding-sm">
                <view class="cu-avatar xl margin-right-sm" 
                    style="background-image:url(https://app.wecanrun.cn/v5//upload/repository/abe8564a-b100-4fd4-a014-7895c3cf287a.jpg);width: 175rpx;height: 175rpx;"
                ></view>
               
                <view class="desc flex flex-direction justify-between width100 text-xs">
                    <view class="">
                        <view class="text-lg">放肆奔跑</view>
                        <view class="margin-top-xs text-color999">08-19 00:00-08-25 24:00</view>
                        <view class="margin-top-xs solid padding-lr-xs hp-radius">组织活动</view>
                    </view>
                    <view>
                        <text class="margin-right-xs">￥210.00</text>
                        <text class="margin-lr-xs">|</text>
                        <text class="margin-lr-xs">周跑</text>
                         <text class="margin-lr-xs">|</text>
                        <text class="margin-left-xs text-color999">活动结束</text>
                    </view>
                </view>
            </view> -->

        </view>
    </view>
</template>
<script>
    import Custom from "../../colorui/components/cu-custom";
    export default {
        data() {
            return {
                userInfo: {
                    userId: ""
                },
                result:{}
            };
        },
        components: { "cu-custom": Custom },
        onLoad: function(option) {
            //option为object类型，会序列化上个页面传递的参数
            this.userInfo.userId = option.userId;
            this.result = {"success":true,"value":[{"id":0,"title":"月月健康","subtitle":"2020-07-01 到 2020-08-01","action":"RunActivity","actionId":645,"image":"/upload/image/sport/f2cb628fcc0c762f02c5be3318319df8.jpg","endDate":1594396800000},{"id":0,"title":"胜马体育一起跑-你好7月","subtitle":"2020-07-01 到 2020-08-01","action":"RunActivity","actionId":653,"image":"/upload/image/sport/fbee9793ecce11ffd5e849942984390c.jpg","endDate":1594396800000},{"id":0,"title":"靠行了行了","subtitle":"2020-02-12 到 2024-02-12","action":"RaceOnlineOutside","actionId":396,"image":"/upload/image/raceOnline/99d45524a4f5b8a09d6609ee2b5789c9.jpg","endDate":1597161600000},{"id":0,"title":"“超越梦想一起飞” 快乐半马赛","subtitle":"2020-07-18 到 2020-07-19","action":"RaceOnlineOutside","actionId":669,"image":"/upload/image/raceOnline/00df3cfeed533ee1d141bae5e8cfba9d.jpg","endDate":1595030400000},{"id":0,"title":"“奔跑北京”2020线上马拉松预热赛","subtitle":"2020-07-02 到 2020-07-04","action":"RaceOnlineOutside","actionId":672,"image":"/upload/image/raceOnline/ff59f8f892244925d6acf9ab13fa25d9.jpg","endDate":1593874800000},{"id":0,"title":"“奔跑北京”2020线上马拉松预热赛","subtitle":"2020-07-02 到 2020-07-04","action":"RaceOnlineOutside","actionId":673,"image":"/upload/image/raceOnline/0f622c7b8b2c7d49d3b5070e442ee452.jpg","endDate":1593874800000},{"id":0,"title":"“奔跑北京”2020线上马拉松预热赛","subtitle":"2020-07-02 到 2020-07-04","action":"RaceOnlineOutside","actionId":674,"image":"/upload/image/raceOnline/4dd21c91753982003abd2edc02f10177.jpg","endDate":1593874800000},{"id":0,"title":"“超越梦想一起飞” 快乐半马赛招募活动","subtitle":"2020-07-18 到 2020-07-19","action":"RecruitingActivity","actionId":26,"image":"/upload/image/20200623_165103.jpg","endDate":1595030400000},{"id":0,"title":"“奔跑北京”2020线上马拉松-预热赛","subtitle":"2020-07-05 到 2020-07-12","action":"RecruitingActivity","actionId":27,"image":"/upload/image/20200701_170041.png","endDate":1594479600000}]}
        },
        methods: {}
    };
</script>