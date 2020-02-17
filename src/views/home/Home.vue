<template>
  <div id="home">
    <nav-bar v-slot:center class="home-nav">
      <div>购物街</div>
    </nav-bar>
     <tab-control :titles="['流行','新款','精选']" @tabItemClick="tabItemClick" ref="tabControl1" v-show="isShowTC" class="tab-control1"/>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @contentScroll="contentScroll"
      @loadMore="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control  :titles="['流行','新款','精选']" @tabItemClick="tabItemClick" ref="tabControl2"/>
      <goods-list :goodsList="getGoodsList" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBTI" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/Goods/GoodsList";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import HomeRecommend from "views/home/childComps/HomeRecommend";
import HomeFeature from "views/home/childComps/HomeFeature";
import { getHomeMultidata, getHomeGoodsData } from "network/home";
import {goodsImgLoadListenerMixin,backTopMixin} from "common/mixin"
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      topOffset:0,
      isShowTC:false,
      saveY:0
      
    };
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  computed: {
    getGoodsList() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mounted() {
  },
  activated(){
    this.$refs.scroll.refresh();//这里最好先刷新，获取可滚动距离，再滚动到指定位置
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    //激活时绑定对主页商品图片加载的监听,如果在mounted里绑定，切换路由时，该绑定已被移除
    this.$bus.$on("goodsImgLoad", 
      this.goodsImgLoadListener
    );  
  },
  deactivated() {
  //离开时保存y的位置信息
    this.saveY=this.$refs.scroll.getPositionY();
  //离开时取消对主页商品图片加载的监听
    this.$bus.$off("goodsImgLoad",this.goodsImgLoadListener)
  },
  methods: {
    // 事件监听
    //当轮播图加载完，获取tabControl的offsetTop值,offsetTop的值与有定位的父元素间的距离（无父元素，则是body）
    swiperImgLoad(){
      this.topOffset=this.$refs.tabControl2.$el.offsetTop;
    }
    ,
    tabItemClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index
    },
   
    //监听内容的滚动
    contentScroll(position) {
      // 控制backtop的显示
      this.bTIListener(position)
      //当纵坐标值超过距离顶部的偏移时，显示TabControl1
      this.isShowTC=-position.y>this.topOffset;
    },
    //下拉加载
    loadMore() {
      this.getHomeGoodsData(this.currentType);
    },
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      getHomeGoodsData(type, this.goods[type].page + 1).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp(); //加载完成后需手动关闭本次上拉才能监听到下次上拉加载
      });
    }
  },
  mixins:[goodsImgLoadListenerMixin,backTopMixin]
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0px;
  right: 0px;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control1{
position: relative;
z-index: 1
}
</style>