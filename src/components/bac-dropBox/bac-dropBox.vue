<template>
    <div class="base">
      <div class="base-add-address" @click="showItem" >
        <span class="test"> {{itemShow?'收起':'展开'}} </span>
        {{title}}
      </div>
      <div v-if="itemShow" v-for="(val, index) in info" :key="dropBox">
        <div :id="index" class="item-address"  @click="test">
          {{val?val:'点击编辑'}}
        </div>
      </div>
      <div v-if="def">
        <div name="item" class="item-address">没有数据</div>
      </div>
      <!--<div class="item-address" v-if="itemShow">-->
        <!--<slot name="item"></slot>-->
      <!--</div>-->
    </div>
</template>

<script>
  export default {
    name: 'bac-dropBox',
    props: {
      info: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        itemShow: false,
        def: false,
        clickTest: {},
        edit: false
        // dataHeight: 50
        // infoArray: this.info
      }
    },
    methods: {
      showItem () {
        if (this.info.length <= 0) {
          this.def = !this.def
        } else {
          this.itemShow = !this.itemShow
        }
      },
      test (event) {
        this.edit = !this.edit
        this.clickTest = new Promise((resolve, reject) => {
          try {
            resolve(event.currentTarget)
          } catch (e) {
            console.log(e)
            reject(e)
          }
        })
        this.$emit('open', this.clickTest)
      }
    },
    created () {
    },
    watch: {
      // info: {
      //   handler (newValue, oldValue) {
      //     for (let i = 0; i < newValue.length; i++) {
      //       if (oldValue[i] !== newValue[i]) {
      //         oldValue[i] === newValue[i]
      //       }
      //     }
      //   }
      // }
    }
  }
</script>

<style scoped>
  .base{
    position: relative;
    display: block;
    margin: 0 10% 0 10%;
    width: 80%;
    background-color: #fff;
    border-bottom:1px solid rgba(85,85,85,0.1);
    /*border-radius: 5%;*/
  }
  .base-add-address{
    display: inline-block;
    font-size: 16px;
    width: 100%;
    line-height: 50px;
    margin-left: 20px;
    color: #555555;
  }
  .item-address{
    width: 100%;
    border-bottom:1px solid rgba(85,85,85,0.1);
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    margin-bottom: 1px;
    /*animation:myShow 1s linear;*/
    animation:myShow .5s ease-in-out;
    color: #c4c4c4;
    -webkit-animation:myShow .5s ease-in-out;
  }
  .test{
    position: absolute;
    left: 75%;
    text-align: right;
    font-size: 15px;
    color: #c4c4c4 ;
    /*font-style: oblique;*/
    /*font-weight: bolder;*/
    margin: 0;
  }

  @keyframes myShow {
    0% {visibility: visible;opacity:0}
    75% {visibility: visible;opacity:0.75}
  }
</style>
