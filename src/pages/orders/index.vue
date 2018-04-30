<template>
  <div>
    <bac-prompt :show.sync="promptShow" promptValue="没有更多订单"></bac-prompt>
    <div style="height: 80px">
      <bac-tab :tabItem="tab.item" :select.sync="select"></bac-tab>
    </div>

    <!--<scroll-view scroll-y-->
                 <!--@scrolltoupper="tabUp"-->
                 <!--@scrolltolower="tabDow"-->
                 <!--style="height: 500px;"-->
                 <!--:scroll-into-view="dow"-->
      <!--&gt;-->
    <div>
      <div v-for="(val,key) in tab.ordersInfo " :key="i">
        <bac-orders :info="val" :titleId="'订单编号: KX-DDBH000' + val.id"></bac-orders>
      </div>
      <bac-loadmore v-if="bacLoadMore" bgColor="#f8f8f8"></bac-loadmore>
      <bac-loadmore v-if="_NULL" loadmoreValue="暂无数据" bgColor="#f8f8f8"></bac-loadmore>
    </div>
    <!--</scroll-view>-->
    <div style="height: 40px"></div>
  </div>
</template>

<script>
import BacLoadmore from '@/components/bac-loadmore/bac-loadmore'
import BacPrompt from '@/components/bac-prompt'
import BacOrders from '@/components/bac-orders/bac-orders'
import BacTab from '@/components/bac-tab/bac-tab'
import {GetStorageSync} from '@/common/js/StorageSync'
import {GetOrders} from '@/common/js/wxapi'
export default {
  components: {
    BacTab,
    BacOrders,
    BacLoadmore,
    BacPrompt
  },
  computed: {
    _NULL () {
      if (this.tab.ordersInfo.length <= 0) {
        return true
      } else if (this.tab.ordersInfo.length > 0) {
        return false
      }
    }
  },

  data () {
    return {
      tab: {
        item: ['全部订单', '未完成', '已完成'],
        itemPage: [1, 1, 1],
        ordersInfo: []
      },
      // 一次显示10条
      showPage: 8,
      select: 0,
      bacLoadMore: false,
      promptShow: false
    }
  },

  methods: {
    _GetOrders (newVal) {
      this.tab.ordersInfo = []
      let Token = GetStorageSync('KXID')
      this.tab.itemPage[this.select] = 1
      let newPromise = GetOrders(Token, newVal, this.showPage, this.tab.itemPage[this.select])
      let there = this
      newPromise.then((resolve) => {
        if (resolve.data === '') {
          return
        }
        there.tab.ordersInfo = resolve.data
      }).catch((reject) => {
        // console.log(reject)
      })
    }
  },

  onShow () {
    let Token = GetStorageSync('KXID')
    let newPromise = GetOrders(Token, this.select, this.showPage, this.tab.itemPage[this.select])
    let there = this
    newPromise.then((resolve) => {
      // console.log(resolve)
      there.tab.ordersInfo = resolve.data
    }).catch((reject) => {
      // console.log(reject)
    })
  },
  onPullDownRefresh () {
    console.log('onPullDownRefresh')
  },
  onReachBottom () {
    if (this.promptShow) {
      return
    }
    this.bacLoadMore = true
    let Token = GetStorageSync('KXID')
    this.tab.itemPage[this.select] = this.tab.itemPage[this.select] + 1
    let there = this
    GetOrders(Token, this.select, this.showPage, this.tab.itemPage[this.select])
      .then((resolve) => {
        if (resolve.data !== '') {
          there.tab.ordersInfo = there.tab.ordersInfo.concat(resolve.data)
        } else {
          there.promptShow = true
          there.bacLoadMore = false
          return
        }
        there.bacLoadMore = false
      })
      .catch((reject) => {
        there.bacLoadMore = false
        console.log('noDow')
      })
  },

  watch: {
    select (newVal, oldVal) {
      this._GetOrders(newVal)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  page
    background-color #f8f8f8

</style>
