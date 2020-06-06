<template>
    <scroll-view scroll-y class="scrollPage">
        <view
            class="cu-card case padding-sm bg-color28 text-white"
            :style="{'margin-top': StatusBar + 'px'}"
        >
            <view class="text-xs padding-xs">
                <text class="text-gray">北京 少云转多云 轻度污染</text>
            </view>
            <view class="flex justify-between">
                <view class="text-left text-lg padding-xs">
                    <text>今天，星期二</text>
                </view>
                <view class="text-right">
                    <text class="cuIcon-search"></text>
                    <text class="cuIcon-add padding-left-sm padding-right-sm"></text>
                    <text>地图</text>
                </view>
            </view>
            <!-- 开始循环 -->
            <view v-for="(listItem,listIndex) in resultList" :key="listIndex">
                <view v-if="pageNum >= listIndex">
                    <view v-for="(item,index) in listItem" :key="index">
                        <view class="text-hpColor padding-top-sm text-bold" v-if="item.header">
                            <text class="cuIcon-titles margin-right-xs"></text>
                            {{item.header}}
                        </view>
                        <view class="content margin-tb-sm bg-color30 radius">
                            <view v-for="(val,key) in item.infoModels" :key="key">
                                <view
                                    v-if="val.displayMode == 'Image'"
                                    class="image"
                                    @click="modalImage = !modalImage"
                                >
                                    <image class="hp-radius" :src="val.image" mode="widthFix"></image>
                                    <view class="cu-bar">
                                        <text class="padding-tb-sm">{{val.title}}</text>
                                    </view>
                                </view>
                                <view
                                    v-else-if="val.action == 'ClickMore'"
                                    @click="clickFn"
                                    :data-action="val.action"
                                    :data-index = "key"
                                >
                                    <view v-if="item.isShow" class="bg-color28 text-color999 text-sm">{{val.title}}</view>
                                </view>
                                <view
                                    v-else-if="val.action == 'ListEnd'"
                                    @click="clickFn"
                                    :data-action="val.action"
                                >
                                    <view class="bg-color28 text-color999 text-sm">{{val.title}}</view>
                                </view>
                                <view v-else-if="val.action == 'Honor'">
                                    <view class="cu-card no-card padding-sm">
                                        <view class="cu-item bg-color30"
                                        hover-class="navigator-hover"
                                        @click="clickFn"
                                        :data-action="val.action"
                                        :data-id="val.id">
                                            <view class="content padding-0 flex">
                                                <view class="desc flex justify-between width100">
                                                    <view class="text-lg">{{val.title}}</view>
                                                    <view class="text-colorRed">{{val.detail}}</view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>    
                                <view v-else class=" padding-lr-sm">
                                    <view class="cu-card no-card padding-tb-sm">
                                        <view class="cu-item bg-color30"
                                        hover-class="navigator-hover"
                                        @click="clickFn"
                                        :data-action="val.action"
                                        :data-id="val.id"
                                        >
                                            <view class="content padding-0 flex">
                                                <view
                                                    v-if="val.image"
                                                    class="cu-avatar xl hp-radius margin-right-sm"
                                                    :style="{'background-image':'url('+val.image +')'}"
                                                ></view>
                                                <view
                                                    class="desc flex flex-direction justify-between width100"
                                                >
                                                    <view class="text-lg">{{val.title}}</view>
                                                    <view v-if="val.iconTitle">
                                                        <view
                                                            v-if="val.subTitle"
                                                            class="text-color999 text-cut"
                                                        >
                                                            <text>{{val.subTitle}}</text>
                                                        </view>
                                                    </view>
                                                    <view v-else>
                                                        <view
                                                            class="width100 text-color999 flex justify-between"
                                                        >
                                                            <text v-if="val.action == 'OtherActivity' || val.action == 'RunActivity' || val.action =='OnlineGameDetail'" class="text-cut" style="width: 400rpx;">{{val.subTitle}}</text>
                                                            <text v-else>{{val.subTitle}}</text>
                                                            <text class="text-colorRed nav">{{val.detail}}</text>
                                                        </view>
                                                    </view>
                                                </view>
                                            </view>
                                            <view
                                                v-if="val.iconTitle"
                                                class="flex justify-between margin-top-xs"
                                            >
                                                <view>
                                                    <view
                                                        v-if="val.icon"
                                                        class="cu-avatar xs round margin-right-xs"
                                                        :style="{'background-image':'url('+helper.base + val.icon +')'}"
                                                    ></view>
                                                    <text>{{val.iconTitle}}</text>
                                                </view>
                                                <view
                                                    class="text-colorRed"
                                                    v-if="val.detail"
                                                >{{val.detail}}</view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view v-if="item.foot" class="text-sm flex justify-between margin-top-xs">
                            <view>
                                <view
                                    v-if="item.footerIcon"
                                    class="cu-avatar xs round margin-right-xs"
                                    :style="{'background-image':'url('+helper.base + '/images/logo-50.jpg)'}"
                                ></view>
                                <text>{{item.foot}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <cu-say :xhSay = "xhSay" :modalImage = "modalImage" @transfer = "getmodalImage"></cu-say>   <!-- 小会说 -->
        <cu-target :targetList = "targetList" :modalTarget = "modalTarget" @transfer = "getmodalTarget"></cu-target>    <!-- 选择目标 -->
        <cu-state :stateList = "stateList" :modalState = "modalState" @transfer = "getmodalState"></cu-state>   <!-- 选择状态 -->
        <view class="cu-tabbar-height"></view>
    </scroll-view>
</template>

<script>
    import moment from "moment";
    import helper  from '../../static/helper/helper.js';
    import Xhsay from './say';
    import Target from './target';
    import State from './state';
    export default {
        data() {
            return {
                modalImage: false,
                modalTarget: false,
                modalState: false,
                CustomBar: this.CustomBar,
                StatusBar: this.StatusBar,
                helper: helper,
                result: {},
                resultList: [],
                pageNum: 0,
                value: [],
                targetList: [],
                stateList: [],
                xhSay: {
                    image: "",
                    title: "",
                    publicitySlogans: "",
                    week: "",
                    date: ""
                }
            };
        },
        components: {'cu-say': Xhsay,'cu-target': Target,'cu-state':State},
        filters: {},
        methods: {
            jumpPages(e) {
                // 跳转页面
                uni.navigateTo({
                    url:
                        "../../pages/user/index?userId=" +
                        e.currentTarget.dataset.userid +
                        "&nickName=" +
                        e.currentTarget.dataset.nickname
                });
            },
            clickFn(e) {
                console.log(e.currentTarget.dataset);
                if (e.currentTarget.dataset.action == "Status") {
                    this.modalState = !this.modalState;
                } else if (e.currentTarget.dataset.action == "Target") {
                    this.modalTarget = !this.modalTarget;
                } else if(e.currentTarget.dataset.action == "ViewUser"){
                    uni.navigateTo({
                        url: '../../pages/user/index?userId=' + "10002",
                        animationType: "fade-in"
                    });
                } else if(e.currentTarget.dataset.action == 'Task'){
                    uni.navigateTo({
                        url: '../../pages/task/index?userId=' + "10002",
                        animationType: "fade-in"
                    }); 
                }else if(e.currentTarget.dataset.action == 'ClickMore'){
                    var i = this.resultList[this.pageNum].length-1;
                    this.$set(this.resultList[this.pageNum][i],'isShow',false);
                    var j = this.resultList[this.pageNum + 1].length-1;
                    this.$set(this.resultList[this.pageNum + 1][j],'isShow',true)
                    this.pageNum = this.pageNum+1;
                }
            },
            getmodalState(modalState){
                this.modalState= modalState;
            },
            getmodalTarget(modalTarget){
                this.modalTarget= modalTarget;
            },
            getmodalImage(modalImage){
                this.modalImage = modalImage;
            }
        },
        created() {
            this.result = {
                "success":true,"message":"查询成功","value":[{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"小会说：热爱所有人，信任少数人，不负任何人。","subTitle":"","image":"/upload/repository/abe8564a-b100-4fd4-a014-7895c3cf287a.jpg","action":"XiaohuiShuo","id":"","displayMode":"Image","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":232.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"欢迎您，此刻依旧忙碌吧","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"\uD83C\uDF75多补充水分，来一杯下午茶很不错哦","subTitle":"","image":"","action":"","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"休息","subTitle":"充分的休息是为了更好的跑步","image":"","action":"Task","id":"053a2307-f2bb-432c-acb5-48ebf4b3fe59","displayMode":"","heights":100.0,"detail":"今天","titleFontSize":24.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/baiingHead/335e870972ec0bd927dcdbcac031ce36.jpg","iconTitle":"机器人小会的智能推荐任务","iconAction":"ViewCoach","iconActionId":"10000"}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"➕ 添加任务","subTitle":"","image":"","action":"Task","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"HistoryList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"跑步806米","subTitle":"时间：12:25,平均配速：15'24\"","image":"","action":"RunDetail","id":"22741","displayMode":"","heights":100.0,"detail":"今天","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"跑步618米","subTitle":"时间：27:44,平均配速：44'49\"","image":"","action":"RunDetail","id":"22677","displayMode":"","heights":100.0,"detail":"昨天","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"跑步2.77公里","subTitle":"时间：43:44,平均配速：15'46\"","image":"","action":"RunDetail","id":"22630","displayMode":"","heights":100.0,"detail":"昨天","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"","subTitle":"本周21K，本月72K，本年304K，距半马13周，距全马29周","image":"","action":"HistoryList","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"我还不太了解您的跑力，您可以点击添加一些最近的跑步情况","subTitle":"让小会更了解您！","image":"","action":"RunningPredict","id":"199915689","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"推荐阅读","foot":"","headerIcon":"","footerIcon":"","headerAction":"NewsList","headerActionId":"","footerAction":"NewsList","footerActionId":"","infoModels":[{"title":"一个不大不小的麻烦：跑步时手机放在哪里","subTitle":"来源：今日头条-马拉松跑步","image":"http://search.wecanrun.cn//upload/repository/6a4bc7e1-3160-464f-b299-98890f1b3cbe.jpeg","action":"Knowledge","id":"35007","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"马拉松跑者莫错过 4项力量训练加强耐力","subTitle":"来源：新浪体育-马拉松","image":"","action":"Knowledge","id":"35165","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"想要跑出“大长腿” 做到这四点就可以","subTitle":"来源：马拉松专题网","image":"http://search.wecanrun.cn//upload/repository/77a0584a-95bd-4eb1-86de-937f75f05a78.jpg","action":"Knowledge","id":"35051","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"我的组织","foot":"","headerIcon":"","footerIcon":"","headerAction":"OrganizationList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"测试组织-冯","subTitle":"团长","image":"/upload/image/running_group/59eb59f904bce38e48329200bc66be63.jpg","action":"Organization","id":"99","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"会跑跑团","subTitle":"","image":"/upload/image/running_group/7e7428a8237928fcd9513dc91505e9f1.jpg","action":"Organization","id":"71","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"会跑使用小窍门","foot":"","headerIcon":"","footerIcon":"","headerAction":"NewsList","headerActionId":"","footerAction":"NewsList","footerActionId":"","infoModels":[{"title":"你知道吗？佳明数据是这样导入会跑的！","subTitle":"来源：小会","image":"","action":"Knowledge","id":"37028","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"➕ 添加记事","subTitle":"","image":"","action":"Note","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"今天状态怎么样？","subTitle":"","image":"","action":"Status","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"点我加载更多，左右滑更换日期，上拉查看好友日程","subTitle":"","image":"","action":"ClickMore","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"我的活动","foot":"","headerIcon":"","footerIcon":"","headerAction":"MyActivityList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"2019年上半年过去了，我很怀念它","subTitle":"","image":"/upload/image/sport/6791edff01beab0e4dee8a68db5c86bb.jpg","action":"RunActivity","id":"371","displayMode":"Title","heights":100.0,"detail":"进行中","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/running_group/9bbd55bd8d54425abe25d695ee647475.jpg","iconTitle":"会跑公司","iconAction":"Organization","iconActionId":"68"}]},{"header":"线上赛事","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"1","subTitle":"","image":"/upload/image/raceOnline/5f1081c91798c0cbc77a46dcdbf100c5.jpg","action":"OnlineGameDetail","id":"245","displayMode":"Title","heights":100.0,"detail":"已报名","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"最近比赛","foot":"点这里可以查看更多赛事","headerIcon":"","footerIcon":"sfsfsfsfsf","headerAction":"GameList","headerActionId":"","footerAction":"GameList","footerActionId":"","infoModels":[{"title":"2019成都马拉松赛","subTitle":"","image":"/upload/repository/62734fd2-729b-440b-be5e-5a3f5671cde1.jpeg","action":"News","id":"293","displayMode":"Default","heights":100.0,"detail":"报名开始","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"2019宜昌国际马拉松","subTitle":"","image":"/upload/repository/2997accf-2d3b-4554-ac15-72b24dd2b64a.jpg","action":"News","id":"280","displayMode":"Default","heights":100.0,"detail":"报名中","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"2019比弗利环蠡湖国际半程马拉松","subTitle":"","image":"/upload/repository/059b7328-8983-4924-8679-7720423ce176.jpg","action":"News","id":"290","displayMode":"Default","heights":100.0,"detail":"报名中","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"会跑合伙人","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"我的团队","subTitle":"","image":"","action":"Partner","id":"199915689","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"我的荣誉证书","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"合伙人聘书","subTitle":"","image":"","action":"Honor","id":"Partner","displayMode":"","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"您可能认识的人","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"徐卫华","subTitle":"","image":"/upload/image/user/93fdde8f3be9b7e233cb09359ade3620.jpg","action":"ViewUser","id":"10002","displayMode":"Title","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"葛银","subTitle":"","image":"/upload/image/baiingHead/9af9005c713bb36d2188fe3a250c26cf","action":"ViewUser","id":"622399211","displayMode":"Title","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""},{"title":"A梦越","subTitle":"","image":"/upload/image/baiingHead/02cce9262834096f94b0ded64c1e7c57.jpg","action":"ViewUser","id":"831546762","displayMode":"Title","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"没有更多推荐了，上拉查看好友学员日程","subTitle":"","image":"","action":"ClickMore","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"真的没有推荐了，您休息一下吧","subTitle":"","image":"","action":"","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"左右滑更换日期，上拉查看好友日程","subTitle":"","image":"","action":"ListEnd","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":""}]}]
            }

            var num = 0;
            for(var i = 0;i <= this.result.value.length-1;i++){
                for(var j = 0; j <= this.result.value[i].infoModels.length-1;j++){
                    if(this.result.value[i].infoModels[j].image.indexOf("http") == -1 && this.result.value[i].infoModels[j].image){
                        this.result.value[i].infoModels[j].image = helper.base + this.result.value[i].infoModels[j].image;
                    }
                    if(this.result.value[i].infoModels[j].action == "ClickMore"){
                        if(num == 0){
                            this.result.value[i].isShow = true;
                        } else {
                            this.result.value[i].isShow = false;
                        }
                        this.resultList[num].push(this.result.value[i]);
                        num++
                    }
                }
                this.resultList[num] = this.resultList[num] || [];
                this.resultList[num].push(this.result.value[i])
            }
            console.log(this.resultList);
            this.targetList = [
                {
                    name: "跑得更远"
                },
                {
                    name: "跑得更快"
                },
                {
                    name: "活力保持"
                },
                {
                    name: "健康减肥"
                }
            ];
            this.stateList = [
                {
                    name: "受伤"
                },
                {
                    name: "疲惫"
                },
                {
                    name: "酸爽"
                },
                {
                    name: "恢复"
                },
                {
                    name: "提升"
                },
                {
                    name: "巅峰"
                },
                {
                    name: "未选择"
                }
            ];
            var publicitySlogans = [
                "智能运动，用会跑",
                "科学训练，用会跑",
                "不开心，用会跑",
                "会跑，更懂你",
                "学习跑步，用会跑",
                "人生，会跑",
                "找到教练，用会跑",
                "指导好友，用会跑",
                "智能计划，用会跑",
                "用会跑，轻松马拉松",
                "快速PB，用会跑",
                "避免受伤，用会跑",
                "智能洞察，用会跑",
                "挑战好友，用会跑",
                "跑步直播，用会跑",
                "丰富活动，用会跑"
            ];
            var _num = Math.ceil(Math.random() * (publicitySlogans.length - 1));
            var week;
            var now = new Date();
            var date = moment(new Date()).format("YYYY-MM-DD");
            if (now.getDay() == 0) week = "星期日";
            if (now.getDay() == 1) week = "星期一";
            if (now.getDay() == 2) week = "星期二";
            if (now.getDay() == 3) week = "星期三";
            if (now.getDay() == 4) week = "星期四";
            if (now.getDay() == 5) week = "星期五";
            if (now.getDay() == 6) week = "星期六";
            this.xhSay.publicitySlogans = publicitySlogans[_num];
            this.xhSay.week = week;
            this.xhSay.date = date;
            for (var i = 0; i <= this.result.value.length - 1; i++) {
                for (var j = 0; j <= this.result.value[i].infoModels.length - 1; j++) {
                    if (this.result.value[i].infoModels[j].displayMode == "Image") {
                        this.xhSay.title = this.result.value[i].infoModels[j].title;
                        this.xhSay.image = this.result.value[i].infoModels[j].image;
                    }
                }
            }
        },
        onPullDownRefresh(){
            console.log("Refresh");
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        }
    };
</script>

<style>
    .cu-card.case .image .cu-bar {
        top: 0;
        bottom: auto;
    }

    .cu-avatar.xl {
        width: 148rpx;
        height: 148rpx;
    }

    .cu-avatar.xs {
        width: 35rpx;
        height: 35rpx;
        font-size: 1em;
    }

    .margin-top-100 {
        margin-top: 100rpx;
    }

    .target-dialog {
        background: rgba(255, 255, 255, 0.9);
    }
    .cu-avatar.xl {
        min-width: 148rpx;
        max-width: 148rpx;
        min-height: 148rpx;
        max-height: 148rpx;
    }
    .width100 {
        width: 100%;
    }
</style>
