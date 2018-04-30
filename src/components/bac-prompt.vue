<template>
  <div v-if="show" class="prompt-base"
       :style="{width:promptWidth,
       height:promptHeight,
       bottom:promptHeight,
       lineHeight:promptHeight,
       fontSize:promptFontSize}"
       @click="promptClose"
  >
    <!--v-if="show"-->
  {{promptValue}}
  </div>
</template>

<script>
    export default {
      name: 'bac-prompt',
      data () {
        return {
        }
      },
      props: {
        show: {
          type: String,
          default: false
        },
        promptWidth: {
          type: String,
          default: '100px'
        },
        promptHeight: {
          type: String,
          default: '100px'
        },
        promptFontSize: {
          type: String,
          default: '12px'
        },
        promptValue: {
          type: String,
          default: '提示信息'
        }
      },
      methods: {
        promptClose () {
          this.show = false
          this.$emit('update:show', this.show)
          // console.log('up')
        }
      },
      watch: {
        show (newVal, oldVal) {
          if (newVal === true) {
            let there = this
            setTimeout(() => {
              there.promptClose()
            }, 1000)
          }
        }
      }
      // created () {
      //   let there = this
      //   setTimeout(() => {
      //     there.show = false
      //   }, 5000)
      // }
    }
</script>

<style scoped>
  .prompt-base{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    z-index: 100 ;
    background-color: rgba(85,85,85,0.9);
    color: #fff;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-radius: 10%;
  }

</style>
