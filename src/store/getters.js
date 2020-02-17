export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  totalPrice(state){
    return '¥ '+state.cartList.filter(item=>item.checked==true).reduce((prev,item)=>{
        return prev+item.count*item.nowPrice
    },0).toFixed(2)
  },
  checkedCounts(state){
    return state.cartList.filter(item=>item.checked==true).length
  }
}
