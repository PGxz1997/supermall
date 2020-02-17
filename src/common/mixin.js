import BackTop from "components/content/backTop/BackTop";
import {debounce} from "common/util"
export const goodsImgLoadListenerMixin={
  data(){
    return{
      goodsImgLoadListener:null
    }
  },
  mounted() {
    const refresh=debounce(this.$refs.scroll.refresh,500)
    this.goodsImgLoadListener=()=>{
      refresh()
    }
  },
}
export const backTopMixin={
  data(){
    return {
      isShowBTI: false
    }
  },
  components:{
    BackTop
  },
  methods:{
   //回到顶部
  backTop() {
    this.$refs.scroll.scrollTo();
  },
  bTIListener(position){
    this.isShowBTI = -position.y > 1000;
  }
}
}