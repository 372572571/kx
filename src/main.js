import Vue from 'vue'
import App from './App'
// // 引入 animate 特效
// import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main',
      'pages/member/main',
      'pages/orders/main',
      'pages/forms/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#5ea0e4',
      navigationBarTitleText: '快修服务',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      color: '#fff',
      backgroundColor: '#5ea0e4',
      selectedColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          selectedIconPath: 'static/images/icon/home-no-s.png',
          iconPath: 'static/images/icon/home-no.png',
          pagePath: 'pages/index/main',
          text: '首页'
        },
        {
          selectedIconPath: 'static/images/icon/orders-no-s.png',
          iconPath: 'static/images/icon/orders-no.png',
          pagePath: 'pages/orders/main',
          text: '订单'
        },
        {
          selectedIconPath: 'static/images/icon/member-no-s.png',
          iconPath: 'static/images/icon/member-no.png',
          pagePath: 'pages/member/main',
          text: '会员'

        }
      ]
    }
  }
}
