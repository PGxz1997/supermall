import {ADD_OLD_COUNTS,ADD_NEW_TO_CART} from "./mutations-type"
export default{
  addToCart(context,payload){
    return new Promise((resolve,reject)=>{
      const oldGoods = context.state.cartList.find(item => payload.iid === item.iid)
      if (oldGoods) {
        context.commit(ADD_OLD_COUNTS,oldGoods)
        resolve("当前商品数量加1");
      } else {
        context.commit(ADD_NEW_TO_CART,payload)
        resolve("已添加至购物车");
      }
    }) 
  }
}