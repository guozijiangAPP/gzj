<template>
    <!-- 小会说弹框 -->
    <view class="cu-modal" :class="modalImage? 'show': ''" @click="setmodalImage">
        <view class="cu-dialog bg-color30 widthheight100">
            <view class="flex flex-direction widthheight100">
                <view class="flex-sub">
                    <view
                        class="bg-img margin-top-100"
                        :style="{'background-image': 'url('+ xhSay.image +')'}"
                        style="height: 200px;"
                    ></view>
                    <view class="cu-bar margin-top-xs">
                        <view
                            class="margin-0 solid-left text-white text-xl padding-lr-xs"
                        >“{{xhSay.title}}”</view>
                    </view>
                </view>
                <view class="flex-sub">
                    <view class="widthheight100 flex align-center justify-center">
                        <view class="text-sm">
                            <view
                                class="cu-avatar xl"
                                :style="{'background-image':'url('+helper.base+'/images/panc-qrcode.jpg)'}"
                            ></view>
                            <view
                                class="text-center text-white margin-tb-xs"
                            >{{xhSay.date}} {{xhSay.week}}</view>
                            <view class="text-center text-gray">{{xhSay.publicitySlogans}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import helper  from '../../static/helper/helper.js';
    export default {
        data(){
            return {
                helper:helper
            }
        },
        props : ['xhSay','modalImage'],
        methods:{
            setmodalImage:function(){
                this.modalImage = !this.modalImage;
                this.$emit('transfer',this.modalImage)
            }
        }
    }
</script>
