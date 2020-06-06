<template>
    <view>
        <cu-custom bgcolor="bg-color30" :isback="true" :bgimage="false">
            <view slot="content">会跑圈</view>
        </cu-custom>
        <view>
            <view class="hpcircle-bg"></view>  
            <view class="hpcircle-right flex justify-end padding-right">
                <text>冯瑞欣</text>
                <view class="hpcircle-image"></view>
            </view>
            <view class="padding-lr-sm">
                <view class="flex align-center">
                    <view class="hpcircle-image"></view>
                    <text class="padding-lr-sm">冯瑞欣</text>
                </view>
                <view class="padding-tb-sm solid-bottom">
                    <text>完成7.28公里的室内跑步，平均配速7'08"，净时长51:54，完成7.28公里的室内跑步，平均配速7'08"，净时长51:54</text>
                    <view class="cu-card padding-tb-sm">
                        <view class="list-img" v-for="(item,index) in imgList" :key="index" :style="{'background-image':'url('+item+')'}" :data-img="item" @click="ImageClick"></view>      
                    </view>
                    <view class="flex justify-between">
                        <text class="text-gray text-sm">2019-09-04 09:09:32</text>
                        <view class="cu-bar1">
                            <view class="action text-xxl">
                                <view class="cuIcon-like padding-lr-sm">
                                    <view class="cu-tag badge">2</view>
                                </view>
                            </view>
                            <view class="action text-xxl">
                                <view class="cuIcon-commentfill padding-lr-sm">
                                    <view class="cu-tag badge">3</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="padding-tb-sm solid-bottom">
                    <text>完成7.28公里的室内跑步，平均配速7'08"，净时长51:54</text>
                    <view class="cu-card padding-tb-sm">
                       <view class="list-img" v-for="(item,index) in imgList" :key="index" :style="{'background-image':'url('+item+')'}" :data-img="item" @click="ImageClick"></view>
                    </view>
                    <view class="flex justify-between">
                        <text class="text-gray text-sm">2019-09-04 09:09:32</text>
                        <view class="cu-bar1">
                            <view class="action text-xxl">
                                <view class="cuIcon-like padding-lr-sm">
                                    <view class="cu-tag badge">2</view>
                                </view>
                            </view>
                            <view class="action text-xxl">
                                <view class="cuIcon-commentfill padding-lr-sm">
                                    <view class="cu-tag badge">3</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>  
            </view>
        </view>
        <view class="cu-modal" :class="modalImage? 'show': ''" @click="setmodalImage">
            <view class="cu-dialog bg-color30 widthheight100">
                <view class="flex flex-direction justify-center align-center widthheight100">
                    <view
                        class="modal-img margin-top-100"
                        :style="{'background-image':'url('+modalImage+')'}" 
                    >
                        <view class="container">
                            <view class="container-img" :style="{'background-image':'url('+qr+')'}" ></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import Custom from "../../colorui/components/cu-custom";
    import QR from "../../utils/wxqrcode.js";
    export default {
        data() {
            return {
                modalImage: false,
                userInfo: {
                    userId: ""
                },
                qr:"",
                modalImage:"",
                imgList:["https://app.wecanrun.cn/v5/images/certificate2/4.png","http://web.wecanrun.cn/upload/image/3b7c01afb7b44f259611c50493b248e7.png"]
            };
        },
        components: { "cu-custom": Custom },
        onLoad: function(option) {
            //option为object类型，会序列化上个页面传递的参数
            this.userInfo.userId = option.userId;
        },
        methods: {
            setmodalImage: function(){
                this.modalImage = !this.modalImage;
            },
            ImageClick: function(e){
                this.modalImage = !this.modalImage;
                this.modalImage = e.currentTarget.dataset.img;
            }
        },
        created(){
            this.qr = QR.createQrCodeImg('生成的内容', {  
                size: parseInt(300)//二维码大小  
            })
            console.log(this.qr)
        }
    };
</script>
<style>
    .hpcircle-bg{
        background-image: url(https://app.wecanrun.cn/v5/images/card-bg.png);
		background-size: cover;
        height: 350rpx;
        background-repeat: no-repeat;
    }
    .hpcircle-image{
        background-image: url(http://web.wecanrun.cn/upload/image/baiingHead/57e9388aa8e1d67920f1bf6c76411d08);
		background-size: 100% 100%;
        height: 100rpx;
        width: 100rpx;
        border-radius: 50rpx;
        background-repeat: no-repeat;
    }
    .hpcircle-right{
        margin-top: -50rpx;
    }
    .list-img{
        background-image: url(https://app.wecanrun.cn/v5/images/certificate2/4.png);
        background-size: cover;
        width: 200rpx;
        height: 200rpx;
        background-repeat: no-repeat;
        float: left;
        margin-right: 8rpx;
    }
    .cu-bar1{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cu-bar1 .action {
        position: relative;
    }
    .cu-bar1 .action .cu-tag.badge{
        background: none;
    }
    .solid-bottom{
        border-bottom: 1px solid #333; 
    }
    .modal-img{
        position: relative;
        width:80%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        max-height: 900rpx;
        max-width: 600rpx;
    }
    .container-img{
        height: 150rpx;
        width: 150rpx;
        background-size: cover;
        position: absolute;
        bottom: -50rpx;
        right: 50rpx;
    }
</style>

