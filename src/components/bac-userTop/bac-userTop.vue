<template>

  <div class="base" :style="{backgroundColor: bgColor}">
    <!--<div class="test"></div>-->
    <image :src="image?image:'../../static/images/icon/member-no-s.png'" mode="aspectFit"></image>
    <div class="user-name">欢迎回来 {{name?name:"游客"}}.</div>
    <!--<div class="base-controller">注销</div>-->
  </div>

</template>

<script>
    export default {
      name: 'bac-userTop',
      props: {
        bgColor: {
          type: String,
          default: '#3386e6'
        },
        image: {
          type: String,
          default: ''
        },
        name: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped>
  .base{
    position: relative;
    /*display: flex;*/
    /*line-height:190px;*/
    margin-bottom: 30px;
    width: 100%;
    height: 190px;
    box-shadow: 1px 2px 1px 4px rgba(78,78,78,0.5 );
  }
  .base>image{
    /*display: inline-block;*/
    width: 60px;
    height: 60px;
    border-radius:50%;
    z-index: 2;
    /*vertical-align:middle;*/
    margin-left: 40px;
    margin-top: 30px;
    background-color: #fff;
  }
  .user-name{
    position: relative;
    z-index: 2;
    display:block;
    font-size: 16px;
    height: 30px;
    margin-left: 30px;
    margin-top: 40px;
    color: #fff;
    animation:my 1s linear;
    -webkit-animation:my 1s linear;
  }
  /*.test{*/
    /*position: absolute;*/
    /*z-index: 1;*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-top: 10px solid transparent;*/
    /*border-right: 5px solid transparent;*/
    /*border-left: 5px solid #fff;*/
    /*animation:myfirst 5s;*/
    /*-webkit-animation:my 2s  infinite linear;*/
  /*}*/
  /*.base-controller{*/
    /*position: absolute;*/
    /*font-size: 12px;*/
    /*display:inline-block;*/
    /*left: 90%;*/
    /*color: #fff;*/
  /*}*/
  @keyframes my
  {
    30%  { left:-30px}
    60%  { left:-20px}
    100% { left:-10px}
  }

</style>
