<template>
  <view>
     <navigator :url="'/pages/goods_detail/main?goods_id='+ item.goods_id" class="goods_item">
       <view class="goods_left">
         <image :src="item.goods_small_logo || '/static/empty.png'" alt="">
       </view>
       <view class="goods_right">
         <view class="goods_right_text">{{item.goods_name}}</view>
         <view class="goods_right_price">¥&nbsp;{{item.goods_price}}</view>
       </view>
     </navigator>
  </view>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less">
.goods_item {
  display: flex;
  word-break: break-all;

  .goods_left {
    image {
      width: 191rpx;
      height: 191rpx;
      padding: 9rpx 43rpx 9rpx 15rpx;
    }
  }
  .goods_right {
    font-size: 24rpx;
    padding-top: 26rpx;
    .goods_right_text {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: breck-all;
    }
    .goods_right_price {
      padding-top: 57rpx;
      color: #e22018;
    }
  }
}
</style>