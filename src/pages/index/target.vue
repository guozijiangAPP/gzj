<template>
    <view class="cu-modal bottom-modal padding-sm" :class="modalTarget?'show':''">
        <view class="cu-dialog bg-noColor">
            <view class="target-dialog hp-radius">
                <view class="padding solid-bottom text-gray">请选择目标</view>
                <view v-for="item in targetList" :key="item.name">
                    <view
                        class="padding-sm solid-bottom text-blue text-xl"
                        @click="setmodalTarget"
                    >{{item.name}}</view>
                </view>
            </view>
            <view class="target-dialog hp-radius margin-top-sm" @click="setmodalTarget">
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
        props : ['targetList','modalTarget'],
        methods:{
            setmodalTarget:function(){
                this.modalTarget = !this.modalTarget;
                this.$emit('transfer',this.modalTarget)
            }
        }
    }
</script>