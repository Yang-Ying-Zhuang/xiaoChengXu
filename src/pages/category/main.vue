<template>
  <view>
    <!-- 搜索框 -->
    <search></search>
    <!-- 滚动条 -->
    <view class="scroll">
      <!-- 左边 -->
      <scroll-view scroll-y class="left">
        <view
          class="left_item"
          :class="{ active: le_index == index ? 'active' : '' }"
          @tap="scroll_left(index)"
          v-for="(item, index) in cat_left"
          :key="index"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <!-- 右边 -->
      <scroll-view scroll-y class="right">
        <view class="right_title" v-for="item in cat_right" :key="item.cat_id">
          <view class="right_item" v-if="item.children">
            <text class="right_item_text">/{{ item.cat_name }}/</text>
          </view>

          <view class="right_item_list">
            <navigator
              class="right_item_item"
              v-for="(item2, index) in item.children"
              :key="index"
              :url="'/pages/goods_list/main?cid='+ item2.cat_id"
              hover-class="none"
            >
                <image :src="item2.cat_icon" mode="" />
                <view class="right_item_name">{{ item2.cat_name }}</view>
            </navigator>
          </view>

        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import search from "../../components/search";
let catAll = [];
export default {
  components: { search },
  data() {
    return {
      le_index: 0,
      cat_left: [], //左边
      cat_right: [], // 右边
    };
  },

  onLoad() {
    //this.getCets(); //分类
    
    catAll = uni.getStorageSync('catAll')
    if(!catAll){
      console.log('没有缓存，发起请求');
      this.getCets(); //分类
    } else{
      console.log('有缓存，看数据是否过期');
      //现在的时间
      const nowTime = new Date();
      //过期的事件
      const endTime = uni.getStorageSync('catAllEndTime');
      //如果现在的时间大于设置的时间就是过期,需要重新发起请求
       if(nowTime > endTime){
         this.getCets(); //分类
       } else{
          this.cat_left = catAll.map((v) => {
          return { id: v.cat_id, name: v.cat_name };
        });
         this.cat_right = catAll[0].children;
      }
    }

  },
  methods: {
    //点击事件
    scroll_left(index) {
       this.le_index = index  //把索引重新赋值
      this.cat_right = '',    //先把数据清空再重新加载
       setTimeout(()=>{      //设置延时
         this.cat_right= catAll[index].children //点击左边、改变右边变化
       },20)
    },

    getCets: function () {
      this.$https.get("/categories").then((res) => {
        // console.log(res);
        catAll = res.data.message;
        //左边数据
        this.cat_left = catAll.map((v) => {
          return { id: v.cat_id, name: v.cat_name };
        });
       //右边数据
       this.cat_right = catAll[0].children;
       
        // this.cat_right = catAll[0].children.map((item) => {
        //   return {
        //     cat_id: item.cat_id,
        //     cat_name: item.cat_name,
        //     cat_icon: item.cat_icon,
        //     children: item.children,
        //   };
        // });

        // 把获取到的数据存储到本地
        uni.setStorageSync('catAll', catAll);
        // 过期的时间
        const catAllEndTime = +new Date() + 1 * 60 * 1000;
        //设置过期时间进去
        uni.setStorageSync('catAllEndTime', catAllEndTime)

      });
    },
  },
};
</script>

<style lang="less">
.scroll {
  display: flex;
  .left {
    width: 182rpx;
    background-color: #f3f3f3;
    //视口总高度 - 减去搜索框的高度 = 等于滚动容器高度
    height: calc(100vh - 100rpx);
    /* #ifdef H5 */
    //浏览端： 视口总高度= - 减去搜索框高度 - 减去头部导航高度 - 减去底部taBar高度
    height: calc(100vh - 100rpx - 44px - 50px);
    /* #endif */
    .left_item {
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
    }
    .active {
      position: relative;
      color: #dd4f43;
      &::before {
        content: "";
        position: absolute;
        width: 5rpx;
        top: 20rpx;
        left: 0;
        bottom: 20rpx;
        background-color: #dd4f43;
      }
    }
  }
  .right {
    flex: 1;
    background-color: #fff;
    //视口总高度 - 减去搜索框的高度 = 等于滚动容器高度
    height: calc(100vh - 100rpx);
    /* #ifdef H5 */
    //浏览端： 视口总高度= - 减去搜索框高度 - 减去头部导航高度 - 减去底部taBar高度
    height: calc(100vh - 100rpx - 44px - 50px);
    /* #endif */

    .right_title {
      .right_item {
        .right_item_text {
          height: 80rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30rpx;
          font-weight: 700;
        }
      }
 
      .right_item_list {
        display: flex;
        flex-wrap: wrap;

        .right_item_item{
          width:33%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20rpx 0;
         
             image {
               width: 120rpx;
               height: 120rpx;
            }
          }
          .right_item_name{
            font-size: 28rpx;
            // font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
          }

      }
    }
  }
}
</style>