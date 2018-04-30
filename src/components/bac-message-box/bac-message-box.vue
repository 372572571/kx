<template>
    <div class="message-box-bg" v-if="show">
      <div class="message-box-base">
        <div class="message-box-base-title">{{messageBoxText.title}}</div>
        <div v-if="!input" class="message-box-base-value">{{messageBoxText.value}}</div>
        <div class="message-box-base-value" v-if="input">
          <input v-model="messageBoxText.value" :value="messageBoxText.value" class="message-box-base-input"/>
        </div>
        <div class="message-box-left-button message-box-button-base"
             @click="buttonCancel">{{messageBoxText.leftButton}}</div>
        <div class="message-box-right-button message-box-button-base"
             @click="buttonOpen">{{messageBoxText.rightButton}}</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'bac-message-box',
      data () {
        return {
          code: -1,
          inputValue: ''
        }
      },
      props: {
        messageBoxText: {
          type: Object,
          default: {
            title: '标题',
            value: '信息内容保持一行',
            leftButton: '取消',
            rightButton: '确定',
            args: [],
            edit () {}
          }
        },
        cancel: {
          type: [Number, Function],
          default: 0
        },
        open: {
          type: [Number, Function],
          default: 0
        },
        show: {
          type: Boolean,
          default: false
        },
        input: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        Close () {
          this.show = false
          // console.log('update')
          this.$emit('update:show', this.show)
        },
        new_Promise (code) {
          return new Promise((resolve, reject) => {
            if (code === 1) {
              resolve(code)
            } else {
              reject(code)
            }
          })
        },
        click_Button () {
          let there = this
          this.new_Promise(this.code).then((resolve) => {
            if (typeof there.open === 'function') {
              there.open(there.messageBoxText)
            }
            if (typeof there.open === 'number') {
              // console.log(resolve + ' def 你点击了确定按钮 - 传递:open 自定义的func来代替此事件')
            }
            there.Close()
          }).catch((reject) => {
            if (typeof there.cancel === 'function') {
              there.cancel(reject)
            }
            if (typeof there.cancel === 'number') {
              // console.log(reject + 'def 你点击了确定按钮 - 传递:cancel 自定义的func来代替此事件')
            }
            there.Close()
          })
        },
        buttonOpen () {
          this.code = 1
          this.click_Button()
        },
        buttonCancel () {
          this.code = 0
          this.click_Button()
        }
      },
      created () {
        console.log('ok')
      }
    }
</script>

<style scoped>
  .message-box-base{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150px;
    width: 250px;
    margin: auto;
    text-align: center;
    z-index: 10 ;
    background-color: #fff;
    color: black;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-radius: 5px;
  }
  .message-box-bg{
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    margin: auto;
    text-align: center;
    background-color: rgba(85,85,85,0.9);
    color: #fff;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .message-box-button-base{
    display: inline-block;
    position: relative;
    height: 25%;
    width: 50%;
    top: 75%;
    border-top-width: 0.2px;
    border-top-style: solid;
    border-color: rgba(85,85,85,0.4);
    vertical-align: middle;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
  }
  .message-box-left-button{
    border-bottom-left-radius:5px ;
    border-right-style: solid;
    border-right-width: 0.2px
  }
  .message-box-right-button{
    border-bottom-right-radius:5px ;
  }
  .message-box-base-title{
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    overflow: hidden;
    top: 10%;
    font-size: 18px;
    color: black;
  }
  .message-box-base-value{
    position: absolute;
    text-align: center;
    top: 40%;
    width: 100%;
    font-size: 14px;
    color: #555555;
  }
  .message-box-base-input{
    border: 1px solid rgba(85,85,85,0.2);
    border-radius: 10px;
    width: 94%;
    margin: 0 3% 0 3%;
  }

</style>
