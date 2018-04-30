<template>
    <div class="base-box">
      <div class="base-box-item" id="0" @click="clickPush">
        <image class="base-box-item-image" src="../../static/images/phone.png" mode="aspectFit"></image>
        上门服务
      <span>电脑/打印机/维修</span>

      </div>
      <div class="base-box-line" style="width: 1px;height: 40%;margin: 2.5% 4% 0 4%">

      </div>

      <div class="base-box-item" id="1"  @click="clickPush">
        <image class="base-box-item-image" src="../../static/images/camera.png"  mode="aspectFit"></image>
        监控安装
        <span>监控设备/安装/维修</span>
      </div>

      <div class="base-box-line" style="width: 40%;height: 1px;margin: 2.5% 0 2.5% 4%">

      </div>
      <div class="base-box-line" style="width: 40%;height: 1px;margin: 2.5% 0 2.5% 12%">

      </div>

      <div class="base-box-item" id="2" @click="clickPush">
        <image class="base-box-item-image" src="../../static/images/web.png"  mode="aspectFit"></image>
        网站开发
        <span>微信/小程序/公众号/APP</span>
      </div>

      <div class="base-box-line" style="width: 1px;height: 40%; margin: 2.5% 4% 1.5% 4%">

      </div>

      <div class="base-box-item" id="3" @click="clickPush">
        <image class="base-box-item-image" src="../../static/images/email.png"  mode="aspectFit"></image>
        联系我们
        <span>咨询/联系/方式</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'bac-box-list',
      props: {
        boxList: {
          type: Array,
          default: ['上门服务', '监控安装', '网站开发', '联系我们']
        }
      },
      data () {
        return {
          newPromise: {}
        }
      },
      methods: {
        clickPush (event) {
          this.newPromise = new Promise((resolve, reject) => {
            try {
              resolve(event.currentTarget)
            } catch (e) {
              console.log(e)
              reject(e)
            }
            // 父组件定义 @clickPush 接收 promise
            // this.$emit('open', this.newPromise)
            this.$emit('open')
          })
        }
      }
    }
</script>

<style scoped>
  .base-box{
    display: flex;
    flex-flow:row wrap;
    -webkit-flex-flow: row wrap;
    width: 90%;
    height: 250px;
    background-color: #fff;
    margin: 0px 5% 0px 5%;
    border-radius: 2%;
  }
  .base-box-item{
    /*border: .5px solid #555555;*/
    height: 45%;
    width: 45%;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    color: #555555;
  }
  .base-box-item>span{
    font-size: 12px;
    display: block;
  }
  .base-box-line{
    background-color: rgba(75,75,75,0.1);
  }
  .base-box-item-image{
    height: 30%;
    width: 100%;
    margin-top: 15%;
  }

</style>
