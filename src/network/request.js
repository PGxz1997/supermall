import axios from "axios"
const request=config=>{
  const instance=axios.create({
    baseURL:"http://106.54.54.237:8000/api/hy",
    // baseURL:"http://123.207.32.32:8000/api/hy",
    timeout:10000
  })
  // instance.interceptors.request.use(config=>{
  //  return config;
  // },err=>{
  // })
instance.interceptors.response.use(res=>{
  return res.data//只需要数据
},err=>{
  console.log(err)
})
  return instance(config)
}
export {request}