<template>
  <view class="cu-custom" :style="{height: CustomBar + 'px'}">
    <view
      :class="bgImage!=''?'cu-bar fixed  none-bg text-white bg-img'+bgColor+'':'cu-bar fixed'+bgColor+''"
      :style="{height: CustomBar + 'px', 'padding-top': StatusBar+'px', 'background-image': bgImage?'url('+bgImage+')':'' }"
    >
      <view class="action" bindtap="BackPage" v-if="isBack">
        <text class="cuIcon-back"></text>
        <slot name="backText"></slot>
      </view>
      <view
        class="action border-custom"
        v-if="isCustom"
        :style="{width: Custom.width+'px', height: Custom.height+'px', 'margin-left': calc(750 - Custom.right)+'px'}"
      >
        <text class="cuIcon-back" bindtap="BackPage"></text>
        <text class="cuIcon-homefill" bindtap="toHome"></text>
      </view>
      <view class="content" :style="{top:StatusBar + 'px'}">
        <slot name="content"></slot>
      </view>
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  name: "cu-custom",
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style;
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ""
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ""
    }
  },
  methods: {
    BackPage() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style>
</style>
