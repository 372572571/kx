<template>
    <div class="loadmore-base">
      <span class="loadmore-base-span" :style="{backgroundColor:bgColor}">{{loadmoreValue}}</span>
    </div>
</template>

<script>
    export default {
      name: 'bac-loadmore',
      props: {
        loadmoreValue: {
          type: String,
          default: '正在加载'
        },
        bgColor: {
          type: String,
          default: '#fff'
        }
      }
    }
</script>

<style scoped>
  .loadmore-base{
    width: 65%;
    border-top-width:1px;
    border-top-style: solid;
    border-top-color: rgba(236,236,236,0.8);
    vertical-align: center;
    text-align: center;
    margin: 0 auto;
  }
  .loadmore-base-span {
    display: inline-block;
    width: 80px;
    position: relative;
    font-size: 12px;
    color: #555555;
    top: -12px;
  }

</style>
