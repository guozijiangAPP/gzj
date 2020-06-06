<template>
    <view>
        <cu-custom bgcolor="bg-color30" :isback="true" :bgimage="false">
            <view slot="content">我的活动</view>
        </cu-custom>
        <view>
            
            <view class="content flex padding-sm">
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
            </view>
            <view class="content flex padding-sm">
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
            </view>

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
                }
            };
        },
        components: { "cu-custom": Custom },
        onLoad: function(option) {
            //option为object类型，会序列化上个页面传递的参数
            this.userInfo.userId = option.userId;
        },
        methods: {}
    };
</script>