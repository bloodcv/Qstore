<template>
  <div class="gold_wrap">
    <header>
      <!-- <img class="icon" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" /> -->
      <h1>金考题库管理</h1>
    </header>
    <div class="sec_part">
      <div class="sec_wrap">
        <div class="sec_list">
          <div
            :class="{
              list_item: true,
              has_sec: tagHasSec.firstClass && !showSecContent,
              showCur: showCur === 'firstClass',
            }"
            @click="onSecItemClick('firstClass')"
          >
            <span class="cur_name">课程大类</span>
            <span :class="{ unsec: true, sec: showCur === 'firstClass' }"
              >ㄑ</span
            >
          </div>
          <div
            :class="{
              list_item: true,
              has_sec: tagHasSec.secondClass && !showSecContent,
              showCur: showCur === 'secondClass',
            }"
            @click="onSecItemClick('secondClass')"
          >
            <span class="cur_name">二级科目</span>
            <span :class="{ unsec: true, sec: showCur === 'secondClass' }"
              >ㄑ</span
            >
          </div>
          <!-- <div
            :class="{
              list_item: true,
              has_sec: tagHasSec.time && !showSecContent,
              showCur: showCur === 'time',
            }"
            @click="onSecItemClick('time')"
          >
            <span class="cur_name">时长</span>
            <span :class="{ unsec: true, sec: showCur === 'time' }">ㄑ</span>
          </div> -->
        </div>
        <div class="sec_content" v-if="showSecContent">
          <div class="item_wrap">
            <span
              v-for="(item, idx) in curSecList"
              :key="idx"
              :class="{ sec_tag: item.hasCheck }"
              @click="onSecTagClick(item)"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="btn_wrap">
            <Button type="default" @click="onReset">重置</Button>
            <Button type="default" @click="onCheckSecTag">确定</Button>
          </div>
        </div>
      </div>
      <!-- <div class="sec_res">
        <span>已选中筛选: {{ tagMap.length === 0 ? "无" : "" }}</span>
        <div class="tag_list">
          <Tag
            v-for="(item, idx) in tagMap"
            :key="idx"
            text-color="#666"
            plain
            closeable
            size="medium"
            type="primary"
            @close="closeTag(item)"
          >
            {{ item.name }}
          </Tag>
        </div>
      </div> -->
      <div class="sec_res">
        <span
          >已选中题库:
          <i>{{ tableData.filter((c) => c.checked).length }}</i></span
        >
      </div>
    </div>
    <div class="item_wrap">
      <div
        class="item"
        v-for="item in tableData"
        :key="item.id"
        @click.prevent="onItemClick(item)"
      >
        <Checkbox
          @click.stop="onCheckItem"
          v-model="item.checked"
          class="checkbox_left"
          checked-color="#FF7700"
          icon-size="16px"
          shape="square"
        />
        <h3 class="title">{{ item.title }}</h3>
        <!-- <div class="item_content">
          <span>科目：{{ item.category }}</span>
          <span>题库时长：{{ item.duration }}</span>
        </div> -->
        <div class="item_price">
          <span class="origin">原价:￥{{ item.origin }}</span>
          <span class="discount">折扣率:{{ item.rate }}</span>
          <span class="price"
            >折后价:<span class="num">￥{{ item.current }}</span></span
          >
        </div>
        <!-- <Button type="default" class="buy_btn" @click="onBuy(item)"
          >购买</Button
        > -->
      </div>
    </div>
    <div class="allcheck_wrap">
      <div class="left_part">
        <Checkbox
          @click.stop="onCheckAllClick"
          v-model="checkAll"
          class="checkbox_left"
          checked-color="#FF7700"
          icon-size="16px"
          shape="square"
          >全选</Checkbox
        >
      </div>
      <Button type="default" class="buy_btn" @click="onBuy()">购买</Button>
    </div>
  </div>
  <div class="mask" v-if="showSecContent" @click="showSecContent = false"></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import {
  // Tag,
  Button,
  Checkbox,
} from "vant";
import {
  firstClassMock,
  secondClassMock,
  timeMock,
  magicDataMock,
} from "./mock";

