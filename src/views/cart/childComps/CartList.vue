<template>
  <scroll class="wrapper" ref="scroll">
    <cart-list-item v-for="item in cartList" :item-info="item"/>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
import {mapGetters} from "vuex"
export default {
name:"CartList",
components:{
  Scroll,
  CartListItem
},
computed:{
  ...mapGetters(['cartList'])
},
activated(){
  this.$refs.scroll.refresh()
}
}
</script>

<style scoped>
.wrapper{
  position: absolute;
  top:44px;
  bottom: 79px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>