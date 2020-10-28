<template>
	<view class="index">
	  <!-- 搜索框 -->
	<Search></Search>
	<!-- 轮播图  -->
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" indicator-active-color="#f76832" :interval="3000" :circular="true">
		<swiper-item v-for="(item) in slideshow" :key="item.goods_id">
		  <navigator :url="item.navigator_url" :open-type="item.open_type">
				<image :src="item.image_src" />
			</navigator>
		</swiper-item>
	</swiper>
  <!-- 导航菜单 -->
	<view class="nav">
     <navigator v-for="(item,index) in nav" :key="index">
			 <image :src="item.image_src" mode="" />
		 </navigator>
	</view>
	<view class="floor" v-for="(item,index) in floor" :key="index">
		<view class="floor_title">
			<image :src="item.floor_title.image_src" :alt="item.floor_title.name">
		</view>
		<view class="floor_item">
			<navigator v-for="item2 in item.product_list" :key="item2.name" :url="item2.navigator_url" :open-type="item2.open_type">
				<image :src="item2.image_src" :style="'width:'+item2.image_width+'rpx'" :alt="item2.name">
			</navigator>
		</view>
	</view>


	</view>
</template>

<script>
import Search from "../../components/search";
export default {
  components: { Search },
  data() {
    return {
      slideshow: [], //轮播图
      nav: [], //导航菜单
      floor: [],
    };
  },
  onLoad() {
    this.getSlideshow(); //轮播图
    this.getNav(); //导航菜单
    this.getFloor(); //楼层
  },
  methods: {
    //轮播图
    getSlideshow: function () {
    // 第一种请求
    //   uni.request({
    //     method: "get",
    //     url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //     success: (res) => {
    //       console.log(res);
    //       this.slideshow = res.data.message;
    //     },
    //   });
    //封装:第二种
     this.$https.get('/home/swiperdata').then(res =>{
          // console.log(res);
          if(res.data.meta.status === 200){
            this.slideshow = res.data.message;
          }
      })
    },
   
    //导航菜单
    getNav: function () {
      // uni.request({
      //   method: "get",
      //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
      //   success: (res) => {
      //     console.log(res);
      //     this.nav = res.data.message;
      //   },
      // });
       this.$https.get('/home/catitems').then(res =>{
          // console.log(res);
           this.nav = res.data.message;
      })
    },
    //楼层
    getFloor: function () {
      // uni.request({
      //   method: "get",
      //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
      //   success: (res) => {
      //     console.log(res);
      //     this.floor = res.data.message;
      //   },
      // });
      this.$https.get('/home/floordata').then(res =>{
          // console.log(res);
          this.floor = res.data.message;
      })
    },
  },
};
</script>

<style lang="less">
/* #ifdef  H5 */
// .index{
//    background-color: #ccc;
// }
/* #endif  */

.swiper {
  height: 340rpx;
  image {
    width: 750rpx;
    height: 340rpx;
  }
}
.nav {
  display: flex;
  justify-content: space-evenly;
  margin: 10rpx 0 43rpx;
  image {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor {
  .floor_title {
    image {
      width: 750rpx;
      height: 59rpx;
    }
  }
  .floor_item {
    overflow: hidden;
    navigator {
      float: left;
      &:nth-child(1) image {
        height: 386rpx;
      }
    }
    image {
      width: 232rpx;
      height: 188rpx;
      margin-left: 14rpx;
      margin-bottom: 5rpx;
    }
  }
}
</style>
