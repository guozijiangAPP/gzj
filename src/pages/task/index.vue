<template>
    <view>
        <cu-custom bgcolor="bg-color30" :isback="true" :bgimage="false">
            <!-- <view slot="backText">返回</view> -->
            <view slot="content">任务</view>
        </cu-custom>
        <form>
            <view class="cu-form-group margin-top bg-color3a flex">
                <view class="title flex-sub text-color999">任务时间:</view>
                <view class="flex-twice text-center flex">
                    <picker mode="date" value="date" bindchange="DateChange">
                        <view class="picker picker1">
                            {{date}}
                        </view>
                    </picker>
                     <picker mode="time" value="11:11" bindchange="TimeChange">
                        <view class="picker picker2">
                            11:11
                        </view>
                    </picker>
                </view>
            </view>
            <view class="cu-form-group margin-top bg-color3a">
                <view class="title flex-sub text-color999">任务类型:</view>
                <view class="flex-twice text-center" @click="taskClickFn">
                    {{task}}
                </view>
            </view>
            <view class="cu-form-group margin-top bg-color3a">
                <view class="title flex-sub text-color999">任务名称:</view>
                <view class="flex-twice text-center">
                    <input placeholder="任务名称长度不能超过50"></input>
                </view>
            </view>
            <view class="cu-form-group margin-top bg-color3a">
                <view class="title flex-sub text-color999">距离:</view>
                <view class="flex-twice text-center">
                    <picker @change="PickerChange" :value="index" :range= "distance">
                        <view class="picker">
                            {{index?distance[index]:'200'}}
                        </view>
                    </picker>
                </view>
            </view>
            <view class="cu-form-group margin-top bg-color3a">
                <view class="title flex-sub text-color999">目标距离:</view>
                <view class="flex-twice text-center">
                    <picker mode="multiSelector" @change="PickerChange" :value=[0,0] :range = "distanceList">
                        <view class="picker">
                            {{distanceList[0][0]}}{{distanceList[1][0]}}
                        </view>
                    </picker>
                </view>
            </view>
            <view class="cu-form-group margin-top bg-color3a">
                <view class="title flex-sub text-color999">图片:</view>
                <view class="flex-twice text-center">
                    <view class="camera" @click="ChooseImage">
                        <view class="cu-avatar lg" v-if="chooseImg" 
                        :style="{'background-image':'url(' + chooseImg + ')'}"
                        ></view>
                        <view v-else class="cuIcon-cameraadd"></view>
                    </view>
                </view>
            </view>
        </form>
        <view class="cu-modal bottom-modal padding-sm" :class="modalTask?'show':''" style="overflow: hidden;">
            <view class="cu-dialog bg-noColor hp-radius" style="max-height: 1000rpx;overflow: hidden;">
                <view class="target-dialog hp-radius" style="max-height: 900rpx;overflow: auto;">
                    <view class="padding solid-bottom text-gray">请选择任务类型</view>
                    <view v-for="item in taskList" :key="item.name">
                        <view
                            class="padding-sm solid-bottom text-blue text-xl"
                            @click="taskselectFn"
                            :data-name="item.name"
                        >{{item.name}}</view>
                    </view>
                </view>
                <view class="target-dialog hp-radius margin-top-sm" @click="taskClickFn">
                    <view
                        class="padding-sm text-blue text-lg text-bold"
                    >取消</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import moment from "moment";
import Custom from "../../colorui/components/cu-custom";
export default {
    data() {
        return {
            modalTask: false,
            task: "点击选择",
            taskList:[
                {
                    name: "Tempo"
                },
                {
                    name: "Interval"
                },
                {
                    name: "LSD"
                },
                {
                    name: "休息"
                },
                {
                    name: "成绩跑"
                },
                {
                    name: "倒金字塔跑"
                },
                {
                    name: "亚索跑"
                },
                {
                    name: "Pickup"
                },
                {
                    name: "Easy"
                },
                {
                    name: "距离跑"
                },
                {
                    name: "时间跑"
                },
                {
                    name: "步幅步频跑"
                },
                {
                    name: "爬坡跑"
                },
            ],
            date: "",
            index: null,
            distance:['200', '400', '800'],
            distanceList:[],
            imgList: [],
            chooseImg:"",
            userInfo: {
                userId: "",
                nickName: ""
            }
        };
    },
    components: { "cu-custom": Custom},
    onLoad: function(option) {
        //option为object类型，会序列化上个页面传递的参数
        this.userInfo.userId = option.userId;
        this.date = moment(new Date()).format("YYYY-MM-DD");
        var km = [], m = [];
        for(var i = 1;i<=100;i++){
            if(i == 100){
                km.push("挑战100");
            }else{
                km.push(i+"公里");  
            } 
        }
        for(var j = 0;j <= 990;j = j+10){
            m.push(j+"米")  
        }
        this.distanceList = [km,m];
    },
    methods: {
        taskClickFn(){
            this.modalTask = !this.modalTask;
        },
        taskselectFn(e){
            this.modalTask = !this.modalTask;
            this.task = e.currentTarget.dataset.name;
        },
        PickerChange(e){
            console.log(e.detail)
        },
        ChooseImage() {
            var that = this;
            wx.chooseImage({
                count: 1, //默认9
                sizeType: [], //original 原图，compressed 压缩图，默认二者都有
                sourceType: [], //album从相册选择， camera 使用相机， 默认二者都有
                success: function(res){
                    console.log(res);
                    that.chooseImg = res.tempFilePaths[0];
                }
            });
        }
    }
};
</script>

<style>
.target-dialog {
    background: rgba(255, 255, 255, 0.9);
}
.cu-form-group+.cu-form-group {
	border-top: 0;
}
.cu-form-group .title{
    text-align: right;
}
.cu-form-group input{
    color: #fff;
}
.cu-form-group picker::after{
    content: ""
}
.cu-form-group picker{
    padding-right: 0rpx;
}
.cu-form-group picker .picker{
    text-align: center;
}
.cu-form-group picker .picker1{
    text-align: right;
}
.cu-form-group picker .picker2{
    padding-left: 20rpx;
    text-align: left;
}
.camera{
    font-size: 60rpx;
    text-align: right;
}
</style>
