<template>
  <div style="position: fixed; width: 100%; z-index: 10">
    <div class="tab-base">
        <div class="tab-item"
             v-for="(key,index) in tabItem"
             :id="index"
             :key="index"
             @click="cutoverTab"
        >
          <div v-if="index==select" style="color: #fff">{{key}}</div>
          <div v-else style="color: #c4c4c4">{{key}}</div>
          <div class="tab-base-select" v-if="index==select"></div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'bac-tab',
      props: {
        tabItem: {
          type: Array,
          default: ['选项一', '选项二', '选项三', '选项四']
        },
        select: {
          type: Number,
          default: 0
        }
      },
      data () {
        return {
        }
      },
      mounted () {
      },
      methods: {
        // 切换 tab 选卡
        cutoverTab (event) {
          this.select = event.currentTarget.id
          this.$emit('update:select', this.select)
        }
      }
    }
</script>

<style scoped>
  .tab-base{
    display:flex;
    height: 60px;
    background-color: #3386e6;
    border-bottom: 1px solid rgba(85,85,85,0.1);
    box-shadow: 2px 2px 4px 5px rgba(85,85,85,0.1);
    margin-bottom: 20px;
  }
  .tab-item{
    display: inline-block;
    flex: 1;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    /*color: #555555;*/
    box-sizing:content-box;
  }
  .tab-base-select{
    position: relative;
    width:40%;
    height: 5px;
    margin: -6px 30% 0 30%;
    background-color: #c4c4c4;
    box-shadow:
      0 0 1px 2px rgba(75, 75, 75, .1),
      0 0 2px 2px rgba(75, 75, 75, .2);

  }

</style>