export default {
  name: "ExamGold",
  components: {
    // Tag,
    Button,
    Checkbox,
  },
  setup() {
    const tagMap = ref([]);
    const curSecList = ref([]);
    const curSecListCheck = ref({});
    const showSecContent = ref(false);
    const showCur = ref("");
    const firstClassSecList = ref([]);
    const secondClassSecList = ref([]);
    const timeSecList = ref([]);
    const checkAll = ref(false);
    const tagHasSec = ref({
      firstClass: false,
      secondClass: false,
      time: false,
    });

    // 使用的数组
    const tableData = ref([]);
    // 原始数组-检索用
    const tableDataOrigin = ref([]);

    // 关闭标签
    const closeTag = (item) => {
      tagMap.value = tagMap.value.filter((c) => {
        return c.value !== item.value;
      });
    };

    // 遍历判断当前选择项目中是否有选中的元素
    const tagMapHasIn = (item) => {
      let flag = false;
      for (let i = 0; i < tagMap.value.length; i++) {
        const c = tagMap.value[i];
        if (c.value === item.value) {
          flag = true;
          break;
        }
      }
      return flag;
    };

    // 重置选择
    const onReset = () => {
      curSecList.value.map((c, idx) => {
        c.hasCheck = false;
        if (idx === 0) {
          c.hasCheck = true;
          curSecListCheck.value = c;
        }
      });
    };

    // 判断当前选中的项目中是否含有打开的选择框里面的内容
    const judgeCurTagInCurList = (type) => {
      for (let i = 0; i < tagMap.value.length; i++) {
        const tagItem = tagMap.value[i];
        if (tagItem.type === type) return true;
      }
      return false;
    };

    // 监听选项框点击 展开选择框 展示对应的选择内容(firstClass：一级；secondClass：二级；time：时长)
    const onSecItemClick = (type) => {
      const secDataMap = {
        firstClassSecList: firstClassSecList.value,
        secondClassSecList: secondClassSecList.value,
        timeSecList: timeSecList.value,
      };
      showCur.value = type;
      let curSecListOrigin = [...secDataMap[`${type}SecList`]];
      curSecListOrigin.map((item) => {
        item.hasCheck = tagMapHasIn(item);
      });
      curSecList.value = [...curSecListOrigin];
      // 如果当前已选择的项中没有展开的选择框的项  那么调用一次重置
      if (!judgeCurTagInCurList(type)) onReset();
      showSecContent.value = true;
    };

    // 监听选择框内选项被点击
    const onSecTagClick = (item) => {
      curSecList.value.map((c) => {
        c.hasCheck = false;
        if (c.value === item.value) {
          c.hasCheck = true;
          curSecListCheck.value = c;
        }
      });
    };

    // 筛选列表数据
    const filterTableData = () => {
      console.log("tagMap.value", tagMap.value);
      checkAll.value = false;
      if (tagMap.value.length === 0) {
        tableData.value = tableDataOrigin.value.map((c) => {
          c.checked = false;
          return c;
        });
        return;
      }
      tableData.value = tableDataOrigin.value.filter((c) => {
        for (let i = 0; i < tagMap.value.length; i++) {
          const tagItem = tagMap.value[i];
          if (tagItem.value !== c[tagItem.type]) return false;
        }
        c.checked = false;
        return true;
      });
    };

    // 监听 选择框 确定
    const onCheckSecTag = () => {
      console.log("选中项", curSecListCheck.value);
      console.log("已有项目", tagMap.value);

      curSecList.value.map((c) => {
        tagMap.value.map((i, idx) => {
          if (c.value === i.value) {
            tagMap.value.splice(idx, 1);
          }
        });
      });
      if (curSecListCheck.value.name !== "全部") {
        curSecListCheck.value.type = showCur.value;
        tagMap.value.push(curSecListCheck.value);
      }
      tagMap.value = [...tagMap.value];
      showSecContent.value = false;
    };

    // 监听单项选择
    const onCheckItem = () => {
      let flag = true;
      tableData.value.map((c) => {
        console.log("监听单项选择", c.checked);
        if (!c.checked) flag = false;
      });
      checkAll.value = flag;
    };
    const onItemClick = (item) => {
      item.checked = !item.checked;
      onCheckItem();
    };

    // 全选点击
    const onCheckAllClick = () => {
      tableData.value.map((c) => {
        c.checked = checkAll.value;
      });
    };

    // 监听选择框关闭
    watch(showSecContent, (showSecContent) => {
      if (!showSecContent) {
        showCur.value = "";
        curSecList.value = [];
        curSecListCheck.value = {};
      }
    });

    // 监听选中标签变化
    watch(tagMap, (tagMap) => {
      let tagHasSecMap = {
        firstClass: false,
        secondClass: false,
        time: false,
      };

      tagMap.map((item) => {
        firstClassSecList.value.map((f) => {
          if (f.value === item.value) {
            tagHasSecMap.firstClass = true;
          }
        });
        secondClassSecList.value.map((f) => {
          if (f.value === item.value) {
            tagHasSecMap.secondClass = true;
          }
        });
        timeSecList.value.map((f) => {
          if (f.value === item.value) {
            tagHasSecMap.time = true;
          }
        });
      });

      tagHasSec.value = tagHasSecMap;
      filterTableData();
    });

    // 获取列表（这里请求列表数据,筛选列表数据）
    const getList = () => {
      // 这里是请求参数 自行处理一下
      let params = tagMap.value;
      console.log("请求列表数据", params);
      // 这里做请求获取列表数据
      tableDataOrigin.value = magicDataMock;
      tableData.value = magicDataMock;
    };

    // 获取选择框内的数据
    const getSecListData = () => {
      firstClassSecList.value = firstClassMock;
      secondClassSecList.value = secondClassMock;
      timeSecList.value = timeMock;
    };

    // 初始化第一次获取列表
    onMounted(() => {
      getList();
      getSecListData();
    });

    return {
      checkAll,
      tagMap,
      curSecList,
      showSecContent,
      tableData,
      showCur,
      tagHasSec,
      onSecItemClick,
      closeTag,
      onSecTagClick,
      onCheckSecTag,
      onReset,
      onCheckItem,
      onItemClick,
      onCheckAllClick,
    };
  },
  methods: {
    onBuy() {
      let checkedItems = this.tableData.filter((c) => {
        return c.checked;
      });
      console.log("===购买===", checkedItems);
    },
  },
};
</script>

