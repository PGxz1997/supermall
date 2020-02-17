<template>
  <div id="detail">
    <detail-nav-bar ref="navbar" class="detail-navbar1" @detailNavBarItemClick="detailNavBarItemClick"/>
    <scroll class="wrapper" ref="scroll" :probeType="3" @contentScroll="contentScroll">
    <detail-swiper :detail-top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
    <detail-param-info ref="params" :paramInfo="paramInfo"/>
    <detail-comment-info ref="comments" :commentInfo="commentInfo" />
    <goods-list ref="recommends" :goodsList="recommends"/>
    </scroll>
     <back-top @click.native="backTop" v-show="isShowBTI" />
    <detail-buttom-bar @addToCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailButtomBar from "./childComps/DetailBottomBar"
import GoodsList from "components/content/Goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import {getDetailByIid,getRecommends,Goods,Shop,GoodsParam} from "network/detail"
import {goodsImgLoadListenerMixin,backTopMixin} from "common/mixin"
import {mapActions} from "vuex"
export default {
name:"Detail",
data(){
  return{
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    topicYs:[],
    topicIndex:0

  }
},
components:{
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  DetailButtomBar,
  GoodsList,
  Scroll
},
created(){
  this.iid=this.$route.params.iid;
  this.getDetailByIid(this.iid);
  this.getRecommends();
},
mounted(){
    this.$bus.$on("goodsImgLoad", 
      this.goodsImgLoadListener
    );  
},
destroyed(){
this.$bus.$off("goodsImgLoad",this.goodsImgLoadListener)
},
methods:{
  ...mapActions(['addToCart']),//将actions混入methods
  //事件监听
  detailImgLoad(){
    this.$refs.scroll.refresh();
    //（问题：中间大图加载完，推荐图片不一定能加载完，所以这样写还不是很好）
    this.topicYs=[]
    const t1=this.$refs.params.$el.offsetTop;
    const t2=this.$refs.comments.$el.offsetTop;
    const t3=this.$refs.recommends.$el.offsetTop;
    this.topicYs.push(0,t1,t2,t3)
  },
  detailNavBarItemClick(index){
    this.$refs.scroll.scrollTo(0,-this.topicYs[index],100)
  },
  contentScroll(position){
    this.bTIListener(position)
    const positionY=-position.y
    const length=this.topicYs.length
    for(let i=0;i<length;i++){
      //this.topicIndex!=i防止赋值过程太过平凡
      if(this.topicIndex!=i&&(i!==length-1&&positionY>=this.topicYs[i]&&positionY<this.topicYs[i+1]||i===length-1&&positionY>=this.topicYs[i])){
      this.topicIndex=i;
      this.$refs.navbar.currentIndex=this.topicIndex;
      }
    }
  },
  addCart(){
    const goods={};
    goods.image=this.topImages[0];
    goods.title=this.goods.title;
    goods.desc=this.goods.desc;
    goods.nowPrice=this.goods.nowPrice;
    goods.iid=this.iid;
    // this.$store.dispatch("addToCart",goods).then(res=>{
    //   console.log(res)
    // })

    //该action被混入后可通过this直接调用
    this.addToCart(goods).then(res=>{
      this.$toast.show(res)
      console.log(res)
    })
  },
  //网络请求
  getDetailByIid(iid){
    getDetailByIid(iid).then(res=>{
      const data=res.result;
      this.topImages=data.itemInfo.topImages;
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      this.shop=new Shop(data.shopInfo);
      this.detailInfo=data.detailInfo;
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    })
  },
  getRecommends(){
    getRecommends().then(res=>{
      this.recommends=res.data.list
    })
  }
},
mixins:[goodsImgLoadListenerMixin,backTopMixin]
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: white
}
.wrapper{
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
}
.detail-navbar1{
  position: relative;
  z-index: 1;
  background-color: white
}
</style>