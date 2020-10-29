<template>
  <view class="goods_list">
    <!-- 搜索 -->
    <search></search>
    <!-- tabs栏 -->
    <Tabs :tabs="tabs" @cheng="mycheng"></Tabs>
    <!-- 循环电视 -->
    <scroll-view 
    scroll-y 
    @scrolltolower="goodsScrolltolower"
    class="goods"
    >
      <block v-for="(item,index) in goods" :key="index">
        <!-- <view class="goods_item">
          <view class="goods_left">
            <image :src="item.goods_small_logo || '../../static/empty.png'" alt="">
          </view>
          <view class="goods_right">
            <view class="goods_right_text">{{item.goods_name}}</view>
            <view class="goods_right_price">¥&nbsp;{{item.goods_price}}</view>
          </view>
        </view> -->
        <!-- 封装商品 -->
        <List :item="item"></List>
      </block>
      <view  class="hidden" v-if="!sole">底部更多没有数据了~</view>
    </scroll-view>
    

  </view>
</template>

<script>
import search from "../../components/search" //搜索
import Tabs from "../../components/tabs"  //tabs栏
import List from "../../components/list"
export default {
  components:{search,Tabs,List},
  
  data(){
    return{
       tabs:[  //tabs栏
        {id:1,text:"综合"},
        {id:2,text:"销量"},
        {id:3,text:"价格"}
      ],
      // is_index : 0, //tabs栏
    
      options:{},
      pagenum:1, //页码
      pagesize:10, //页容量
      goods:[], //总数据

      sole:true
    }
  },
  onLoad(options){
    //  console.log(options);
    this.options = options //参数id
    this.getSearch()
    
  },
  methods:{
    mycheng(index){  //子传父事件
      console.log(index);
    },

    //下拉刷新
    onPullDownRefresh(){
      // console.log('触发了下拉');
      // 一开始先清空数据
      this.goods = [],
      this.sole = true,
      this.pagenum = 1,
      this.getSearch()
      // 等上面请求结束后，结束掉下拉刷新的动画效果
      uni.stopPullDownRefresh();
    },

     // 触发底部
    goodsScrolltolower(){
      // console.log("触发了");
      this.pagenum += 1
      this.getSearch() // 调用
    },

    //商品列表数据
    getSearch:function(){
      if(this.sole == false){ return }; //判断

      this.$https.get("/goods/search",{
        params:{
          ...this.options,
          pagenum:this.pagenum,
          pagesize:this.pagesize
        }
      }).then(res =>{
        console.log(res);

        //判断数据的长度加载
        if(res.data.message.goods.length == 0){
          this.sole = false;
          uni.showToast({title: '没更多数据了',});
        }else{
          this.goods = [...this.goods,...res.data.message.goods]
        }
      })
    },
  }
}
</script>

<style lang="less">

.goods{
  width: 698rpx;
  // height: 209rpx;
  margin: 0 26rpx;
  height: calc(100vh - 44px - 100rpx);
  /* #ifdef H5 */
   height: calc(100vh - 44px - 88rpx - 44px);
  /* #endif */
  
  //  .goods_item{
  //   display: flex;
  //   word-break: break-all;

  //   .goods_left{
  //     image{
  //       width: 191rpx;
  //       height: 191rpx;
  //       padding: 9rpx 43rpx 9rpx 15rpx;
  //     }
  //   }
  //   .goods_right{
  //       font-size: 24rpx;
  //       padding-top: 26rpx;
  //     .goods_right_text{
  //       display : -webkit-box;
  //         overflow : hidden;
  //        -webkit-line-clamp : 2;
  //        -webkit-box-orient : vertical;
  //        word-break : breck-all;
  //     }
  //     .goods_right_price{
  //       padding-top: 57rpx;
  //       color: #e22018;
  //     }
  //   }
  // }
}
.hidden{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
}
</style>