<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img v-lazy="showGoodsItemImg" alt @load="goodsImgLoad" />
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">¥{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showGoodsItemImg() {
      return this.goodsListItem.image || this.goodsListItem.show.img;
    }
  },
  methods: {
    goodsImgLoad() {
      this.$bus.$emit("goodsImgLoad");
    },
    goodsItemClick() {
      this.$router.push("/detail/" + this.goodsListItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>