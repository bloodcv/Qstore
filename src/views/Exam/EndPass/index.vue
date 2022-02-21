<template>
  <div class="end_pass_wrap">
    <header>
      <!-- <img class="icon" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" /> -->
      <h1>毕过题库管理</h1>
    </header>
    <Tabs
      class="tab_wrap"
      v-model:active="activeName"
      background="#fff"
      color="#FF7700"
      @change="onTabChange"
    >
      <Tab title="套餐" name="multi">
        <MultiPass :key="multiKey" />
      </Tab>
      <Tab title="单科" name="single">
        <SinglePass :key="singleKey" />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";
import { Tab, Tabs } from "vant";
import MultiPass from "./components/MultiPass";
import SinglePass from "./components/SinglePass";

export default {
  name: "ExamEndPass",
  components: {
    Tab,
    Tabs,
    MultiPass,
    SinglePass,
  },
  setup() {
    let activeName = ref("multi");
    let multiKey = ref(new Date().getTime());
    let singleKey = ref(new Date().getTime());
    const route = useRoute();
    if (route.query.type) activeName.value = route.query.type;

    onBeforeRouteUpdate((to) => {
      if (to.query.type && to.query.type !== activeName.value) {
        activeName.value = to.query.type;
      }
    });

    // 标签切换 对应标签组件重新渲染  触发重新获取列表
    const onTabChange = (params) => {
      console.log("params", params);
      if (params === "multi") multiKey.value = new Date().getTime();
      if (params === "single") singleKey.value = new Date().getTime();
    };

    return { activeName, multiKey, singleKey, onTabChange };
  },
};
</script>

<style lang="scss" scoped>
.end_pass_wrap {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #f2f2f2;
  padding-top: 100px;
  box-sizing: border-box;
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
.tab_wrap {
  ::v-deep .van-tabs__wrap {
    position: fixed;
    height: fit-content;
    top: 55px;
    left: 0;
    right: 0;
    z-index: 10;
    .van-tabs__nav {
      padding-top: 15px;
    }
  }
}
</style>
