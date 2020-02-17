<template>
  <div class="cart-buttom-bar">
    <div class="check-all">
    <check-button :is-checked="isSellectAll" @click.native="clickAll"/>
    <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="settle">去结算({{checkedCounts}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton"
import {mapGetters} from "vuex"
export default {
name:"CartButtomBar",
components:{
  CheckButton
},
computed:{
  ...mapGetters(['cartList','totalPrice','checkedCounts']),
  isSellectAll(){
    if(this.cartList.length===0)return false;
    for(let item of this.cartList){
        if(item.checked===false)
        return false
    }
    return true
  }
},
methods:{
  clickAll(){
    if(this.isSellectAll){
      this.cartList.forEach(item=>item.checked=false)
    }
    else{
      this.cartList.forEach(item=>item.checked=true)
    }
  }
}
}
</script>

<style scoped>
.cart-buttom-bar{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  font-size: 12px;
}
.check-all{
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.check-all span{
  margin-left: 5px;
}
.price{
 line-height:30px;
}
.settle{
 line-height: 30px;
 padding:0 10px;
 background-color: red;
 color: #fff;
}
</style>