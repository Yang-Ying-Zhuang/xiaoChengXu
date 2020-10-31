<template>
  <view class="pay">
     <!-- 地址-->
    <view class="pay_item">
      <view class="pay_site" v-if="address.userName">
        <view class="pay_site_select">{{address.provinceName + address.cityName + address.countyName + address.detailInfo}}</view>
        <view class="pay_name">{{address.userName}}&nbsp;&nbsp;{{address.telNumber}}</view>
      </view>
      <view v-else class="pay_select_item">
         <button class="pay_select" @tap="myselect">选择地址</button>
      </view>
    </view>
    <!-- 商品 -->
    <view class="pay_koBai"></view>
    <view class="pay_commodity">已选择商品</view>
    <view class="pay_data" v-for="(item, index) in cartData" :key="index">
        <List :item="item" class="pay_list"></List>
        <view  class="pay_quantity">x{{item.goods_count}}</view>
    </view>
    <!-- 底部 -->
    <view class="pay_button">
      <view class="pay_left">
       <text>合计：</text>
       <text class="pay_price">¥ {{price}}</text>
      </view>
      <view class="pay_right" :class="[count ? 'active' : '']">去支付( {{count}} )</view>
    </view>

  </view>
</template>

<script>
import List from "../../components/list";
export default {
  components: { List },
  data() {
    return {
      cartData: [], //本地存储数据
      address:"",
      site:""
    };
  },
  computed:{
    price(){  //总价格
      let totalPrice = 0;
      this.cartData.forEach(item =>{
        totalPrice += item.goods_price
      })
      return totalPrice
    },
    count(){
      let toatlCount = 0;
      this.cartData.forEach(item =>{
        toatlCount += item.goods_count
      })
      return toatlCount
    }
  },
  onLoad() {
    //本地存储数据
    const res = uni.getStorageSync("cartData_key") || [];
    this.cartData = res;
    // 获取 地址 本地存储
    this.address = uni.getStorageSync("address") || {} 
    console.log(this.address);
  },
  methods: {
    myselect() {
     /* #ifdef MP-WEIXIN || MP-ALIPAY */
      uni.chooseAddress({  //收获地址
        success: res => {
          // console.log(res);
         // delete 可以删除对象中的某个属性
          delete address.errMsg;
          this.address = res
          // 把用户选择的收货地址保存到本地存储中
					uni.setStorageSync('address', res);
        },
      });
      /* #endif */

      /* #ifdef H5 || APP-PLUS */
      uni.showToast({
        title: '升级中......',
        icon:"none"
      });
     	/* #endif */
    },
  },
};
</script>

<style lang="less">
.pay {
  padding-bottom: 120rpx;
  .pay_item {
   
    .pay_site {
      padding: 37rpx 36rpx 20rpx 39rpx;
      .pay_site_select {
        font-size: 30rpx;
        font-weight: bolder;
        margin-bottom: 30rpx;
      }
      .pay_name {
        font-size: 30rpx;
        margin-bottom: 18rpx;
        font-weight: 500;
      }
    }
    .pay_select_item{
       justify-content: center;
       display: flex;
       align-items: center;
       
       .pay_select {
      width: 302rpx;
      height: 88rpx;
      border-radius: 50rpx;
      border: 1rpx #e22018 solid;
      font-weight: 600;
      font-size: 30rpx;
      color: #e22018;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 70rpx 0 49rpx;
    }
    }
    
  }
  .pay_koBai {
    width: 750rpx;
    height: 40rpx;
    background-color: #f9f9f9;
  }
  .pay_commodity {
    padding: 20rpx 0rpx 26rpx 39rpx;
    font-size: 28rpx;
    font-weight: bolder;
  }
  .pay_data {
    padding: 0rpx 18rpx 0rpx 28rpx;
    position: relative;
    .pay_quantity{
      position: absolute;
      right: 58rpx;
      top:136rpx;
      font-size: 28rpx;
      color: #000;
      font-weight: 600;
    }
    
  }
  .pay_button {
    padding: 0 28rpx;
    background-color: #ffffff;
    height: 83rpx;
    width: 694rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    .pay_left {
      font-size: 28rpx;
      font-weight: 600;
      .pay_price{
        color: #e22018;
        margin-left: 10rpx;
      }
    }

    .pay_right {
      width: 152rpx;
      height: 52rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #b6b6b6;
      color: #fff;
      font-size: 21rpx;
      border-radius:50rpx;
    }
    .active{
      width: 152rpx;
      height: 52rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e22018;
      color: #fff;
      font-size: 21rpx;
      border-radius:50rpx;
    }
  }
}
</style>