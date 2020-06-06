<template>
	<scroll-view scroll-y class="scrollPage">
		<view class="UCenter-bg">
			<template v-if="auth">
				<view :style="'background-image:url('+userInfo.avatarUrl+')'" class="cu-avatar round xl">
					<view class="cu-tag badge" :class="userInfo.gender!==1 ? 'cuIcon-female bg-pink' : 'cuIcon-male bg-blue'"></view>
				</view>
				<view class="text-lg margin-top-sm">{{userInfo.nickName}}</view>
				<view class="text-sm text-color999">会跑号:1234</view>
				<view class=" flex text-center text-gray response top-nav">
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-xxl text-colorRed text-bold">297</view>
						<view class="text-sm">跑力值123</view>
					</view>
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-xxl text-colorRed text-bold">405</view>
						<view class="text-sm">累计跑量(公里)</view>
					</view>
					<view class="flex flex-sub flex-direction">
						<view class="text-xxl text-colorRed text-bold">0.86</view>
						<view class="text-sm">最后一次(公里)</view>
					</view>
				</view>
			</template>
			<block v-else>
				<button class="cu-btn round bg-red sm" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取用户授权</button>
			</block>
			<!-- <img src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"> -->
		</view>

		<view class="cu-list ">
			<view class="cu-item text-center bg-color30 text-gray text-lg">
				<view class="content">
					<navigator class="content padding" url="" hover-class="navigator-hover">
						<text>历史记录</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" url="/pages/hpcircle/index?userId=10016" hover-class="navigator-hover">
						<text>会跑圈</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" url="/pages/activity/index?userId=10016" hover-class="navigator-hover">
						<text>我的活动</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" url="/pages/user/index?nickName=123" hover-class="navigator-hover">
						<text>组织</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" hover-class="navigator-hover" @click="jumpPages" data-url="https://app.wecanrun.cn/v5/page/seeInto">
						<text>跑力洞察</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" hover-class="navigator-hover" @click="jumpPages" data-url="https://app.wecanrun.cn/v5/page/rankList">
						<text>好友排行</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" hover-class="navigator-hover" @click="jumpPages" data-url="https://app.wecanrun.cn/v5/page/report">
						<text>周报月报</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" url="" hover-class="navigator-hover">
						<text>我的钱包</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" url="" hover-class="navigator-hover">
						<text>奖牌室</text>
					</navigator>
				</view>
				<view class="content">
					<navigator class="content padding" hover-class="navigator-hover" @click="jumpPages" data-url="https://app.wecanrun.cn/v5/page/questionnaireFinished">
						<text>问卷调查</text>
					</navigator>
				</view>
			</view>
		</view>
		<div class="cu-tabbar-height"></div>
	</scroll-view>
</template>

<script>
	export default {
		name: 'cu-about',
		data() {
			return {
				count: 0,
				auth: false,
				userInfo: {},
				starCount: 0,
				forksCount: 0,
				visitTotal: 0
			}
		},
		created() {
			uni.showLoading({
				title: '加载中,请稍后'
			})
			uni.getStorage({
				key: 'userInfo',
				fail: () => {
					uni.getUserInfo({
						fail: () => uni.hideLoading(),
						success: res => {
							this.auth = true
							this.userInfo = res.userInfo
							this.countGet() // 加载统计数据
							wx.hideLoading()
							uni.setStorage({
								key: 'userInfo',
								data: res.userInfo,
								success: () => {
									console.log('userInfo 已经缓存')
								}
							})
						}
					})
				},
				success: res => {
					this.auth = true
					this.userInfo = res.data
					wx.hideLoading()
				}
			})
		},
		methods: {
			jumpPages: function(e){
				var _data = e.currentTarget.dataset;
				// 跳转页面
				uni.navigateTo({
					url: '../../pages/h5page/index?url=' + _data.url + '&userId=' + "10002"
				});
			},
			userInfoGet() {
				uni.getUserInfo({
					success: res => {
						this.auth = true
						this.userInfo = res.userInfo
						wx.hideLoading()
						uni.setStorage({
							key: 'userInfo',
							data: res.userInfo,
							success: () => {
								console.log('userInfo 已经缓存')
							}
						})
					}
				})
			},
			bindGetUserInfo(e) {
				let res = e.detail
				if (res.errMsg === 'getUserInfo:ok') {
					this.auth = true
					this.userInfo = res.userInfo
					uni.setStorage({
						key: 'userInfo',
						data: res.userInfo,
						success: () => {
							console.log('userInfo 已经缓存')
						}
					})
				}
			},
			countGet() {
				let _this = this,
					_count = _this.count
				if (_count > 20) {
					_this.starCount = _this.coutNum(3000)
					_this.forksCount = _this.coutNum(484)
					_this.visitTotal = _this.coutNum(24000)
				} else {
					setTimeout(() => {
						_this.starCount = _count + 1
						_this.forksCount = _count
						_this.visitTotal = _count
						_this.countGet()
					}, 20)
				}
			},
			coutNum(e) {
				if (e > 1000 && e < 10000) {
					e = (e / 1000).toFixed(1) + 'k'
				}
				if (e > 10000) {
					e = (e / 10000).toFixed(1) + 'W'
				}
				return e
			},
			copyLink(e) {
				wx.setClipboardData({
					data: e.currentTarget.dataset.link,
					success: res => {
						wx.showToast({
							title: '已复制',
							duration: 1000
						})
					}
				})
			},
			showQrcode() {
				wx.previewImage({
					urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
					current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接
				})
			}
		}
	}
</script>

<style>
	.UCenter-bg {
		background-image: url(https://app.wecanrun.cn/v5/images/card-bg.png);
		background-size: cover;
		height: 550upx;
		display: flex;
		justify-content: center;
		padding-top: 40upx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200upx;
		height: 200upx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100upx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100upx;
	}

	map,
	.mapBox {
		width: 750upx;
		height: 300upx;
	}

	.top-nav {
		position: absolute;
		bottom: 40rpx;
	}
</style>
