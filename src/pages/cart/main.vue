<template>
  <view class="cart">
    <!-- 顶部 -->
    <view class="cart_item" v-for="(item, index) in cartData" :key="index">
      <view class="cart_item_radio">
        <radio
          class="radio_left"
          :checked="item.goods_checked"
          color="#eb4450"
          @tap="radioLeft(item.goods_id)"
        ></radio>
      </view>
      <view class="cart_item_radio_right">
        <List class="list_data" v-if="item" :item="item"></List>
        <view class="dinwei">
          <view class="subtract" @tap="mychangecount(item.goods_id, -1)"
            >-</view
          >
          <view class="count">{{ item.goods_count }}</view>
          <view class="plus" @tap="changecount(item.goods_id, 1)">+</view>
        </view>
      </view>
    </view>
    <!-- 底部 -->
    <view class="calculate_item">
      <label class="label_calculate">
        <radio class="radio_left" :checked="newchecked" color="#eb4450"></radio>
        <view class="tatol_text">全选</view>
        <view class="tatol_name">合计：</view>
        <view class="tatol">¥&nbsp;{{ newData }}</view>
      </label>
      <view class="tatol_right" @tap="myAccounts"
        >去结算( {{ newCount }} )</view
      >
    </view>
  </view>
  <!-- </view> -->
</template>

<script>
import List from "../../components/list";
export default {
  components: { List },
  data() {
    return {
      cartData: [], //本地存储的数据
    };
  },
  //计算属性，
  computed: {
    // 计算总价格
    newData() {
      let count = 0;
      this.cartData.forEach((item) => {
        if (item.goods_checked === true)
          count += item.goods_count * item.goods_price;
      });
      return count;
    },
    // 全选
    newchecked() {
      let checked = this.cartData.every((item) => item.goods_checked === true);
      return checked;
      // let checkedAll = false;
      // if(this.cartData.length !== 0){
      //    checkedAll = this.data.every(item => item.goods_checked === true)
      // }
      //  return checkedAll
    },
    //  计算数量
    newCount() {
      let count = 0;
      this.cartData.forEach((item) => {
        count += item.goods_count;
      });
      
      return count;
    },
  },
  watch: {
    // 监听加减
    cartData: {
      // 深度监听
      deep: true,
      // handler这个函数名字自定义取
      handler() {
        // 把最新的 cartList 更新到本地存储
        uni.setStorageSync("cartData_key", this.cartData);
      },
    },
  },
  onShow() {
    //  获取本地数据
    const res = uni.getStorageSync("cartData_key") || [];
    //  console.log(res);
    this.cartData = res;
  },
  methods: {
    // 单选状态
    radioLeft(id) {
      const index = this.cartData.findIndex((item) => item.goods_id === id);
      this.cartData[index].goods_checked = !this.cartData[index].goods_checked;
    },
    //  加减
    // mychangecount(goods_id, count) {
    //   //获取到对应的索引
    //   const index = this.cartData.findIndex((item) => item.goods_id === goods_id);
    //   //判断数量
    //   if (count === -1 && this.cartData[index].goods_count === 1) {
    //     wx.showModal({
    //       //模态框
    //       content: "是否要删除",
    //       // showCancel:false,
    //       success:(res)=> {
    //         if (res.confirm) {
    //           this.cartData.splice(index,1); //删除这个数据的索引
    //         }
    //       },
    //     });
    //   }else{
    //      this.cartData[index].goods_count += count;
    //   }
    // },
   
    //  第二种写法
    // 减号
    mychangecount(goods_id, count) {
      const index = this.cartData.findIndex((item) => item.goods_id === goods_id);
      if (this.cartData[index].goods_count === 1) {
        wx.showModal({   //模态框
          content: "是否要删除",
          // showCancel:false,
          success: (res) => {
            if (res.confirm) {
              this.cartData.splice(index, 1); //删除这个数据的索引
            }
          },
        });
      } else {
        this.cartData[index].goods_count += count;
      }
    },
    // 加号
    changecount(goods_id, count) {
      const index = this.cartData.findIndex((item) => item.goods_id === goods_id);
      this.cartData[index].goods_count += count;
    },

    // 去结算
    myAccounts() {
      if(this.newCount === 0){
        uni.showToast({
          title: '还没有选中商品哦',
          mask:true,
          icon:'none'
        })
      }else{
          //路由跳转
        uni.navigateTo({
          url: "/pages/auth/main",
        })
      }
    },
  },
};
</script>

<style lang="less">
.cart {
  padding-bottom: 100rpx;
}
.cart_item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 26rpx 20rpx 35rpx;
  .cart_item_radio {
    width: 60rpx;
  }
  .cart_item_radio_right {
    flex: 1;
    position: relative;
    // .list_data {
    // }
    .dinwei {
      font-size: 30rpx;
      color: #9b9b9b;
      display: flex;
      position: absolute;
      right: 16rpx;
      bottom: 40rpx;
      .subtract {
        width: 32rpx;
        height: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #9b9b9b;
        border-radius: 50%;
        margin-right: 16rpx;
      }
      .count {
        width: 32rpx;
        height: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16rpx;
      }
      .plus {
        width: 32rpx;
        height: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #9b9b9b;
        border-radius: 50%;
      }
    }
  }
}

.calculate_item {
  position: fixed;
  /* #ifdef  MP-WEIXIN */
  bottom: 0;
  /* #endif  */

  /* #ifdef H5 */
  bottom: 100rpx;
  /* #endif  */

  left: 0;
  height: 83rpx;
  width: 706rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 23rpx;
  .label_calculate {
    display: flex;
    justify-content: center;
    align-items: center;
    .radio_left {
      font-size: 24rpx;
      color: #a1a1a1;
      margin-right: 20rpx;
    }
    .tatol_text {
      font-size: 28rpx;
      color: #ababab;
      margin-right: 40rpx;
    }
    .tatol_name {
      font-size: 28rpx;
      color: #000;
      margin-right: 20rpx;
    }
    .tatol {
      font-size: 30rpx;
      color: #ea4350;
      font-weight: bolder;
    }
  }
  .tatol_right {
    width: 160rpx;
    height: 56rpx;
    background-color: #ea4350;
    border-radius: 28rpx;
    font-size: 23rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>