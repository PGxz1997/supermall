<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  date() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    if(this.probeType===2||this.probeType===3){
    this.scroll.on("scroll", position => {
      this.$emit("contentScroll", position);
    });
    }
    if(this.pullUpLoad){
    this.scroll.on('pullingUp',()=>{
      this.$emit("loadMore")
    })
    }
  },
  methods: {
    scrollTo(x = 0, y = 0, time = 500) {
      this.scroll&&this.scroll.scrollTo(x, y, time);
    },
    //手动关闭本次上拉才能监听到下次上拉加载
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    //刷新可滚动的高度
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    getPositionY(){
      return this.scroll? this.scroll.y:0
    }
  
  }
};
</script>

<style scoped>
</style>