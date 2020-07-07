<template>
    <view>
        <cu-custom bgcolor="bg-color30" :isback="true" :bgimage="false">
            <!-- <view slot="backText">返回</view> -->
            <view slot="content">详细资料</view>
        </cu-custom>
        <view class="content padding margin-tb-sm radius margin-tb-sm bg-color3a">
            <view class="cu-card article no-card bg-color3a">
                <view class="content padding-0 flex">
                    <view
                        class="cu-avatar xl margin-right-sm"
                        :style="{'background-image':'url('+userInfo.image +')'}"
                    ></view>
                    <view class="desc flex flex-direction justify-between">
                        <view class>
                            <text class="text-lg">{{userInfo.nickName}}</text>
                            <text class="margin-right-xs margin-left-xs cuIcon-myfill text-hpColor"></text>
                            <text
                                class="margin-right-xs margin-left-xs padding-xs bg-colorRed text-xs round"
                            >认证教练</text>
                            <text
                                class="margin-right-xs margin-left-xs padding-xs bg-colorRed text-xs round"
                            >志愿者</text>
                        </view>
                        <view
                            class="text-sm text-color999 flex justify-between"
                        >{{userInfo.subtitle}}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-list menu">
            <view class="cu-item bg-color3a">
                <text class="list-title">简介:</text>
                <text class="text-color999">人生会跑</text>
            </view>
            <view class="cu-item bg-color3a">
                <text class="list-title">地区:</text>
                <text class="text-color999">北京朝阳</text>
            </view>
            <view class="cu-item bg-color3a">
                <text class="list-title">个人简介:</text>
                <text class="text-color999">北京朝阳</text>
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
                userId: "",
                nickName: "",
                subtitle: "",
                image: ""
            }
        };
    },
    components: { "cu-custom": Custom },
    onLoad: function(option) {
        //option为object类型，会序列化上个页面传递的参数
        this.userInfo.userId = option.userId;
        this.userInfo.nickName = option.title || "冯瑞欣";
        this.userInfo.subtitle = option.subtitle || "会跑号：1234";
        this.userInfo.image = option.image || "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
    },
    methods: {}
};
</script>

<style>
.cu-list.menu > .cu-item:after {
    border-color: #000;
}
.cu-list.menu > .cu-item {
    justify-content: flex-start;
}
.list-title {
    width: 160rpx;
}
</style>
