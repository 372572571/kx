<template>
    <div v-if="show" class="base-wx-service" @click="_show">
      <button open-type="contact" session-from="weapp"> 接入客服咨询 </button>
    </div>
</template>

<script>
    export default {
      name: 'bac-wx-service',
      props: {
        show: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        _show () {
          this.show = false
          this.$emit('update:show', false)
        }
      }
    }
</script>

<style scoped>
  .base-wx-service {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(70,70,70,0.3);
    z-index: 20;
    text-align: center;
  }
  .base-wx-service>button{
    display: block;
    position: relative;
    width: 60%;
    margin: 50% 20% 50% 20%;
  }

</style>