<style lang="scss" scoped>
.gold_wrap {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  // background: #f2f2f2;
  background: linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%);
  padding-top: 55px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
header {
  background: #f8f8f8;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: fit-content;
  .icon {
    position: absolute;
    left: 21.67px;
    top: 50%;
    transform: translateY(-50%);
    width: 20.33px;
    height: 6.17px;
    ::v-deep .van-icon__image {
      width: 100%;
      height: 100%;
    }
  }
  h1 {
    margin: 0;
    padding: 16px 0;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }
}
.sec_part {
  // background-color: #fff;
  padding-bottom: 10px;
  .sec_wrap {
    .sec_list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 9px 0 31px;
      .list_item {
        display: flex;
        justify-content: space-between;
        padding: 8px 11px;
        border-radius: 16px;
        // overflow: hidden;
        height: 32px;
        width: 168px;
        box-sizing: border-box;
        background: #efefef;
        span {
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          color: #000000;
        }
        .cur_name {
          max-width: 60px;
          overflow: hidden;
        }
        .unsec {
          transform: rotateZ(270deg);
        }
        .sec {
          transform: rotateZ(90deg);
        }
        &.has_sec {
          background: #fff0e2;
          border: 1px solid #ff7700;
          span {
            color: #ff7700;
          }
        }
        &.showCur {
          position: relative;
          border-radius: 16px 16px 0 0;
          &::after {
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            bottom: -10px;
            height: 10px;
            background-color: #efefef;
            z-index: 10;
          }
        }
      }
    }
    .sec_content {
      position: fixed;
      left: 0;
      right: 0;
      height: fit-content;
      top: 105px;
      background: #efefef;
      z-index: 10;
      padding: 17px 20px;
      .item_wrap {
        display: flex;
        flex-wrap: wrap;
        span {
          width: 50%;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 18px;
          word-break: break-all;
          &.sec_tag {
            color: #ff7700;
          }
        }
      }
      .btn_wrap {
        padding: 0 8px;
        display: flex;
        button {
          border: 1px solid #ff7700;
          width: 160px;
          height: 32px;
          font-size: 12px;
          font-weight: bold;
        }
        button:nth-child(1) {
          border-right: 0;
          background-color: #fff;
          border-radius: 16px 0 0 16px;
          color: #ff7700;
        }
        button:nth-child(2) {
          border-left: 0;
          background-color: #ff7700;
          border-radius: 0 16px 16px 0;
          color: #ffffff;
        }
      }
    }
  }
  .sec_res {
    margin-left: 7px;
    display: flex;
    align-items: center;
    justify-content: left;
    > span {
      font-size: 12px;
      font-weight: bold;
      color: #666666;
      i {
        font-style: normal;
        font-size: 14px;
        font-weight: bold;
        color: #ff7700;
        position: relative;
        top: 1px;
        margin-left: 3px;
      }
    }
    .tag_list {
      display: flex;
      flex-wrap: wrap;
      span {
        font-size: 12px;
        font-weight: bold;
        color: #666666;
        background: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 11px;
        margin: 0 3px;
      }
    }
  }
}
.item_wrap {
  padding: 10px 8px 70px;
  // background-color: #f2f2f2;
  overflow-y: auto;
  .item {
    padding: 13px 0 17px 33px;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 0px 3px 0px rgba(98, 96, 96, 0.08);
    .checkbox_left {
      position: absolute;
      height: fit-content;
      width: fit-content;
      left: 8px;
      top: 14px;
    }
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
        top: 5px;
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
.allcheck_wrap {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);
  height: 63px;
  padding: 0 17px;
  .checkbox_left {
    ::v-deep .van-checkbox__label {
      font-size: 14px;
      font-weight: bold;
      color: #000000;
    }
  }
  .buy_btn {
    background: #ff7700;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    padding: 5px 21px;
    height: fit-content;
    ::v-deep .van-button__content {
      height: fit-content;
    }
  }
}
/*     <div class="allcheck_wrap">
      <div class="left_part">
        <Checkbox
          v-model="checkAll"
          class="checkbox_left"
          checked-color="#FF7700"
          icon-size="16px"
          shape="square"
          >全选</Checkbox
        >
      </div>
      <Button type="default" class="buy_btn" @click="onBuy()">购买</Button>
    </div>  */
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 105px;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.51);
  z-index: 5;
}
</style>
