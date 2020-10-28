<template>
  <view  class="tabs">
    <view v-for="(item,index) in tabs" :key="index" @tap="tabsIndex(index)">
       <view class="tabs_item" :class="{actvie: is_index == index}">{{item.text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props:["tabs"],  //tabs栏切换

  data(){
    return{
      // tabs:[
      //   {id:1,text:"综合"},
      //   {id:2,text:"销量"},
      //   {id:3,text:"价格"}
      // ],
      is_index : 0
    }
  },
  methods:{
    tabsIndex(index){ //tabs栏切换
     this.is_index = index
     this.$emit("cheng",index)  //子传父
    }
  }
}
</script>

<style lang="less">
  .tabs{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .tabs_item{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 88rpx;
      width: 184rpx;
      font-size: 30rpx;
      font-weight: 700;
    }
    .actvie{
      border-bottom: 3rpx red solid;
    }
  }

</style>