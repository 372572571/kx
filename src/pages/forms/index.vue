<template>
  <div>
    <Prompt :show.sync="prompt.show" :promptValue="prompt.val"></Prompt>
    <image src="../../static/images/bg.jpg" v-bind:style="[{position: 'absolute', height:obj.eheight + 'px', zIndex: -1, width:'100%'}]"></image>

    <div class="forms-div">
      <input type="text"
             placeholder="请输入手机号码"
             class="forms-input-phone"
             maxlength="11"
             v-model="formDate.usrPhone"
             :value="formDate.usrPhone">
      <input type="number"
             placeholder="验证码"
             class="forms-input-code"
             v-model="formDate.usrPhoneCode"
             :value="formDate.usrPhoneCode"
             maxlength="4">
      <button class="forms-button-code"
              :disabled="phoneButton.type"
              @click="_pushPhone">{{phoneButton.value}}</button>

      <label style="display: block;margin-top: 40px;font-size: 16px;color: #555555;">详细地址</label>
      <textarea maxlength="80"
                v-model="formDate.usrAddress"
                :value="formDate.usrAddress"
      ></textarea>
      <text class="forms-text-info-title" style="margin-top: 20rpx;margin-bottom: 20rpx">服务费须知</text>
      <text class="forms-text-info-item" >上门服务费30元（服务费不包含其他费用）</text>
      <text class="forms-text-info-item" >如需更换配件，可按淘宝京东价格计算，或者客户自行购买.</text>
      <label style="display: block;margin-top: 40px;font-size: 16px;color: #555555;">故障描述</label>
      <textarea maxlength="100"
                v-model="formDate.usrNote"
                :value="formDate.usrNote"
      ></textarea>
      <button class="forms-bottom-button" @click="_pushForm">提交订单</button>
    </div>
  </div>
</template>
<script>
  import {regExpHtml, regExpPhone} from '../../common/js/regexp'
  import {phoneCode} from '../../common/js/wxapi'
  import Prompt from '@/components/bac-prompt'
  import {GetStorageSync} from '@/common/js/StorageSync'
  export default {
    components: {
      Prompt
    },
    onReady () {
      this._getscreenHeight()
    },
    data () {
      return {
        prompt: {
          val: '',
          show: false
        },
        obj: {
          eheight: ''
        },
        phoneButton: {
          value: '获取验证码',
          num: 0, // 计时多少秒
          type: false, // button 状态
          isclick: true // 事件阻止开关
        },
        formDate: {
          usrPhone: '',
          usrPhoneCode: '',
          usrAddress: '',
          usrNote: ''
        }
      }
    },
    methods: {
      // 设备高度
      _getscreenHeight () {
        var there = this
        wx.getSystemInfo({
          success (res) {
            there.obj.eheight = res.screenHeight
          }
        })
      },
      // 获取地理位置
      _getLocation () {
        wx.getLocation({
          success (res) {
            console.log(res)
          }
        })
      },
      _pushPhone () {
        if (regExpPhone(this.formDate.usrPhone) && this.phoneButton.isclick) {
          this._Timing()
        }
        if (!regExpPhone(this.formDate.usrPhone)) {
          this.err('错误的手机号')
        }
      },
      // 验证码计时
      _Timing () {
        // 验证码计时
        this.phoneButton.num = 60
        this.phoneButton.isclick = false
        this.phoneButton.type = true
        phoneCode(this.formDate.usrPhone)
        let there = this
        var setInt = setInterval(() => {
          if (there.phoneButton.num > 0) {
            there.phoneButton.num = there.phoneButton.num - 1
            there.phoneButton.value = there.phoneButton.num.toString() + '秒后再试'
          }
          if (there.phoneButton.num === 0) {
            clearInterval(setInt)
            there.phoneButton.num = 0
            there.phoneButton.type = false
            there.phoneButton.value = '获取验证码'
            there.phoneButton.isclick = true // 事件阻止 关闭
            console.log('可以再次获取')
          }
        }, 1000)
      },
      // 提交表单
      _pushForm () {
        if (!regExpPhone(this.formDate.usrPhone)) {
          this.err('错误的手机号码')
          return
        }
        let there = this
        wx.request({
          url: 'https://www.acghobby.cn/index.php/Test/form',
          method: 'POST',
          data: {
            usrPhone: there.formDate.usrPhone,
            usrPhoneCode: regExpHtml(there.formDate.usrPhoneCode),
            usrAddress: regExpHtml(there.formDate.usrAddress),
            usrNote: regExpHtml(there.formDate.usrNote),
            Token: regExpHtml(GetStorageSync('KXID'))
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded' // 默认值
          },
          success (res) {
            // console.log(res)
            if (res.data.message === null) {
              there.err('验证码错误')
              return
            }
            // 表单 清空
            for (var va in there.formDate) {
              there.formDate[va] = ''
            }
            there.err('提交成功')
          }
        })
      },
      // 提示错误信息
      err (str) {
        this.prompt.val = str
        this.prompt.show = true
        setTimeout(() => {
          this.prompt.show = false
        }, 3000)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/css/kx_base_style.styl"
  .forms-div
    text-align: center
    textarea
      border: 1px solid rgba(0,0,0,0.1)
      margin-left:10%
      margin-right:10%
      font-size:14px
      height:38px
      /*line-height: 100rpx*/
      width:600rpx
      display:block
      background-color:$font-color-whiet
  .forms-input-phone
    display:inline-block
    border: 1px solid rgba(0,0,0,0.1)
    margin-top:60rpx
    margin-left: 20%
    margin-right: 20%
    margin-bottom: 5%
    background-color:$font-color-whiet
    border-radius: 10px
  .forms-input-code
    border: 1px solid rgba(0,0,0,0.1)
    background-color:$font-color-whiet
    display: inline-block
    width:180rpx
    border-radius: 10px
    vertical-align: middle
  .forms-button-code
    display: inline-block
    height: 60rpx
    line-height 60rpx
    color: #555555
    font-size: 30rpx
    /*文字居中*/
    text-align center
    vertical-align: middle
  .forms-bottom-button
    position: fixed
    bottom:0px
    margin 1% 1% 1% 1%
    width: 98%
    color: $font-color-whiet
    background-color:$base-aid
    z-index:3
  .forms-text-info-title
    display:block
    font-size:$font-text-default
    color: $base-focus
  .forms-text-info-item
    display:block
    font-size: $font-text-common-max
    color: $base-focus


</style>
