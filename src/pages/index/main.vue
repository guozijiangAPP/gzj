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
                    <text>今天，{{xhSay.week}}</text>
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
                    <view class="bg-color30 radius-10 " v-for="(item,index) in listItem" :key="index">
                        <view class="text-hpColor padding-top-sm text-bold" v-if="item.header">
                            <text class="cuIcon-titles margin-right-xs"></text>
                            {{item.header}}
                        </view>
                        <view class="content margin-tb-sm">
                            <view v-if="item.headerAction == 'SearchAndAddFriend'" class="padding-lr-sm">
                                <!-- 横屏滚动 -->
                                <swiper class="screen-swiper"  indicator-color="#8799a3" indicator-active-color="#0081ff">
                                    <swiper-item v-for="(val,key) in item.infoModels" :key="key" class="swiper-item-30">
                                        <view class="swiper-view">
                                            <image :src="val.image" mode="aspectFill" class="swiper-item-img cu-avatar xxl hp-radius"></image>
                                            <text class="text-sm padding-right-xs text-cut text-colorCCC">{{val.title}}</text>
                                            <text class="text-xs padding-right-xs text-cut text-color999">{{val.subTitle}}</text>
                                        </view>
                                    </swiper-item>
                                </swiper>
                            </view>
                            <view v-else>
                                <view v-for="(val,key) in item.infoModels" :key="key">
                                    <view
                                        v-if="val.displayMode == 'Image'"
                                        class="image"
                                        @click="modalImage = !modalImage"
                                    >
                                        <image class="hp-radius" :src="val.image" mode="widthFix"></image>
                                        <view class="cu-bar cu-bar-top text-lg text-bold">
                                            <text class="padding-tb-sm">{{val.title}}</text>
                                        </view>
                                        <view class="cu-bar">
                                            <view>
                                                <view
                                                    class="cu-avatar xs round "
                                                    :style="{'background-image':'url('+val.image +')'}"
                                                ></view>
                                                <text class="text-cut">
                                                    {{val.iconTitle}}</text>
                                            </view>
                                        </view>
                                    </view>
                                    <view
                                        v-else-if="val.action == 'ClickMore'"
                                        @click="clickFn"
                                        :data-action="val.action"
                                        :data-iconAction = "val.iconAction"
                                        :data-id="val.id"
                                        :data-index = "key"
                                    >
                                        <view v-if="item.isShow" class="bg-color28 text-color999 text-sm">{{val.title}}</view>
                                    </view>
                                    <view
                                        v-else-if="val.action == 'ListEnd'"
                                        @click="clickFn"
                                        :data-action="val.action"
                                        :data-iconAction = "val.iconAction"
                                        :data-id="val.id"
                                    >
                                        <view class="bg-color28 text-color999 text-sm">{{val.title}}</view>
                                    </view>
                                    <view v-else-if="val.action == 'Honor'">
                                        <view class="cu-card no-card padding-sm">
                                            <view class="cu-item bg-color30"
                                            hover-class="navigator-hover"
                                            @click="clickFn"
                                            :data-action="val.action"
                                            :data-iconAction = "val.iconAction"
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
                                            :data-iconAction = "val.iconAction"
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
            clickFn(e) {
                console.log(e.currentTarget.dataset)
                if (e.currentTarget.dataset.action == "Status") {
                    this.modalState = !this.modalState;
                } else if (e.currentTarget.dataset.action == "Target") {
                    this.modalTarget = !this.modalTarget;
                } else if(e.currentTarget.dataset.action == "ViewUser"){
                    uni.navigateTo({
                        url: '../../pages/user/index?userId=' + "199915689",
                        animationType: "fade-in"
                    });
                } else if(e.currentTarget.dataset.action == 'Task' || e.currentTarget.dataset.action == "Note"){
                    uni.navigateTo({
                        url: '../../pages/task/index?userId=' + "199915689",
                        animationType: "fade-in"
                    }); 
                }else if(e.currentTarget.dataset.action == 'ClickMore'){
                    var i = this.resultList[this.pageNum].length-1;
                    this.$set(this.resultList[this.pageNum][i],'isShow',false);
                    var j = this.resultList[this.pageNum + 1].length-1;
                    this.$set(this.resultList[this.pageNum + 1][j],'isShow',true)
                    this.pageNum = this.pageNum+1;
                }else if(e.currentTarget.dataset.action == "Knowledge"){    // 知识
                    var id = e.currentTarget.dataset.id;
                    var _url = 'http://search.wecanrun.cn/app/page/hpDetail';
                    var _para = 'knowledgeVersionedId:' + id + ',mongoId:' + id
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "SleepMode"){    // 睡眠  
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/sleepMode';
                    var _para = 'userId:' + id
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "HeightWeightSetting"){    // 身高体重
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/heightWeightSetting';
                    var _para = 'userId:' + id + ",mentorId:" + id
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "AnswerQuestion"){    // 心理测试题
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/questionnaire';
                    var _para = 'questionnairId:' + id + ',userId:' + "199915689"
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "RunDetail"){    // 跑步记录详情
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/detailRunData';
                    var _para = 'id:' + id + ',userId:' + "199915689" + ",friendId:" + "199915689"
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "Insights"){    // 洞察
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/seeInto';
                    var _para ='userId:' + "199915689"
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "RunActivity"){    // 周跑月跑约定跑活动
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/ypddDetail';
                    var _para ='userId:' + "199915689" + ",id:" + id
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "RaceOnlineOutside"){    // 线上赛事
                    var id = e.currentTarget.dataset.id;
                    var _url = 'https://app.wecanrun.cn/v5/page/raceOnline';
                    var _para ='userId:' + "199915689" + ",id:" + id
                    uni.navigateTo({
                        url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                    });
                }else if(e.currentTarget.dataset.action == "SearchAndAddVolunteer"){    // 添加咨询师-重新测试
                    var iconaction = e.currentTarget.dataset.iconaction;
                    if(iconaction == "QuestionnaireList"){
                        var _url = 'https://app.wecanrun.cn/v5/page/questionnaireOffered';
                        var _para ='userId:' + "199915689"
                        uni.navigateTo({
                            url: '../../pages/h5page/index?url=' + _url + '&para=' + _para
                        });
                    }
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
                "success":true,"message":"查询成功","value":[{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"小会说：世界海洋日，拥抱蓝色海洋，珍爱生命摇篮。","subTitle":"","image":"/upload/holiday/fd51f26cfabc4f9db19eb9a11c2f4af3.jpg","action":"XiaohuiShuo","id":"","displayMode":"Image","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":232.0,"icon":"/upload/image/running_group/59eb59f904bce38e48329200bc66be63.jpg","iconTitle":"冯小欣的组织,团长","iconAction":"Organization","iconActionId":"99","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"今天做什么？","foot":"","headerIcon":"","footerIcon":"","headerAction":"UserTimeline","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"\uD83C\uDF75此刻依旧忙碌吧，来一杯下午茶很不错哦","subTitle":"","image":"","action":"","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"Interval:健康减肥计划","subTitle":"距离400米，配速5'20\"，休息2分钟08秒，循环7次","image":"","action":"Task","id":"35805846-cc56-4566-ba6a-41b5f1f834d7","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"LSD:多巴胺快乐跑","subTitle":"距离15公里，配速8'09\"～9'06\"，感觉不好，不如放肆奔跑！","image":"","action":"Task","id":"ad481b9a-ef4d-4b76-a252-c606b16b3c2f","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/baiingHead/335e870972ec0bd927dcdbcac031ce36.jpg","iconTitle":"机器人小会的智能推荐任务","iconAction":"ViewCoach","iconActionId":"10000","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"跑前热身","subTitle":"来源：会跑采编","image":"http://search.wecanrun.cn//upload/repository/90f0d20d-8b4c-4815-871e-d500da298d55.gif","action":"Knowledge","id":"39442","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"小会推荐训练","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"力量训练 - 下肢力量","subTitle":"12次 X 3组","image":"/upload/repository/d836dfb7-67bd-4437-9d51-c502d0f3d335.jpg","action":"Note","id":"a1267b97-fa7f-4bc9-a794-dac02c8a4111","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"➕ 添加任务","subTitle":"","image":"","action":"Task","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"➕ 添加日程","subTitle":"","image":"","action":"Note","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"当前目标：健康减肥","subTitle":"","image":"","action":"Target","id":"5","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"今天怎么样？","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"今天运动状态怎么样？","subTitle":"","image":"","action":"Status","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"睡眠时间：8小时48分钟","subTitle":"入睡:22:12,起床07:00","image":"","action":"SleepMode","id":"199915689","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"当前体重：46.5kg","subTitle":"体脂率：12.0%","image":"","action":"HeightWeightSetting","id":"199915689","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"日常身心状态记录","subTitle":"","image":"","action":"AnswerQuestion","id":"20","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"推荐阅读","foot":"","headerIcon":"","footerIcon":"","headerAction":"NewsList","headerActionId":"","footerAction":"NewsList","footerActionId":"","infoModels":[{"title":"2020澳洲黄金海岸马拉宣布取消 41年来首次","subTitle":"来源：新浪体育-马拉松","image":"http://search.wecanrun.cn//upload/repository/72eef613-e175-42dc-a715-1b3b237f6be4.png","action":"Knowledge","id":"47800","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"2020徐州马拉松路线将有变动 开赛时间初定！","subTitle":"来源：新浪体育-马拉松","image":"http://search.wecanrun.cn//upload/repository/1d81a7c5-7940-4d18-9c6e-40c7bd9241aa.jpg","action":"Knowledge","id":"47698","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"跑步之后身体有何改变 这16个好处你get到了吗？","subTitle":"来源：新浪体育-跑步","image":"http://search.wecanrun.cn//upload/repository/31df5d1b-6775-4c4b-8fc9-f29e654ff9af.jpg","action":"Knowledge","id":"35493","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"最近运动情况","foot":"","headerIcon":"","footerIcon":"","headerAction":"HistoryList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"跑步10.01公里","subTitle":"时间：01:06:55,平均配速：6'41\"","image":"","action":"RunDetail","id":"306993","displayMode":"","heights":100.0,"detail":"2天前","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"跑步5.40公里","subTitle":"时间：35:33,平均配速：6'35\"","image":"","action":"RunDetail","id":"295962","displayMode":"","heights":100.0,"detail":"5天前","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"跑步2.88公里","subTitle":"时间：19:17,平均配速：6'42\"","image":"","action":"RunDetail","id":"291384","displayMode":"","heights":100.0,"detail":"6天前","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"","subTitle":"上周18K；本月18K，本年455K，距全马11周","image":"","action":"HistoryList","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"330","subTitle":"这是您的会跑值，您即将成为优秀的跑步女神，加油！）","image":"","action":"Insights","id":"All","displayMode":"","heights":100.0,"detail":"","titleFontSize":24.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"会跑使用小攻略","foot":"","headerIcon":"","footerIcon":"","headerAction":"TagList","headerActionId":"认证咨询师,认证教练","footerAction":"","footerActionId":"","infoModels":[{"title":"任务跑介绍","subTitle":"来源：小会","image":"","action":"Knowledge","id":"39577","displayMode":"Default","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"我的活动","foot":"","headerIcon":"","footerIcon":"","headerAction":"MyActivityList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"热爱生活，继续奔跑~","subTitle":"真正改变你的不是比赛本身，而是长期坚持不懈的训练...","image":"/upload/image/sport/92823433655bc51bb2a038833f7a7046.jpg","action":"RunActivity","id":"629","displayMode":"Title","heights":100.0,"detail":"进行中","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/running_group/9bbd55bd8d54425abe25d695ee647475.jpg","iconTitle":"会跑公司","iconAction":"Organization","iconActionId":"68","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"六月，你好~","subTitle":"活动成功：已返8.82元","image":"","action":"RunActivity","id":"625","displayMode":"Title","heights":100.0,"detail":"已结束","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/running_group/9bbd55bd8d54425abe25d695ee647475.jpg","iconTitle":"会跑公司","iconAction":"Organization","iconActionId":"68","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"明天做什么？","foot":"","headerIcon":"","footerIcon":"","headerAction":"UserTimeline","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"休息","subTitle":"充分的休息是为了更好的跑步","image":"","action":"Task","id":"309c6f8f-950d-4ceb-9573-16d02e151042","displayMode":"","heights":100.0,"detail":"","titleFontSize":24.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"/upload/image/baiingHead/335e870972ec0bd927dcdbcac031ce36.jpg","iconTitle":"机器人小会的智能推荐任务","iconAction":"ViewCoach","iconActionId":"10000","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"我的组织","foot":"","headerIcon":"","footerIcon":"","headerAction":"OrganizationList","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"冯小欣的组织","subTitle":"团长","image":"/upload/image/running_group/59eb59f904bce38e48329200bc66be63.jpg","action":"Organization","id":"99","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"姐妹减肥群","subTitle":"团长","image":"/upload/image/20200331_090001.jpg","action":"Organization","id":"20469859","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"您可能认识的人","foot":"","headerIcon":"","footerIcon":"","headerAction":"SearchAndAddFriend","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"小银哥","subTitle":"会跑号：6222","image":"/upload/image/baiingHead/9af9005c713bb36d2188fe3a250c26cf","action":"ViewUser","id":"622399211","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"流年","subTitle":"会跑号：168666","image":"/upload/image/baiingHead/5dddc6b3db55cc480c3ec3fce073a472","action":"ViewUser","id":"1615340815214160","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"宫莹","subTitle":"会跑号：41205549","image":"/upload/image/baiingHead/5d62a589f47d4298de35e06c49e46027","action":"ViewUser","id":"6065943141205549","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"李滢","subTitle":"会跑号：7707","image":"/upload/image/user/6b16327beac445af95e1ec88593b31b8.jpg","action":"ViewUser","id":"6627080082190767","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"雪猫咪","subTitle":"会跑号：60163551","image":"/upload/image/baiingHead/ad7d0717cae21720ff645af381495c82","action":"ViewUser","id":"8433564360163551","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"徐红霞","subTitle":"会跑号：6123","image":"/upload/image/user/aa55798edb484fb0981b4c6a756d896d.jpg","action":"ViewUser","id":"9998225554165680","displayMode":"TopSquare","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":80.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":"HListView"},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"根据测试或设置，您可能有抑郁倾向","subTitle":"没关系，有科学的方法，每个人都可以缓解和痊愈！","image":"","action":"Knowledge","id":"37263","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"可以去添加一个咨询师来帮助您","subTitle":"","image":"","action":"SearchAndAddVolunteer","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"sdsdsdsd","iconTitle":"重新测试点这里","iconAction":"QuestionnaireList","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"点我加载更多，左右滑更换日期，上拉查看好友日程","subTitle":"","image":"","action":"ClickMore","id":"","displayMode":"","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"会跑合伙人","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"我的团队","subTitle":"","image":"","action":"Partner","id":"199915689","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"我的荣誉证书","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"合伙人聘书","subTitle":"","image":"","action":"Honor","id":"Partner","displayMode":"","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""},{"title":"认证教练公益证书","subTitle":"","image":"","action":"Honor","id":"Mentor","displayMode":"","heights":100.0,"detail":"查看","titleFontSize":0.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""},{"header":"","foot":"","headerIcon":"","footerIcon":"","headerAction":"","headerActionId":"","footerAction":"","footerActionId":"","infoModels":[{"title":"左右滑更换日期，上拉查看好友日程","subTitle":"","image":"","action":"ListEnd","id":"","displayMode":"Title","heights":100.0,"detail":"","titleFontSize":13.0,"subtitleFontSize":0.0,"imageHeight":0.0,"icon":"","iconTitle":"","iconAction":"","iconActionId":"","playUrl":"","tag":"","likeCount":0,"starCount":0.0,"commentCount":0,"likeClicked":false,"addedStar":0.0,"smallImage1":"","smallImage2":"","smallImage3":"","subTitle2":""}],"more":"","moreAction":"","moreActionId":"","background":"Default","groupDisplayMode":""}]
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
            setTimeout(function () {
                uni.stopPullDownRefresh();
            }, 1000);
        }
    };
</script>

<style>
    .cu-card.case .image .cu-bar-top {
        top: 0;
        bottom: auto;
    }

    .cu-avatar.xl {
        width: 148rpx;
        height: 148rpx;
    }
    .cu-avatar.xxl {
        width: 188rpx;
        height: 188rpx;
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
    .radius-10{
        border-radius: 20upx;
    }
    .screen-swiper{
        min-height: auto;
        height: 258rpx;
    }
    .swiper-item-30{
        width: 30%!important;
        height: auto!important;
    }
    .swiper-view{
        display: flex;
        flex-direction: column;
        padding-right: 20rpx;
    }
</style>
