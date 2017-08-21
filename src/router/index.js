import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Near from './Near/index.vue'
import Order from './Order/order.vue'
import OrderDetail from './Order/orderdetails.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },{
      name: 'Near',
      path: '/near',
      component: Near
    },{
      name: 'Order',
      path: '/order',
      component: Order
    },{
      name: 'OrderDetail',
      path: '/orderdetail',
      component: OrderDetail
    }
  ]
})
