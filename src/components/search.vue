<template>
  <view class="search">
      <view class="search_item">
        <icon type="search" size="" color="#ccc" />
        <text>搜索</text>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less">
.search{
  width: 750rpx;
  background-color: #e22018;
  padding: 10rpx 25rpx;
  .search_item{
    width: 700rpx;
    height: 80rpx;
    background-color: #fff;
    border-radius: 8rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    text{
      color: #727272;
      font-size: 32rpx;
      font-weight: 600;
    }
  }
}

</style>