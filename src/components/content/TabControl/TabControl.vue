<template>
  <div class="tab-control">
    <div
      v-for="item,index in titles"
      class="tab-control-item"
      :class="{active:currentIndex===index}"
    >
      <span @click="tabItemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    tabItemClick(index){
      this.currentIndex=index;
      this.$emit("tabItemClick",this.currentIndex)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 14px;
  text-align: center;
  background-color: white;
  
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span{
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span{
 border-bottom: 3px solid var(--color-tint);
}
</style>