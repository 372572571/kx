<template>
  <div>
    <div class="orders-base">
      <!--显示订单号-->
      <div class="orders-id">
        {{titleId}}
      </div>
      <!--订单时间-->
      <div class="orders-time">
        订单时间: 2018-04-26 15:31:26
      </div>
      <!--订单状态 详情 保修-->
      <div class="orders-bottom">
        <div class="orders-base-button" style="">保修申请</div>
        <div class="orders-base-button" style="" @click="_show">订单详情</div>
        <div class="orders-base-button" style="">{{_ordersType}}</div>
      </div>

      <!--订单详细信息-->
      <div v-if="show" class="orders-detailed">

        <div v-for="(val,key) in info" :key="key">
          <div class="orders-detailed-item">
            {{val}}
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
    export default {
      name: 'bac-orders',
      computed: {
        _ordersType () {
          if (this.info.orderstype === '1') {
            return '未完订单'
          }
          if (this.info.orderstype === '2') {
            return '完成订单'
          }
          console.log(this.info.orderstype)
        }
      },
      props: {
        detailedLength: {
          type: Number,
          default: 1
        },
        info: {
          type: Object,
          default: {}
        },
        titleId: {
          type: String,
          default: ''
        },
        titleTime: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
          show: false
        }
      },
      methods: {
        _show () {
          this.show = !this.show
        }
      }
    }
</script>

<style scoped>
  .orders-base{
    /*height: 120px;*/
    width: 80%;
    margin: 10px auto 15px auto;
    background-color: #fff;
    font-size: 14px;
    color: #555555;
    text-align: center;
    border-radius: 10px;
    box-shadow:
      0px 0px 1px 2px rgba(70,70,70,0.1),
      0px 0px 2px 3px rgba(70,70,70,0.1),
      0px 0px 2px 4px rgba(70,70,70,0.1);
  }
  .orders-id{
    display: block;
    width: 100%;
    height: 35px;
    overflow: hidden;
    line-height: 35px;
  }
  .orders-time{
    display: block;
    width: 100%;
    height: 35px;
    overflow: hidden;
    line-height: 35px;
  }
  .orders-bottom{
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    color: #555555;
    border-top: .5px solid rgba(70,70,70,0.1);
  }
  .orders-base-button{
    display: inline-block;
    position: relative;
    height:25px;
    width: auto;
    padding: 0 10px 0px 10px;
    margin: 0 10px 0px 10px;
    font-size: 12px;
    line-height: 25px;
    border-radius:5%;
    color: #fff;
    background-color:#3386e6;
    border: 1px solid rgba(51,134,230,0.6);
  }
  .orders-detailed{
  }
  .orders-detailed-item{
    height: 30px;
  }


</style>
