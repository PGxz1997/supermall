module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度即设计稿的宽度（iphone6）
      viewportHeight:667,//视窗的高度即设计稿的高度
      unitPrecision:5,//转换后保留的小数位数
      viewportUnit:'vw',//指定要转换成的视窗单位
      selectorBlackList:['ignore','tab-bar'],//指定不需要转换的类(class名)，['body'] will match .body-class
      minPixelValue:1,//小于或等于1px不转换
      mediaQuery:false//不允许在媒体查询中转换px
    }
  }
}
