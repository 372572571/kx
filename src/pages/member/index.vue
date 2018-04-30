<template>
  <div>
    <!--地址编辑组件-->
    <bac-message-box :show.sync="bacMessageBox.messageBoxText.show"
                     :messageBoxText="bacMessageBox.messageBoxText"
                     :open="bacMessageBox.messageBoxText.edit"
                     :value="bacMessageBox.messageBoxText.value"
                     :info.sync="address"
                     input="true"
    ></bac-message-box>
    <bac-message-box :show.sync="bacMessageBox.messageBoxTextPhone.show"
                     :messageBoxText="bacMessageBox.messageBoxTextPhone"
                     :open="bacMessageBox.messageBoxTextPhone.edit"
                     :value="bacMessageBox.messageBoxTextPhone.value"
                     :info.sync="phone"
                     input="true"
    ></bac-message-box>
    <!--用户头部组件-->
    <bac-user-top :name="userInfo.name?userInfo.name:''"
                  :image="userInfo.image?userInfo.image:''"
    >
    </bac-user-top>
    <!--用户地址展示组件-->
    <!--<div style="height: auto">-->
      <bac-drop-box @open="addressEdit" :info="address" title="用户地址"></bac-drop-box>
    <!--</div>-->
    <!--<div style="height: auto">-->
    <!--用户电话展示组件-->
    <bac-drop-box @open="phoneEdit" :info="phone" title="联系方式"></bac-drop-box>
    <!--</div>-->
  </div>
</template>
<script>
  import BacUserTop from '@/components/bac-userTop/bac-userTop'
  import BacDropBox from '@/components/bac-dropBox/bac-dropBox'
  import BacMessageBox from '@/components/bac-message-box/bac-message-box'
  import {AddressEdit, GetAddressS, GetAddress, GetStorageSync, SetStorageSync} from '@/common/js/StorageSync'
  import {Login, GetUserInfo} from '@/common/js/login'

  export default {
    components: {
      BacUserTop,
      BacDropBox,
      BacMessageBox
    },
    data () {
      return {
        address: [],
        phone: [],
        userInfo: [],
        bacMessageBox: {
          // 更新操作 bacMessageBox组件数据
          messageBoxText: {
            show: false,
            title: '编辑地址',
            value: '',
            leftButton: '取消',
            rightButton: '修改',
            args: [{'id': null}],
            edit (obj) {
              // 储存并更新
              // console.log(obj)
              AddressEdit(obj.args['id'], obj.value)
              this.$emit('update:info', GetAddressS())
            }
          },
          messageBoxTextPhone: {
            show: false,
            title: '编辑电话',
            value: '',
            leftButton: '取消',
            rightButton: '修改',
            args: [],
            edit (obj) {
              // 储存并更新
              SetStorageSync('phone', obj.value)
              this.$emit('update:info', Array(GetStorageSync('phone')))
            }
          }
        }
      }
    },
    methods: {
      // 获取需要编辑的 地址item
      addressEdit (res) {
        let there = this
        // console.log('test')
        there.bacMessageBox.messageBoxText.show = !there.bacMessageBox.messageBoxText.show
        res.then((resolve) => {
          // console.log(resolve.id)
          there.bacMessageBox.messageBoxText.value = GetAddress('KX-ADDRESS-' + resolve.id)
          there.bacMessageBox.messageBoxText.args['id'] = resolve.id
        }).catch((reject) => {
          console.log(reject)
        })
      },
      //  获取需要编辑的电话
      phoneEdit (res) {
        let there = this
        // console.log('test')
        there.bacMessageBox.messageBoxTextPhone.show = !there.bacMessageBox.messageBoxTextPhone.show
        res.then((resolve) => {
          // console.log(resolve.id)
          there.bacMessageBox.messageBoxTextPhone.value = GetStorageSync('phone')
        }).catch((reject) => {
          console.log(reject)
        })
      }
    },
    created () {
      // 初始化 地址数据 电话数据
      this.address = GetAddressS()
      this.phone.push(GetStorageSync('phone'))
      // 初始化用户数据
      Login()
    },
    mounted () {
      this.userInfo = GetUserInfo()
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  page
    background-color #f8f8f8


</style>
