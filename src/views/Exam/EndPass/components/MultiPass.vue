<template>
  <div class="multi_pass_wrap">
    <div class="srch_wrap">
      <Field
        v-model="srchInfo"
        update:model-value
        left-icon="search"
        placeholder="请输入题库名称…"
      />
    </div>
    <div class="item_wrap">
      <div class="item" v-for="item in tableData" :key="item.id">
        <h3 class="title">{{ item.title }}</h3>
        <div class="item_content">
          <span>课程分类：{{ item.category }}</span>
          <span>类别：{{ item.type }}</span>
        </div>
        <div class="item_price">
          <span class="origin">原价:￥{{ item.origin }}</span>
          <span class="discount">折扣率:{{ item.rate }}</span>
          <span class="price"
            >折后价:<span class="num">￥{{ item.current }}</span></span
          >
        </div>
        <Button type="default" class="buy_btn" @click="onBuy(item)"
          >购买</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { Field, Button } from "vant";
import { debounce } from "lodash";
import { endPassDataMock } from "../mock";

export default {
  name: "MultiPass",
  components: {
    Field,
    Button,
  },
  setup() {
    const srchInfo = ref("");
    // 使用的数组
    const tableData = ref([]);
    // 原始数组-检索用
    const tableDataOrigin = ref([]);

    // 获取列表（这里请求列表数据）
    const getList = () => {
      tableDataOrigin.value = endPassDataMock;
      tableData.value = endPassDataMock;
    };

    // 检索列表防抖
    const getListDebounce = debounce(function (srchInfo) {
      if (!srchInfo) {
        tableData.value = tableDataOrigin.value;
      } else {
        tableData.value = tableDataOrigin.value.filter((item) => {
          return item.title.indexOf(srchInfo) > -1;
        });
      }
    }, 500);

    watch(srchInfo, (srchInfo, prevSrchInfo) => {
      console.log("watch", srchInfo, prevSrchInfo);
      getListDebounce(srchInfo);
    });

    // 初始化第一次获取列表
    onMounted(() => {
      getList();
    });

    return {
      srchInfo,
      tableData,
    };
  },
  methods: {
    onBuy(item) {
      console.log("===购买===", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.srch_wrap {
  padding: 12px 8px;
  background: linear-gradient(180deg, #fff 0%, #f2f2f2 100%);
  ::v-deep .van-field {
    background-color: #f1f1f1;
    border-radius: 22px;
    padding: 5px 16px;
  }
}
.item_wrap {
  padding: 0 8px 20px;
  background-color: #f2f2f2;
  .item {
    padding: 13px 0 17px 14px;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    .title {
      margin: 0;
      position: relative;
      font-size: 14px;
      font-weight: bold;
      color: #000000;
      text-align: left;
      padding-left: 8px;
      &::before {
        position: absolute;
        content: "";
        width: 3px;
        height: 9px;
        background-color: #709fff;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 3px;
      }
    }
    .item_content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      span {
        font-size: 12px;
        font-weight: bold;
        color: #999999;
        margin-top: 8px;
      }
    }
    .item_price {
      margin-top: 17px;
      font-size: 12px;
      font-weight: bold;
      color: #999999;
      text-align: left;
      > span {
        margin-right: 5px;
      }
      .price {
        font-size: 12px;
        font-weight: bold;
        color: #000;
        .num {
          color: #ff6906;
          font-size: 18px;
        }
      }
    }
    .buy_btn {
      position: absolute;
      background: #ff7700;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      padding: 5px 21px;
      right: 14px;
      bottom: 14px;
      height: fit-content;
      ::v-deep .van-button__content {
        height: fit-content;
      }
    }
  }
}
/* 
    <div class="item_wrap">
      <div class="item" v-for="item in tableData" :key="item.id">
        <h3 class="title">{{ item.title }}</h3>
        <div class="item_content">
          <span>课程分类：{{ item.category }}</span>
          <span>类别：{{ item.type }}</span>
        </div>
        <div class="item_price">
          <span class="origin">原价:￥{{ item.origin }}</span>
          <span class="discount">折扣率:{{ item.rate }}</span>
          <span class="price"
            >折后价:<span class="num">￥{{ item.current }}</span></span
          >
        </div>
        <Button type="default" class="buy_btn" @click="onBuy(item)"
          >购买</Button
        >
      </div>
    </div>
 */
</style>

