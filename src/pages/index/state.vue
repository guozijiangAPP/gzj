<template>
    <view class="cu-modal bottom-modal padding-sm" :class="modalState?'show':''">
        <view class="cu-dialog bg-noColor">
            <view class="target-dialog hp-radius">
                <view class="padding solid-bottom text-gray">请选择状态</view>
                <view v-for="item in stateList" :key="item.name">
                    <view
                        class="padding-sm solid-bottom text-blue text-xl"
                        @click="setmodalState"
                    >{{item.name}}</view>
                </view>
            </view>
            <view class="target-dialog hp-radius margin-top-sm" @click="setmodalState">
                <view
                    class="padding-sm text-blue text-lg text-bold"
                >取消</view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return {
               
            }
        },
        props : ['stateList','modalState'],
        methods:{
            setmodalState:function(){
                this.modalState = !this.modalState;
                this.$emit('transfer',this.modalState)
            }
        }
    }
</script>