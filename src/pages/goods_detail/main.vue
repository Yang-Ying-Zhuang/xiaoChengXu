<template>
  <view class="goobs_detail">
    <!-- 定位返回箭头 -->
    <navigator class="open_type_navigateBack iconfont icon-fanhui" open-type="navigateBack"></navigator>
    <!-- 预览效果 -->
     <swiper :indicator-dots="true" class="goobs_detail_img">
        <swiper-item v-for="(item,index) in pics_img" :key="index" class="goobs_detail_img_item">
          <image @tap="previewImage_img(item.pics_big)" class="myimg" :src="item.pics_big" alt="">
        </swiper-item>
     </swiper>
     <!-- 价格块 -->
     <view class="price">
       <view class="price_item">
          <!-- 左边 -->
          <view class="price_left">¥&nbsp;{{goods_price}}</view>
          <!-- 右边 -->
         <view class="price_right">
           <!-- #ifdef MP-WEIXIN  -->
           <view class="analyse iconfont icon-fenxiang">
             <button class="analyse_item" open-type="share">图</button>
           </view>
           <!-- #endif-->
           <view class="collect iconfont icon-shoucang1"></view>
         </view>
       </view>
       <!-- 文字 -->
       <view class="price_name">{{goods_name}}</view>
     </view>
     <view class="background"></view>
     <view class="imgText">
       <view class="image-text">图文详情</view>
       <rich-text class="rich_img" :nodes="goods_introduce"></rich-text>
     </view>
     <!-- 底部 -->
     <view class="bottom">
          <view class="left">
              <view class="bottom_item">
                 <view class="iconfont icon-kefu"></view>
                 <view class="kefu">联系客服</view>
                 <button :show-message-card="true" open-type="contact">客</button>
              </view> 
              <view class="iconfontCart">
                 <view class="iconfont icon-cart_icon"></view>
                 <view class="cart">购物车</view>
              </view>
          </view>
          
          <view class="right">
            <view class="addCart" @tap="shoppingCart">加入购物车</view>
            <view class="purchase">立即购买</view>
          </view>
      </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      goods_id: "", //参数id
      pics_img: "", //图片
      goods_price: "",
      goods_name: "",
      goods_introduce: "",
    };
  },
  onLoad(options) {
    //  console.log(options);
    this.goods_id = options.cid; //id数据
    this.getDetail();
  },
  methods: {
    previewImage_img(pics_big) {
      //预览事件
      //  console.log(pics_big);
      uni.previewImage({
        //预览图片方法
        urls: [pics_big],
        //  current: true, // 当前显示图片的http链接
      });
    },

    async getDetail() {
      let res = await this.$https.get("goods/detail", {
        params: {
          goods_id: this.goods_id,
        },
      });
      console.log(res);
      let { pics, goods_price, goods_name, goods_introduce } = res.data.message;
      this.pics_img = pics;
      this.goods_price = goods_price;
      this.goods_name = goods_name;
      this.goods_introduce = goods_introduce;
      //判断手机安卓还是苹果
      res = uni.getSystemInfoSync();
      // console.log(res.system);
      if (res.system.indexOf("iOS") > -1) {
        this.goods_introduce = this.goods_introduce.replace(/webp/g, "jpg");
      }
    },
    shoppingCart(){
      
    }
  },
};
</script>

<style lang="less">
.goobs_detail {
  .open_type_navigateBack {
    background-color: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 40rpx;
    left: 20rpx;
    z-index: 9999;
    font-size: 48rpx;
    width: 80rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
  }

  .goobs_detail_img {
    width: 750rpx;
    height: 750rpx;
    .goobs_detail_img_item {
      .myimg {
        width: 750rpx;
        height: 750rpx;
      }
    }
  }
  .price {
    margin-bottom: 48rpx;
  }
  .price_item {
    padding: 19rpx 36rpx 19rpx 33rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price_left {
      color: #eb4450;
      font-size: 36rpx;
    }

    .price_right {
      display: flex;

      .analyse {
        margin-right: 45rpx;
        font-size: 36rpx;
        position: relative;
        .analyse_item {
          position: absolute;
          right: -33rpx;
          top: -36rpx;
          opacity: 0;
        }
      }
      .collect {
        font-size: 39rpx;
      }
    }
  }
  .price_name {
    padding: 0rpx 33rpx 0rpx 33rpx;
    font-size: 30rpx;
    word-break: breck-all;
  }
  .background {
    width: 750rpx;
    height: 20rpx;
    background-color: #f9f9f9;
  }
  .imgText {
    margin-top: 19rpx;
    padding-bottom: 120rpx;
    .image-text {
      height: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
    }
    .rich_img {
      font-size: 0;
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    display: flex;
    height: 94rpx;
    background-color: #eeeeee;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      .bottom_item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        .icon-kefu {
          font-size: 36rpx;
        }
        .kefu {
          font-size: 26rpx;
        }
        button{
          position: absolute;
          left: 10rpx;
          bottom: -10rpx;
          opacity: 0;

        }
      }
      .iconfontCart {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon-cart_icon {
           font-size: 36rpx;
        }

        .cart {
          font-size: 26rpx;
        }
      }
    }

    .right {
      display: flex;
      margin-right: 30rpx;
      .addCart {
        font-size: 26rpx;
        height: 60rpx;
        width: 196rpx;
        background-color: #fcae2f;
        border-radius: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 22rpx;
      }

      .purchase {
        font-size: 26rpx;
        height: 60rpx;
        width: 196rpx;
        background-color: #ea4350;
        border-radius: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>