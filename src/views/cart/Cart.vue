<template>
  <div id="cart">
  <nav-bar v-slot:center class="cart-navbar">
    购物车({{length}})
  </nav-bar>
  <cart-list/>
  <cart-buttom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartButtomBar from "./childComps/CartButtomBar"
import {mapGetters} from "vuex"//注意是从vuex里导入的
export default {
name:"Cart",
components:{
  NavBar,
  CartButtomBar,
  CartList
},
computed:{
  //使用对象展开运算符将getter混入computed对象中
  //数组语法
  // ...mapGetters(['cartLength'])
  //对象语法
  ...mapGetters({
    length:'cartLength'
  })
}
}
</script>

<style scoped>
#cart{
  height: 100vh;
  position: relative;
}
.cart-navbar{
  background-color: var(--color-tint);
  color:white
}
</style>