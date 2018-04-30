<template>
    <div class="index-head">
      <!--v-bind:style="[{backgroundImage: bg, height: eheight + 'px'}]" -->
      <!--<image src="../../static/images/bg.jpg" v-bind:style="[{position: 'absolute', height:obj.eheight + 'px', zIndex: -1, width:'100%'}]"></image>-->
      <div style="height: 20rpx">
        <!--登录信息部分-->
      </div>


      <swiper :indicator-dots="indicatorDots"
              class="index-swiper"
              :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" width="355" height="150"/>
          </swiper-item>
        </block>
      </swiper>

      <!---->
      <div style="height: 30px;margin-top: 50rpx">
        <image src="../../static/images/lamp.png" style="height: 40rpx; width: 30rpx;display: inline-blocki; margin-left: 25rpx;vertical-align: top;" ></image>
        <span class="index-title" style="display: inline-block;margin-left: 20rpx">服务</span>
      </div>


        <div class="index-service" :animation="animation">
          <div v-on:click="_gotoforms"><image src="../../static/images/phone.png" mode="aspectFit"></image><span>上门服务</span></div>
          <div><image src="../../static/images/monitor.png" mode="aspectFit"></image><span>装机推荐</span></div>
          <div><image src="../../static/images/web.png" mode="aspectFit"></image><span>网站开发</span></div>
          <div><image src="../../static/images/camera.png" mode="aspectFit"></image><span>监控安装</span></div>
          <div><image src="../../static/images/message.png" mode="aspectFit"></image><span>留言信息</span></div>
          <div><image src="../../static/images/email.png" mode="aspectFit"></image><span>联系方式</span></div>
        </div>

    </div>
</template>

<script>
import {gotoforms} from '../../common/js/goto'

export default {
  data () {
    return {
      imgUrls: [
        'http://oojrdcyzq.bkt.clouddn.com/0.jpg'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      indexService: false,
      animation: {},
      obj: {
        eheight: 1150
      },
      bg: 'url(../../static/images/bg.jpg)'
    }
  },
  onReady () {
    var there = this
    wx.getSystemInfo({
      success (res) {
        // console.log(res.screenHeight)
        // 测试宽度
        there.obj.eheight = res.screenHeight
      }
    })
    this._showAnimation()
  },
  methods: {
    _showIndexService () {
      this.indexService = !this.indexService
    },
    _showAnimation () {
      var animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease-in-out',
        delay: 100,
        transformOrigin: 'left top 0'
      })
      animation.opacity(0.1).step()
      this.animation = animation
      animation.opacity(0.4).step()
      this.animation = animation
      animation.opacity(0.8).step()
      this.animation = animation
      animation.opacity(1).step()
      this.animation = animation
    },
    _gotoforms () {
      gotoforms()
    }
  },
  // 登录
  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/css/kx_base_style.styl"
  page
    background-color #f5f5f9
  .index-head
  .index-title
    font-size: $font-table-mini
    color: $base-focus
  .index-swiper
    height: 250px
    image
      width: 100%
      height: 100%
  .index-service
    display: flex
    flex-wrap:wrap
    align-items: center
    div
      height 100rpx
      width 30%
      background-color: $base-aid
      margin-left: 20rpx
      margin-top: 60rpx
      text-align center
      border-radius: 10rpx
      box-shadow: 1px 1px 1px 2px rgba(0,0,0,0.4)
      image
        /*margin-top: 20rpx*/
        line-height:100rpx
        height: 35rpx
        width: 35rpx
        display: inline-block
        vertical-align middle
      span
        display:  inline-block
        margin-left: 10rpx
        color: #fff
        line-height:100rpx
        font-size: 16px
        vertical-align: middle

</style>
