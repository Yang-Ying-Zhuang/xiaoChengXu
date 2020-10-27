<template>
  <view class="search">
      <navigator class="search_item">
      <icon type="search" size="" color="#ccc" />
      <text>搜索</text>
    </navigator>
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
  }
}

</style>