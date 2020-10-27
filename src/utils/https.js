import axios from 'axios'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
 
const $https = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
  adapter: axiosAdapterUniapp,
})

let conut = 0;
// 添加请求拦截器
$https.interceptors.request.use(function (config) {
  // console.log(++conut);
  ++conut;
  uni.showLoading({ //加载显示遮罩
      title:"加载中..."
    })
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
$https.interceptors.response.use(function (response) {
  // console.log(--conut)
  --conut;
  if(conut === 0){
      uni.hideLoading() //加载隐藏遮罩
   }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
 
//必须暴露 $https
export default $https