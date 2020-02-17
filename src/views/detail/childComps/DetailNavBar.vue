<template>
  <div>
  <nav-bar>
    <template v-slot:left>
    <div class="back-to-last" @click="backClick">
    <img src="~assets/img/common/back.svg" alt="" >
    </div>
    </template>
    <template v-slot:center>
    <div class="detail-navbar">
      <div v-for="(item,index) in title" :key="item" class="detail-navbar-item" :class="{active:currentIndex===index}" @click="detailNavBarItemClick(index)">
        {{item}}
      </div>
    </div>
    </template>
  </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
name:"DetailNavBar",
data(){
  return {
    title:['商品','参数','评论','推荐'],
    currentIndex:0
  }
},
components:{
  NavBar
},
methods:{
  detailNavBarItemClick(index){
    this.currentIndex=index;
    this.$emit("detailNavBarItemClick",index)
  },
  backClick(){
    this.$router.back()
  }
}
}
</script>

<style scoped>
.back-to-last{
  margin-top: 8px
}
.detail-navbar{
  display: flex;
  font-size: 14px
}
.detail-navbar-item{
  flex: 1
}
.active{
  color: var(--color-high-text)
}
</style>