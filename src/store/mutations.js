import {ADD_OLD_COUNTS,ADD_NEW_TO_CART} from "./mutations-type"
export default{
  //一个mutation一般只做单一的事情
  [ADD_NEW_TO_CART](state, payload) {
    payload.count = 1;
    payload.checked=true
    state.cartList.push(payload);
  },
  [ADD_OLD_COUNTS](state,payload){
    payload.count++
  }
}